import axios from "axios";
import NodeCache from 'node-cache';
import logger from '../../config/logger.mjs';

const MESSAGES = {
    INVALID_QUERY: "La query della richiesta non è valida",
    REDDIT_ERROR: "Errore nel recupero dei subreddit",
    SERVER_ERROR: "Errore generico del server",
}

// Cache con scadenza di 5 minuti
const cache = new NodeCache({ stdTTL: 300 });

export const searchSubreddits = async (req, res) => {

    const { q } = req.query;

    if (q.trim().length < 2 || q.length > 100) {
        return res.status(400).json({
            message: MESSAGES.INVALID_QUERY,
        });
    }

    // Cache check
    const cachedSubreddits = cache.get(q);
    if (cachedSubreddits) {
        return res.status(200).json({
            subreddits: cachedSubreddits
        });
    }

    try {
        const response = await axios.get(`https://www.reddit.com/subreddits/search.json`, {
            params: { q: encodeURIComponent(q), limit: 5 },
            timeout: 5000,
            headers: { 'User-Agent': 'POR/1.0.0' }
        });

        if (response.status !== 200 || !response.data.data) {
            logger.error('Errore nel recupero del subreddit da Reddit');
            return res.status(502).json({
                message: MESSAGES.REDDIT_ERROR,
            });
        }

        // Estrazione subreddit
        const subreddits = response.data.data.children.map((child) => {
            return child.data.display_name_prefixed
        });

        // Cache dei risultati
        cache.set(q, subreddits);

        return res.status(200).json({
            subreddits
        });

    } catch (error) {
        if (axios.isAxiosError(error)) {
            logger.error('Errore nella chiamata axios: ', error.cause);
        } else {
            logger.error('Errore generico del Server: ', error.cause);
        }
        return res.status(500).json({
            message: MESSAGES.SERVER_ERROR,
        });
    }
}