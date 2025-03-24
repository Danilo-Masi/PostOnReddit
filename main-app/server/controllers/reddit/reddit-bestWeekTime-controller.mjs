import axios from "axios";
import { decodeToken } from '../../controllers/services/decodeToken.mjs';
import logger from '../../config/logger.mjs';
import dotenv from 'dotenv';
import { getRedditAccessToken } from '../services/redditToken.mjs';

dotenv.config();

const MESSAGES = {
    MISSING_TOKEN: 'Token mancante',
    INVALID_TOKEN: 'Token non valido',
    INVALID_QUERY: "La subreddit della richiesta non è valida",
    SUPABASE_ERROR: "Errore di Supabase durante il caricamento dell'access_token dal DB",
    SUBREDDIT_VOID: "La subreddit specificata non presenta alcun dato",
    SERVER_ERROR: "Errore generico del server",
};

// Funzione per caricare i dati dei post negli ultimi 7 giorni
const retrievePosts = async (subreddit, access_token) => {
    try {
        const searchResponse = await axios.get(`https://oauth.reddit.com/r/${subreddit}/search`, {
            params: {
                q: '*',
                sort: 'new',
                show: 'week',
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
            return [];
        }

        return searchResponse.data.data.children || [];

    } catch (error) {
        logger.error('Errore generico del Server - retrievePosts: ' + error.message);
        return [];
    }
};

// Funzione per trovare il miglior orario per ogni giorno della settimana
const calculateBestTimesByDay = (posts) => {

    let dailyData = {
        Monday: {}, Tuesday: {}, Wednesday: {}, Thursday: {}, Friday: {}, Saturday: {}, Sunday: {}
    };

    const daysMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    posts.forEach(post => {
        const postDate = new Date(post.data.created_utc * 1000);
        const dayOfWeek = daysMap[postDate.getUTCDay()];
        const hour = postDate.getUTCHours();
        const upvotes = post.data.ups;
        const comments = post.data.num_comments;

        if (!dailyData[dayOfWeek][hour]) {
            dailyData[dayOfWeek][hour] = { totalUpvotes: 0, totalComments: 0, numPosts: 0 };
        }

        dailyData[dayOfWeek][hour].totalUpvotes += upvotes;
        dailyData[dayOfWeek][hour].totalComments += comments;
        dailyData[dayOfWeek][hour].numPosts++;
    });

    let bestTimes = {};

    Object.keys(dailyData).forEach(day => {
        let scores = Object.keys(dailyData[day]).map(hour => {
            const { totalUpvotes, totalComments, numPosts } = dailyData[day][hour];
            const avgEngagement = (totalUpvotes + 2 * totalComments) / numPosts;
            return { hour: parseInt(hour), score: avgEngagement };
        });
        if (scores.length > 0) {
            bestTimes[day] = scores.sort((a, b) => b.score - a.score)[0];
        } else {
            bestTimes[day] = null;
        }
    });

    return bestTimes
}


// Funzione principale
export const redditBestWeeklyTimes = async (req, res) => {
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
        const tokenData = await getRedditAccessToken(user_id);
        if (!tokenData) {
            logger.error(`Errore nel recuper dell'access_token dal DB`);
            return res.status(500).json({ message: MESSAGES.SUPABASE_ERROR });
        }

        let { access_token } = tokenData;

        let posts = await retrievePosts(subreddit, access_token);

        if (posts.length <= 0) {
            logger.info('La subreddit specificata non presenta alcun dato');
            return res.status(200).json({ message: MESSAGES.SUBREDDIT_VOID });
        }

        const bestTimesByDay = calculateBestTimesByDay(posts);

        return res.status(200).json({ subreddit, bestTimesByDay });

    } catch (error) {
        logger.error('Errore generico del Server - redditBestWeeklyTimes: ' + error.message);
        return res.status(500).json({ message: MESSAGES.SERVER_ERROR });
    }
};