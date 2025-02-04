import supabase from '../../config/supabase.mjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import logger from '../../config/logger.mjs';

dotenv.config();

const MESSAGES = {
    CREDENTIAL_ERROR: "Credenziali non valide",
    SUPABASE_ERROR: "Errore di Supabase durante la fase di registrazione",
    SUCCESS_MESSAGE: "Registrazione avvenuta con successo",
    SERVER_ERROR: "Errore generico del server",
};

export const registrationController = async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        logger.error('Credenzili non valide');
        return res.status(400).json({
            error: MESSAGES.CREDENTIAL_ERROR,
        });
    }

    try {
        let { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: { name: name }
            }
        });

        if (error) {
            logger.error('Errore generico di Supabase durante la fase di Registrazione: ', error.cause);
            return res.status(401).json({
                message: MESSAGES.SUPABASE_ERROR,
            });
        }

        const token = jwt.sign(
            { id: data.user.id, email: data.user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.status(200).json({
            message: MESSAGES.SUCCESS_MESSAGE,
            token,
        });

    } catch (error) {
        logger.error('Errore generico del Server: ', error.cause);
        return res.status(500).json({
            message: MESSAGES.SERVER_ERROR,
        });
    }
};