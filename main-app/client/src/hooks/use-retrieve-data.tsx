// Axios
import axios from "axios";

// Url del server di produzione
const SERVER_URL = 'http://localhost:3000';

export const checkData = async () => {
    try {
        const token = localStorage.getItem('authToken');

        if (!token) {
            console.error('CLIENT: Token mancante');
            localStorage.removeItem('authToken');
            return null;
        }

        const response = await axios.get(`${SERVER_URL}/retrieve-data`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            return response.data.data;
        } else {
            console.error('CLIENT: Errore nel recupero dei dati dal DB', response.status);
            return null
        }

    } catch (error: any) {
        console.error('CLIENT: Errore generico del server', error.stack);
        return null;
    }
}

export const checkRedditAuthorization = async () => {
    try {
        const token = localStorage.getItem('authToken');

        if (!token) {
            console.error('CLIENT: Token mancante');
            localStorage.removeItem('authToken');
            return null;
        }

        const response = await axios.get(`${SERVER_URL}/check-reddit-authorization`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });

        if (response.status === 200 && typeof response.data.isAuthorized !== 'undefined') {
            return response.data.isAuthorized;
        } else {
            console.error('CLIENT: Errore nel recuper dei dati dal DB', response.status);
            return false;
        }
    } catch (error: any) {
        console.error('CLIENT: Errore generico del server', error.message);
        return false;
    }
}
