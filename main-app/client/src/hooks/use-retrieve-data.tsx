// Axios
import axios from "axios";

// Url del server
const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

// Funzione per caricare i dati di un utente dal DB
export const checkData = async () => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('Token mancante');
            localStorage.removeItem('authToken');
            return null;
        }

        const response = await axios.get(`${SERVER_URL}/supabase/retrieve-data`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            return response.data.email;
        } else {
            console.error('Errore nel recupero dei dati dal DB: ', response.data);
            return null;
        }

    } catch (error: any) {
        console.error('Errore generico del Server: ', error.stack);
        return null;
    }
}

// Funzione per verificare se sono presenti i permessi per accedere a Reddit
export const checkRedditAuthorization = async () => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('CLIENT: Token mancante');
            localStorage.removeItem('authToken');
            return null;
        }

        const response = await axios.get(`${SERVER_URL}/supabase/check-reddit-authorization`, {
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
        console.error('CLIENT: Errore generico del server', error.stack);
        return false;
    }
}
