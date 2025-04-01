import axios from "axios";
import logger from "../../config/logger.mjs";

export const getRedirectUrl = async (req, res) => {
    try {

        logger.info(`Richiesta di checkout a Creem: Product ID: ${productId}`);

        const response = await axios.post(
            "https://api.creem.io/v1/checkouts",
            { product_id: productId },
            { headers: { "x-api-key": apiKey } }
        );

        logger.info(`Risposta ricevuta da Creem: ${JSON.stringify(response.data)}`);

        if (!response.data || !response.data.url) {
            throw new Error("URL di checkout non ricevuto da Creem.");
        }

        return res.redirect(response.data.url);
    } catch (error) {
        if (error.response) {
            // Errore ricevuto da Creem (es. 403, 400, ecc.)
            logger.error(
                `Errore API Creem - Status: ${error.response.status}, Data: ${JSON.stringify(error.response.data)}`
            );
        } else if (error.request) {
            // Nessuna risposta ricevuta
            logger.error(`Errore di rete: nessuna risposta da Creem - ${error.message}`);
        } else {
            // Altro tipo di errore (es. errore nella costruzione della richiesta)
            logger.error(`Errore sconosciuto - ${error.stack || error.message}`);
        }

        return res.status(500).send("Errore nel checkout");
    }
};