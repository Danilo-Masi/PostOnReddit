import supabase from '../../config/supabase.mjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import logger from '../../config/logger.mjs';

dotenv.config();

const MESSAGES = {
    MISSING_TOKEN: 'Token mancante',
    INVALID_TOKEN: 'Token non valido',
    SUPABASE_ERROR: 'Errore generico di Supabase',
    SUCCESS_MESSAGE: 'Logout avvenuto con successo',
    SERVER_ERROR: 'Errore generico del server',
}

const decodeToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        logger.error('Tokne non valido: ', error.message);
        return;
    }
}

export const logoutController = async (req, res) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        logger.error('Token mancante');
        return res.status(400).json({
            message: MESSAGES.MISSING_TOKEN,
        });
    }

    const decoded = decodeToken(token);
    if (!decoded) {
        logger.error('Token invalido');
        return res.status(400).json({
            message: MESSAGES.INVALID_TOKEN,
        });
    }

    try {
        let { error } = await supabase.auth.signOut(token);

        if (error) {
            logger.error('Errore generico di Supabase durante la fase di Logout: ', error.cause);
            return res.status(401).json({
                message: MESSAGES.SUPABASE_ERROR,
            });
        }

        return res.status(200).json({
            message: MESSAGES.SUCCESS_MESSAGE,
        });

    } catch (error) {
        logger.error('Errore generico del Server: ',error.cause);
        return res.status(500).json({
            message: MESSAGES.SERVER_ERROR,
        });
    }
}