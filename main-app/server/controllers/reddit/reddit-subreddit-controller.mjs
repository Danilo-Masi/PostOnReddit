import axios from "axios";
import NodeCache from 'node-cache';

// Messaggi di errore o di successo
const MESSAGE = {
    INVALID_QUERY: "La query della richiesta non è valida",
    SERVER_ERROR: "Errore generico del server",
}

// Cache con scadenza di 5 minuti
const cache = new NodeCache({ stdTTL: 300 });

export const searchSubreddits = async (req, res) => {
    // Preleva la query di ricerca inserita dall'utente
    const { q } = req.query;

    // Verifica che la query sia valida
    if (!q || q.length < 2) {
        return res.status(401).json({
            message: MESSAGE.INVALID_QUERY,
        });
    }

    // Controlla se la query è già presente nella cache
    const cachedSubreddits = cache.get(q);
    if (cachedSubreddits) {
        return res.status(200).json({
            subreddits: cachedSubreddits
        });
    }

    try {
        // Chiamata all'API di Reddit
        const response = await axios.get(
            `https://www.reddit.com/subreddits/search.json?q=${q}&limit=5`
        );

        // Inserisce in nomi dei subreddit in un array
        const subreddits = response.data.data.children.map((child) => {
            return child.data.display_name_prefixed
        });

        // Memorizza i risultati nella cache
        cache.set(q, subreddits);

        // Restituisce l'array di subreddit trovati
        return res.status(200).json({
            subreddits
        });

    } catch (error) {
        console.error('BACKEND: Errore generico del server', error.message);
        return res.status(500).json({
            message: MESSAGE.SERVER_ERROR,
        });
    }
}