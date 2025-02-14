import axios from "axios";
import {supabaseAdmin} from '../../config/supabase.mjs';
import { decodeToken } from '../../controllers/services/decodeToken.mjs';
import dotenv from 'dotenv';
import logger from '../../config/logger.mjs';

dotenv.config();

const MESSAGES = {
    MISSING_TOKEN: 'Token mancante',
    INVALID_TOKEN: 'Token non valido',
    INVALID_QUERY: "La query della richiesta non è valida",
    CREDENTIAL_ERROR: "Richiesta non valida",
    SUPABASE_ERROR: "Errore di Supabase durante il caricamento dei dati",
    SERVER_ERROR: "Errore generico del server",
};

// Funzione per effettuare la chiamata all'API di Reddit e caricare tutti i post necessari, in base ai parametri inseriti
const getRedditPosts = async (subreddit, access_token) => {
    let posts = [];
    let after = null;
    let reachedEnd = false;

    // Calcolo dei timestamp UNIX per ottenere dati esatti per 7 giorni fa (escluso oggi)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const endTimestamp = Math.floor(today.getTime() / 1000);
    const startTimestamp = endTimestamp - 7 * 24 * 60 * 60;

    while (!reachedEnd) {
        try {
            const response = await axios.get(`https://oauth.reddit.com/r/${subreddit}/search`, {
                params: {
                    q: '*',
                    sort: 'new',
                    t: 'all',
                    limit: 100,
                    restrict_sr: true,
                    after: after
                },
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'User-Agent': 'web:postonreddit:v1.0.0 (by /u/WerewolfCapital4616)',
                    'Content-Type': 'application/json',
                },
            });

            const { data } = response.data;

            if (!data.children || data.children.length === 0) {
                logger.info(`Nessun post trovato per r/${subreddit} nell'ultima settimana`);
                reachedEnd = true;
                break;
            }

            // Filtra i post nell'intervallo di tempo corretto
            const filteredPosts = data.children.filter(post => {
                const postTime = post.data.created_utc;
                return postTime >= startTimestamp && postTime < endTimestamp;
            });

            posts = [...posts, ...filteredPosts];

            // Controlla se ci sono altri post da caricare
            after = data.after || null;
            if (!after || posts.length >= 1000 || data.children.length === 0) {
                reachedEnd = true;
            }
        } catch (error) {
            logger.error('Errore nella chiamata al endpoint di Reddit: ', error.message);
            reachedEnd = true;
        }
    }

    return posts;
};

// Funzione per aggregare i dati
const aggregatePostsByDayAndHour = (posts) => {

    const dailyActivity = {};

    // Inizializza tutti i giorni della settimana con ore vuote
    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    weekDays.forEach(day => {
        dailyActivity[day] = {};
        for (let hour = 0; hour < 24; hour++) {
            dailyActivity[day][hour] = { totalComments: 0, totalUpvotes: 0, totalPosts: 0 };
        }
    });

    // Aggrega i dati effettivi
    posts.forEach(post => {
        const timestamp = post.data.created_utc * 1000;
        const date = new Date(timestamp);
        const day = date.toLocaleDateString('en-US', { weekday: 'long' });
        const hour = date.getHours();

        if (!dailyActivity[day]) {
            dailyActivity[day] = {};
        }

        if (!dailyActivity[day][hour]) {
            dailyActivity[day][hour] = { totalComments: 0, totalUpvotes: 0, totalPosts: 0 };
        }

        // Incrementa i conteggi per l'ora specifica
        dailyActivity[day][hour].totalComments += post.data.num_comments;
        dailyActivity[day][hour].totalUpvotes += post.data.ups;
        dailyActivity[day][hour].totalPosts += 1;
    });

    // Trova l'ora con maggiore attività per ogni giorno
    const peakActivityByDay = weekDays.map(day => {
        const hours = dailyActivity[day];
        let peakHour = 0;
        let maxActivity = 0;

        for (let hour = 0; hour < 24; hour++) {
            const activityScore = hours[hour].totalComments + hours[hour].totalUpvotes;
            if (activityScore > maxActivity) {
                maxActivity = activityScore;
                peakHour = hour;
            }
        }

        return {
            day,
            peakHour: `${peakHour}:00`,
            totalComments: Object.values(hours).reduce((sum, h) => sum + h.totalComments, 0),
            totalUpvotes: Object.values(hours).reduce((sum, h) => sum + h.totalUpvotes, 0),
            totalPosts: Object.values(hours).reduce((sum, h) => sum + h.totalPosts, 0),
            activity: maxActivity,
        };
    });

    return peakActivityByDay;
};

// Funzione principale
export const redditStats = async (req, res) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        logger.error('Token mancante');
        return res.status(401).json({
            message: MESSAGES.MISSING_TOKEN,
        });
    }

    const user = await decodeToken(token);
    if (!user) {
        return res.status(400).json({
            message: MESSAGES.INVALID_TOKEN,
        });
    }

    const user_id = user.user.id;

    const { q } = req.query;

    if (q.trim().length < 2 || q.length > 100) {
        return res.status(400).json({
            message: MESSAGES.INVALID_QUERY,
        });
    }

    const subreddit = q.startsWith('r/') ? q.substring(2) : q;

    try {
        let { data, error } = await supabaseAdmin
            .from('reddit_tokens')
            .select('access_token')
            .eq('user_id', user_id)
            .single();

        if (error || !data) {
            logger.error('Errore generico di Supabase durante il caricamento del access_token di Reddit: ', error.cause);
            return res.status(401).json({
                message: MESSAGES.SUPABASE_ERROR,
            })
        }

        let { access_token } = data;

        // Ottieni i post
        const posts = await getRedditPosts(subreddit, access_token);

        if (posts.length === 0) {
            logger.info('Nessun post trovato per questo specifico subreddit nell\'ultima settimana');
            return res.status(200).json([]);
        }

        // Aggrega i dati
        const chartData = aggregatePostsByDayAndHour(posts);

        return res.status(200).json(chartData);

    } catch (error) {
        if (error.status === 403) {
            return res.status(200).json({
                chartData: [],
            });
        } else {
            logger.error('Errore generico del Server: ', error.cause);
            return res.status(500).json({
                message: MESSAGES.SERVER_ERROR,
            });
        }
    }
}