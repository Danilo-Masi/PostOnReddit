import { useEffect, useReducer, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { WeekTimeCard } from "../custom/TimeCard";
import { Goal, Loader2 } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { format, toZonedTime } from "date-fns-tz";
import { checkPlan } from "@/hooks/use-verify";
import { Button } from "../ui/button";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

interface BestTime {
    hour: string;
    score: number;
}

type State = {
    bestTimes: { [day: string]: BestTime };
    loading: boolean;
};

type Action =
    | { type: 'SET_BEST_TIMES', payload: { [day: string]: BestTime } }
    | { type: 'SET_LOADING', payload: boolean };

const initialState: State = {
    bestTimes: {},
    loading: false,
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_BEST_TIMES':
            return { ...state, bestTimes: action.payload };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        default:
            return state;
    }
};

export default function WeekTime({ subreddit }: { subreddit: string }) {
    const navigate: NavigateFunction = useNavigate();
    const [state, dispatch] = useReducer(reducer, initialState);
    const { setDateTime } = useAppContext();
    const [isPro, setIsPro] = useState<boolean>(false);

    useEffect(() => {
        const fetchPlanStatus = async () => {
            const planStatus = await checkPlan();
            setIsPro(planStatus);
        };
        fetchPlanStatus();
    }, []);

    const handleFetchData = async () => {
        if (!subreddit.trim()) return;

        const cachedData = sessionStorage.getItem(`bestTimes-${subreddit}`);
        if (cachedData) {
            dispatch({ type: 'SET_BEST_TIMES', payload: JSON.parse(cachedData) });
            return;
        }

        const token = localStorage.getItem('authToken');
        if (!token) {
            toast.error("User without permissions");
            navigate('/login');
            return;
        }

        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const response = await axios.get(`${SERVER_URL}/api/reddit-bestWeekTime`, {
                params: { q: subreddit },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status !== 200 || !response.data.bestTimesByDay) {
                dispatch({ type: 'SET_BEST_TIMES', payload: {} });
                return;
            }
            const formattedData: { [day: string]: BestTime } = {};
            Object.entries(response.data.bestTimesByDay).forEach(([day, data]: [string, any]) => {
                if (data) {
                    formattedData[day] = { hour: data.hour.toString(), score: data.score };
                }
            });
            dispatch({ type: 'SET_BEST_TIMES', payload: formattedData });
            sessionStorage.setItem(`bestTimes-${subreddit}`, JSON.stringify(formattedData));
        } catch (error: any) {
            console.error(`Errore durante il caricamento dei dati: ${error.message || error}`);
            toast.error("Errore nel caricamento dei dati");
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    useEffect(() => {
        if (subreddit.trim() && isPro) {
            handleFetchData();
        }
    }, [subreddit, isPro]);

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
        const userTimeZone = localStorage.getItem("userTimeZone") || Intl.DateTimeFormat().resolvedOptions().timeZone;
        const is12HourFormat = localStorage.getItem("timeFormat") === "12h";
        const utcDate = new Date();
        utcDate.setUTCHours(parseInt(hour, 10), 0, 0, 0);
        const zonedDate = toZonedTime(utcDate, userTimeZone);
        const timeFormat = is12HourFormat ? "hh:mm a" : "HH:mm";
        return format(zonedDate, timeFormat, { timeZone: userTimeZone });
    };

    const parseHour = (hour: string) => {
        const [hourPart, period] = hour.split(" ");
        let hourNumber = parseInt(hourPart, 10);
        if (period === "PM" && hourNumber !== 12) {
            hourNumber += 12;
        } else if (period === "AM" && hourNumber === 12) {
            hourNumber = 0;
        }
        return hourNumber;
    };

    const handleSetTime = (day: string, hour: string) => {
        const today = new Date();
        const currentDayIndex = today.getDay();
        const targetDayIndex = weekMap[day];

        if (targetDayIndex === undefined) {
            console.error(`Giorno non valido: ${day}`);
            return;
        }

        let daysToAdd = targetDayIndex - currentDayIndex;
        if (daysToAdd <= 0) {
            daysToAdd += 7;
        }

        const targetDate = new Date();
        targetDate.setDate(today.getDate() + daysToAdd);
        targetDate.setHours(parseHour(hour), 0, 0, 0);

        setDateTime(targetDate);
    };

    return (
        <div className="w-full h-auto flex flex-col md:flex-row md:flex-wrap gap-4">
            {!isPro ? (
                <div className="w-full min-h-[40svh] md:min-h-[25svh] flex justify-center items-center bg-zinc-200 rounded-lg">
                    <Button>
                        Become pro to access this data
                        <Goal />
                    </Button>
                </div>
            ) : state.loading ? (<Loader2 className="animate-spin" />) : (
                <>
                    {daysOfWeek.map((day) => {
                        const hasData = state.bestTimes && state.bestTimes[day];
                        const time = hasData ? formatTime(state.bestTimes[day].hour) : "No data available";
                        const score = hasData ? state.bestTimes[day].score.toFixed(0) : "No score";
                        return (
                            <WeekTimeCard
                                key={day}
                                dayOfWeek={day}
                                time={time}
                                score={score}
                                onClick={hasData ? () => handleSetTime(day, time) : undefined} />
                        );
                    })}
                </>
            )}
        </div>
    );
}