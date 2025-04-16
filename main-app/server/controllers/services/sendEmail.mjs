import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (email, subject, message) => {
    const { data, error } = await resend.emails.send({
        from: "Postonreddit <support@postonreddit.com>",
        to: email,
        subject: subject,
        text: message,
    });

    if (error) {
        logger.error(`Errore nell'invio dell'email: ${error.message || error}`);
        throw new Error("Errore nell'invio dell'email");
    }

    return data;
};
