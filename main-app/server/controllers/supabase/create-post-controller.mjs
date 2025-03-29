import { supabaseAdmin } from '../../config/supabase.mjs';
import { decodeToken } from '../../controllers/services/decodeToken.mjs';
import Joi from 'joi';
import logger from '../../config/logger.mjs';
import dotenv from 'dotenv';
dotenv.config();

const MESSAGES = {
    MISSING_TOKEN: 'Token mancante.',
    INVALID_TOKEN: 'Token non valido o scaduto.',
    INVALID_DATA: 'Dati non validi. Controlla i campi inviati.',
    INVALID_DATE: 'Data non valida o passata.',
    SUPABASE_ERROR: 'Errore nel salvataggio su Supabase.',
    SUCCESS_MESSAGE: 'Post programmato con successo.',
    SERVER_ERROR: 'Errore interno del server.',
    SUBREDDIT_REQUIREMENTS_ERROR: 'Errore nel recupero dei requisiti della subreddit.',
    REQUIREMENTS_ERROR: 'Requisiti subreddit non soddisfatti.',
    REDDIT_ERROR: 'Errore nel recupero del token Reddit.',
}

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

// Funzione principale per la creazione del post nel DB
export const createPost = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        logger.error('Autenticazione fallita: token mancante.');
        return res.status(401).json({ message: MESSAGES.MISSING_TOKEN });
    }

    const user = await decodeToken(token);
    if (!user) {
        logger.error('Autenticazione fallita: token non valido.');
        return res.status(400).json({ message: MESSAGES.INVALID_TOKEN });
    }
    const user_id = user.user.id;

    const { title, content, community, flair } = req.body;
    let date_time = req.body.date_time;

    // Converte la data dall'orario dell'utente a UTC
    let parsedDate = new Date(date_time);
    if (isNaN(parsedDate.getTime())) {
        logger.error('Data non valida.');
        return res.status(400).json({ message: MESSAGES.INVALID_DATE });
    }
    parsedDate.setMilliseconds(0);
    date_time = parsedDate.toISOString();

    // Validazione dei dati in ingresso
    const { error } = validatePostData({ title, content, community, flair, date_time });
    if (error) {
        logger.error(`Dati non validi: ${error.details[0].message}`);
        return res.status(400).json({
            message: MESSAGES.INVALID_DATA,
            details: error.details[0].message,
        });
    }

    try {
        const { data, error } = await supabaseAdmin
            .from('posts')
            .insert([{ user_id, title, content, community, flair, date_time, status: 'pending' }])
            .select();

        if (error) throw error;

        return res.status(200).json({ message: MESSAGES.SUCCESS_MESSAGE });

    } catch (error) {
        logger.error(`Errore Supabase: ${error.message}`);
        return res.status(500).json({ message: MESSAGES.SUPABASE_ERROR });
    }
}