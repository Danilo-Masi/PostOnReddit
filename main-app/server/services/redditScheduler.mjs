import cron from 'node-cron';
import supabase from '../config/supabase.mjs';
import { submitPostToReddit } from './redditServices.mjs';

const scheduleRedditPosts = async () => {
    
    const nowUtc = new Date().toISOString().split('.')[0] + 'Z';

    console.log(`Controllo dei post in sospeso alle ${nowUtc} UTC`);

    let { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('status', 'pending')
        .lte('date_time', nowUtc);

    if (error) {
        console.error("BACKEND: Errore nel recupero dei post da DB: ", error.message);
        return;
    }

    console.log("DATA: ", data);

    if (data.length === 0) {
        console.log("Nessun post da pubblicare in attesa");
        return;
    }

    for (let post of posts) {
        console.log(`Pianificanod il post: ${post.title}`);
        const submit = await submitPostToReddit(post);
        if (submit) {
            console.log(`Post ${post.id} pubblicato con successo`);
        } else {
            console.log(`Errore nelal pubblicazione del post ${post.id}`);
        }
    }
};

// Esegui il controllo ogni minuto
cron.schedule('* * * * *', scheduleRedditPosts);