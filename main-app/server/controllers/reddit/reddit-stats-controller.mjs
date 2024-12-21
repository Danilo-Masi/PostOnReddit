import axios from "axios";

const ACCESS_TOKEN = "";

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
        console.error("BACKEND: Errore durante l'analisi del traffico:", error.message);
    }
}