import supabase from '../../config/supabase.mjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

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
    console.error('BACKEND: Token non valido', error.stack);
    return;
  }
}

export const redditRedirect = async (req, res) => {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.error('BACKEND: Token mancante');
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
      console.error('BACKEND: Errore durante la verifica del token di reddit nel DB', error.stack);
      return res.status(500).json({
        message: MESSAGE.SUPABASE_ERROR,
      });
    }

    // Gestisce il caso in cui i permessi siano già stati dati
    if (data && data.length > 0) {
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
    console.error('BACKEND: Errore generico del server:', error.stack);
    return res.status(500).json({
      message: MESSAGE.SERVER_ERROR,
    });
  }
};