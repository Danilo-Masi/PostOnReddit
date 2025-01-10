import supabase from '../../config/supabase.mjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const MESSAGES = {
    CREDENTIAL_ERROR: "Credenziali non valide",
    SUPABASE_ERROR: "Errore di Supabase durante la fase di accesso",
    SUCCESS_MESSAGE: "Accesso avvenuto con successo",
    SERVER_ERROR: "Errore generico del server",
};

export const loginController = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        console.error('BACKEND: Credenziali non valide');
        return res.status(400).json({
            message: MESSAGES.CREDENTIAL_ERROR,
        });
    }

    try {
        let { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            console.error('BACKEND: Errore di Supabase durante la fase di accesso', error.stack);
            return res.status(401).json({
                message: MESSAGES.AUTH_ERROR_MESSAGE,
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
        console.error('BACKEND: Errore generico del server', error.stack);
        return res.status(500).json({
            message: MESSAGES.SERVER_ERROR,
        });
    }
}