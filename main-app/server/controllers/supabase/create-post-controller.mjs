import supabase from '../../config/supabase.mjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const MESSAGE = {
    TOKEN_INVALID: 'Token mancante o non valido',
    DB_ERROR: 'Errore nel recupero dei dati dal DB',
    NO_ID_ERROR: 'Nessun utente trovato con l\'ID specificato',
    SUCCESS_MESSAGE: 'Post programmato correttamente',
    SERVER_ERROR: 'Errore generico del server',
}


export const createPost = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.error('BACKEND: Token mancante o non valido');
        return res.status(401).json({
            message: MESSAGE.TOKEN_INVALID,
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user_id = decoded.id;

        console.log(user_id);
        

        const { title, content, community, flair, date_time } = req.body;

        //VALIDAZIONE

        let { data, error } = await supabase
            .from('posts')
            .insert([
                {
                    user_id,
                    title,
                    content,
                    community,
                    flair,
                    date_time,
                    status: 'scheduled',
                },
            ])
            .select();

        if (error) {
            console.error("BACKEND: SUPABASE ERROR", error.message);
            return res.status(500).json({
                message: MESSAGE.DB_ERROR,
            });
        }

        return res.status(200).json({
            message: MESSAGE.SUCCESS_MESSAGE,
            post: data[0],
        });
    } catch (error) {
        console.error("BACKEDN: Generic error", error.message);
        return res.status(500).json({
            message: MESSAGE.SERVER_ERROR,
        });
    }
}