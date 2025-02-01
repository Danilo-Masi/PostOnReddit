import supabase from '../../config/supabase.mjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Joi from 'joi';
import axios from "axios";

dotenv.config();

const MESSAGES = {
    MISSING_TOKEN: 'Il token di autenticazione non è presente nell\'header della richiesta.',
    INVALID_TOKEN: 'Il token di autenticazione non è valido. Verifica la correttezza del token o la sua scadenza.',
    INVALID_DATA: 'I dati forniti per la creazione del post non soddisfano i requisiti definiti nel backend. Controlla la validità dei campi inviati.',
    INVALID_DATE: 'La data inserita non è valida. Verifica che il formato sia corretto e che la data sia una data futura.',
    SUPABASE_ERROR: 'Errore durante l\'interazione con Supabase. Controlla il log per maggiori dettagli sull\'errore durante il salvataggio dei dati nel DB.',
    SUCCESS_MESSAGE: 'Il post è stato programmato correttamente e inserito nel database.',
    SERVER_ERROR: 'Errore generico del server. Verifica il log per ulteriori dettagli sugli errori nel sistema o nella configurazione.',
    SUBREDDIT_REQUIREMENTS_ERROR: 'Errore nel recupero dei requisiti della subreddit tramite l\'API di Reddit. Verifica la connessione e la correttezza della richiesta.',
    REQUIREMENTS_ERROR: 'Errore nella creazione del post. Verifica che tutti i requisiti della subreddit siano stati soddisfatti (es. titolo, corpo del post).',
    REDDIT_ERROR: 'Errore nel recupero del token di accesso di Reddit. Verifica la connessione al database e la validità del token salvato.',
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
}

// Funzione ver verificare i requisiti della subreddit in cui si vuole postare
const checkSubredditPostRequirements = async (subreddit, access_token) => {
    try {
        const response = await axios.get(`https://oauth.reddit.com/api/v1/subreddit/post_requirements`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'User-Agent': 'web:postonreddit:v1.0.0 (by /u/WerewolfCapital4616)',
                'Content-Type': 'application/json',
            },
            params: {
                subreddit: subreddit,
            }
        });

        return response.data;

    } catch (error) {
        if (error.response) {
            console.error("BACKEND: Errore nel recupero dei requisiti della subreddit:", error.response.data);
            return res.status(400).json({
                message: MESSAGES.SUBREDDIT_REQUIREMENTS_ERROR,
                details: error.response.data,
            });
        } else {
            console.error("BACKEND: Errore di rete:", error.message);
            return res.status(500).json({
                message: MESSAGES.SERVER_ERROR,
            });
        }
    }
};

// Funzione di utilità per decodificare il token
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
    const { title, content, community, flair } = req.body;
    let date_time = req.body.date_time;

    // Controlla se la data è valida
    if (isNaN(new Date(date_time).getTime())) {
        return res.status(400).json({
            message: MESSAGES.INVALID_DATE,
        });
    }

    // Crea l'oggetto data e imposta i millisecondi a 0
    let parsedDate = new Date(date_time);
    parsedDate.setMilliseconds(0);

    // Converte la data nel formato desiderato senza millisecondi
    date_time = parsedDate.toISOString().slice(0, 19) + 'Z';

    // Validazione dei dati in ingresso
    const { error } = validatePostData({ title, content, community, flair, date_time });
    if (error) {
        console.error('BACKEND: I dati per la creazione del post non sono validi: ', error.stack);
        return res.status(400).json({
            message: MESSAGES.INVALID_DATA,
            details: error.details[0].message,
        });
    }

    // Recupero access_token di Reddit
    let access_token = "";
    try {
        let { data, error } = await supabase
            .from('reddit_tokens')
            .select('access_token')
            .eq('user_id', user_id)
            .single();

        if (error || !data) {
            console.error("BACKEND: Errore di Supabase durante il caricamento del reddit_token: ", error.stack);
            return res.status(401).json({
                message: MESSAGES.SUPABASE_ERROR,
            })
        }

        access_token = data.access_token;

    } catch (error) {
        console.error("BACKEDN: Errore nel recupero dell'access_token di Reddit");
        return res.status(500).json({
            message: MESSAGES.REDDIT_ERROR,
        });
    }

    // Verifica i requisiti della subreddit prima di procedere
    const requirements = await checkSubredditPostRequirements(community, access_token);
    if (!requirements) {
        console.error("BACKEND: Errore nel recupero dei requisiti della subreddit");
        return res.status(500).json({
            message: MESSAGES.SUBREDDIT_REQUIREMENTS_ERROR,
        });
    }

    const errors = [];

    const titleMinLength = requirements.title_text_min_length ?? 0; // Se è null/undefined, assegna 0
    const titleMaxLength = requirements.title_text_max_length ?? Infinity; // Se è null/undefined, assegna un valore infinito

    // Validazione del titolo
    if (Array.isArray(requirements.title_required_strings) &&
        requirements.title_required_strings.length > 0 &&
        !requirements.title_required_strings.some(str => title.includes(str))) {
        errors.push(`The title must contain one of the following words: ${requirements.title_required_strings.join(', ')}`);
    }

    if (title.length < titleMinLength) {
        errors.push(`The title must be at least ${titleMinLength} characters long.`);
    }

    if (title.length > titleMaxLength) {
        errors.push(`The title cannot exceed ${titleMaxLength} characters.`);
    }

    if (Array.isArray(requirements.title_blacklisted_strings) &&
        requirements.title_blacklisted_strings.some(str => title.includes(str))) {
        errors.push('The title contains forbidden words.');
    }

    // Validazione del body del post
    if (requirements.body_restriction_policy === 'notAllowed' && content) {
        errors.push('This subreddit does not allow post bodies.');
    }

    if (Array.isArray(requirements.body_blacklisted_strings) &&
        requirements.body_blacklisted_strings.some(str => content.includes(str))) {
        errors.push('The post body contains forbidden words.');
    }

    // Se ci sono errori, invia la risposta con tutti gli errori
    if (errors.length > 0) {
        return res.status(400).json({
            message: MESSAGES.REQUIREMENTS_ERROR,
            details: errors,
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
                    status: 'pending',
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