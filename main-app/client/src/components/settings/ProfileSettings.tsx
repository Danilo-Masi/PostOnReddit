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
import { toast } from "sonner";
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
            const token = localStorage.getItem('authToken');
            if (!token) {
                toast.error("User without permissions");
                navigate('/login');
            }
            const response = await axios.get(`${SERVER_URL}/api/reddit-redirect`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                const { redirectUrl } = response.data;
                window.location.href = redirectUrl;
            }
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                toast.warning("The user has already granted permissions");
            } else {
                console.error('CLIENT: Errore durante la richiesta di login Reddit:', error.stack);
                toast.warning("An error occurred, please try again later");
            }
        }
    };

    // Funzione per rimuovere i permessi di Reddit
    const handleRemovePermits = async () => {
        toast.error("Remove Reddit permissions, YOU IDIOT");
    }

    return (
        <CardBase
            cardTitle='Profile settings'
            cardDescription='Configure your profile'
            mdWidth="md:w-1/3">
            <div className="flex justify-center items-center bg-zinc-200 mb-3 rounded-xl w-full h-full min-h-[60svh]">
                Cooming soon
            </div>
            {isRedditAuthorized ? (
                <Button
                    type="button"
                    className="bg-red-500 hover:bg-red-600 w-full"
                    onClick={() => handleRemovePermits()}>
                    <KeySquare />
                    Remove permission to Reddit
                </Button>
            ) : (
                <Button
                    type="button"
                    className="bg-buttonColor hover:bg-buttonHoverColor w-full"
                    onClick={() => handleRequestPermits()}>
                    <KeySquare />
                    Permissions Reddit
                </Button>
            )}
        </CardBase>
    );
}
