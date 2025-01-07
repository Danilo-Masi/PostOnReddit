import supabase from '../../config/supabase.mjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const REDIRECT_URI = process.env.REDDIT_REDIRECT_URI;
const SCOPES = 'identity submit';
const JWT_SECRET = process.env.JWT_SECRET;

// Messaggi di errore o di successo
const MESSAGE = {
  TOKEN_INVALID: 'Token mancante o non valido',
  DB_ERROR: 'Errore durante la verifica del token di Reddit nel DB',
  TOKEN_ALREADY_EXISTS: 'I permessi sono già stati dati',
  SERVER_ERROR: 'Errore generico del server',
};

export const redditRedirect = async (req, res) => {

  const authHeader = req.headers['authorization'];

  // Verifica la presenza e validità del token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: MESSAGE.TOKEN_INVALID,
    });
  }

  const token = authHeader && authHeader.split(' ')[1];

  try {
    // Decodifica il token JWT per ottenere l'user_id
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    // Verifica se l'utente ha già un token di Reddit nel DB
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

    // Gestisce il caso in cui i permessi siano già stati dati
    if (data && data.length > 0) {
      return res.status(400).json({
        message: MESSAGE.TOKEN_ALREADY_EXISTS,
      });
    }

    // Costruisci il parametro `state` includendo l'user_id
    const state = `user_id:${userId}`;

    // Crea l'URL di reindirizzamento per Reddit
    const redditAuthUrl = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=${state}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&duration=permanent&scope=${SCOPES}`;

    // Restituisci l'URL al frontend
    res.json({ redirectUrl: redditAuthUrl });
    
  } catch (error) {
    console.error('BACKEND: Errore generico del server:', error.message);
    return res.status(403).json({
      message: MESSAGE.SERVER_ERROR,
      error: error.message,
    });
  }
};