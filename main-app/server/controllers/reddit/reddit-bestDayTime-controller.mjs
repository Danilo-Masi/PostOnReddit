import axios from "axios";
import logger from '../../config/logger.mjs';
import { getRedditAccessToken } from "../services/redditToken.mjs";
import { validateToken } from "../services/validateToken.mjs";
import { validateQuery } from "../services/validateQuery.mjs";
import dotenv from 'dotenv';
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
    const now = new Date();
    const currentHour = now.getUTCHours();
    const currentDay = now.getUTCDate();
    const currentMonth = now.getUTCMonth();
    const currentYear = now.getUTCFullYear();
    const currentDayOfWeek = now.getUTCDay(); // 0 = Sunday, 6 = Saturday

    // If no posts at all, return empty array
    if (posts.length === 0) {
        return [];
    }

    // Group posts by hour and day of week
    const hourlyData = {};
    const dayOfWeekData = {};

    // Initialize data structures
    for (let hour = 0; hour < 24; hour++) {
        hourlyData[hour] = {
            totalUpvotes: 0,
            totalComments: 0,
            numPosts: 0,
            dayOfWeekDistribution: Array(7).fill(0) // Distribution across days of week
        };
    }

    for (let day = 0; day < 7; day++) {
        dayOfWeekData[day] = {
            totalUpvotes: 0,
            totalComments: 0,
            numPosts: 0
        };
    }

    // Process all posts to build our dataset
    posts.forEach(post => {
        const postDate = new Date(post.data.created_utc * 1000);
        const hour = postDate.getUTCHours();
        const dayOfWeek = postDate.getUTCDay();
        const upvotes = post.data.ups;
        const comments = post.data.num_comments;

        // Update hourly data
        hourlyData[hour].totalUpvotes += upvotes;
        hourlyData[hour].totalComments += comments;
        hourlyData[hour].numPosts++;
        hourlyData[hour].dayOfWeekDistribution[dayOfWeek]++;

        // Update day of week data
        dayOfWeekData[dayOfWeek].totalUpvotes += upvotes;
        dayOfWeekData[dayOfWeek].totalComments += comments;
        dayOfWeekData[dayOfWeek].numPosts++;
    });

    // Calculate day of week popularity factor (0-1)
    const dayOfWeekPopularity = {};
    const maxDayPosts = Math.max(...Object.values(dayOfWeekData).map(d => d.numPosts));

    for (let day = 0; day < 7; day++) {
        const dayData = dayOfWeekData[day];
        if (dayData.numPosts > 0) {
            const avgEngagement = (dayData.totalUpvotes + 2 * dayData.totalComments) / dayData.numPosts;
            const postFrequency = dayData.numPosts / maxDayPosts;
            dayOfWeekPopularity[day] = (avgEngagement + postFrequency) / 2;
        } else {
            dayOfWeekPopularity[day] = 0;
        }
    }

    // Calculate hour popularity within each day of week
    const hourPopularityByDay = {};
    for (let day = 0; day < 7; day++) {
        hourPopularityByDay[day] = {};
        const dayPosts = posts.filter(post => {
            const postDate = new Date(post.data.created_utc * 1000);
            return postDate.getUTCDay() === day;
        });

        if (dayPosts.length === 0) continue;

        const hourlyDistribution = {};
        dayPosts.forEach(post => {
            const postDate = new Date(post.data.created_utc * 1000);
            const hour = postDate.getUTCHours();
            if (!hourlyDistribution[hour]) {
                hourlyDistribution[hour] = { totalUpvotes: 0, totalComments: 0, numPosts: 0 };
            }
            hourlyDistribution[hour].totalUpvotes += post.data.ups;
            hourlyDistribution[hour].totalComments += post.data.num_comments;
            hourlyDistribution[hour].numPosts++;
        });

        const maxHourPosts = Math.max(...Object.values(hourlyDistribution).map(h => h.numPosts || 0));

        for (let hour = 0; hour < 24; hour++) {
            const hourData = hourlyDistribution[hour] || { totalUpvotes: 0, totalComments: 0, numPosts: 0 };
            if (hourData.numPosts > 0) {
                const avgEngagement = (hourData.totalUpvotes + 2 * hourData.totalComments) / hourData.numPosts;
                const postFrequency = hourData.numPosts / maxHourPosts;
                hourPopularityByDay[day][hour] = (avgEngagement + postFrequency) / 2;
            } else {
                hourPopularityByDay[day][hour] = 0;
            }
        }
    }

    // Calculate overall hour popularity
    const maxHourPosts = Math.max(...Object.values(hourlyData).map(h => h.numPosts));
    const hourPopularity = {};

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

    // Get the next 24 hours starting from one hour after now
    const next24Hours = [];
    for (let i = 1; i <= 24; i++) {
        const hourIndex = (currentHour + i) % 24;
        const dayOffset = Math.floor((currentHour + i) / 24);
        const targetDayOfWeek = (currentDayOfWeek + dayOffset) % 7;

        // Calculate a weighted score that considers:
        // 1. Overall hour popularity (40%)
        // 2. Day-specific hour popularity (40%)
        // 3. Day of week popularity (20%)
        const overallHourScore = hourPopularity[hourIndex] || 0;
        const daySpecificHourScore = (hourPopularityByDay[targetDayOfWeek] &&
            hourPopularityByDay[targetDayOfWeek][hourIndex]) || 0;
        const dayOfWeekScore = dayOfWeekPopularity[targetDayOfWeek] || 0;

        // Apply weights
        let score = (overallHourScore * 0.4) + (daySpecificHourScore * 0.4) + (dayOfWeekScore * 0.2);

        // Add online users factor if available
        if (onlineUsers !== null) {
            score += onlineUsers / 1000; // Normalize the impact of online users
        }

        // Create timestamp for this hour
        const postTime = new Date();
        postTime.setUTCHours(hourIndex, 0, 0, 0);
        postTime.setUTCDate(postTime.getUTCDate() + dayOffset);

        next24Hours.push({
            hour: hourIndex,
            timestamp: postTime.getTime(),
            score: score,
            giorno: postTime.toISOString().split('T')[0],
            ora: `${hourIndex.toString().padStart(2, '0')}:00`,
            dayOfWeek: targetDayOfWeek,
            confidence: calculateConfidence(hourlyData[hourIndex], dayOfWeekData[targetDayOfWeek])
        });
    }

    // Sort by score and take top 4
    return next24Hours
        .sort((a, b) => b.score - a.score)
        .slice(0, 4);
};

