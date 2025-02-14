import axios from "axios";
import {supabaseUser} from '../../config/supabase.mjs';
import { decodeToken } from '../../controllers/services/decodeToken.mjs';
import dotenv from 'dotenv';
import logger from '../../config/logger.mjs';

dotenv.config();

const MESSAGES = {
    REFRESH_ERROR: 'Errore durante il refresh del token',
    MISSING_TOKEN: 'Token mancante',
    INVALID_TOKEN: 'Token non valido',
    INVALID_QUERY: "La query della richiesta non è valida",
    SUPABASE_ERROR: "Errore di Supabase durante il carimaneto del reddit_token",
    REDDIT_ERROR: 'Errore durante la chiamata all\'API',
    EMPTY_FLAIR: "Non c'è nessuna flair per questa subreddit",
    RESPONSE_ERROR: 'La struttura della risposta ottenuta non è valida',
    SERVER_ERROR: "Errore generico del server",
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
                'User-Agent': 'POR/1.0.0',
            }
        });

        const newAccessToken = response.data.access_token;
        const newExpiry = new Date();
        newExpiry.setSeconds(newExpiry.getSeconds() + response.data.expires_in);

        await supabaseUser
            .from('reddit_tokens')
            .update({ access_token: newAccessToken, token_expiry: newExpiry })
            .eq('user_id', user_id);

        logger.info('access_token di Reddit aggiornato');
        return newAccessToken;

    } catch (error) {
        logger.error('Errore durante il refresh dell\'access_token di Reddit: ', error.message);
        throw new Error(MESSAGES.REFRESH_ERROR);
    }
};

export const searchFlair = async (req, res) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        logger.error('Token mancante');
        return res.status(401).json({
            message: MESSAGES.MISSING_TOKEN,
        });
    }

    const user = await decodeToken(token);
    if (!user) {
        return res.status(400).json({
            message: MESSAGES.INVALID_TOKEN,
        });
    }

    const user_id = user.user.id;

    const { q } = req.query;

    if (q.trim().length < 2 || q.length > 100) {
        logger.error('Query non valida');
        return res.status(400).json({
            message: MESSAGES.INVALID_QUERY,
        });
    }

    const subreddit = q.startsWith('r/') ? q.substring(2) : q;

    try {
        let { data, error } = await supabaseUser
            .from('reddit_tokens')
            .select('access_token, refresh_token, token_expiry')
            .eq('user_id', user_id)
            .single();

        if (error || !data) {
            logger.error('Errore generico di Supabsee durante la fase di caricamento del\'access_token di Reddit: ', error.cause);
            return res.status(401).json({
                message: MESSAGES.SUPABASE_ERROR,
            })
        }

        let { access_token, refresh_token, token_expiry } = data;

        if (new Date(token_expiry) <= new Date()) {
            logger.info('access_token di Reddit scaduto, procedo con il refresh');
            access_token = await refreshAccessToken(refresh_token, user_id);
        }

        // Invia la richiesta all'API di Reddit
        const response = await axios.get(`https://oauth.reddit.com/r/${subreddit}/api/link_flair`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'User-Agent': 'web:postonreddit:v1.0.0 (by /u/WerewolfCapital4616)',
                'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200) {
            return res.status(502).json({
                message: MESSAGES.REDDIT_ERROR,
            });
        }

        const flairs = response.data;
        const flair = flairs.map((flair) => ({ id: flair.id, text: flair.text }));

        return res.status(200).json({
            flair,
        })

    } catch (error) {
        if (error.status === 403) {
            logger.info('Nessun flair disponibile per questa subreddit');
            return res.status(200).json({
                flair: [],
            });
        } else {
            logger.error('Errore generico del Server: ', error.cause);
            return res.status(500).json({
                message: MESSAGES.SERVER_ERROR,
            });
        }
    }
}