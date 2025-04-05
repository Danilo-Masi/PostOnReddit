import axios from "axios";
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
const calculateBestTimesByDay = (posts, onlineUsers) => {
    if (posts.length === 0) {
        return {};
    }

    // Initialize data structures for each day of the week
    const daysMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let dailyData = {};

    // Initialize data structures for each day
    daysMap.forEach(day => {
        dailyData[day] = {
            hourlyData: {},
            totalUpvotes: 0,
            totalComments: 0,
            numPosts: 0
        };

        // Initialize hourly data for each day
        for (let hour = 0; hour < 24; hour++) {
            dailyData[day].hourlyData[hour] = {
                totalUpvotes: 0,
                totalComments: 0,
                numPosts: 0
            };
        }
    });

    // Process all posts to build our dataset
    posts.forEach(post => {
        const postDate = new Date(post.data.created_utc * 1000);
        const dayOfWeek = daysMap[postDate.getUTCDay()];
        const hour = postDate.getUTCHours();
        const upvotes = post.data.ups;
        const comments = post.data.num_comments;

        // Update daily totals
        dailyData[dayOfWeek].totalUpvotes += upvotes;
        dailyData[dayOfWeek].totalComments += comments;
        dailyData[dayOfWeek].numPosts++;

        // Update hourly data
        dailyData[dayOfWeek].hourlyData[hour].totalUpvotes += upvotes;
        dailyData[dayOfWeek].hourlyData[hour].totalComments += comments;
        dailyData[dayOfWeek].hourlyData[hour].numPosts++;
    });

    // Calculate day popularity (0-1)
    const dayPopularity = {};
    const maxDayPosts = Math.max(...Object.values(dailyData).map(d => d.numPosts));

    daysMap.forEach(day => {
        const dayData = dailyData[day];
        if (dayData.numPosts > 0) {
            const avgEngagement = (dayData.totalUpvotes + 2 * dayData.totalComments) / dayData.numPosts;
            const postFrequency = dayData.numPosts / maxDayPosts;
            dayPopularity[day] = (avgEngagement + postFrequency) / 2;
        } else {
            dayPopularity[day] = 0;
        }
    });

    // Calculate best times for each day
    let bestTimes = {};

    daysMap.forEach(day => {
        const dayData = dailyData[day];
        const hourlyData = dayData.hourlyData;

        // Calculate hour popularity for this day
        const hourPopularity = {};
        const maxHourPosts = Math.max(...Object.values(hourlyData).map(h => h.numPosts));

        for (let hour = 0; hour < 24; hour++) {
            const hourData = hourlyData[hour];
            if (hourData.numPosts > 0) {
                const avgEngagement = (hourData.totalUpvotes + 2 * hourData.totalComments) / hourData.numPosts;
                const postFrequency = hourData.numPosts / maxHourPosts;
                hourPopularity[hour] = (avgEngagement + postFrequency) / 2;
            } else {
                hourPopularity[hour] = 0;
            }
        }

        // Find the best hour for this day
        let bestHour = 0;
        let bestScore = 0;

        for (let hour = 0; hour < 24; hour++) {
            const score = hourPopularity[hour];
            if (score > bestScore) {
                bestScore = score;
                bestHour = hour;
            }
        }

        // Calculate confidence in this prediction
        const confidence = calculateConfidence(hourlyData[bestHour], dayData);

        // Create a timestamp for this best time
        const now = new Date();
        const currentDay = now.getUTCDay();
        const daysUntilTarget = (daysMap.indexOf(day) - currentDay + 7) % 7;
        const targetDate = new Date(now);
        targetDate.setUTCDate(targetDate.getUTCDate() + daysUntilTarget);
        targetDate.setUTCHours(bestHour, 0, 0, 0);

        bestTimes[day] = {
            hour: bestHour,
            score: bestScore,
            confidence: confidence,
            timestamp: targetDate.getTime(),
            giorno: targetDate.toISOString().split('T')[0],
            ora: `${bestHour.toString().padStart(2, '0')}:00`
        };
    });

    return bestTimes;
};

// Funzione per calcolare la confidenza
const calculateConfidence = (hourData, dayData) => {
    if (!hourData || !dayData) return 0;

    const hourPosts = hourData.numPosts || 0;
    const dayPosts = dayData.numPosts || 0;

    // Più post = maggiore confidenza
    const hourConfidence = Math.min(hourPosts / 5, 1); // Limite a 1
    const dayConfidence = Math.min(dayPosts / 20, 1); // Limite a 1

    return (hourConfidence * 0.7 + dayConfidence * 0.3); // Weighted average
};

// Funzione principale
export const redditBestWeeklyTimes = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const user_id = await validateToken(authHeader);

        const subreddit = validateQuery(req.query.q);

        let isPro = await checkSubscription(user_id);

        if (isPro === null) {
            logger.error('Recupero della sottoscrizione pro non valida - reddid-bestWeekTime-controller');
            return res.status(500).end();
        }

        if (!isPro) {
            logger.info(`Utente non pro - reddid-bestWeekTime-controller: ${user_id}`);
            return res.status(403).json({ message: "This feature is only available for pro users" });
        }

        const tokenData = await getRedditAccessToken(user_id);
        if (!tokenData) {
            logger.error(`Errore nel recupero dell'access_token - reddit-bestDayTime-controller`);
            return res.status(500).json({ error: "Failed to retrieve access token" });
        }
        let { access_token } = tokenData;

        const posts = await retrievePosts(subreddit, access_token);

        if (posts.length === 0) {
            logger.info(`Nessun post trovato per il subreddit - reddid-bestWeekTime-controller: ${subreddit}`);
            return res.status(200).json({
                message: "No posts found for this subreddit in the last week",
                bestTimes: {}
            });
        }

        let onlineUsers = null;
        try {
            const aboutResponse = await axios.get(`https://oauth.reddit.com/r/${subreddit}/about`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'User-Agent': 'web:postonreddit:v1.0.0 (by /u/WerewolfCapital4616)',
                    'Content-Type': 'application/json',
                },
            });

            if (aboutResponse.status === 200 && aboutResponse.data && aboutResponse.data.data) {
                onlineUsers = aboutResponse.data.data.active_user_count;
            }
        } catch (error) {
            logger.error(`Error fetching online users - reddid-bestWeekTime-controller: ${error.message || error}`);
        }

        const bestTimes = calculateBestTimesByDay(posts, onlineUsers);

        return res.status(200).json({
            message: "Best times retrieved successfully",
            bestTimes: bestTimes
        });

    } catch (error) {
        logger.error(`Errore generico del Server - reddid-bestWeekTime-controller: ${error.message || error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};