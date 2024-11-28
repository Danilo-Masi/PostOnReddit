import supabase from '../config/supabase.mjs';
import dotenv from 'dotenv';

dotenv.config();

const MESSAGES = {
    AUTH_ERROR_MESSAGE: "Errore di Supabase durante la fase di logout",
    SUCCESS_MESSAGE: "Logout avvenuto con successo",
    SERVER_ERROR_MESSAGE: "Errore generico del server",
};

export const logoutController = async (req, res) => {
    try {

        let { error: authError } = await supabase.auth.signOut();

        if (authError) {
            console.error('BACKEND: Errore di Supabase durante la fase di logout', authError.message);
            return res.status(400).json({
                error: MESSAGES.AUTH_ERROR_MESSAGE,
                details: authError.message,
            });
        }

        return res.status(200).json({
            message: MESSAGES.SUCCESS_MESSAGE,
        });

    } catch (error) {
        console.error('BACKEND: Errore generico del server', error.message);
        return res.status(500).json({
            message: MESSAGES.SERVER_ERROR_MESSAGE,
            details: error.message,
        });
    }
}