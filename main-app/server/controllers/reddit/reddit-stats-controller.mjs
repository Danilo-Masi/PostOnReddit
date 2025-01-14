import axios from "axios";
import supabase from '../../config/supabase.mjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const MESSAGES = {
    MISSING_TOKEN: 'Token mancante',
    INVALID_TOKEN: 'Token non valido',
    INVALID_QUERY: "La query della richiesta non è valida",
    CREDENTIAL_ERROR: "Richiesta non valida",
    SUPABASE_ERROR: "Errore di Supabase durante il caricamento dei dati",
    SERVER_ERROR: "Errore generico del server",
};

const decodeToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error('BACKEND: Token non valido', error.stack);
        return;
    }
}

export const redditStats = async (req, res) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.error('BACKEND: Token mancante');
        return res.status(401).json({
            message: MESSAGES.MISSING_TOKEN,
        });
    }

    const decoded = decodeToken(token);
    if (!decoded) {
        return res.status(401).json({
            message: MESSAGES.INVALID_TOKEN,
        });
    }

    const user_id = decoded.id;

    const { q } = req.query;

    if (q.trim().length < 2 || q.length > 100) {
        return res.status(400).json({
            message: MESSAGES.INVALID_QUERY,
        });
    }

    const subreddit = q.startsWith('r/') ? q.substring(2) : q;

    try {
        let { data, error } = await supabase
            .from('reddit_tokens')
            .select('access_token')
            .eq('user_id', user_id)
            .single();

        if (error || !data) {
            console.error("BACKEND: Errore di Supabase durante il caricamento del reddit_token: ", error.stack);
            return res.status(401).json({
                message: MESSAGES.SUPABASE_ERROR,
            })
        }

        let { access_token } = data;


        // Chiamata all'API di Reddit per i post recenti
        const response = await axios.get(`https://oauth.reddit.com/r/${subreddit}/new`, {
            params: { limit: 100 },
            headers: {
                Authorization: `Bearer ${access_token}`,
                'User-Agent': 'web:postonreddit:v1.0.0 (by /u/WerewolfCapital4616)',
                'Content-Type': 'application/json',
            },
        });

        const posts = response.data.data.children;

        const activityMap = {};

        posts.forEach(post => {
            const timestamp = post.data.created_utc * 1000;
            const date = new Date(timestamp);
            const day = date.toLocaleDateString('en-us', { weekday: "short" });
            const hour = date.getHours();

            const key = `${day}-${hour}`;
            if (!activityMap[key]) {
                activityMap[key] = { day, hour, posts: 0, comments: 0 };
            }
            activityMap[key].posts += 1;
            activityMap[key].comments += post.data.num_comments;
        });

        const chartData = Object.values(activityMap).map(item => ({
            day: item.day,
            hour: item.hour,
            activityScore: item.post + item.comments
        })).sort((a, b) => a.hour - b.hour);

        return res.status(200).json(chartData);

    } catch (error) {
        if (error.response) {
            console.error("BACKEND: Errore Reddit: ", error.response.status, error.response.data);
        } else {
            console.error("BACKEND: Errore Axios: ", error.message);
        }
        return res.status(500).json({
            message: MESSAGES.SERVER_ERROR,
        });
    }
}