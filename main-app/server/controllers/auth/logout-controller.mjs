import supabase from '../../config/supabase.mjs';
import dotenv from 'dotenv';

dotenv.config();

// Messaggi di errore e successo
const MESSAGES = {
    AUTH_ERROR_MESSAGE: "Errore di Supabase durante la fase di logout",
    SUCCESS_MESSAGE: "Logout avvenuto con successo",
    SERVER_ERROR_MESSAGE: "Errore generico del server",
};

// Funzione principale
export const logoutController = async (req, res) => {
    try {
        
        let { error } = await supabase.auth.signOut();

        if (error) {
            console.error('BACKEND: Errore di Supabase durante la fase di logout', error.message);
            return res.status(400).json({
                error: MESSAGES.AUTH_ERROR_MESSAGE,
                details: error.message,
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