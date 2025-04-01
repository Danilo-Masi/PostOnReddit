import axios from "axios";
import { decodeToken } from '../../controllers/services/decodeToken.mjs';
import logger from '../../config/logger.mjs';
import { getRedditAccessToken } from '../services/redditToken.mjs';
import { checkSubscription } from "../services/checkSubscription.mjs";
import dotenv from 'dotenv';
import { validateToken } from "../services/validateToken.mjs";
import { validateQuery } from "../services/validateQuery.mjs";
dotenv.config();

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
            logger.error(`'Errore durante il caricamento dei post - reddid-bestWeekTime-controller: ${searchResponse.status}`);
            return [];
        }

        return searchResponse.data.data.children || [];

    } catch (error) {
        logger.error(`Errore generico del Server - reddid-bestWeekTime-controller: ${error.message || error}`);
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
    try {
        // Validazione del token
        const authHeader = req.headers['authorization'];
        const user_id = await validateToken(authHeader);

        // Validazione query
        const subreddit = validateQuery(req.query.q);

        let isPro = await checkSubscription(user_id);

        if (isPro === null) {
            logger.error('Recupero della sottoscrizione pro non valida - reddid-bestWeekTime-controller');
            return res.status(500).end();
        }

        if (!isPro) {
            logger.info(`L'utente ${user_id} non ha un piano pro - reddid-bestWeekTime-controller`);
            return res.status(204).end();
        }

        const tokenData = await getRedditAccessToken(user_id);
        if (!tokenData) {
            logger.error(`Errore nel recuper dell'access_token dal DB - reddid-bestWeekTime-controller`);
            return res.status(500).end();
        }
        let { access_token } = tokenData;

        let posts = await retrievePosts(subreddit, access_token);

        if (posts.length <= 0) {
            logger.info('La subreddit specificata non presenta alcun dato - reddid-bestWeekTime-controller');
            return res.status(200).end();
        }

        const bestTimesByDay = calculateBestTimesByDay(posts);

        return res.status(200).json({ subreddit, bestTimesByDay });

    } catch (error) {
        logger.error(`Errore generico del Server - reddid-bestWeekTime-controller: ${error.message || error}`);
        return res.status(500).end();
    }
};