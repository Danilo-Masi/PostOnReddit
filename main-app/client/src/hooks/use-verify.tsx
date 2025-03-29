import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

// Funzione che verifica se l'access_token dell'utente è valido
export const checkToken = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('CLIENT: Token mancante');
        localStorage.removeItem('authToken');
        return false;
    }
    try {
        const response = await axios.get(`${SERVER_URL}/supabase/verify-token`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (response.status == 200) {
            return true;
        }
    } catch (error: any) {
        console.error('CLIENT: Errore generico del server', error.message);
        localStorage.removeItem('authToken');
        return false;
    }
}

// Funzione che verifica se l'utente è in versione pro
export const checkPlan = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('CLIENT: Token mancante');
        localStorage.removeItem('authToken');
        return false;
    }
    try {
        const response = await axios.get(`${SERVER_URL}/supabase/check-plan`, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 5000,
        });
        if (response.status === 200) {
            return response.data.isPro;
        }
        return false;
    } catch (error: any) {
        console.error('CLIENT: Errore generico del server', error.message);
        localStorage.removeItem('authToken');
        return false;
    }
}
