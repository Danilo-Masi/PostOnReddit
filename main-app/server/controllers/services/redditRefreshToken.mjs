import axios from "axios";
import logger from '../../config/logger.mjs';
import { supabaseAdmin } from '../../config/supabase.mjs';
import dotenv from 'dotenv';
dotenv.config();

export const refreshAccessToken = async (refresh_token, user_id) => {
    try {
        const response = await axios.post('https://www.reddit.com/api/v1/access_token', null, {
            params: {
                grant_type: 'refresh_token',
                refresh_token: refresh_token,
            },
            auth: {
                username: process.env.REDDIT_CLIENT_ID,
                password: process.env.REDDIT_CLIENT_SECRET,
            },
            headers: {
                'User-Agent': 'web:postonreddit:v1.0.0 (by /u/WerewolfCapital4616)',
            }
        });

        const newAccessToken = response.data.access_token;
        const newExpiry = new Date();
        newExpiry.setSeconds(newExpiry.getSeconds() + response.data.expires_in);

        await supabaseAdmin
            .from('reddit_tokens')
            .update({ access_token: newAccessToken, token_expiry: newExpiry })
            .eq('user_id', user_id);

        logger.info('access_token di Reddit aggiornato - redditRefreshToken');
        return newAccessToken;

    } catch (error) {
        logger.error(`Errore durante il refresh dell\'access_token di Reddit - redditRefreshToken: ${error.message || error}`);
        throw new Error(MESSAGES.REFRESH_ERROR);
    }
};