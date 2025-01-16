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

// Funzione per effettuare la chiamata all'API di Reddit
const getRedditPosts = async (subreddit, access_token) => {
    let posts = [];
    let after = null;  // Usato per la paginazione
    const limit = 100; // Numero massimo di post per richiesta
    let reachedEnd = false;

    while (!reachedEnd) {
        try {
            // Chiamata all'API di Reddit con paginazione
            const response = await axios.get(`https://oauth.reddit.com/r/${subreddit}/search`, {
                params: {
                    q: '*',               // Cerca tutti i post
                    sort: 'new',          // Ordina dal più recente
                    t: 'week',            // Filtra per l'ultima settimana
                    limit: limit,         // Numero massimo di post per richiesta
                    restrict_sr: true,    // Solo nella subreddit specificata
                    after: after          // Pagina successiva
                },
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'User-Agent': 'web:postonreddit:v1.0.0 (by /u/WerewolfCapital4616)',
                    'Content-Type': 'application/json',
                },
            });

            const { data } = response.data;

            // Aggiungi i post alla lista
            posts = [...posts, ...data.children];

            // Controlla se ci sono altri post da caricare
            after = data.after;
            if (!after || posts.length >= 700) {
                // Fermati dopo aver caricato un numero sufficiente di post (ad esempio 700)
                reachedEnd = true;
            }
        } catch (error) {
            console.error("Errore nella chiamata all'API Reddit: ", error);
            reachedEnd = true; // Fermati se c'è un errore
        }
    }

    return posts;
};

const aggregatePostsByDayAndHour = (posts) => {
    const dailyActivity = {};

    posts.forEach(post => {
        const timestamp = post.data.created_utc * 1000;
        const date = new Date(timestamp);
        const day = date.toLocaleDateString('en-US', { weekday: 'long' });  // Giorno in inglese
        const hour = date.getHours();

        if (!dailyActivity[day]) {
            dailyActivity[day] = {};
        }

        if (!dailyActivity[day][hour]) {
            dailyActivity[day][hour] = 0;
        }

        // Incrementa il numero di commenti per ora
        dailyActivity[day][hour] += post.data.num_comments;
    });

    // Converti l'oggetto in un array ordinato
    const peakActivityByDay = Object.entries(dailyActivity).map(([day, hours]) => {
        const peakHour = Object.entries(hours).reduce((max, [hour, activity]) => {
            return activity > max.activity ? { hour, activity } : max;
        }, { hour: null, activity: 0 });

        return {
            day,
            peakHour: `${peakHour.hour}:00`,
            activity: peakHour.activity
        };
    });

    return Array.isArray(peakActivityByDay) ? peakActivityByDay : [];  // ✅ Assicura il ritorno di un array
};

// Funzione principale
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

        // Ottieni i post
        const posts = await getRedditPosts(subreddit, access_token);

        if (posts.length === 0) {
            console.warn("BACKEND: Nessun post trovato per questo specifico subreddit negli ultimi 7 giorni");
            return res.status(200).json([]);
        }

        // Aggrega i dati
        const chartData = aggregatePostsByDayAndHour(posts)
            .sort((a, b) => {
                const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
                return daysOfWeek.indexOf(a.day) - daysOfWeek.indexOf(b.day);
            });

        console.log("DATI DI RISPOSTA: ", chartData);

        return res.status(200).json(chartData);

    } catch (error) {
        if (error.status === 403) {
            return res.status(200).json({
                chartData: [],
            });
        } else {
            console.error('BACKEND: Errore generico del server', error.stack);
            return res.status(500).json({
                message: MESSAGES.SERVER_ERROR,
            });
        }
    }
}