import logger from '../../config/logger.mjs';
import { supabaseAdmin } from '../../config/supabase.mjs';
import dotenv from 'dotenv';
dotenv.config();

const MESSAGES = {
    MISSING_TOKEN: 'Token mancante',
    INVALID_TOKEN: 'Token non valido',
    SUPABASE_ERROR: 'Errore nel recupero dei post dal DB',
    SERVER_ERROR: 'Errore generico del server',
}

export const checkSubscription = async (user_id) => {
    try {
        let { data, error } = await supabaseAdmin
            .from('profiles')
            .select('ispro')
            .eq('id', user_id)
            .single();

        if (error) {
            logger.error(`Errore durante il recupero dei dati: ${error.message || error}`);
            return null;
        }

        if (!data) {
            logger.error(`Nessun piano trovato per l'utente con ID ${user_id}`);
            return false;
        }

        return data.ispro === true;
    } catch (error) {
        logger.error(`Errore generico del Server: ${error.message || error}`);
        return null;
    }
};