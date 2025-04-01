import { supabaseAdmin } from '../../config/supabase.mjs';
import logger from '../../config/logger.mjs';
import dotenv from 'dotenv';
import { validateToken } from '../services/validateToken.mjs';
dotenv.config();

export const retrievePosts = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const user_id = await validateToken(authHeader);

        let { data, error } = await supabaseAdmin
            .from('posts')
            .select('*')
            .eq('user_id', user_id);

        if (error) {
            logger.error(`Errore generico di Supabase durante il recupero dei post dal DB - retrive-posts-controller: ${error.message || error}`);
            return res.status(401).end();
        }

        return res.status(200).json({
            posts: data,
        });

    } catch (error) {
        logger.error(`Errore generico del Server - retrive-posts-controller: ${error.message || error}`);
        return res.status(500).end();
    }
}