import axios from "axios";
import { decodeToken } from '../../controllers/services/decodeToken.mjs';
import logger from '../../config/logger.mjs';
import { getRedditAccessToken } from '../services/redditToken.mjs';
import dotenv from 'dotenv';
dotenv.config();

const MESSAGES = {
    MISSING_TOKEN: 'Token mancante',
    INVALID_TOKEN: 'Token non valido',
    INVALID_QUERY: "La query della richiesta non è valida",
    SUPABASE_ERROR: "Errore di Supabase durante il carimaneto del reddit_token",
    REDDIT_ERROR: 'Errore durante la chiamata all\'API',
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
        const tokenData = await getRedditAccessToken(user_id);
        if (!tokenData) {
            logger.error(`Errore nel recuper dell'access_token dal DB`);
            return res.status(500).json({ message: MESSAGES.SUPABASE_ERROR });
        }
        let { access_token } = tokenData;

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