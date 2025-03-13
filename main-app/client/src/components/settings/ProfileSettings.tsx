import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { checkRedditAuthorization } from "@/hooks/use-retrieve-data";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { KeySquare, Timer } from "lucide-react";
import CardBase from "../custom/CardBase";

// Url del server
const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

// Componente per il pulsante di autorizzazione Reddit
interface RedditPermissionButtonProps {
    isAuthorized: boolean;
    onRevoke: () => void;
    onRequest: () => void;
}

const RedditPermissionButton = ({ isAuthorized, onRevoke, onRequest }: RedditPermissionButtonProps) => {
    const handleClick = useCallback(() => {
        isAuthorized ? onRevoke() : onRequest();
    }, [isAuthorized, onRevoke, onRequest]);

    return (
        <Button
            type="button"
            className={`w-full ${isAuthorized
                ? "bg-red-500 hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600"
                : "bg-orange-500 hover:bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-600"
                } dark:text-zinc-50`}
            onClick={handleClick} >
            <KeySquare />
            {isAuthorized ? "Revoke Reddit Permissions" : "Request Reddit Permissions"}
        </Button>
    );
};

export default function ProfileSettings() {
    const navigate = useNavigate();
    const [isRedditAuthorized, setRedditAuthorized] = useState<boolean>(false);
    const [is24HourFormat, set24HourFormat] = useState<boolean>(() => {
        return localStorage.getItem("timeFormat") === "12h" ? false : true;
    });

    // Controlla lo stato dell'autorizzazione una sola volta
    useEffect(() => {
        const fetchAuthorizationStatus = async () => {
            const isAuthorized = await checkRedditAuthorization();
            setRedditAuthorized(isAuthorized);
        };
        fetchAuthorizationStatus();
    }, []);

    // Funzione per richiedere i permessi di Reddit
    const handleRequestPermits = useCallback(async () => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                toast.error("User without permissions");
                navigate("/login");
                return;
            }
            const response = await axios.get(`${SERVER_URL}/api/reddit-redirect`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                window.location.href = response.data.redirectUrl;
            }
        } catch (error: any) {
            const status = error?.response?.status;
            toast.warning(status === 400 ? "The user has already granted permissions" : "An error occurred, please try again later");
        }
    }, [navigate]);

    // Funzione per rimuovere i permessi di Reddit
    const handleRemovePermits = useCallback(async () => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                toast.error("User without permissions");
                navigate("/login");
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
        } catch (error) {
            toast.warning("An error occurred, please try again later");
        }
    }, [navigate]);

    // Funzione per modificare il formato di visualizzazione dell'orario
    const handleSwitchFormat = () => {
        set24HourFormat(prevFormat => {
            const newFormat = !prevFormat;
            localStorage.setItem("timeFormat", newFormat ? "24h" : "12h");
            return newFormat;
        })
    }

    return (
        <CardBase cardTitle="Profile Settings" cardDescription="Manage your profile preferences" mdWidth="md:w-1/3 h-fit">
            <div className="w-full h-auto flex flex-col gap-y-2 mb-6">
                <Button
                    className="w-full"
                    onClick={handleSwitchFormat}>
                    <Timer />
                    {is24HourFormat ? "Switch to AM/PM" : "Switch to 24h Format"}
                </Button>
                <p className="text-sm text-zinc-500">
                    *Changing the time format affects only the time display and does not impact the creation or scheduling of posts
                </p>
            </div>
            <RedditPermissionButton isAuthorized={isRedditAuthorized} onRevoke={handleRemovePermits} onRequest={handleRequestPermits} />
        </CardBase>
    );
}