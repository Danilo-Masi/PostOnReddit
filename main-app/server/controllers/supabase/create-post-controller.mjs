import supabase from '../../config/supabase.mjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

// Messaggi di errore e successo
const MESSAGE = {
    NO_TOKEN: 'Token mancante',
    TOKEN_INVALID: 'Token non valido',
    DB_ERROR: 'Errore nel caricamento dei dati sul DB',
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

// Funzione per decodificare il token
const decodeToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error('BACKEND: Token non valido', error.message);
        return;
    }
}

// Funzione principale
export const createPost = async (req, res) => {
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.error('BACKEND: Token mancante');
        return res.status(401).json({
            message: MESSAGE.NO_TOKEN,
        });
    }

    const decoded = decodeToken(token);
    if (!decoded) {
        return res.status(401).json({
            message: MESSAGE.TOKEN_INVALID,
        });
    }

    const user_id = decoded.id;

    const { title, content, community, flair, date_time } = req.body;

    const { error } = validatePostData({ title, content, community, flair, date_time });
    if (error) {
        console.error('BACKEND: Dati non validi', error.message);
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    try {
        let { data, error: dbError } = await supabase
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

        if (dbError) {
            console.error("BACKEND: Errore nel caricamento dei dati su DB", dbError.message);
            return res.status(500).json({
                message: MESSAGE.DB_ERROR,
            });
        }

        return res.status(200).json({
            message: MESSAGE.SUCCESS_MESSAGE,
        });

    } catch (error) {
        console.error("BACKEDN: Errore generico del server", error.message);
        return res.status(500).json({
            message: MESSAGE.SERVER_ERROR,
        });
    }
}