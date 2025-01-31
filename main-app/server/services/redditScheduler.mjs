import cron from 'node-cron';
import supabase from '../config/supabase.mjs';
import { submitPostToReddit } from './redditServices.mjs';

const scheduleRedditPosts = async () => {

    const nowUtc = new Date().toISOString().slice(0, 19) + 'Z';

    console.log(`Controllo i post delle: ${nowUtc}`); //LOG

    let { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('status', 'pending')
        .eq('date_time', nowUtc);

    if (error) {
        console.error("BACKEND: Errore nel recupero dei post da DB: ", error.message);
        return;
    }

    console.log("Post da pubblicare: ", data); //LOG

    for (let post of data) {
        console.log(`Pianificando il post: ${post.title}`);
        const submit = await submitPostToReddit(post);
        if (submit) {
            console.log(`Post con id: ${post.id} pubblicato con successo`);
        } else {
            console.log(`Errore nella pubblicazione del post con id: ${post.id}`);
        }
    }
};

// Esegui il controllo ogni minuto
cron.schedule('* * * * *', scheduleRedditPosts);