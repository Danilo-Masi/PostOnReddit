import { supabaseAdmin } from '../../config/supabase.mjs';
import logger from '../../config/logger.mjs';
import { decodeToken } from '../../controllers/services/decodeToken.mjs';
import dotenv from 'dotenv';

dotenv.config();

const MESSAGES = {
    MISSING_TOKEN: 'Token mancante',
    INVALID_TOKEN: 'Token non valido',
    SUPABASE_ERROR: 'Errore generico di Supabase durante il cancellamento dei permessi',
    SUCCESS_MESSAGE: 'Permessi annullati correttamente',
    SERVER_ERROR: 'Errore generico del server',
}

export const deletePermissions = async (req, res) => {

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
        let { error } = await supabaseAdmin
            .from('reddit_tokens')
            .delete()
            .eq('user_id', user_id);

        if (error) {
            logger.error('Errore generico di Supabase durante il cancellamento del access_token dal DB: ' + error.message);
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
}