import logger from '../../config/logger.mjs';
import { decodeToken } from '../../controllers/services/decodeToken.mjs';
import dotenv from 'dotenv';
dotenv.config();

export const retrieveData = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        logger.error('Token mancante - retrive-data-controller');
        return res.status(400).end();
    }

    const user = await decodeToken(token);
    if (!user) {
        logger.error('Token non valido - retrive-data-controller');
        return res.status(400).end();
    }

    const email = user.user.email;

    return res.status(200).json({ email });
};