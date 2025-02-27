import { supabaseUser } from '../../config/supabase.mjs';
import logger from '../../config/logger.mjs';

export const logoutController = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        logger.error('Token mancante - logout-controller');
        return res.status(400).end();
    }

    try {
        const { error } = await supabaseUser.auth.signOut(token);
        if (error) {
            logger.error(`Errore di Supabase - logout-controller: ${error.message || error}`);
            return res.status(401).end();
        }
        return res.status(200).end();

    } catch (error) {
        logger.error(`Errore generico del Server - logout-controller: ${error.message || error}`);
        return res.status(500).end();
    }
};