import axios from "axios";
import { decodeToken } from '../../controllers/services/decodeToken.mjs';
import logger from '../../config/logger.mjs';
import dotenv from 'dotenv';
import { getRedditAccessToken } from "../services/redditToken.mjs";

dotenv.config();

const MESSAGES = {
    MISSING_TOKEN: 'Token mancante',
    INVALID_TOKEN: 'Token non valido',
    INVALID_QUERY: "La subreddit della richiesta non è valida",
    SUPABASE_ERROR: "Errore di Supabase durante il caricamento dell'access_token dal DB",
    SUBREDDIT_VOID: "La subreddit specificata non presenta alcun dato",
    SERVER_ERROR: "Errore generico del server",
};

// Funzione per caricare i dati dei post della giornata
const retrivePosts = async (subreddit, access_token) => {
    try {
        const searchResponse = await axios.get(`https://oauth.reddit.com/r/${subreddit}/search`, {
            params: {
                q: '*',
                sort: 'new',
                t: 'day',
                limit: 100,
                restrict_sr: true,
            },
            headers: {
                Authorization: `Bearer ${access_token}`,
                'User-Agent': 'web:postonreddit:v1.0.0 (by /u/WerewolfCapital4616)',
                'Content-Type': 'application/json',
            },
        });

        if (searchResponse.status !== 200) {
            logger.error('Errore durante il caricamento dei post dall\'Endpoint search');
            return null;
        }

        return searchResponse.data.data.children || [];

    } catch (error) {
        logger.error('Errore generico del Server - retrivePosts: ' + error.message);
        return [];
    }
};

// Funzione per caricare i dati degli utenti online attivi
const retriveOnlineUsers = async (subreddit, access_token) => {
    try {
        const aboutResponse = await axios.get(`https://oauth.reddit.com/r/${subreddit}/about.json`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'User-Agent': 'web:postonreddit:v1.0.0 (by /u/WerewolfCapital4616)',
                'Content-Type': 'application/json',
            }
        });

        if (aboutResponse.status !== 200) {
            logger.error('Errore durante il caricamento degli utenti online dall\'Endpoint about.json');
            return null;
        }

        return aboutResponse.data.data.accounts_active || 0;

    } catch (error) {
        logger.error('Errore generico del Server - retriveOnlineUsers: ' + error.message);
        return null;
    }
};

// Funzione per calcolare i migliori momenti della giornata in cui postare
const calculateScore = (posts, onlineUsers) => {
    let hourlyData = {};
    posts.forEach(post => {
        const postDate = new Date(post.data.created_utc * 1000);
        const hour = postDate.getUTCHours();
        const upvotes = post.data.ups;
        const comments = post.data.num_comments;

        if (!hourlyData[hour]) {
            hourlyData[hour] = { totalUpvotes: 0, totalComments: 0, numPosts: 0 };
        }

        hourlyData[hour].totalUpvotes += upvotes;
        hourlyData[hour].totalComments += comments;
        hourlyData[hour].numPosts++;
    });

    if (Object.keys(hourlyData).length === 0) {
        return [];
    }

    const maxPosts = Math.max(...Object.values(hourlyData).map(h => h.numPosts));

    const currentTime = Date.now();

    let scores = Object.keys(hourlyData).map(hour => {
        const { totalUpvotes, totalComments, numPosts } = hourlyData[hour];
        const avgEngagement = (totalUpvotes + 2 * totalComments) / numPosts;
        const competitionFactor = numPosts / maxPosts;

        let score;
        if (onlineUsers !== null) {
            score = avgEngagement + onlineUsers / 10 - competitionFactor;
        } else {
            score = avgEngagement - competitionFactor;
        }

        const postTime = new Date();
        postTime.setUTCHours(parseInt(hour), 0, 0, 0);

        return { hour: parseInt(hour), timestamp: postTime.getTime(), score };
    })
        .filter(({ timestamp }) => timestamp >= currentTime)
        .sort((a, b) => b.score - a.score)
        .slice(0, 4);

    return scores;
};

// Funzione principale
export const redditBestDayTime = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        logger.error('Token mancante');
        return res.status(401).json({ message: MESSAGES.MISSING_TOKEN });
    }

    const user = await decodeToken(token);
    if (!user) {
        return res.status(400).json({ message: MESSAGES.INVALID_TOKEN });
    }

    const user_id = user.user.id;
    const { q } = req.query;

    if (q.trim().length < 2 || q.length > 100) {
        return res.status(400).json({ message: MESSAGES.INVALID_QUERY });
    }

    const subreddit = q.startsWith('r/') ? q.substring(2) : q;

    try {
        const access_token = await getRedditAccessToken(user_id);
        if (!access_token) {
            logger.error(`Errore nel recuper dell'access_token dal DB`);
            return res.status(500).json({ message: MESSAGES.SUPABASE_ERROR });
        }

        let posts = await retrivePosts(subreddit, access_token);
        if (posts.length === 0) {
            logger.info('La subreddit specificata non presenta alcun dato');
            return res.status(200).json({ message: MESSAGES.SUBREDDIT_VOID });
        }

        let onlineUsers = await retriveOnlineUsers(subreddit, access_token);

        const bestTimes = calculateScore(posts, onlineUsers);

        return res.status(200).json({ subreddit, bestTimes });

    } catch (error) {
        logger.error('Errore generico del Server - redditBestDayTime: ' + error.message);
        return res.status(500).json({ message: MESSAGES.SERVER_ERROR });
    }
};