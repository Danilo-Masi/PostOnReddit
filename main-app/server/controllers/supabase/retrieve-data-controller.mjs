import supabase from '../../config/supabase.mjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import logger from '../../config/logger.mjs';

dotenv.config();

const MESSAGES = {
    MISSING_TOKEN: 'Token mancante',
    INVALID_TOKEN: 'Token non valido',
    SUPABASE_ERROR: 'Errore nel recupero dei dati dal DB',
    INVALID_ID: 'Nessun utente trovato con questo ID',
    SUCCESS_MESSAGE: 'Dati recuperati correttamente',
    SERVER_ERROR: 'Errore generico del server',
}

const decodeToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        logger.error('Token non valido');
        return;
    }
}

export const retrieveData = async (req, res) => {

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
        return res.status(400).json({
            message: MESSAGES.INVALID_TOKEN,
        });
    }

    const user_id = decoded.id;

    try {
        let { data, error } = await supabase
            .from('profiles')
            .select('credits, email')
            .eq('id', user_id);

        if (error) {
            logger.error('Errore generico di Supabase durante il recupero dei dati del utente dal DB: ', error.cause);
            return res.status(401).json({
                message: MESSAGES.SUPABASE_ERROR,
            });
        }

        if (!data || data.length === 0) {
            logger.error('Nessun utente trovato con questo ID');
            return res.status(401).json({
                message: MESSAGES.INVALID_ID
            });
        }

        return res.status(200).json({
            message: MESSAGES.SUCCESS_MESSAGE,
            data: data[0],
        });

    } catch (error) {
        logger.error('Errore generico del Server: ', error.cause);
        return res.status(500).json({
            message: MESSAGES.SERVER_ERROR,
        });
    }
}