// Helper function to calculate confidence in our prediction
const calculateConfidence = (hourData, dayData) => {
    if (!hourData || !dayData) return 0;

    const hourPosts = hourData.numPosts || 0;
    const dayPosts = dayData.numPosts || 0;

    // More posts = higher confidence
    const hourConfidence = Math.min(hourPosts / 10, 1); // Cap at 1
    const dayConfidence = Math.min(dayPosts / 50, 1); // Cap at 1

    return (hourConfidence * 0.7 + dayConfidence * 0.3); // Weighted average
};

// Funzione principale
export const redditBestDayTime = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const user_id = await validateToken(authHeader);

        const subreddit = validateQuery(req.query.q);

        const tokenData = await getRedditAccessToken(user_id);
        if (!tokenData) {
            logger.error(`Errore nel recupero dell'access_token - reddit-bestDayTime-controller`);
            return res.status(500).json({ error: "Failed to retrieve access token" });
        }
        let { access_token } = tokenData;

        let posts = await retrivePosts(subreddit, access_token);
        if (!posts || posts.length === 0) {
            logger.info(`La subreddit: ${subreddit} non presenta alcun dato - reddit-bestDayTime-controller`);
            return res.status(200).json({ subreddit, bestTimes: [] });
        }

        let onlineUsers = await retriveOnlineUsers(subreddit, access_token);

        const bestTimes = calculateScore(posts, onlineUsers);

        // Log the results for debugging
        logger.info(`Best times for ${subreddit}: ${JSON.stringify(bestTimes)}`);

        return res.status(200).json({ subreddit, bestTimes });

    } catch (error) {
        logger.error(`Errore generico del Server - reddit-bestDayTime-controller:  ${error.message || error}`);
        return res.status(500).json({ error: "Internal server error" });
    }
};