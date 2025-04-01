import { supabaseUser } from '../../config/supabase.mjs';
import logger from '../../config/logger.mjs';

export const decodeToken = async (token) => {
    try {
        const { data: user, error } = await supabaseUser.auth.getUser(token);
        if (error) {
            logger.error(`Errore durante la decodifica del token Supabase - decodeToken: ${error.message || error}`);
            return null;
        }
        /*const expirationTime = user?.user?.session?.expires_at * 1000;
        logger.info(`TIME: ${expirationTime}`);
        if (expirationTime && Date.now() > expirationTime - 5 * 60 * 1000) {
            logger.info(`Token in scandeza, tendando il rinnovo... - decodeToken`);
            const { data: session, error: refreshError } = await supabaseUser.auth.refreshSession();
            if (refreshError) {
                logger.error(`Errore durante il rinnovo del token - decodeToken: ${refreshError.message || refreshError}`);
                return null;
            }
            return session?.user || null;
        }*/
        return user;
    } catch (error) {
        logger.error(`Errore imprevisto nella decodifica del token di Supabase - decodeToken: ${error.message || error}`);
        return null;
    }
};