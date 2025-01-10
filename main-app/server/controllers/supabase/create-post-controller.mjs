import supabase from '../../config/supabase.mjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

const MESSAGES = {
    MISSING_TOKEN: 'Token mancante',
    INVALID_TOKEN: 'Token non valido',
    INVALID_DATA: 'I dati per la creazione del post non sono validi',
    SUPABASE_ERROR: 'Errore generico di Supabase durante il caricamento dei dati sul DB',
    SUCCESS_MESSAGE: 'Post programmato correttamente',
    SERVER_ERROR: 'Errore generico del server',
}

// Funzione per validare i dati in ingresso
const validatePostData = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(1).max(300).required(),
        content: Joi.object().required(),
        community: Joi.string().min(1).required(),
        flair: Joi.string().allow(null, ''),
        date_time: Joi.date().required(),
    });
    return schema.validate(data);
}

const decodeToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error('BACKEND: Token non valido', error.stack);
        return;
    }
}

export const createPost = async (req, res) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.error('BACKEND: Token mancante');
        return res.status(401).json({
            message: MESSAGES.MISSING_TOKEN,
        });
    }

    const decoded = decodeToken(token);
    if (!decoded) {
        return res.status(401).json({
            message: MESSAGES.TOKEN_INVALID,
        });
    }

    const user_id = decoded.id;
    const { title, content, community, flair, date_time } = req.body;

    const { error } = validatePostData({ title, content, community, flair, date_time });

    if (error) {
        console.error('BACKEND: I dati per la creazione del post non sono validi: ', error.stack);
        return res.status(400).json({
            message: MESSAGES.INVALID_DATA,
            details: error.details[0].message,
        });
    }

    try {
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
            console.error("BACKEND: Errore generico di Supabase durante il caricamento dei dati sul DB", error.stack);
            return res.status(500).json({
                message: MESSAGES.SUPABASE_ERROR,
            });
        }

        return res.status(200).json({
            message: MESSAGES.SUCCESS_MESSAGE,
        });

    } catch (error) {
        console.error("BACKEDN: Errore generico del server", error.stack);
        return res.status(500).json({
            message: MESSAGES.SERVER_ERROR,
        });
    }
}