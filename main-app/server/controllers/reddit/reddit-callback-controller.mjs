import supabase from '../../config/supabase.mjs';
import axios from 'axios';
import dotenv from 'dotenv';
import logger from '../../config/logger.mjs';

dotenv.config();

const CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDDIT_REDIRECT_URI;

const MESSAGE = {
    REDDIT_ERROR: 'L\'utente ha rifiutato il consenso o si è verificato un errore con Reddit',
    SUPABASE_ERROR: "Errore di Supabase durante la fase di salvataggio dei dati nel DB",
    SERVER_ERROR: 'Errore generico del server',
}

export const redditCallback = async (req, res) => {

    const { code, state, error } = req.query;

    if (error) {
        logger.error('Errore generico di Reddit: ', error.message);
        return res.status(400).json({
            message: MESSAGE.REDDIT_ERROR,
        });
    }

    try {
        const response = await axios.post('https://www.reddit.com/api/v1/access_token',
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
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }
        );

        // Dati restituiti dall'API di Reddit
        const { access_token, refresh_token, expires_in, scope } = response.data;
        const token_expiry = new Date(Date.now() + expires_in * 1000);
        const userId = state.split(':')[1];

        // Salvataggio dei dati nella tabella 'reddit_tokens' del DB
        const { data, error } = await supabase
            .from('reddit_tokens')
            .upsert({
                user_id: userId,
                access_token: access_token,
                refresh_token: refresh_token,
                token_expiry: token_expiry,
            });

        // Gestisce eventuali errori derivati dall'inserimento dei dati nel DB
        if (error) {
            logger.error('Errore generico di Supabase durante la fase di salvataggio dei dati di Reddit nel DB: ', error.cause);
            return res.status(401).json({
                message: MESSAGE.SUPABASE_ERROR,
            });
        }

        // Redirect alla pagina principale della piattaforma
        return res.redirect("http://localhost:5173/home"); //DA MODIFICARE

    } catch (error) {
        logger.error('Errore generico del Server: ', error.cause);
        return res.status(500).json({
            message: MESSAGE.SERVER_ERROR,
        });
    }
}