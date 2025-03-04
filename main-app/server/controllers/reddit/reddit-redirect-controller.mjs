import { decodeToken } from '../../controllers/services/decodeToken.mjs';
import dotenv from 'dotenv';
import logger from '../../config/logger.mjs';
import { getRedditAccessToken } from '../services/redditToken.mjs';

dotenv.config();

const CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const REDIRECT_URI = process.env.REDDIT_REDIRECT_URI;
const SCOPES = 'identity flair modflair read submit';

const MESSAGES = {
  NO_TOKEN: 'Token mancante',
  TOKEN_INVALID: 'Token non valido',
  SUPABASE_ERROR: 'Errore durante la verifica del token di Reddit nel DB',
  TOKEN_ALREADY_EXISTS: 'I permessi sono già stati concessi',
  SERVER_ERROR: 'Errore generico del server',
};

export const redditRedirect = async (req, res) => {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    logger.error('Token mancante');
    return res.status(401).json({
      message: MESSAGES.NO_TOKEN,
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
    const access_token = await getRedditAccessToken(user_id);
    if (!access_token) {
      logger.error(`Errore nel recuper dell'access_token dal DB`);
      return res.status(500).json({ message: MESSAGES.SUPABASE_ERROR });
    }

    // Gestisce il caso in cui i permessi siano già stati dati
    if (access_token) {
      logger.info('Permessi di Reddit già concessi');
      return res.status(400).json({
        message: MESSAGES.TOKEN_ALREADY_EXISTS,
      });
    }

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