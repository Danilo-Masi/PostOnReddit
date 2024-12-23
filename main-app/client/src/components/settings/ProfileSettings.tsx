// React
import { useEffect, useState } from "react";
// React-router
import { NavigateFunction, useNavigate } from "react-router-dom";
// Axios
import axios from "axios";
// Hooks
import { checkRedditAuthorization } from "@/hooks/use-retrieve-data";
// Shadncui
import { Button } from "../ui/button";
// Icons
import { KeySquare } from "lucide-react";
// Components
import CardBase from '../custom/CardBase';

// Url del server di produzione
const SERVER_URL = 'http://localhost:3000';

export default function ProfileSettings() {

    const navigate: NavigateFunction = useNavigate();
    const [isRedditAuthorized, setRedditAuthorized] = useState<boolean>(false);

    useEffect(() => {
        const fetchAuthorizationStatus = async () => {
            const isAuthorized = await checkRedditAuthorization();
            setRedditAuthorized(isAuthorized);
        }
        fetchAuthorizationStatus();
    }, []);

    // Funzione per richiedre i permessi di Reddit
    const handleRequestPermits = async () => {
        try {
            // Preleva il token dal localStorage
            const token = localStorage.getItem('authToken');
            // Verifica che il token sia esistente e valido
            if (!token) {
                alert('Utente senza permessi') //DA MODIFICARE
                navigate('/login');
            }
            // Chiamata all'endpoint
            const response = await axios.get(`${SERVER_URL}/api/reddit-redirect`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            // Url di redirect
            const { redirectUrl } = response.data;
            window.location.href = redirectUrl;
        } catch (error: any) {
            // Gestisce l'errore in cui l'utente abbia già dato i permessi
            if (error.response && error.response.status === 400) {
                alert('L\'utente ha già autorizzato i permessi'); //DA MODIFICARE
            } else {
                console.error('CLIENT: Errore durante la richiesta di login Reddit:', error.message);
                alert('Si è verificato un errore, per favore riprova più tardi'); //DA MODIFICARE
            }
        }
    };

    // Funzione per rimuovere i permessi di Reddit
    const handleRemovePermits = async () => {
        alert('Rimuovi i permssi di Reddit');
    }

    return (
        <CardBase
            cardTitle='Profile settings'
            cardDescription='Configure your profile'
            mdWidth="md:w-1/3">
            <div className="w-full h-full min-h-[60svh] flex items-center justify-center rounded-xl mb-3 bg-zinc-200">
                Cooming soon
            </div>
            {isRedditAuthorized ? (
                <Button
                    type="button"
                    className="w-full bg-red-500 hover:bg-red-600"
                    onClick={() => handleRemovePermits()}>
                    <KeySquare />
                    Remove permission to Reddit
                </Button>
            ) : (
                <Button
                    type="button"
                    className="w-full bg-buttonColor hover:bg-buttonHoverColor"
                    onClick={() => handleRequestPermits()}>
                    <KeySquare />
                    Permissions Reddit
                </Button>
            )}
        </CardBase>
    );
}
