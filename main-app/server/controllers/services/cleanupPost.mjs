import { supabaseAdmin } from '../../config/supabase.mjs';
import logger from '../../config/logger.mjs';

export const deletePostedPosts = async () => {
    try {
        const { data, error } = await supabaseAdmin
            .from('posts')
            .delete()
            .eq('status', 'posted')
            .select('*');

        if (error) {
            logger.error(`Errore nell'eliminazione dei post - cleanupPost: ${error.message || error}`);
            return;
        }

        if (!data || data.length === 0) {
            logger.info('Nessun post da eliminare - cleanupPost');
            return;
        }

        logger.info(`Eliminati ${data.length} post con successo - cleanupPost`);

    } catch (error) {
        logger.error(`Errore generale durante l'eliminazione dei post - cleanupPost: ${error.message || error}`);
        return;
    }
};