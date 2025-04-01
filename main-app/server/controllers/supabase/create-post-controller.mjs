import { supabaseAdmin } from '../../config/supabase.mjs';
import Joi from 'joi';
import logger from '../../config/logger.mjs';
import { validateToken } from '../services/validateToken.mjs';
import dotenv from 'dotenv';
dotenv.config();

// Funzione per validare i dati in ingresso
const validatePostData = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(1).max(300).required(),
        content: Joi.string().required(),
        community: Joi.string().min(1).required(),
        flair: Joi.string().allow(null, ''),
        date_time: Joi.date().required(),
    });
    return schema.validate(data);
};

export const createPost = async (req, res) => {
    // Validazione del token
    const authHeader = req.headers['authorization'];
    const user_id = await validateToken(authHeader);

    const { title, content, community, flair } = req.body;
    let date_time = req.body.date_time;

    // Converte la data dall'orario dell'utente a UTC
    let parsedDate = new Date(date_time);
    if (isNaN(parsedDate.getTime())) {
        logger.error('Data non valida - create-post-controller');
        return res.status(400).end();
    }
    parsedDate.setMilliseconds(0);
    date_time = parsedDate.toISOString();

    // Validazione dei dati in ingresso
    const { error } = validatePostData({ title, content, community, flair, date_time });
    if (error) {
        logger.error(`Dati non validi - create-post-controller: ${error.details[0].message}`);
        return res.status(400).json({ details: error.details[0].message });
    }

    try {
        const { data, error } = await supabaseAdmin
            .from('posts')
            .insert([{ user_id, title, content, community, flair, date_time, status: 'pending' }])
            .select();

        if (error) throw error;

        return res.status(200).end();

    } catch (error) {
        logger.error(`Errore Supabase - create-post-controller: ${error.message}`);
        return res.status(500).end();
    }
}