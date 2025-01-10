import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

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
        console.error('BACKEND: Token mancante');
        return res.status(400).json({
            message: MESSAGES.MISSING_TOKEN,
        });
    }

    try {
        const decoded = jwt.decode(token);
    } catch (error) {
        console.error('BACKEND: Errore nella decodifica del token', error.stack);
        return res.status(401).json({
            message: MESSAGES.DECODE_ERROR,
        });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                console.error('BACKEND: Token non valido', error.stack);
                return res.status(402).json({
                    message: MESSAGES.INVALID_TOKEN,
                });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error('BACKEND: Errore generico del server', error.stack);
        return res.status(500).json({
            message: MESSAGES.SERVER_ERROR,
        });
    }
}