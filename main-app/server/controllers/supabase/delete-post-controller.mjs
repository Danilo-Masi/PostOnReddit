import {supabaseUser} from '../../config/supabase.mjs';
import logger from '../../config/logger.mjs';

const MESSAGE = {
    INVALID_ID: 'Id non presente o non valido',
    SUPABASE_ERROR: 'Errore di Supabase durante la cancellazione del post',
    SUCCESS_MESSAGE: 'Post cancellato correttamente',
    SERVER_ERROR: 'Errore generico del server',
}

export const deletePost = async (req, res) => {
    const { post_id } = req.body;

    if (!post_id) {
        logger.error('Id del post non presente o non valido');
        return res.status(400).json({
            message: MESSAGE.INVALID_ID,
        });
    }

    try {
        let { error } = await supabaseUser
            .from('posts')
            .delete()
            .eq('id', post_id);

        if (error) {
            logger.error('Errore generico di Supabase durante la cancellazione del post dal DB: ', error.cause);
            return res.status(401).json({
                message: MESSAGE.SUPABASE_ERROR,
            });
        }

        res.status(200).json({
            message: MESSAGE.SUCCESS_MESSAGE,
        });

    } catch (error) {
        logger.error('Errore generico del Server: ', error.cause);
        return res.status(500).json({
            message: MESSAGE.SERVER_ERROR,
        });
    }
}