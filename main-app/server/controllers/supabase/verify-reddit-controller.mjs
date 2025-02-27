import logger from '../../config/logger.mjs';
import { decodeToken } from '../../controllers/services/decodeToken.mjs';
import dotenv from 'dotenv';
import { getRedditAccessToken } from '../services/redditToken.mjs';

dotenv.config();

const MESSAGES = {
    MISSING_TOKEN: 'Token mancante',
    INVALID_TOKEN: 'Token non valido',
    SUPABASE_ERROR: 'Errore nel recupero dei dati dal DB',
    SERVER_ERROR: 'Errore generico del server',
}

export const checkRedditAuthorization = async (req, res) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        logger.error('Token mancante');
        return res.status(400).json({
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

    try {
        const access_token = await getRedditAccessToken(user_id);
        if (!access_token) {
            logger.error(`Errore nel recuper dell'access_token dal DB`);
            return res.status(500).json({ message: MESSAGES.SUPABASE_ERROR });
        }

        if (access_token) {
            return res.status(200).json({
                isAuthorized: true
            });
        } else {
            return res.status(200).json({
                isAuthorized: false
            });
        }

    } catch (error) {
        logger.error('Errore generico del Server: ' + error.message);
        return res.status(500).json({
            message: MESSAGES.SERVER_ERROR,
        });
    }
}