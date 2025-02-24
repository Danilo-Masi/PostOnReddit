import { supabaseAdmin } from '../../config/supabase.mjs';
import logger from '../../config/logger.mjs';

const MESSAGES = {
    SUPABASE_ERROR: 'Errore durante l\'eliminazione dei post da Supabase',
    SUCCESS_VOID: 'Nessun post da eliminare',
    SUCCESS: 'Post eliminati con successo',
    SERVER_ERROR: 'Errore generico del Server durante l\'eliminazione dei post dal Server',
}

export const deletePostedPosts = async (req, res) => {
    try {
        const { data, error } = await supabaseAdmin
            .from('posts')
            .delete()
            .eq('status', 'posted')
            .select('*');

        if (error) {
            logger.error(`Errore nell'eliminazione dei post: ${error.message}`);
            return res.status(500).json({ message: MESSAGES.SUPABASE_ERROR });
        }

        if (!data || data.length === 0) {
            logger.info('Nessun post da eliminare.');
            return res.status(200).json({ message: MESSAGES.SUCCESS_VOID });
        }

        logger.info(`Eliminati ${data.length} post con successo.`);
        return res.status(200).json({ message: MESSAGES.SUCCESS });

    } catch (error) {
        logger.error(`Errore generale durante l'eliminazione dei post: ${error.message}`);
        return res.status(500).json({ message: MESSAGES.SERVER_ERROR });
    }
};