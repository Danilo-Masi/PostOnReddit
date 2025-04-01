import logger from '../../config/logger.mjs';
import { supabaseUser } from '../../config/supabase.mjs';
import dotenv from 'dotenv';
dotenv.config();

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        logger.error('Token mancante - verify-token-controller');
        return res.status(400).end();
    }

    try {
        const { data: user, error } = await supabaseUser.auth.getUser(token);

        if (error) {
            logger.error(`Errore nella decodifica del token - verify-token-controller: ${error.message || error}`);
            return res.status(401).end();
        }

        if (!user) {
            logger.error('Token non valido - verify-token-controller');
            return res.status(402).end();
        }

        req.user = user;
        next();

    } catch (error) {
        logger.error(`Errore generico del Server - verify-token-controller: ${error.message || error}`);
        return res.status(500).end();
    }
}