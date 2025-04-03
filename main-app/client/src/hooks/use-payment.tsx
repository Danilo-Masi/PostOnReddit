import axios from "axios";
import { checkData } from "./use-retrieve-data";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

export const getCheckout = async () => {
    const customerEmail = await checkData();
    if (!customerEmail) {
        console.log("Errore nel recupero dell'email dell'utente");
        return;
    }

    const authToken = await localStorage.getItem("authToken");
    if (!authToken) {
        console.log("Nessun token di autenticazione trovato");
        return;
    }

    try {
        const response = await axios.post(`${SERVER_URL}/payment/checkout`,
            { customerEmail },
            { headers: { "Content-Type": "application/json", Authorization: `Bearer ${authToken}`, } }
        );

        const checkoutUrl = response.data.checkoutUrl;

        if (checkoutUrl) {
            window.location.href = checkoutUrl;
        } else {
            console.error("Nessun URL di checkout ricevuto.");
        }

    } catch (error: any) {
        console.error(`Errore durante la richiesta della pagina di checkout: ${error.message}`);
    }
};