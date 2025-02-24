import { supabaseAdmin } from '../../config/supabase.mjs';
import logger from '../../config/logger.mjs';
import { submitPostToReddit } from './redditServices.mjs';
import moment from 'moment-timezone';

const MESSAGES = {
    SUPABASE_ERROR: 'Errore durante il recupero dei post da Supabase',
    SERVER_ERROR: 'Errore generico del server durante la richiesta dei post con stato pending',
    SUCCESS_VOID: 'Nessun post da pubblicare',
    SUCCESS: 'Post pubblicati con successo',
};

export const scheduleRedditPosts = async (req, res) => {
    const nowUtc = moment().utc().format('YYYY-MM-DD HH:mm:00');

    try {
        const { data, error } = await supabaseAdmin
            .from('posts')
            .select('*')
            .eq('status', 'pending')
            .eq('date_time', nowUtc);

        if (error) {
            logger.error(`Errore nel recupero dei post da caricare dal DB: ${error.message}`);
            return res.status(500).json({ message: MESSAGES.SUPABASE_ERROR });
        }

        if (!data || data.length === 0) {
            logger.info('Nessun post da pubblicare in questo momento.');
            return res.status(200).json({ message: MESSAGES.SUCCESS_VOID });
        }

        for (const post of data) {
            const submit = await submitPostToReddit(post);
            if (submit) {
                logger.info(`Post con id: ${post.id} pubblicato con successo`);
            } else {
                logger.error(`Errore nella pubblicazione del post con id: ${post.id}`);
            }
        }

        return res.status(200).json({ message: MESSAGES.SUCCESS });

    } catch (error) {
        logger.error('Errore generale del server durante la richiesta dei post con stato pending:', error);
        return res.status(500).json({ message: MESSAGES.SERVER_ERROR });
    }
};