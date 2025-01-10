import axios from "axios";

const ACCESS_TOKEN = "";

const MESSAGES = {
    CREDENTIAL_ERROR: "Richiesta non valida",
    SUPABASE_ERROR: "Errore di Supabase durante il caricamento dei dati",
    SERVER_ERROR: "Errore generico del server",
};

export const redditStats = async () => {
    try {
        const response = await axios.get(`https://www.reddit.com/api/v1/me`, {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
                "User-Agent": "test-app",
            },
        });
        console.log(response.data);
    } catch (error) {
        console.error("BACKEND: Errore generico del server: ", error.stack);
        return res.status(500).json({
            message: MESSAGES.SERVER_ERROR,
        });
    }
}