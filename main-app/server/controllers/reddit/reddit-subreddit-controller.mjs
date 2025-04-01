import axios from "axios";
import NodeCache from 'node-cache';
import logger from '../../config/logger.mjs';
import { refreshAccessToken } from "../services/redditRefreshToken.mjs";
import { getRedditAccessToken } from "../services/redditToken.mjs";
import { validateToken } from "../services/validateToken.mjs";
import { validateQuery } from '../services/validateQuery.mjs';
import dotenv from 'dotenv';
dotenv.config();

const cache = new NodeCache({ stdTTL: 300 });

export const searchSubreddits = async (req, res) => {
    try {
        // Validazione del token
        const authHeader = req.headers['authorization'];
        const user_id = await validateToken(authHeader);

        // Validazione query
        const {q} = req.query;
        const subreddit = validateQuery(q);

        // Controlla se i risultati sono già in cache
        const cachedSubreddits = cache.get(subreddit);
        if (cachedSubreddits) {
            return res.status(200).json({ subreddits: cachedSubreddits });
        }

        const tokenData = await getRedditAccessToken(user_id);
        if (!tokenData) {
            logger.error('Errore durante il caricamento del token Reddit - reddit-subreddut-controller');
            return res.status(401).end();
        }
        let { access_token, refresh_token, token_expiry } = tokenData;

        // Controlla se il token scadrà nei prossimi 5 minuti e aggiornarlo in anticipo
        if (new Date(token_expiry) <= new Date(Date.now() + 5 * 60 * 1000)) {
            logger.info('access_token di Reddit in scadenza, procedo con il refresh - reddit-subreddut-controller');
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
            logger.error(`Errore nel recupero dei subreddit da Reddit - reddit-subreddut-controller: ${response.status}`);
            return res.status(502).end();
        }

        const subreddits = response.data.data.children.map((child) => child.data.display_name_prefixed);

        // Memorizza i risultati nella cache
        cache.set(q, subreddits);

        return res.status(200).json({ subreddits });

    } catch (error) {
        if (axios.isAxiosError(error)) {
            logger.error(`Errore Axios - reddit-subreddut-controller: ${error.message}`);
            logger.error(`Status - reddit-subreddut-controller: ${error.response?.status}`);
            logger.error(`Response - reddit-subreddut-controller: ${JSON.stringify(error.response?.data)}`);
        } else {
            logger.error(`Errore generico - reddit-subreddut-controller: ${error.message || error}`);
        }
        return res.status(500).end();
    }
};