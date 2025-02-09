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

// Url del server
const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

export default function ProfileSettings() {

    const navigate: NavigateFunction = useNavigate();
    const [isRedditAuthorized, setRedditAuthorized] = useState<boolean>(false);

    useEffect(() => {
        const fetchAuthorizationStatus = async () => {
            const isAuthorized = await checkRedditAuthorization();
            setRedditAuthorized(isAuthorized);
        }
        fetchAuthorizationStatus();
    }, [isRedditAuthorized]);

    // Funzione per richiedre i permessi di Reddit
    const handleRequestPermits = async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                toast.error("User without permissions");
                navigate('/login');
                return;
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
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                toast.error("User without permissions");
                navigate('/login');
                return;
            }
            const response = await axios.delete(`${SERVER_URL}/supabase/delete-permissions`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                toast.success("Permissions removed successfully!");
                setRedditAuthorized(false);
            } else {
                toast.warning("Failed to remove permissions");
            }
        } catch (error: any) {
            console.error('CLIENT: Errore durante la richiesta eliminazione dei permessi', error.stack);
            toast.warning("An error occurred, please try again later");
        }
    }

    return (
        <CardBase
            cardTitle='Profile Settings'
            cardDescription='Manage your profile preferences'
            mdWidth="md:w-1/3 h-fit">
            <div className="w-full min-h-[50svh] flex justify-center items-center mb-3 rounded-xl bg-zinc-300 dark:bg-zinc-800">
                Coming Soon
            </div>
            {isRedditAuthorized ? (
                <Button
                    type="button"
                    className="w-full bg-red-500 hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600 dark:text-zinc-50"
                    onClick={() => handleRemovePermits()}>
                    <KeySquare />
                    Revoke Reddit Permissions
                </Button>
            ) : (
                <Button
                    type="button"
                    className="w-full bg-orange-500 hover:bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-600 dark:text-zinc-50"
                    onClick={() => handleRequestPermits()}>
                    <KeySquare />
                    Request Reddit Permissions
                </Button>
            )}
        </CardBase>
    );
}
