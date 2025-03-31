import logger from '../../config/logger.mjs';
import { decodeToken } from '../../controllers/services/decodeToken.mjs';
import { supabaseAdmin } from '../../config/supabase.mjs';
import dotenv from 'dotenv';
dotenv.config();

const MESSAGES = {
    MISSING_TOKEN: 'Token mancante',
    INVALID_TOKEN: 'Token non valido',
    SUPABASE_ERROR: 'Errore nel recupero dei post dal DB',
    SERVER_ERROR: 'Errore generico del server',
    SUBSCRIPTION_ERROR: 'Errore durante la verifica della sottoscrizione dell\'utente',
    NO_PRO: 'L\'utente non è autorizzato ad accedere ai dati',
}

export const checkPlan = async (req, res) => {
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
        let { data, error } = await supabaseAdmin
            .from('profiles')
            .select('ispro')
            .eq('id', user_id)
            .single();

        if (error) {
            logger.error(`Errore durante il recupero dei dati: ${error.message || error}`);
            return res.status(500).json({ message: MESSAGES.SUPABASE_ERROR });
        }

        if (!data) {
            logger.error(`Nessun piano trovato per l'utente con ID ${user_id}`);
            return res.status(404).json({ message: 'Utente non trovato' });
        }

        return res.status(200).json({
            isPro: data.ispro,
        });
    } catch (error) {
        logger.error(`Errore generico del Server: ${error.message || error}`);
        return res.status(500).json({
            message: MESSAGES.SERVER_ERROR,
        });
    }
};