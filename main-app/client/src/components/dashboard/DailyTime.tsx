import { useEffect, useReducer } from "react";
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

interface State {
    bestTimes: { hour: string, score: number }[];
    loading: boolean;
}

const initialState: State = {
    bestTimes: [],
    loading: false,
};

function reducer(state: State, action: { type: string; payload?: any }): State {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_BEST_TIMES':
            return { ...state, bestTimes: action.payload };
        default:
            return state;
    }
}

export default function DailyTime({ subreddit }: DailyTimeProps) {
    const navigate: NavigateFunction = useNavigate();
    const [state, dispatch] = useReducer(reducer, initialState);
    const { setDateTime } = useAppContext();

    const handleFetchData = async () => {
        if (!subreddit || subreddit.trim() === "") return;

        const token = localStorage.getItem('authToken');
        if (!token) {
            toast.error("User without permissions");
            navigate('/login');
            return;
        }

        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const cachedData = sessionStorage.getItem(`bestTimes_${subreddit}`);
            if (cachedData) {
                dispatch({ type: 'SET_BEST_TIMES', payload: JSON.parse(cachedData) });
                return;
            }

            const response = await axios.get(`${SERVER_URL}/api/reddit-bestDayTime`, {
                params: { q: subreddit },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status !== 200 || !response.data.bestTimes) {
                toast.info("The subreddit doesn't have available data");
                dispatch({ type: 'SET_BEST_TIMES', payload: [] });
                return;
            }

            sessionStorage.setItem(`bestTimes_${subreddit}`, JSON.stringify(response.data.bestTimes));
            dispatch({ type: 'SET_BEST_TIMES', payload: response.data.bestTimes });

        } catch (error: any) {
            console.error("Errore durante il caricamento dei dati:", error.message);
            toast.error("Error loading the data");
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    useEffect(() => {
        if (subreddit && subreddit.trim() !== "") {
            const cachedData = sessionStorage.getItem(`bestTimes_${subreddit}`);
            if (!cachedData) {
                handleFetchData();
            } else {
                dispatch({ type: 'SET_BEST_TIMES', payload: JSON.parse(cachedData) });
            }
        }
    }, [subreddit]);

    const formatTime = (hour: string) => {
        const userTimeZone = localStorage.getItem("userTimeZone") || Intl.DateTimeFormat().resolvedOptions().timeZone;
        const is12HourFormat = localStorage.getItem("timeFormat") === "12h";
        const utcDate = new Date();
        utcDate.setUTCHours(parseInt(hour, 10), 0, 0, 0);
        
        const zonedDate = toZonedTime(utcDate, userTimeZone);
        const timeFormat = is12HourFormat ? "hh:mm a" : "HH:mm";
        return format(zonedDate, timeFormat, { timeZone: userTimeZone });
    };

    const handleSetTime = (hour: string) => {
        const now = new Date();
        now.setUTCHours(parseInt(hour, 10), 0, 0, 0);
        setDateTime(now);
    };

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
            {state.loading && <Loader2 className="animate-spin" />}

            {!state.loading && state.bestTimes.length === 0 && (
                <>
                    <DailyTimeCard place="1st place" time="No data available" score="No score" />
                    <DailyTimeCard place="2nd place" time="No data available" score="No score" />
                </>
            )}

            {!state.loading && state.bestTimes.length > 0 && state.bestTimes.map((time, index) => {
                return (
                    <DailyTimeCard
                        key={index}
                        place={`${getOrdinalSuffix(index + 1)} place`}
                        time={formatTime(time.hour)}
                        score={time.score.toFixed(0)}
                        onClick={() => handleSetTime(time.hour)} />
                );
            })}
        </div>
    );
}