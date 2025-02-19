import { supabaseUser } from '../../config/supabase.mjs';
import logger from '../../config/logger.mjs';

const MESSAGES = {
    MISSING_TOKEN: 'Token mancante',
    SUPABASE_ERROR: 'Errore generico di Supabase',
    SUCCESS_MESSAGE: 'Logout avvenuto con successo',
    SERVER_ERROR: 'Errore generico del server',
};

export const logoutController = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        logger.error('Token mancante');
        return res.status(400).json({
            message: MESSAGES.MISSING_TOKEN,
        });
    }

    try {
        let { error } = await supabaseUser.auth.signOut(token);

        if (error) {
            logger.error('Errore generico di Supabase durante la fase di Logout: ' + error.message);
            return res.status(401).json({
                message: MESSAGES.SUPABASE_ERROR,
            });
        }

        return res.status(200).json({
            message: MESSAGES.SUCCESS_MESSAGE,
        });

    } catch (error) {
        logger.error('Errore generico del Server: ' + error.message);
        return res.status(500).json({
            message: MESSAGES.SERVER_ERROR,
        });
    }
};