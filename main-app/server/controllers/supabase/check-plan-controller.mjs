import logger from '../../config/logger.mjs';
import { supabaseAdmin } from '../../config/supabase.mjs';
import { validateToken } from '../services/validateToken.mjs';
import dotenv from 'dotenv';
dotenv.config();

export const checkPlan = async (req, res) => {
    try {
        // Validazione del token
        const authHeader = req.headers['authorization'];
        const user_id = await validateToken(authHeader);

        let { data, error } = await supabaseAdmin
            .from('profiles')
            .select('ispro')
            .eq('id', user_id)
            .single();

        if (error) {
            logger.error(`Errore durante il recupero dei dati - check-plan-controller: ${error.message || error}`);
            return res.status(500).end();
        }

        if (!data) {
            logger.error(`Nessun piano trovato per l'utente con ID ${user_id} - check-plan-controller`);
            return res.status(404).end();
        }

        return res.status(200).json({
            isPro: data.ispro,
        });
    } catch (error) {
        logger.error(`Errore generico del Server - check-plan-controller: ${error.message || error}`);
        return res.status(500).end();
    }
};