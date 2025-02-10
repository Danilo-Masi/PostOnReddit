import axios from "axios";
import supabase from '../config/supabase.mjs';
import dotenv from 'dotenv';
import TurndownService from 'turndown';
import logger from "../config/logger.mjs";

dotenv.config();

// Funzione per convertire HMTL in Markdown
const turndowService = new TurndownService();
const convertHTMLtoMarkdown = (html) => {
    return turndowService.turndown(html);
}

export const submitPostToReddit = async (post) => {
    try {
        let { data, error } = await supabase
            .from('reddit_tokens')
            .select('access_token')
            .eq('user_id', post.user_id)
            .single();

        if (error || !data) {
            logger.error(`Errore nel recupero del token di accesso di Reddit`, error.message);
            return;
        }

        const access_token = data.access_token;

        const postData = {
            api_type: 'json',
            sr: post.community,
            title: post.title,
            text: convertHTMLtoMarkdown(post.content) || '',
            kind: 'self',
            flair_id: post.flair,
            sendreplies: true,
        }

        // Aggiungi flair_id solo se è definito e non è una stringa vuota
        if (post.flair && post.flair.trim() !== '') {
            postData.flair_id = post.flair;
        }

        const response = await axios.post('https://oauth.reddit.com/api/submit', postData, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'User-Agent': 'web:postonreddit:v1.0.0 (by /u/WerewolfCapital4616)',
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });

        if (response.data.json.errors.length === 0) {
            await supabase
                .from('posts')
                .update({ status: 'posted' })
                .eq('id', post.id);
            return true;
        } else {
            logger.error("Errore nella pubblicazione del post: ", response.data.json.errors);
            await supabase
                .from('posts')
                .update({ status: 'failed' })
                .eq('id', post.id);
            return false;
        }

    } catch (error) {
        logger.error("Errore generale nella pubblicazione del post su Reddit: ", error.message);
        return false;
    }

}