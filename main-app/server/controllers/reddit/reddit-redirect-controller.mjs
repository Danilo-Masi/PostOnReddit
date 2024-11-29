import dotenv from 'dotenv';
dotenv.config();

const CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const REDIRECT_URI = process.env.REDDIT_REDIRECT_URI;
const SCOPES = 'identity submit';

export const redditRedirect = async (req, res) => {
    // Genera uno stato unico per sicurezza
    const state = Math.random().toString(36).substring(7);
    
    // Costruisci correttamente l'URL
    const redditAuthUrl = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=${state}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&duration=permanent&scope=${SCOPES}`;
    
    // Effettua la redirezione all'URL di Reddit
    res.redirect(redditAuthUrl);
};