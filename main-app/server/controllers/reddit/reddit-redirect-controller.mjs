import supabase from '../../config/supabase.mjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import logger from '../../config/logger.mjs';

dotenv.config();

const CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const REDIRECT_URI = process.env.REDDIT_REDIRECT_URI;
const SCOPES = 'identity flair modflair read submit';

const MESSAGE = {
  NO_TOKEN: 'Token mancante',
  TOKEN_INVALID: 'Token non valido',
  SUPABASE_ERROR: 'Errore durante la verifica del token di Reddit nel DB',
  TOKEN_ALREADY_EXISTS: 'I permessi sono già stati concessi',
  SERVER_ERROR: 'Errore generico del server',
};

// Funzione per decodificare il token
const decodeToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    logger.error('Token non valido: ', error.message);
    return;
  }
}

export const redditRedirect = async (req, res) => {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    logger.error('Token mancante');
    return res.status(401).json({
      message: MESSAGE.NO_TOKEN,
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
    let { data, error } = await supabase
      .from('reddit_tokens')
      .select('access_token')
      .eq('user_id', user_id);

    if (error) {
      logger.error('Errore generico di Supabase durante la verifica del\'access_token di Reddit nel DB: ', error.cause);
      return res.status(500).json({
        message: MESSAGE.SUPABASE_ERROR,
      });
    }

    // Gestisce il caso in cui i permessi siano già stati dati
    if (data && data.length > 0) {
      logger.info('Permessi di Reddit già concessi');
      return res.status(400).json({
        message: MESSAGE.TOKEN_ALREADY_EXISTS,
      });
    }

    // Costruisci il parametro `state` includendo l'user_id
    const state = `user_id:${user_id}`;

    // Crea l'URL di reindirizzamento per Reddit
    const redditAuthUrl = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=${state}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&duration=permanent&scope=${SCOPES}`;

    // Restituisci l'URL al client
    res.json({ redirectUrl: redditAuthUrl });

  } catch (error) {
    logger.error('Errore generico del Server: ', error.cause);
    return res.status(500).json({
      message: MESSAGE.SERVER_ERROR,
    });
  }
};