import supabase from '../../config/supabase.mjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const MESSAGES = {
    VALIDATION_ERROR_MESSAGE: "Valori della richiesta non validi",
    AUTH_ERROR_MESSAGE: "Errore di Supabase durante la fase di registrazione",
    DB_ERROR_MESSAGE: "Errore durante l\'inserimento dei dati nel DB di Supabase",
    SUCCESS_MESSAGE: "Registrazione avvenuta con successo",
    SERVER_ERROR_MESSAGE: "Errore generico del server",
};

export const registrationController = async (req, res) => {

    const { name, email, password } = req.body;

    // Verifica dei dati passati nella richiesta
    if (!name || !email || !password) {
        console.error('BACKEND: Valori della richiesta non validi');
        return res.status(400).json({
            error: MESSAGES.VALIDATION_ERROR_MESSAGE,
        });
    }

    try {

        // Registra l'utente con l'autenticazione di Supabase
        let { data, error: authError } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: { name: name }
            }
        });

        if (authError) {
            console.error('BACKEND: Errore di Supabase durante la fase di registrazione', authError.message);
            return res.status(401).json({
                error: MESSAGES.AUTH_ERROR_MESSAGE,
                details: authError.message,
            });
        }

        // Genera il token JWT
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
        console.error('BACKEND: Errore generico del server', error.message);
        return res.status(500).json({
            message: MESSAGES.SERVER_ERROR_MESSAGE,
            details: error.message,
        });
    }
};