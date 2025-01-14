import supabase from '../../config/supabase.mjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const MESSAGE = {
    MISSING_TOKEN: 'Token mancante',
    INVALID_TOKEN: 'Token non valido',
    SUPABASE_ERROR: 'Errore generico di Supabase durante il cancellamento dei permessi',
    SUCCESS_MESSAGE: 'Permessi annullati correttamente',
    SERVER_ERROR: 'Errore generico del server',
}

const decodeToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error('BACKEND: Token non valido', error.message);
        return;
    }
}

export const deletePermissions = async (req, res) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.error('BACKEND: Token mancante');
        return res.status(400).json({
            message: MESSAGE.MISSING_TOKEN,
        });
    }

    const decoded = decodeToken(token);
    if (!decoded) {
        return res.status(400).json({
            message: MESSAGE.INVALID_TOKEN,
        });
    }

    const user_id = decoded.id;

    try {
        let { error } = await supabase
            .from('reddit_tokens')
            .delete()
            .eq('user_id', user_id);

        if (error) {
            console.log("BACKEND: Errore generico di Supabase durante il cancellamento dei permessi: ", error.stack);
            return res.status(401).json({
                message: MESSAGE.SUPABASE_ERROR,
            });
        }

        return res.status(200).json({
            message: MESSAGE.SUCCESS_MESSAGE,
        });

    } catch (error) {
        console.error("BACKEND: Errore generico del server: ", error.stack);
        return res.status(500).json({
            message: MESSAGE.SERVER_ERROR,
        });
    }
}