import axios from "axios";
import { supabaseAdmin } from '../../config/supabase.mjs';
import dotenv from 'dotenv';
import TurndownService from 'turndown';
import logger from '../../config/logger.mjs';
import { getRedditAccessToken } from "./redditToken.mjs";

dotenv.config();

// Funzione per convertire HMTL in Markdown
const turndownService = new TurndownService();
const convertHTMLtoMarkdown = (html) => {
    return turndownService.turndown(html);
}

// Funzione per aggiornare lo stato del post nel database
const updatePostStatus = async (post_id, status) => {
    try {
        const { error } = await supabaseAdmin
            .from('posts')
            .update({ status: status })
            .eq('id', post_id);

        if (error) {
            logger.info(`Errore durante l'aggiornamento dello stato del post ${post_id}: ${error.message}`);
            return false;
        }
        return true;
    } catch (error) {
        logger.info(`Errore imprevisto nella modifica dello stato del post ${post_id}: ${error.message || error}`);
        return false;
    }
}

// Funzione per pubblicare un post su Reddit
export const submitPostToReddit = async (post) => {

    logger.info(`Dati del post: ${post}`);
    logger.info(`Post user_id: ${post.user_id}`);

    try {
        const access_token = await getRedditAccessToken(post.user_id);
        if (!access_token) return updatePostStatus(post.id, 'failed');

        const postData = {
            api_type: 'json',
            sr: post.community,
            title: post.title,
            text: convertHTMLtoMarkdown(post.content) || '',
            kind: 'self',
            sendreplies: true,
        }

        if (post.flair?.trim()) {
            postData.flair_id = post.flair;
        }

        const response = await axios.post('https://oauth.reddit.com/api/submit', postData, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'User-Agent': 'web:postonreddit:v1.0.0 (by /u/WerewolfCapital4616)',
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });

        return updatePostStatus(post.id, response.status === 200 ? 'posted' : 'failed');

    } catch (error) {
        logger.error(`Errore pubblicando il post ${post.id}: ${error.message || error}`);
        return updatePostStatus(post.id, 'failed');
    }
}