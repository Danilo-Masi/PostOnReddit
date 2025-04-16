import axios from "axios";
import logger from "../../config/logger.mjs";
import { supabaseAdmin } from '../../config/supabase.mjs';
import { validateToken } from "../services/validateToken.mjs";
import { sendEmail } from "../services/sendEmail.mjs";

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
                success_url: `${process.env.SUCCESS_URL}`,
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

        // Verify the user exists before updating
        const { data: userData, error: userError } = await supabaseAdmin
            .from('profiles')
            .select('id, ispro')
            .eq('id', request_id)
            .single();

        if (userError) {
            logger.error(`Errore nel recupero dei dati utente: ${userError.message}`);
            sendEmail("danilomasi999@gmail.com", `Errore nel recupero dei dati utente con id: ${request_id} - creem-checkout-controller.mjs`, userError.message);
            return res.redirect(`${process.env.FRONTEND_URL}/payment-error?error=user_not_found`);
        }

        if (!userData) {
            logger.error(`Utente non trovato con ID: ${request_id}`);
            sendEmail("danilomasi999@gmail.com", `Errore nel recupero dei dati utente con id: ${request_id} - creem-checkout-controller.mjs`, userError.message);
            return res.redirect(`${process.env.FRONTEND_URL}/payment-error?error=user_not_found`);
        }

        // Check if user is already pro to prevent duplicate charges
        if (userData.ispro) {
            logger.info(`Utente ${request_id} è già pro, reindirizzamento alla pagina di successo`);
            sendEmail("danilomasi999@gmail.com", `Errore nel recupero dei dati utente con id: ${request_id} - creem-checkout-controller.mjs`, userError.message);
            return res.redirect(`${process.env.FRONTEND_URL}/payment-success?status=already_pro`);
        }

        // Update user to pro status
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
            sendEmail("danilomasi999@gmail.com", `Errore nell'aggiornamento dei dati utente con id: ${request_id} - creem-checkout-controller.mjs`, error.message);
            return res.redirect(`${process.env.FRONTEND_URL}/payment-error?error=update_failed`);
        }

        if (!data || data.length === 0) {
            logger.error(`Aggiornamento fallito per l'utente con ID: ${request_id}`);
            sendEmail("danilomasi999@gmail.com", `Errore nell'aggiornamento dei dati utente con id: ${request_id} - creem-checkout-controller.mjs`, error.message);
            return res.redirect(`${process.env.FRONTEND_URL}/payment-error?error=update_failed`);
        }

        // Verify the update was successful
        const { data: verifyData, error: verifyError } = await supabaseAdmin
            .from('profiles')
            .select('ispro')
            .eq('id', request_id)
            .single();

        if (verifyError || !verifyData || !verifyData.ispro) {
            logger.error(`Verifica fallita per l'utente con ID: ${request_id}`);
            sendEmail("danilomasi999@gmail.com", `Errore nella verifica dell'aggiornamento dei dati utente con id: ${request_id} - creem-checkout-controller.mjs`, error.message);
            return res.redirect(`${process.env.FRONTEND_URL}/payment-error?error=verification_failed`);
        }

        // Log successful payment
        logger.info(`Pagamento completato con successo per l'utente: ${request_id}`);
        sendEmail("danilomasi999@gmail.com", `Pagamento completato con successo per l'utente con id: ${request_id} - creem-checkout-controller.mjs`, `Pagamento completato con successo per l'utente: ${request_id}`);

        // Redirect to success page with transaction ID
        return res.redirect(`${process.env.FRONTEND_URL}/payment-success`);

    } catch (error) {
        logger.error(`Errore nella gestione della callback di successo: ${error.message}`);
        return res.redirect(`${process.env.FRONTEND_URL}/payment-error?error=server_error`);
    }
};