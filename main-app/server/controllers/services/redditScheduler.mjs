import supabase from '../../config/supabase.mjs';
import logger from '../../config/logger.mjs';
import { submitPostToReddit } from './redditServices.mjs';
import moment from 'moment-timezone';

export const scheduleRedditPosts = async () => {

    const receivedTimeInItalianTimeZone = moment().tz('Europe/Rome'); 

    const nowUtc = receivedTimeInItalianTimeZone.utc().format('YYYY-MM-DD HH:mm:ss+00'); 
    
    logger.info(`Orario corrente in Europe/Rome: ${nowUtc}`);
    logger.info(`Orario corrente in UTC: ${nowUtc}`);

    // Crea un timestamp UTC nel formato 'YYYY-MM-DD HH:MI:SS+00'
    /*const nowUtc = new Date();
    nowUtc.setSeconds(0, 0);
    const nowUtcFormatted = nowUtc.toISOString().replace('T', ' ').slice(0, 19) + '+00';*/

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
        logger.info(`Post recuperati alle ${nowUtcFormatted}}: []`);
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