import { supabaseAdmin } from '../../config/supabase.mjs';
import { submitPostToReddit } from './redditServices.mjs';
import logger from '../../config/logger.mjs';
import moment from 'moment-timezone';

export const scheduleRedditPosts = async () => {
    const nowUtc = moment().utc().format('YYYY-MM-DD HH:mm:00');
    try {
        const { data, error } = await supabaseAdmin
            .from('posts')
            .select('*')
            .eq('status', 'pending')
            .eq('date_time', nowUtc);

        if (error) {
            logger.error(`Errore nel recupero dei post da caricare dal DB - redditScheduler: ${error.message || error}`);
            return;
        }

        if (!data || data.length === 0) {
            logger.info('Nessun post da pubblicare in questo momento - redditScheduler');
            return;
        }

        for (const post of data) {
            const submit = await submitPostToReddit(post);
            if (submit) {
                logger.info(`Post con id: ${post.id} pubblicato con successo - redditScheduler`);
            } else {
                logger.error(`Errore nella pubblicazione del post con id: ${post.id} - redditScheduler`);
            }
        }

    } catch (error) {
        logger.error(`Errore generale del server durante la richiesta dei post con stato pending - redditScheduler: ${error.message || error}`);
        return;
    }
};