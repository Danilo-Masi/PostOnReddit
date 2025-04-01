import axios from "axios";
import logger from '../../config/logger.mjs';
import { getRedditAccessToken } from '../services/redditToken.mjs';
import dotenv from 'dotenv';
import { validateToken } from "../services/validateToken.mjs";
import { validateQuery } from "../services/validateQuery.mjs";
dotenv.config();

export const searchFlair = async (req, res) => {
    try {
        // Validazione del token
        const authHeader = req.headers['authorization'];
        const user_id = await validateToken(authHeader);

        // Validazione query
        const subreddit = validateQuery(req.query.q);

        // Recupero access_token Reddit
        const tokenData = await getRedditAccessToken(user_id);
        if (!tokenData) {
            logger.error(`Errore nel recupero dell'access_token - reddit-flair-controller`);
            return res.status(500).end();
        }
        let { access_token } = tokenData;

        // Chiamata API Reddit
        const response = await axios.get(`https://oauth.reddit.com/r/${subreddit}/api/link_flair`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'User-Agent': 'web:postonreddit:v1.0.0 (by /u/WerewolfCapital4616)',
                'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200) {
            return res.status(502).end();
        }

        const flairs = response.data;
        const flair = flairs.map((flair) => ({ id: flair.id, text: flair.text }));

        return res.status(200).json({ flair })

    } catch (error) {
        if (error.status === 403) {
            logger.info('Nessun flair disponibile per questa subreddit - reddit-flair-controller');
            return res.status(200).json({
                flair: [],
            });
        } else {
            logger.error(`Errore generico del Server - reddit-flair-controller: ${error.message || error}`);
            return res.status(500).end();
        }
    }
}