import axios from "axios";
import NodeCache from 'node-cache';

const MESSAGE = {
    INVALID_QUERY: "La query della richiesta non è valida",
    API_ERROR: 'Errore durante la chiamata all\'API',
    ARRAY_ERROR: 'La struttura della risposta ottenuta non è valida',
    SERVER_ERROR: "Errore generico del server",
}

// Cache con scadenza di 5 minuti
const cache = new NodeCache({ stdTTL: 300 });

export const searchFlair = async (req, res) => {
    // Preleva la query di ricerca inserita dall'utente
    const { q } = req.query;

    // Verifica che la query sia valida
    if (!q) {
        console.error('BACKEND: La query della richiesta del flair non è valida');
        return res.status(400).json({
            message: MESSAGE.INVALID_QUERY,
        });
    }

    // Elimina la `/r` dalla query
    const subreddit = q.startsWith('r/') ? q.substring(2) : q;

    // Controlla se la query è già presente nella cache
    const cachedFlags = cache.get(subreddit);
    if (cachedFlags) {
        return res.status(200).json({
            flags: cachedFlags,
        });
    }

    try {
        // Invia la richiesta all'API di Reddit
        const response = await axios.get(`https://oauth.reddit.com/r/${subreddit}/api/user_flair_v2`, {
            headers: {
                Authorization: `Bearer ${USER_TOKEN}`,
                'User-Agent': 'POR/1.0.0',
            }
        });

        console.log("STATO DELLA RISPOSTA: ", response.status); //LOG
        console.log("ENDPOINT NON FUNZIONANTE"); //LOG

        if (response.status === 200) {
            // Accede ai dati della risposta
            const flairChoices = response.data.choices;

            // Verifica che la risposta sia un array
            if (!Array.isArray(flairChoices)) {
                console.error("BACKEND: Nessun array trovato nella risposta dell'API.");
                return res.status(500).json({
                    message: MESSAGE.ARRAY_ERROR,
                });
            }

            // Estrai le flair dalla risposta
            const flair = flairChoices.map(choice => choice.flair_text);

            // Memorizza i risultati nella cache
            cache.set(subreddit, flair);

            // Ritorna l'array di flair
            return res.status(200).json({
                flair,
            });

        } else {
            return res.status(response.status).json({
                message: MESSAGE.API_ERROR,
            });
        }
    } catch (error) {
        console.error('BACKEND: Errore generico del server', error.message);
        return res.status(500).json({
            message: MESSAGE.SERVER_ERROR,
        });
    }
}