import { useEffect, useReducer, useCallback, useMemo } from "react";
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
    bestTimes: { hour: string; score: number }[];
    loading: boolean;
    error: string | null;
}

type Action =
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_BEST_TIMES'; payload: { hour: string; score: number }[] }
    | { type: 'SET_ERROR'; payload: string | null };

const initialState: State = {
    bestTimes: [],
    loading: false,
    error: null,
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_BEST_TIMES':
            return { ...state, bestTimes: action.payload, error: null };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        default:
            return state;
    }
}

export default function DailyTime({ subreddit }: DailyTimeProps) {
    const navigate: NavigateFunction = useNavigate();
    const [state, dispatch] = useReducer(reducer, initialState);
    const { setDateTime } = useAppContext();

    const handleFetchData = useCallback(async () => {
        if (!subreddit?.trim()) return;

        const token = localStorage.getItem('authToken');
        if (!token) {
            toast.error("User without permissions");
            navigate('/login');
            return;
        }

        dispatch({ type: 'SET_LOADING', payload: true });
        dispatch({ type: 'SET_ERROR', payload: null });

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
                dispatch({ type: 'SET_ERROR', payload: "No data available for this subreddit" });
                return;
            }

            const bestTimes = response.data.bestTimes;
            sessionStorage.setItem(`bestTimes_${subreddit}`, JSON.stringify(bestTimes));
            dispatch({ type: 'SET_BEST_TIMES', payload: bestTimes });

        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Error loading the data";
            dispatch({ type: 'SET_ERROR', payload: errorMessage });
            toast.error(errorMessage);
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, [subreddit, navigate]);

    useEffect(() => {
        if (subreddit?.trim()) {
            const cachedData = sessionStorage.getItem(`bestTimes_${subreddit}`);
            if (cachedData) {
                dispatch({ type: 'SET_BEST_TIMES', payload: JSON.parse(cachedData) });
            } else {
                handleFetchData();
            }
        }
    }, [subreddit, handleFetchData]);

    const formatTime = useCallback((hour: string) => {
        const userTimeZone = localStorage.getItem("userTimeZone") || Intl.DateTimeFormat().resolvedOptions().timeZone;
        const is12HourFormat = localStorage.getItem("timeFormat") === "12h";
        const utcDate = new Date();
        utcDate.setUTCHours(parseInt(hour, 10), 0, 0, 0);
        
        const zonedDate = toZonedTime(utcDate, userTimeZone);
        const timeFormat = is12HourFormat ? "hh:mm a" : "HH:mm";
        return format(zonedDate, timeFormat, { timeZone: userTimeZone });
    }, []);

    const handleSetTime = useCallback((hour: string) => {
        const now = new Date();
        now.setUTCHours(parseInt(hour, 10), 0, 0, 0);
        setDateTime(now);
    }, [setDateTime]);

    const getOrdinalSuffix = useCallback((n: number) => {
        if (n % 100 >= 11 && n % 100 <= 13) return `${n}th`;
        switch (n % 10) {
            case 1: return `${n}st`;
            case 2: return `${n}nd`;
            case 3: return `${n}rd`;
            default: return `${n}th`;
        }
    }, []);

    const timeCards = useMemo(() => {
        if (state.loading) {
            return <Loader2 className="animate-spin" />;
        }

        if (state.error || state.bestTimes.length === 0) {
            return (
                <>
                    <DailyTimeCard 
                        place="1st place" 
                        time="No data available" 
                        score="No score" 
                    />
                    <DailyTimeCard 
                        place="2nd place" 
                        time="No data available" 
                        score="No score" 
                    />
                </>
            );
        }

        return state.bestTimes.map((time, index) => (
            <DailyTimeCard
                key={`${time.hour}-${index}`}
                place={`${getOrdinalSuffix(index + 1)} place`}
                time={formatTime(time.hour)}
                score={time.score.toFixed(0)}
                onClick={() => handleSetTime(time.hour)}
            />
        ));
    }, [state.loading, state.error, state.bestTimes, getOrdinalSuffix, formatTime, handleSetTime]);

    return (
        <div className="w-full h-auto flex flex-col md:flex-row md:flex-wrap gap-4">
            {timeCards}
        </div>
    );
}