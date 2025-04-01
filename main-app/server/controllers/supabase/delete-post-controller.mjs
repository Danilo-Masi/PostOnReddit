import { supabaseAdmin } from '../../config/supabase.mjs';
import logger from '../../config/logger.mjs';

export const deletePost = async (req, res) => {
    const { post_id } = req.body;
    if (!post_id) {
        logger.error('Id del post non presente o non valido - delete-post-controller');
        return res.status(400).end();
    }

    try {
        let { error } = await supabaseAdmin
            .from('posts')
            .delete()
            .eq('id', post_id);

        if (error) {
            logger.error(`Errore generico di Supabase durante la cancellazione del post dal DB - delete-post-controller: ${error.message || error}`);
            return res.status(401).end();
        }

        res.status(200).end();

    } catch (error) {
        logger.error(`Errore generico del Server - delete-post-controller: ${error.message || error}`);
        return res.status(500).end();
    }
}