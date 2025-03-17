import { useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { WeekTimeCard } from "../custom/TimeCard";
import { Loader2 } from "lucide-react";
import { useAppContext } from "../context/AppContext";

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
    const { dateTime, setDateTime } = useAppContext();

    const handleFetchData = async () => {
        if (!subreddit.trim()) return;

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
        if (subreddit.trim()) {
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

    const weekMap: { [key: string]: number } = {
        "Sunday": 0,
        "Monday": 1,
        "Tuesday": 2,
        "Wednesday": 3,
        "Thursday": 4,
        "Friday": 5,
        "Saturday": 6,
    };

    const formatTime = (hour: string) => {
        const hourInt = parseInt(hour, 10);
        const period = hourInt >= 12 ? "PM" : "AM";
        const formattedHour = hourInt % 12 === 0 ? 12 : hourInt % 12;
        return `${formattedHour}:00 ${period}`;
    };

    const is12HourFormat = localStorage.getItem("timeFormat") === "12h";

    const handleSetTime = (day: string, hour: string) => {
        const today = new Date();
        const currentDayIndex = today.getDay();
        const targetDayIndex = weekMap[day];

        if (targetDayIndex === undefined) {
            console.error("Giorno non valido:", day);
            return;
        }

        let daysToAdd = targetDayIndex - currentDayIndex;
        if (daysToAdd <= 0) {
            daysToAdd += 7;
        }

        const targetDate = new Date();
        targetDate.setDate(today.getDate() + daysToAdd);

        // Conversione dell'ora
        const [hourPart, period] = hour.split(" ");
        let hourNumber = parseInt(hourPart, 10);

        if (period === "PM" && hourNumber !== 12) {
            hourNumber += 12;
        } else if (period === "AM" && hourNumber === 12) {
            hourNumber = 0;
        }

        targetDate.setHours(hourNumber, 0, 0, 0);

        setDateTime(targetDate);
    };

    return (
        <div className="w-full h-auto flex flex-col md:flex-row md:flex-wrap gap-4">
            {loading ? (<Loader2 className="animate-spin" />) : (
                daysOfWeek.map((day) => {
                    const hasData = bestTimes && bestTimes[day];
                    const time = hasData ? is12HourFormat ? formatTime(bestTimes[day].hour) : `${bestTimes[day].hour}:00` : "No data avabile";
                    const score = hasData ? bestTimes[day].score.toFixed(0) : "No score";
                    return (
                        <WeekTimeCard
                            key={day}
                            dayOfWeek={day}
                            time={time}
                            score={score}
                            onClick={hasData ? () => handleSetTime(day, time) : undefined}
                            isCardSelected={
                                hasData &&
                                dateTime.getDay() === weekMap[day] &&
                                dateTime.getHours() === parseInt(bestTimes[day].hour, 10)
                            } />
                    );
                })
            )}
        </div>
    );
}