import cron from 'node-cron';
import supabase from '../config/supabase.mjs';

const deletePostedPosts = async () => {
    const nowUtc = new Date().toISOString().slice(0, 19) + 'Z';  // Imposta la data e ora in formato UTC

    console.log(`Controllo i post con status "posted" da eliminare: ${nowUtc}`); // LOG

    let { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('status', 'posted');

    if (error) {
        console.error("BACKEND: Errore nel recupero dei post da DB: ", error.message);
        return;
    }

    console.log("Post da eliminare: ", data); // LOG

    for (let post of data) {
        let { error: deleteError } = await supabase
            .from('posts')
            .delete()
            .eq('id', post.id);

        if (deleteError) {
            console.error(`Errore nell'eliminazione del post con id: ${post.id}`, deleteError.message);
        } else {
            console.log(`Post con id: ${post.id} eliminato con successo`);
        }
    }
};

// Esegui il controllo ogni giorno a mezzanotte 
cron.schedule('0 0 * * *', deletePostedPosts); 