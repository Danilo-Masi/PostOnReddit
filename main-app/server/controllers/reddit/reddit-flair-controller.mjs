import axios from "axios";
import { decodeToken } from '../../controllers/services/decodeToken.mjs';
import dotenv from 'dotenv';
import logger from '../../config/logger.mjs';
import { getRedditAccessToken } from '../services/redditToken.mjs';

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
        const access_token = await getRedditAccessToken(user_id);
        if (!access_token) {
            logger.error(`Errore nel recuper dell'access_token dal DB`);
            return res.status(500).json({ message: MESSAGES.SUPABASE_ERROR });
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
            logger.error('Errore generico del Server: ' + error.message);
            return res.status(500).json({
                message: MESSAGES.SERVER_ERROR,
            });
        }
    }
}