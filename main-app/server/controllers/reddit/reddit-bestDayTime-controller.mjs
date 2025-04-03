import axios from "axios";
import logger from '../../config/logger.mjs';
import { getRedditAccessToken } from "../services/redditToken.mjs";
import dotenv from 'dotenv';
import { validateToken } from "../services/validateToken.mjs";
import { validateQuery } from "../services/validateQuery.mjs";
dotenv.config();

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
            logger.error(`Errore durante il caricamento dei post - reddit-bestDayTime-controller: ${searchResponse.status}`);
            return null;
        }

        return searchResponse.data.data.children || [];

    } catch (error) {
        logger.error(`Errore generico del Server - reddit-bestDayTime-controller: ${error.message || error}`);
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
            logger.error(`Errore durante il caricamento del numero di utenti online - reddit-bestDayTime-controller: ${aboutResponse.status}`);
            return null;
        }

        return aboutResponse.data.data.accounts_active || 0;

    } catch (error) {
        logger.error(`Errore generico del Server - reddit-bestDayTime-controller:  ${error.message || error}`);
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
    try {
        // Validazione del token
        const authHeader = req.headers['authorization'];
        const user_id = await validateToken(authHeader);

        // Validazione query
        const subreddit = validateQuery(req.query.q);

        const tokenData = await getRedditAccessToken(user_id);
        if (!tokenData) {
            logger.error(`Errore nel recupero dell'access_token - reddit-bestDayTime-controller`);
            return res.status(500).end();
        }
        let { access_token } = tokenData;

        let posts = await retrivePosts(subreddit, access_token);
        if (posts.length === 0) {
            logger.info(`La subreddit: ${subreddit} non presenta alcun dato - reddit-bestDayTime-controller`);
            return res.status(200).end();
        }

        let onlineUsers = await retriveOnlineUsers(subreddit, access_token);

        const bestTimes = calculateScore(posts, onlineUsers);

        return res.status(200).json({ subreddit, bestTimes });

    } catch (error) {
        logger.error(`Errore generico del Server - reddit-bestDayTime-controller:  ${error.message || error}`);
        return res.status(500).end();
    }
};