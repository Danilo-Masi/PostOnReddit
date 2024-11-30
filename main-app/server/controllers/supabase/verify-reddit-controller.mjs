import supabase from '../../config/supabase.mjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const MESSAGE = {
    TOKEN_INVALID: 'Token mancante o non valido',
    DB_ERROR: 'Errore nel recupero dei dati dal DB',
    NO_ID_ERROR: 'Nessun utente trovato con l\'ID specificato',
    SERVER_ERROR: 'Errore generico del server',
}

export const checkRedditAuthorization = async (req, res) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.error('BACKEND: Token mancante o non valido');
        return res.status(401).json({
            message: MESSAGE.TOKEN_INVALID,
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        let { data, error: dbError } = await supabase
            .from('reddit_tokens')
            .select('access_token')
            .eq('user_id', userId);

        // Gestisce gli errori derivanti dalla chiamata al DB
        if (dbError) {
            console.error('BACKEND: Errore durante la verifica del token di reddit nel DB', dbError.message);
            return res.status(500).json({
                message: MESSAGE.DB_ERROR,
                error: dbError.message,
            });
        }

        if (data || data.length > 0) {
            return res.json({ isAuthorized: true });
        } else {
            return res.json({ isAuthorized: false });
        }

    } catch (error) {
        console.error('BACKEND: Errore generico del server', error.message);
        return res.status(500).json({
            message: MESSAGE.SERVER_ERROR,
            error: error.message,
        });
    }
}