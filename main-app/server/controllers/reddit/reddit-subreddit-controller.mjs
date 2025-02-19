import axios from "axios";
import NodeCache from 'node-cache';
import logger from '../../config/logger.mjs';
import { supabaseAdmin } from '../../config/supabase.mjs';
import { decodeToken } from '../../controllers/services/decodeToken.mjs';
import dotenv from 'dotenv';

dotenv.config();

const MESSAGES = {
    INVALID_QUERY: "La query della richiesta non è valida",
    MISSING_TOKEN: 'Token mancante',
    INVALID_TOKEN: 'Token non valido',
    REFRESH_ERROR: 'Errore durante il refresh del token',
    REDDIT_ERROR: "Errore nel recupero dei subreddit",
    SERVER_ERROR: "Errore generico del server",
}

const cache = new NodeCache({ stdTTL: 300 });

// Funzione per aggiornare l'access token tramite il refresh token
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
                'User-Agent': 'web:postonreddit:v1.0.0 (by /u/WerewolfCapital4616)',
            }
        });

        const newAccessToken = response.data.access_token;
        const newExpiry = new Date();
        newExpiry.setSeconds(newExpiry.getSeconds() + response.data.expires_in);

        await supabaseAdmin
            .from('reddit_tokens')
            .update({ access_token: newAccessToken, token_expiry: newExpiry })
            .eq('user_id', user_id);

        logger.info('access_token di Reddit aggiornato');
        return newAccessToken;

    } catch (error) {
        logger.error('Errore durante il refresh dell\'access_token di Reddit: ' + error.message);
        throw new Error(MESSAGES.REFRESH_ERROR);
    }
};

export const searchSubreddits = async (req, res) => {
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
    if (!q || q.trim().length < 2 || q.length > 100) {
        return res.status(400).json({
            message: MESSAGES.INVALID_QUERY,
        });
    }

    // Controlla se i risultati sono già in cache
    const cachedSubreddits = cache.get(q);
    if (cachedSubreddits) {
        return res.status(200).json({ subreddits: cachedSubreddits });
    }

    try {
        // Recupera il token di accesso Reddit
        let { data, error } = await supabaseAdmin
            .from('reddit_tokens')
            .select('access_token, refresh_token, token_expiry')
            .eq('user_id', user_id)
            .single();

        if (error || !data) {
            logger.error('Errore durante il caricamento del token Reddit');
            return res.status(401).json({
                message: MESSAGES.MISSING_TOKEN,
            });
        }

        let { access_token, refresh_token, token_expiry } = data;

        // Se il token è scaduto, fai il refresh
        if (new Date(token_expiry) <= new Date()) {
            logger.info('access_token di Reddit scaduto, procedo con il refresh');
            access_token = await refreshAccessToken(refresh_token, user_id);
        }

        // Chiamata all'API Reddit per cercare i subreddit
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