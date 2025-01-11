import axios from "axios";
import supabase from '../../config/supabase.mjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const MESSAGES = {
    INVALID_QUERY: "La query della richiesta non è valida",
    SUPABASE_ERROR: "Errore di Supabase durante il carimaneto del reddit_token",
    REDDIT_ERROR: 'Errore durante la chiamata all\'API',
    RESPONSE_ERROR: 'La struttura della risposta ottenuta non è valida',
    SERVER_ERROR: "Errore generico del server",
}

const decodeToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error('BACKEND: Token non valido', error.stack);
        return;
    }
}

const refreshAccessToken = async (refresh_token, user_id) => {
    try {
        const response = await axios.post('https://www.reddit.com/api/v1/access_token', null, {
            params: {
                grant_type: 'refresh_token',
                refresh_token: refresh_token,
            },
            auth: {
                username: process.env.REDDIT_CLIENT_ID,
                password: process.env.REDDIT_CLIENT_SECRET,
            },
            headers: {
                'User-Agent': 'por',
            }
        });

        const newAccessToken = response.data.access_token;
        const newExpiry = new Date();
        newExpiry.setSeconds(newExpiry.getSeconds() + response.data.expires_in);

        await supabase
            .from('reddit_tokens')
            .update({ access_token: newAccessToken, token_expiry: newExpiry })
            .eq('user_id', user_id);

        console.log("BACKEND: Access token aggiornato.");
        return newAccessToken;

    } catch (error) {
        console.error("BACKEND: Errore durante il refresh del token", error.stack);
        throw new Error(MESSAGES.REDDIT_ERROR);
    }
};

export const searchFlair = async (req, res) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.error('BACKEND: Token mancante');
        return res.status(401).json({
            message: MESSAGES.MISSING_TOKEN,
        });
    }

    const decoded = decodeToken(token);
    if (!decoded) {
        return res.status(401).json({
            message: MESSAGES.TOKEN_INVALID,
        });
    }

    const user_id = decoded.id;
    const { q } = req.query;

    if (q.trim().length < 2 || q.length > 100) {
        return res.status(400).json({
            message: MESSAGES.INVALID_QUERY,
        });
    }

    const subreddit = q.startsWith('r/') ? q.substring(2) : q;

    try {
        let { data, error } = await supabase
            .from('reddit_tokens')
            .select('access_token, refresh_token, token_expiry')
            .eq('user_id', user_id)
            .single();

        if (error || !data) {
            console.error("BACKEND: Errore di Supabase durante il caricamento del reddit_token: ", error.stack);
            return res.status(401).json({
                message: MESSAGES.SUPABASE_ERROR,
            })
        }

        let { access_token, refresh_token, token_expiry } = data;

        if (new Date(token_expiry) <= new Date()) {
            console.log("BACKEND: Access token scaduto procedo con il refresh");
            access_token = await refreshAccessToken(refresh_token, user_id);
        }

        // Invia la richiesta all'API di Reddit
        const response = await axios.get(`https://oauth.reddit.com/r/${subreddit}/api/link_flair_v2`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'User-Agent': 'POR By',
            }
        });

        if (response.status !== 200 || !response.data.data) {
            return res.status(502).json({
                message: MESSAGES.REDDIT_ERROR,
            });
        }

        const flairChoices = response.data.choices;
        const flair = flairChoices.map(choise => choise.falir_text);

        return res.status(200).json({
            flair
        });

    } catch (error) {
        console.error('BACKEND: Errore generico del server', error.stack);
        return res.status(500).json({
            message: MESSAGES.SERVER_ERROR,
        });
    }
}