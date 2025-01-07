import supabase from '../../config/supabase.mjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Messaggi di errore e successo
const MESSAGE = {
    TOKEN_INVALID: 'Token mancante o non valido',
    DB_ERROR: 'Errore nel recupero dei dati dal DB',
    NO_ID_ERROR: 'Nessun utente trovato con l\'ID specificato',
    SUCCESS_MESSAGE: 'Dati recuperati correttamente',
    SERVER_ERROR: 'Errore generico del server',
}

// Funzione per decodificare il token
const decodeToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error('BACKEND: Token non valido', error.message);
        return;
    }
}

// Funzione principale
export const retrieveData = async (req, res) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.error('BACKEND: Token mancante o non valido');
        return res.status(401).json({
            message: MESSAGE.TOKEN_INVALID,
        });
    }

    const decoded = decodeToken(token);
    if (!decoded) {
        return res.status(401).json({
            message: MESSAGE.TOKEN_INVALID,
        });
    }

    const user_id = decoded.id;

    try {
        let { data, error: dbError } = await supabase
            .from('profiles')
            .select('credits, email')
            .eq('id', user_id);

        if (dbError) {
            console.error('BACKEND: Errore nel recupero dei dati dal DB', dbError.message);
            return res.status(500).json({
                message: MESSAGE.DB_ERROR,
                error: dbError.message,
            });
        }

        if (!data || data.length === 0) {
            console.error('BACKEND: Nessun utente trovato con questo ID');
            return res.status(404).json({
                message: MESSAGE.NO_ID_ERROR
            });
        }

        if (data && data.length > 0) {
            return res.status(200).json({
                message: MESSAGE.SUCCESS_MESSAGE,
                data: data[0],
            });
        }

    } catch (error) {
        console.error('BACKEND: Errore generico del server', error.message);
        return res.status(500).json({
            message: MESSAGE.SERVER_ERROR,
            error: error.message,
        });
    }
}