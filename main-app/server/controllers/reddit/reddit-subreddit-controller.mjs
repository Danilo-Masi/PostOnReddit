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

    if (!q || q.trim().length < 2 || q.length > 100) {
        return res.status(400).json({
            message: MESSAGES.INVALID_QUERY,
        });
    }

    console.log("Query ricevuta:", q); // Debug query

    // Controlla se i risultati sono già in cache
    const cachedSubreddits = cache.get(q);
    if (cachedSubreddits) {
        return res.status(200).json({ subreddits: cachedSubreddits });
    }

    try {
        const response = await axios.get(`https://www.reddit.com/subreddits/search.json`, {
            params: { q: q, limit: 5 },
            headers: {
                'User-Agent': 'web:postonreddit:v1.0.1 (by /u/WerewolfCapital4616)',
                'Content-Type': 'application/json',
            }
        });

        if (response.status !== 200 || !response.data.data) {
            logger.error('Errore nel recupero dei subreddit da Reddit', response.data);
            return res.status(502).json({ message: MESSAGES.REDDIT_ERROR });
        }

        const subreddits = response.data.data.children.map((child) => child.data.display_name_prefixed);
        cache.set(q, subreddits); // Cache dei risultati

        return res.status(200).json({ subreddits });

    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                logger.error('Errore Axios:', error.response.data, 'Status:', error.response.status);
            } else if (error.request) {
                logger.error('Errore nella richiesta:', error.request);
            } else {
                logger.error('Errore generale:', error.message);
            }
        } else {
            logger.error('Errore sconosciuto:', error);
        }
        return res.status(500).json({ message: MESSAGES.SERVER_ERROR });
    }
};