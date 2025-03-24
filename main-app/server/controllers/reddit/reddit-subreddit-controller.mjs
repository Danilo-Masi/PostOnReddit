import axios from "axios";
import NodeCache from 'node-cache';
import logger from '../../config/logger.mjs';
import { decodeToken } from '../../controllers/services/decodeToken.mjs';
import { refreshAccessToken } from "../services/redditRefreshToken.mjs";
import { getRedditAccessToken } from "../services/redditToken.mjs";
import dotenv from 'dotenv';
dotenv.config();

const MESSAGES = {
    MISSING_TOKEN: 'Token mancante',
    INVALID_TOKEN: 'Token non valido',
    INVALID_QUERY: "La query della richiesta non è valida",
    REDDIT_ERROR: "Errore nel recupero dei subreddit",
    SERVER_ERROR: "Errore generico del server",
}

const cache = new NodeCache({ stdTTL: 300 });

export const searchSubreddits = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        logger.error('Token mancante');
        return res.status(401).json({ message: MESSAGES.MISSING_TOKEN });
    }

    const user = await decodeToken(token);
    if (!user) {
        return res.status(400).json({ message: MESSAGES.INVALID_TOKEN });
    }

    const user_id = user.user.id;
    const { q } = req.query;

    if (!q || q.trim().length < 2 || q.length > 100) {
        return res.status(400).json({ message: MESSAGES.INVALID_QUERY });
    }

    // Controlla se i risultati sono già in cache
    const cachedSubreddits = cache.get(q);
    if (cachedSubreddits) {
        return res.status(200).json({ subreddits: cachedSubreddits });
    }

    try {
        const tokenData = await getRedditAccessToken(user_id);
        if (!tokenData) {
            logger.error('Errore durante il caricamento del token Reddit');
            return res.status(401).json({ message: MESSAGES.MISSING_TOKEN });
        }
        let { access_token, refresh_token, token_expiry } = tokenData;

        // Controlla se il token scadrà nei prossimi 5 minuti e aggiornarlo in anticipo
        if (new Date(token_expiry) <= new Date(Date.now() + 5 * 60 * 1000)) {
            logger.info('access_token di Reddit in scadenza, procedo con il refresh');
            access_token = await refreshAccessToken(refresh_token, user_id);
        }

        const response = await axios.get("https://oauth.reddit.com/subreddits/search.json", {
            params: { q, limit: 5 },
            headers: {
                "Authorization": `Bearer ${access_token}`,
                'User-Agent': 'web:postonreddit:v1.0.0 (by /u/WerewolfCapital4616)',
                "Accept": "application/json"
            }
        });

        if (response.status !== 200 || !response.data?.data) {
            logger.error('Errore nel recupero dei subreddit da Reddit');
            return res.status(502).json({ message: MESSAGES.REDDIT_ERROR });
        }

        const subreddits = response.data.data.children.map((child) => child.data.display_name_prefixed);

        // Memorizza i risultati nella cache
        cache.set(q, subreddits);

        return res.status(200).json({ subreddits });

    } catch (error) {
        if (axios.isAxiosError(error)) {
            logger.error(`Errore Axios: ${error.message}`);
            logger.error(`Status: ${error.response?.status}`);
            logger.error(`Response: ${JSON.stringify(error.response?.data)}`);
        } else {
            logger.error(`Errore generico: ${error}`);
        }
        return res.status(500).json({ message: MESSAGES.SERVER_ERROR });
    }
};