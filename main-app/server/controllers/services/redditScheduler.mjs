import supabase from '../../config/supabase.mjs';
import logger from '../../config/logger.mjs';
import { submitPostToReddit } from './redditServices.mjs';

export const scheduleRedditPosts = async () => {
    const nowUtc = new Date();
    const oneMinuteLater = new Date(nowUtc.getTime() + 60000);

    const nowUtcISO = nowUtc.toISOString().slice(0, 19) + 'Z';
    const oneMinuteLaterISO = oneMinuteLater.toISOString().slice(0, 19) + 'Z';

    let { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('status', 'pending')
        .gte('date_time', nowUtcISO)
        .lt('date_time', oneMinuteLaterISO);

    if (error) {
        logger.error('Errore nel recupero dei post da caricare dal DB', error.message);
        return;
    }

    if (data.length === 0) {
        logger.info(`Post recuperati tra ${nowUtcISO} e ${oneMinuteLaterISO}: []`);
    } else {
        logger.info(`Post recuperati tra ${nowUtcISO} e ${oneMinuteLaterISO}: ${JSON.stringify(data)}`);
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