import logger from '../../config/logger.mjs';
import { supabaseUser } from '../../config/supabase.mjs';
import dotenv from 'dotenv';
dotenv.config();

const MESSAGES = {
    MISSING_TOKEN: 'Token mancante',
    DECODE_ERROR: 'Errore nella decodifica del token',
    INVALID_TOKEN: 'access_token non valido',
    SERVER_ERROR: 'Errore generico del Server',
};

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        logger.error('Token mancante');
        return res.status(400).json({
            message: MESSAGES.MISSING_TOKEN,
        });
    }

    try {
        const { data: user, error } = await supabaseUser.auth.getUser(token);

        if (error) {
            logger.error(`Errore nella decodifica del token: ${error.message || error}`);
            return res.status(401).json({
                message: MESSAGES.DECODE_ERROR,
            });
        }

        if (!user) {
            logger.error('Token non valido');
            return res.status(402).json({
                message: MESSAGES.INVALID_TOKEN,
            });
        }

        req.user = user;
        next();

    } catch (error) {
        logger.error(`Errore generico del Server: ${error.message || error}`);
        return res.status(500).json({
            message: MESSAGES.SERVER_ERROR,
        });
    }
}