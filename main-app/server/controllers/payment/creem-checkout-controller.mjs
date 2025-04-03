import axios from "axios";
import logger from "../../config/logger.mjs";
import { supabaseAdmin } from '../../config/supabase.mjs';
import { validateToken } from "../services/validateToken.mjs";

export const createCheckoutSession = async (req, res) => {
    try {
        const { customerEmail } = req.body;

        if (!customerEmail) {
            return res.status(400).json({ error: "Email cliente mancante." });
        }

        const authHeader = req.headers['authorization'];
        const user_id = await validateToken(authHeader);

        const response = await axios.post(
            "https://test-api.creem.io/v1/checkouts",
            {
                product_id: process.env.CREEM_PRODUCT_ID,
                request_id: user_id,
                success_url: `${process.env.SUCCESS_URL_TEST}`,
                customer: { email: customerEmail },
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

export const handleSuccessCallback = async (req, res) => {
    try {
        const { request_id } = req.query;

        if (!request_id) {
            logger.error("Request ID mancante nella callback di successo");
            return res.redirect(`${process.env.FRONTEND_URL}/payment-error?error=missing_request_id`);
        }

        const { data, error } = await supabaseAdmin
            .from('profiles')
            .update({
                ispro: true,
                pro_since: new Date().toISOString()
            })
            .eq('id', request_id)
            .select();

        if (error) {
            logger.error(`Errore nell'aggiornamento dei dati utente: ${error.message}`);
            return res.redirect(`${process.env.FRONTEND_URL}/payment-error`);
        }

        if (!data || data.length === 0) {
            logger.error(`Utente non trovato con ID: ${request_id}`);
            return res.redirect(`${process.env.FRONTEND_URL}/payment-error`);
        }

        return res.redirect(`${process.env.FRONTEND_URL}/payment-success`);

    } catch (error) {
        logger.error(`Errore nella gestione della callback di successo: ${error.message}`);
        return res.redirect(`${process.env.FRONTEND_URL}/payment-error`);
    }
};