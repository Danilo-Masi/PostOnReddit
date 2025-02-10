import supabase from '../../config/supabase.mjs';
import logger from '../../config/logger.mjs';

export const deletePostedPosts = async () => {
    // Data con lo stesso fuso orario del DB
    const nowUtc = new Date().toISOString().slice(0, 19) + 'Z';
    
    try {
        let { data, error } = await supabase
            .from('posts')
            .delete()
            .eq('status', 'posted')
            .select('*');

        if (error) {
            throw new Error(error.message);
        }

        if (!data || data.length === 0) {
            logger.info(`Nessun post da eliminare`);
            return;
        }

        logger.info(`Eliminati ${data.length} post con successo`);

    } catch (error) {
        logger.error("Errore nell'eliminazione dei post: ", error.message);

    }
};
