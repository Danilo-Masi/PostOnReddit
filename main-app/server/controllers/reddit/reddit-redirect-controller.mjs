import logger from '../../config/logger.mjs';
import { validateToken } from '../services/validateToken.mjs';
import dotenv from 'dotenv';
dotenv.config();

const CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const REDIRECT_URI = process.env.REDDIT_REDIRECT_URI;
const SCOPES = 'identity flair modflair read submit';

export const redditRedirect = async (req, res) => {
  try {
    // Validazione del token
    const authHeader = req.headers['authorization'];
    const user_id = await validateToken(authHeader);

    // Costruisci il parametro `state` includendo l'user_id
    const state = `user_id:${user_id}`;

    // Crea l'URL di reindirizzamento per Reddit
    const redditAuthUrl = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=${state}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&duration=permanent&scope=${SCOPES}`;

    // Restituisci l'URL al client
    res.json({ redirectUrl: redditAuthUrl });

  } catch (error) {
    logger.error(`Errore generico del Server -reddit-redirect-controller: ${error.message || error}`);
    return res.status(500).end();
  }
};