import { useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { DailyTimeCard } from "../custom/TimeCard";
import { Loader2 } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { format, toZonedTime } from "date-fns-tz";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

interface DailyTimeProps {
    subreddit: string;
}

export default function DailyTime({ subreddit }: DailyTimeProps) {
    const navigate: NavigateFunction = useNavigate();
    const [bestTimes, setBestTimes] = useState<{ hour: string, score: number }[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { dateTime, setDateTime } = useAppContext();

    const handleFetchData = async () => {
        if (!subreddit || subreddit.trim() === "") return;
        const token = localStorage.getItem('authToken');
        if (!token) {
            toast.error("User without permissions");
            navigate('/login');
            return;
        }
        setLoading(true);
        try {
            const response = await axios.get(`${SERVER_URL}/api/reddit-bestDayTime`, {
                params: { q: subreddit },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status !== 200 || !response.data.bestTimes) {
                toast.info("The subreddit doesn't have available data");
                setBestTimes([]);
                return;
            }
            setBestTimes(response.data.bestTimes);
        } catch (error: any) {
            console.error("Errore durante il caricamento dei dati:", error.message);
            toast.error("Errore nel caricamento dei dati");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (subreddit && subreddit.trim() !== "") {
            handleFetchData();
        }
    }, [subreddit]);

    const formatTime = (hour: string) => {
        const userTimeZone = localStorage.getItem("userTimeZone") || "UTC";
        const is12HourFormat = localStorage.getItem("timeFormat") === "12h";
        // Converti l'ora da UTC al fuso selezionato
        const utcDate = new Date();
        utcDate.setUTCHours(parseInt(hour, 10), 0, 0, 0);
        const zonedDate = toZonedTime(utcDate, userTimeZone);
        // Formattazione dinamica in base alle preferenze utente
        const timeFormat = is12HourFormat ? "hh:mm a" : "HH:mm";
        return format(zonedDate, timeFormat, { timeZone: userTimeZone });
    }

    const handleSetTime = (hour: string) => {
        const userTimeZone = localStorage.getItem("userTimeZone") || "UTC";
        const now = new Date();
        const zonedDate = toZonedTime(now, userTimeZone);
        zonedDate.setHours(parseInt(hour, 10), 0, 0, 0);
        setDateTime(zonedDate);
    }

    const getOrdinalSuffix = (n: number) => {
        if (n % 100 >= 11 && n % 100 <= 13) return `${n}th`;
        switch (n % 10) {
            case 1: return `${n}st`;
            case 2: return `${n}nd`;
            case 3: return `${n}rd`;
            default: return `${n}th`;
        }
    };

    return (
        <div className="w-full h-auto flex flex-col md:flex-row md:flex-wrap gap-4">
            {loading && <Loader2 className="animate-spin" />}

            {!loading && bestTimes.length === 0 && (
                <>
                    <DailyTimeCard place="1st place" time="No data available" score="No score" />
                    <DailyTimeCard place="2nd place" time="No data available" score="No score" />
                </>
            )}

            {!loading && bestTimes.length > 0 && bestTimes.map((time, index) => {
                const today = new Date();
                const isSameDay = dateTime.getDate() === today.getDate() &&
                    dateTime.getMonth() === today.getMonth() &&
                    dateTime.getFullYear() === today.getFullYear();
                const isSameHour = dateTime.getHours() === parseInt(time.hour, 10);

                return (
                    <DailyTimeCard
                        key={index}
                        place={`${getOrdinalSuffix(index + 1)} place`}
                        time={formatTime(time.hour)}
                        score={time.score.toFixed(0)}
                        onClick={() => handleSetTime(time.hour)}
                        isCardSelected={isSameDay && isSameHour}
                    />
                );
            })}
        </div>
    );
}