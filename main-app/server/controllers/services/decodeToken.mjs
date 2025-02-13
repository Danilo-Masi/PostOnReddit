import supabase from '../../config/supabase.mjs';
import logger from '../../config/logger.mjs';

export const decodeToken = async (token) => {
    try {
        const { data: user, error } = await supabase.auth.getUser(token);
        if (error) {
            logger.error('Errore durante la decodifica del token Supabase: ', error.message);
            return null;
        }
        return user;
    } catch (error) {
        logger.error('Errore imprevisto nella decodifica del token di Supabase: ', error.message);
        return null;
    }
};