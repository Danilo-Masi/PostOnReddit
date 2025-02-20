import { useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { WeekTimeCard } from "../custom/TimeCard";
import { Loader2 } from "lucide-react";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

interface WeekTimeProps {
    subreddit: string;
}

interface BestTime {
    hour: string;
    score: number;
}

export default function WeekTime({ subreddit }: WeekTimeProps) {

    const navigate: NavigateFunction = useNavigate();
    const [bestTimes, setBestTimes] = useState<{ [day: string]: BestTime }>({});
    const [loading, setLoading] = useState<boolean>(false);

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
            const response = await axios.get(`${SERVER_URL}/api/reddit-bestWeekTime`, {
                params: { q: subreddit },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            console.warn(response);

            if (response.status !== 200 || !response.data.bestTimesByDay) {
                setBestTimes({});
                return;
            }

            const formattedData: { [day: string]: BestTime } = {};
            Object.entries(response.data.bestTimesByDay).forEach(([day, data]: [string, any]) => {
                if (data) {
                    formattedData[day] = { hour: data.hour.toString(), score: data.score };
                }
            });

            setBestTimes(formattedData);

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

    const daysOfWeek = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];

    const formatTime = (hour: string) => {
        const hourInt = parseInt(hour, 10);
        const period = hourInt >= 12 ? "PM" : "AM";
        const formattedHour = hourInt % 12 === 0 ? 12 : hourInt % 12;
        return `${formattedHour}:00 ${period}`;
    }

    return (
        <div className="w-full h-auto flex flex-col md:flex-row md:flex-wrap gap-4">
            {loading ? (
                <Loader2 className="animate-spin" />
            ) : Object.keys(bestTimes).length === 0 ? (
                daysOfWeek.map((day) => (
                    <WeekTimeCard
                        key={day}
                        dayOfWeek={day}
                        time="N/A"
                        score="N/A"
                    />
                ))
            ) : (
                daysOfWeek.map((day) => (
                    <WeekTimeCard
                        key={day}
                        dayOfWeek={day}
                        time={formatTime(bestTimes[day]?.hour) || "N/A"}
                        score={bestTimes[day]?.score.toFixed(0) || "0"}
                    />
                ))
            )}
        </div>
    );
}