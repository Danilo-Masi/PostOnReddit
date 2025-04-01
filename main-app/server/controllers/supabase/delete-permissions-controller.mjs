import { supabaseAdmin } from '../../config/supabase.mjs';
import logger from '../../config/logger.mjs';
import dotenv from 'dotenv';
dotenv.config();

export const deletePermissions = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const user_id = await validateToken(authHeader);

        let { error } = await supabaseAdmin
            .from('reddit_tokens')
            .delete()
            .eq('user_id', user_id);

        if (error) {
            logger.error(`Errore generico di Supabase durante il cancellamento del access_token dal DB - delete-permissions-controller: ${error.message || error}`);
            return res.status(401).end();
        }

        return res.status(200).end();

    } catch (error) {
        logger.error(`Errore generico del Server - delete-permissions-controller: ${error.message || error}`);
        return res.status(500).end();
    }
}