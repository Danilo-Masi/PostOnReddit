// Axios
import axios from "axios";

// Url del server di produzione
const SERVER_URL = 'http://localhost:3000';

export const checkToken = async () => {

    const token = localStorage.getItem('authToken');
    if (!token) {
        return false;
    }

    try {
        const response = await axios.get(`${SERVER_URL}/verify-token`, {
            headers: { Authorization: `Barer ${token}` }
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
