import logger from '../../config/logger.mjs';
import { getRedditAccessToken } from '../services/redditToken.mjs';
import { validateToken } from '../services/validateToken.mjs';
import dotenv from 'dotenv';
dotenv.config();

export const checkRedditAuthorization = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const user_id = await validateToken(authHeader);

        const tokenData = await getRedditAccessToken(user_id);
        if (!tokenData) {
            logger.error(`Errore nel recuper dell'access_token dal DB - verify-reddit-controller`);
            return res.status(500).end();
        }
        let { access_token } = tokenData;

        if (access_token) {
            return res.status(200).json({ isAuthorized: true });
        } else {
            return res.status(200).json({ isAuthorized: false });
        }
    } catch (error) {
        logger.error(`Errore generico del Server - verify-reddit-controller: ${error.message || error}`);
        return res.status(500).end();
    }
}