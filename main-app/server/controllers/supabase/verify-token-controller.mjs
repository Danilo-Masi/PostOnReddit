import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import logger from '../../config/logger.mjs';

dotenv.config();

const MESSAGES = {
    MISSING_TOKEN: 'Token mancante',
    DECODE_ERROR: 'Errore nella decodifica del token',
    INVALID_TOKEN: 'Token non valido',
    SERVER_ERROR: 'Errore generico del server',
};

export const verifyToken = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        logger.error('Token mancante');
        return res.status(400).json({
            message: MESSAGES.MISSING_TOKEN,
        });
    }

    try {
        const decoded = jwt.decode(token);
    } catch (error) {
        logger.error('Errore nella decodifica del token: ', error.message);
        return res.status(401).json({
            message: MESSAGES.DECODE_ERROR,
        });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                logger.error('Token non valido: ', error.cause);
                return res.status(402).json({
                    message: MESSAGES.INVALID_TOKEN,
                });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        logger.error('Errore generico del server: ', error.cause);
        return res.status(500).json({
            message: MESSAGES.SERVER_ERROR,
        });
    }
}