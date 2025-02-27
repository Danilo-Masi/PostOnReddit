import { supabaseUser } from '../../config/supabase.mjs';
import logger from '../../config/logger.mjs';

export const registrationController = async (req, res) => {
    const name = req.body.name?.trim();
    const email = req.body.email?.trim();
    const password = req.body.password?.trim();

    if (!name || !email || !password) {
        logger.error('Credenziali non valide - registration-controller');
        return res.status(400).end();
    }

    try {
        const { data, error } = await supabaseUser.auth.signUp({
            email: email,
            password: password,
            options: {
                data: { name: name }
            }
        });

        if (error || !data?.session?.access_token) {
            logger.error(`Errore di Supabase - registration-controller: ${error.message || error}`);
            return res.status(401).end();
        }

        return res.status(200).json({ token: data.session.access_token });

    } catch (error) {
        logger.error(`Errore generico del Server - registration-controller: ${error.message || error}`);
        return res.status(500).end();
    }
};