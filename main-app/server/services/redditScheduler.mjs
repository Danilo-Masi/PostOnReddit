import cron from 'node-cron';
import supabase from '../config/supabase.mjs';
import logger from '../config/logger.mjs';
import { submitPostToReddit } from './redditServices.mjs';

const scheduleRedditPosts = async () => {

    const nowUtc = new Date().toISOString().slice(0, 19) + 'Z';

    let { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('status', 'pending')
        .eq('date_time', nowUtc);

    if (error) {
        logger.error('Errore nel recupero dei post da caricare dal DB', error.message);
        return;
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

cron.schedule('* * * * *', scheduleRedditPosts);