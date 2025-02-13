import supabase from '../../config/supabase.mjs';
import logger from '../../config/logger.mjs';
import { decodeToken } from '../../controllers/services/decodeToken.mjs';
import dotenv from 'dotenv';

dotenv.config();

const MESSAGES = {
    MISSING_TOKEN: 'Token mancante',
    INVALID_TOKEN: 'Token non valido',
    SUPABASE_ERROR: 'Errore nel recupero dei dati dal DB',
    INVALID_ID: 'Nessun utente trovato con questo ID In retrive-data-controller',
    SUCCESS_MESSAGE: 'Dati recuperati correttamente',
    SERVER_ERROR: 'Errore generico del server',
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

    const user = await decodeToken(token);
    if (!user) {
        return res.status(400).json({
            message: MESSAGES.INVALID_TOKEN,
        });
    }

    const email = user.user.email;

    return res.status(200).json({ email });
};