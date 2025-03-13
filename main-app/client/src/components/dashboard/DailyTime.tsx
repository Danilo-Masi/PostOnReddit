import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { DailyTimeCard } from "../custom/TimeCard";
import { Loader2 } from "lucide-react";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

interface DailyTimeProps {
    subreddit: string;
    setDateTime: Dispatch<SetStateAction<Date>>;
}

export default function DailyTime({ subreddit, setDateTime }: DailyTimeProps) {
    const navigate: NavigateFunction = useNavigate();
    const [bestTimes, setBestTimes] = useState<{ hour: string, score: number }[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedHour, setSelectedHour] = useState<string | null>(null);

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
        const hourInt = parseInt(hour, 10);
        const period = hourInt >= 12 ? "PM" : "AM";
        const formattedHour = hourInt % 12 === 0 ? 12 : hourInt % 12;
        return `${formattedHour}:00 ${period}`;
    }

    const handleSetTime = (hour: string) => {
        const now = new Date();
        now.setHours(parseInt(hour, 10), 0, 0, 0);
        setDateTime(now);
        // Salva l'ora selezionata
        setSelectedHour(hour);
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

    const is12HourFormat = localStorage.getItem("timeFormat") === "12h";

    return (
        <div className="w-full h-auto flex flex-col md:flex-row md:flex-wrap gap-4">
            {loading && <Loader2 className="animate-spin" />}

            {!loading && bestTimes.length === 0 && (
                <>
                    <DailyTimeCard place="1st place" time="N/A" score="N/A" />
                    <DailyTimeCard place="2nd place" time="N/A" score="N/A" />
                </>
            )}

            {!loading && bestTimes.length > 0 && bestTimes.map((time, index) => (
                <DailyTimeCard
                    key={index}
                    place={`${getOrdinalSuffix(index + 1)} place`}
                    time={is12HourFormat ? formatTime(time.hour) : `${time.hour}:00`}
                    score={time.score.toFixed(0)}
                    onClick={() => handleSetTime(time.hour)}
                    isCardSelected={selectedHour === time.hour}
                />
            ))}
        </div>
    );
}