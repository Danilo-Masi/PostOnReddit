import { supabaseAdmin } from '../../config/supabase.mjs';
import logger from '../../config/logger.mjs';

export const getRedditAccessToken = async (user_id) => {
    try {
        const { data, error } = await supabaseAdmin
            .from('reddit_tokens')
            .select('access_token')
            .eq('user_id', user_id)
            .single();

        logger.info(`Data: ${data}`);
        logger.info(`Access_token: ${data.access_token}`);

        if (error || data?.access_token) {
            logger.error(`Errore recuperando l'acess_token per user_id ${user_id}: ${error.message || error}`);
            return null;
        }
        return data.access_token;
    } catch (error) {
        logger.error(`Errore imprevisto recuperando l'access_token per user_id ${user_id}: ${error.message || error}`);
        return null;
    }
}