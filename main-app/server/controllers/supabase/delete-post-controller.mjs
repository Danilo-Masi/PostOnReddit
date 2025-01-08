import supabase from "../../config/supabase.mjs"

// Messaggi di errore e successo
const MESSAGE = {
    NO_ID: 'Id non presente o non valido',
    DB_ERROR: 'Errore nel cancellamento del post da DB',
    SUCCESS_MESSAGE: 'Post cancellato correttamente',
    SERVER_ERROR: 'Errore generico del server',
}

export const deletePost = async (req, res) => {
    try {

        const { post_id } = req.body;

        if (!post_id) {
            return res.status(400).json({
                message: MESSAGE.NO_ID,
            });
        }

        let { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', post_id);

        if (error) {
            console.error("SERVER: Errore durante l'eliminazione del post", error.message);
            return res.status(500).json({
                message: MESSAGE.DB_ERROR,
            });
        }

        res.status(200).json({
            message: MESSAGE.SUCCESS_MESSAGE,
        });

    } catch (error) {
        console.error("BACKEND: Errore generico del server", error.message);
        return res.status(500).json({
            message: MESSAGE.SERVER_ERROR,
        });
    }
}