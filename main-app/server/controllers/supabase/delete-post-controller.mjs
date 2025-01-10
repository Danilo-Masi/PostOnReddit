import supabase from "../../config/supabase.mjs"

const MESSAGE = {
    INVALID_ID: 'Id non presente o non valido',
    SUPABASE_ERROR: 'Errore di Supabase durante la cancellazione del post',
    SUCCESS_MESSAGE: 'Post cancellato correttamente',
    SERVER_ERROR: 'Errore generico del server',
}

export const deletePost = async (req, res) => {
    const { post_id } = req.body;

    if (!post_id) {
        console.error("BACKEND: ID non presente o non valido");
        return res.status(400).json({
            message: MESSAGE.INVALID_ID,
        });
    }

    try {
        let { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', post_id);

        if (error) {
            console.error("SERVER: Errore di Supabase durante la cancellazione del post: ", error.stack);
            return res.status(401).json({
                message: MESSAGE.SUPABASE_ERROR,
            });
        }

        res.status(200).json({
            message: MESSAGE.SUCCESS_MESSAGE,
        });

    } catch (error) {
        console.error("BACKEND: Errore generico del server: ", error.stack);
        return res.status(500).json({
            message: MESSAGE.SERVER_ERROR,
        });
    }
}