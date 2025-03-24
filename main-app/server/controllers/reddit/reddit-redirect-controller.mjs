import { decodeToken } from '../../controllers/services/decodeToken.mjs';
import logger from '../../config/logger.mjs';
import dotenv from 'dotenv';
dotenv.config();

const CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const REDIRECT_URI = process.env.REDDIT_REDIRECT_URI;
const SCOPES = 'identity flair modflair read submit';

const MESSAGES = {
  MISSING_TOKEN: 'Token mancante',
  INVALID_TOKEN: 'Token non valido',
  SERVER_ERROR: 'Errore generico del server',
};

export const redditRedirect = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    logger.error('Token mancante');
    return res.status(401).json({
      message: MESSAGES.MISSING_TOKEN,
    });
  }

  const user = await decodeToken(token);
  if (!user) {
    return res.status(400).json({
      message: MESSAGES.INVALID_TOKEN,
    });
  }
  const user_id = user.user.id;

  try {
    // Costruisci il parametro `state` includendo l'user_id
    const state = `user_id:${user_id}`;

    // Crea l'URL di reindirizzamento per Reddit
    const redditAuthUrl = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=${state}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&duration=permanent&scope=${SCOPES}`;

    // Restituisci l'URL al client
    res.json({ redirectUrl: redditAuthUrl });

  } catch (error) {
    logger.error('Errore generico del Server: ' + error.message);
    return res.status(500).json({
      message: MESSAGES.SERVER_ERROR,
    });
  }
};