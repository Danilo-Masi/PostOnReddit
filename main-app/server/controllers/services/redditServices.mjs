import axios from "axios";
import { supabaseAdmin } from '../../config/supabase.mjs';
import dotenv from 'dotenv';
import TurndownService from 'turndown';
import logger from '../../config/logger.mjs';

dotenv.config();

// Funzione per convertire HMTL in Markdown
const turndowService = new TurndownService();
const convertHTMLtoMarkdown = (html) => {
    return turndowService.turndown(html);
}

const updatePostStatus = async (post_id, status) => {

    logger.info(post_id);
    logger.info(status);

    try {
        let { error } = await supabaseAdmin
            .from('posts')
            .update({ status: status })
            .eq('id', post_id);

        if (error) {
            logger.info(`Errore durante l'aggiornamento dello stato del post ${post_id}: ` + error);
            return false;
        }
        return true;
    } catch (error) {
        logger.info(`Errore imprevisto nella modifica dello stato del post ${post_id}: ` + error);
        return false;
    }
}

export const submitPostToReddit = async (post) => {
    try {
        let { data, error } = await supabaseAdmin
            .from('reddit_tokens')
            .select('access_token')
            .eq('user_id', post.user_id)
            .single();

        if (error || !data.access_token) {
            logger.error(`Errore nel recuper dell'access_token per user_id: ${post.user_id}: ` + error);
            return false;
        }

        const access_token = data.access_token;

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

        if (response.status !== 200) {
            return await updatePostStatus(post.id, 'failed');
        } else {
            return await updatePostStatus(post.id, 'posted');
        }

    } catch (error) {
        logger.error(`Errore generico nella pubblicazione del post con id: ${post.id}: ` + error);
        return false;
    }
}