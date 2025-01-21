import axios from "axios";
import supabase from '../config/supabase.mjs';
import dotenv from 'dotenv';

dotenv.config();

export const submitPostToReddit = async (post) => {
    try {
        let { data, error } = await supabase
            .from('reddit_tokens')
            .select('access_token')
            .eq('user_id', post.user_id)
            .single();

        if (error || !data) {
            console.error('Errore nel recuperare il token di Reddit: ', error?.message || 'Token non trovato');
            return false;
        }

        const access_token = data.access_token;

        const postData = {
            api_type: 'json',
            sr: post.community,
            title: post.title,
            text: post.content.text || '',
            kind: post.content.kind || 'self',
            flair_id: post.flair || '',
            sendreplies: true,
        }

        const response = await axios.post('htttps://oauth.reddit.com/api/submit', postData, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'User-Agent': 'web:postonreddit:v1.0.0 (by /u/WerewolfCapital4616)',
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });

        if (response.data.json.errors.length === 0) {
            console.log(`Post ${post.title} pubblicato con successo su r/${post.community}`);
            await supabase
                .from('posts')
                .update({ status: 'posted' })
                .eq('id', post.id);
            return true;
        } else {
            console.error("BACKEND: Errore nella pubblicazione: ", response.data.json.errors);
            return false;
        }

    } catch (error) {
        console.error("BACKEND: Errore nell invio del post a Reddit: ", error.message);
        return false;
    }

}