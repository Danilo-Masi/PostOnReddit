import supabase from '../../config/supabase.mjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const MESSAGE = {
    TOKEN_INVALID: 'Token mancante o non valido',
    DB_ERROR: 'Errore nel recupero dei dati dal DB',
    NO_ID_ERROR: 'Nessun utente trovato con l\'ID specificato',
    SUCCESS_MESSAGE: 'Dati recuperati correttamente',
    SERVER_ERROR: 'Errore generico del server',
}

export const retrieveData = async (req, res) => {

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

        let { data, error: dbError } = await supabase
            .from('profiles')
            .select('credits, email')
            .eq('id', decoded.id);

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