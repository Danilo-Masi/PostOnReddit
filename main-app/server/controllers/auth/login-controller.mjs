import { supabaseUser } from '../../config/supabase.mjs';
import logger from '../../config/logger.mjs';

export const loginController = async (req, res) => {
    const email = req.body.email?.trim();
    const password = req.body.password?.trim();

    if (!email || !password) {
        logger.error('Credenziali non valide - login-controller');
        return res.status(400).end();
    }

    try {
        let { data, error } = await supabaseUser.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error || !data?.session?.access_token) {
            logger.error(`Errore di Supabase - login-controller: ${error.message || error}`);
            return res.status(401).end();
        }

        return res.status(200).json({ token: data.session.access_token });

    } catch (error) {
        logger.error(`Errore generico del Server - login-controller: ${error.message || error}`);
        return res.status(500).end();
    }
}