import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Messaggi di errore e di successo
const MESSAGES = {
    TOKEN_ERROR_MESSAGE: 'Non è stato fornito nessun token',
    DECODE_TOKEN_ERROR_MESSAGE: 'Errore nella decodifica del token',
    TOKEN_FAIL_ERROR_MESSAGE: 'Token non valido o scaduto',
    SERVER_ERROR_MESSAGE: 'Errore generico del server',
};

// Funzione principale
export const verifyToken = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.error('BACKEND: Non è stato fornito nessun token');
        return res.status(400).json({
            message: MESSAGES.TOKEN_ERROR_MESSAGE,
        });
    }

    try {
        const decoded = jwt.decode(token);
    } catch (error) {
        console.error('BACKEND: Errore nella decodifica del token', error.message);
        return res.status(401).json({
            message: MESSAGES.DECODE_TOKEN_ERROR_MESSAGE,
            error: error.message,
        });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                console.error('BACKEND: Token non valido o scaduto', error.message);
                return res.status(403).json({
                    message: MESSAGES.TOKEN_FAIL_ERROR_MESSAGE,
                    error: error.message,
                });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error('BACKEND: Errore generico del server', error.message);
        return res.status(500).json({
            message: MESSAGES.SERVER_ERROR_MESSAGE,
            error: error.message,
        });
    }


}