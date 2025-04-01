import logger from '../../config/logger.mjs';
import { supabaseAdmin } from '../../config/supabase.mjs';
import dotenv from 'dotenv';
dotenv.config();

export const checkSubscription = async (user_id) => {
    try {
        let { data, error } = await supabaseAdmin
            .from('profiles')
            .select('ispro')
            .eq('id', user_id)
            .single();

        if (error) {
            logger.error(`Errore durante il recupero dei dati - checkSubscription: ${error.message || error}`);
            return null;
        }

        if (!data) {
            logger.error(`Nessun piano trovato per l'utente con ID ${user_id} - checkSubscription`);
            return false;
        }

        return data.ispro === true;
    } catch (error) {
        logger.error(`Errore generico del Server - checkSubscription: ${error.message || error}`);
        return null;
    }
};