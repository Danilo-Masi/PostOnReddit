import supabase from '../../config/supabase.mjs';
import logger from '../../config/logger.mjs';
import { submitPostToReddit } from './redditServices.mjs';
import moment from 'moment-timezone';

export const scheduleRedditPosts = async () => {

    const nowUtc = moment().utc().format('YYYY-MM-DD HH:mm:00');

    let { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('status', 'pending')
        .eq('date_time', nowUtc)

    if (error) {
        logger.error('Errore nel recupero dei post da caricare dal DB', error.message);
        return;
    }

    if (data.length === 0) {
        logger.info(`Post recuperati alle ${nowUtc}}: []`);
    }

    for (let post of data) {
        const submit = await submitPostToReddit(post);
        if (submit) {
            logger.info(`Post con id: ${post.id} pubblicato con successo`);
        } else {
            logger.error(`Errore nella pubblicazione del post con id: ${post.id}`);
        }
    }
};