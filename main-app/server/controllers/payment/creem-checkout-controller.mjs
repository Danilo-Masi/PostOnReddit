import axios from "axios";
import logger from "../../config/logger.mjs";

export const createCheckoutSession = async (req, res) => {
    try {
        const { customerEmail } = req.body;

        if (!customerEmail) {
            return res.status(400).json({ error: "Email cliente mancante." });
        }

        const response = await axios.post(
            "https://test-api.creem.io/v1/checkouts",
            {
                product_id: process.env.CREEM_PRODUCT_ID,
                request_id: `checkout_${Date.now()}`,
                success_url: process.env.CREEM_SUCCESS_URL,
                customer: { email: customerEmail }
            },
            {
                headers: { "x-api-key": process.env.CREEM_API_KEY }
            }
        );

        return res.status(200).json({ checkoutUrl: response.data.checkout_url });

    } catch (error) {
        logger.error(`Errore nella creazione della sessione di checkout: ${error.message}`);
        return res.status(500).json({ error: "Errore nella creazione della sessione di checkout." });
    }
};