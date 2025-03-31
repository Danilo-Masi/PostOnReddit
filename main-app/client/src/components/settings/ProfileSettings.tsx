import { useEffect, useState, useCallback, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { checkRedditAuthorization } from "@/hooks/use-retrieve-data";
import axios from "axios";
import { format, toZonedTime } from "date-fns-tz";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button";
import { toast } from "sonner";
import { KeySquare, Timer } from "lucide-react";
import CardBase from "../custom/CardBase";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

interface RedditPermissionButtonProps {
    isAuthorized: boolean;
    onRevoke: () => void;
    onRequest: () => void;
}

// Componente per il pulsante di autorizzazione Reddit
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

interface TimeFormatButtonProps {
    is24HourFormat: boolean;
    set24HourFormat: Dispatch<SetStateAction<boolean>>;
}

// Componente per cambiare il formato dell'orario visualizzato
const TimeFormatButton = ({ is24HourFormat, set24HourFormat }: TimeFormatButtonProps) => {
    const handleSwitchFormat = () => {
        set24HourFormat(prevFormat => {
            const newFormat = !prevFormat;
            localStorage.setItem("timeFormat", newFormat ? "24h" : "12h");
            return newFormat;
        })
    }
    return (
        <div className="w-full h-auto flex flex-col gap-y-2 mb-6">
            <Button
                className="w-full"
                onClick={handleSwitchFormat}>
                <Timer />
                {is24HourFormat ? "Switch to AM/PM" : "Switch to 24h Format"}
            </Button>
        </div>
    );
}

// Componente per cambiare il fuso orario della data visualizzata
const TimeZoneDropdown = () => {
    const [timeZone, setTimeZone] = useState(() =>
        localStorage.getItem("userTimeZone") || Intl.DateTimeFormat().resolvedOptions().timeZone
    );
    // Lista dei fusi orari disponibili
    const timeZones = [
        "UTC", "America/New_York", "America/Los_Angeles",
        "Europe/London", "Europe/Rome", "Asia/Tokyo",
        "Asia/Singapore", "Australia/Sydney"
    ];
    // Aggiorna il fuso orario selezionato e salva in localStorage
    const handleChange = (newTimeZone: string) => {
        setTimeZone(newTimeZone);
        localStorage.setItem("userTimeZone", newTimeZone);
    };
    // Mostra l'orario attuale nel fuso selezionato
    const now = new Date();
    const localTime = format(toZonedTime(now, timeZone), "HH:mm zzz", { timeZone });
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="w-full mb-6" aria-label={`Selected time zone: ${timeZone}`}>
                    {timeZone} ({localTime})
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 max-h-64 overflow-y-auto">
                <DropdownMenuLabel>Time zone</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={timeZone} onValueChange={handleChange}>
                    {timeZones.map((tz: string) => (
                        <DropdownMenuRadioItem
                            key={tz}
                            value={tz}
                            className={`cursor-pointer ${tz === timeZone ? "font-bold text-gray-900 dark:text-gray-100" : "text-gray-600 dark:text-gray-400"}`}>
                            {tz} ({format(toZonedTime(now, tz), "HH:mm")})
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default function ProfileSettings() {
    const navigate = useNavigate();
    const [isRedditAuthorized, setRedditAuthorized] = useState<boolean>(false);
    const [is24HourFormat, set24HourFormat] = useState<boolean>(() => {
        return localStorage.getItem("timeFormat") === "12h" ? false : true;
    });

    // Controlla lo stato dell'autorizzazione dei permessi di Reddit
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

    return (
        <CardBase cardTitle="Profile Settings" cardDescription="Manage your profile preferences" mdWidth="md:w-1/3 h-fit">
            <TimeZoneDropdown />
            <TimeFormatButton is24HourFormat={is24HourFormat} set24HourFormat={set24HourFormat} />
            <p className="text-sm text-zinc-500 mb-3">
                *Changing the time format or time zone will only adjust how times are displayed. It won’t affect post creation, scheduling, or how the app functions, everything will continue to work as expected.
            </p>
            <RedditPermissionButton isAuthorized={isRedditAuthorized} onRevoke={handleRemovePermits} onRequest={handleRequestPermits} />
        </CardBase>
    );
}