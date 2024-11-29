import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDDIT_REDIRECT_URI;

const MESSAGE = {
    REDDIT_ERROR: 'L\'utente ha rifiutato il consenso o si è verificato un errore',
    SUCCESS_MESSAGE: 'Autenticazione completata con successo',
    SERVER_ERROR: 'Errore generico del server',
}

export const redditCallback = async (req, res) => {

    const { code, state, error } = req.query;

    if (error) {
        return res.status(400).json({
            message: MESSAGE.REDDIT_ERROR,
        });
    }

    try {
        const response = await axios.post(
            'https://www.reddit.com/api/v1/access_token',
            new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: REDIRECT_URI,
            }),
            {
                auth: {
                    username: CLIENT_ID,
                    password: CLIENT_SECRET,
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }
        );

        const { access_token, refresh_token, expires_in, scope } = response.data;

        // SALVARE I DATI NEL DB SULLA TABELLA PROFILES

        return res.redirect("http://localhost:5173/home"); //DA MODIFICARE

    } catch (error) {
        console.error('BACKEND: Errore durante lo scambio del token', error.message);
        return res.status(500).json({
            message: MESSAGE.SERVER_ERROR,
            error: error.message,
        });
    }


}