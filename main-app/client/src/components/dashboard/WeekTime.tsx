import { useEffect, useReducer, useCallback, useMemo, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { WeekTimeCard } from "../custom/TimeCard";
import { ArrowUpRight, Loader2, TrendingUp } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { format, toZonedTime } from "date-fns-tz";
import { Button } from "../ui/button";
import { getCheckout } from "@/hooks/use-payment";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

const CACHE_VALIDITY_DURATION = 60 * 60 * 1000;

interface BestTime {
  hour: string;
  score: number;
  giorno?: string;
  ora?: string;
  timestamp?: number;
  confidence?: number;
}

interface State {
  bestTimes: { [day: string]: BestTime };
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: 'SET_BEST_TIMES'; payload: { [day: string]: BestTime } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: State = {
  bestTimes: {},
  loading: false,
  error: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_BEST_TIMES':
      return { ...state, bestTimes: action.payload, error: null };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

const WEEK_MAP: { [key: string]: number } = {
  "Sunday": 0,
  "Monday": 1,
  "Tuesday": 2,
  "Wednesday": 3,
  "Thursday": 4,
  "Friday": 5,
  "Saturday": 6,
};

export default function WeekTime({ subreddit }: { subreddit: string }) {
  const navigate: NavigateFunction = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { setDateTime, isPro, setIsPro } = useAppContext();
  const [isFunctionLoading, setIsFunctionLoading] = useState(false);

  // Funzione per verificare se il cache è valido
  const isCacheValid = useCallback((timestamp: number) => {
    const now = new Date().getTime();
    return now - timestamp < CACHE_VALIDITY_DURATION;
  }, []);

  // Funzione per caricare i dati dai server
  const handleFetchData = useCallback(async () => {
    if (!subreddit.trim()) return;

    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.error("User without permissions");
      navigate('/login');
      return;
    }

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const cachedData = sessionStorage.getItem(`bestTimes-${subreddit}`);
      if (cachedData) {
        try {
          const parsedData = JSON.parse(cachedData);

          // Check if the cache has a timestamp and if it's still valid
          if (parsedData.timestamp && isCacheValid(parsedData.timestamp)) {
            if (parsedData && typeof parsedData === 'object' && parsedData.bestTimes) {
              dispatch({ type: 'SET_BEST_TIMES', payload: parsedData.bestTimes });
              return;
            } else if (typeof parsedData === 'object' && Object.keys(parsedData).length > 0) {
              dispatch({ type: 'SET_BEST_TIMES', payload: parsedData });
              return;
            }
          } else {
            console.log('Cache expired, fetching fresh data');
          }
        } catch (error) {
          console.error('Error parsing cached week data:', error);
        }
      }

      const response = await axios.get(`${SERVER_URL}/api/reddit-bestWeekTime`, {
        params: { q: subreddit },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 403) {
        setIsPro(false);
        dispatch({ type: 'SET_ERROR', payload: "Upgrade to a Pro membership to unlock this data." });
        return;
      }

      if (response.status !== 200 || !response.data.bestTimes) {
        dispatch({ type: 'SET_ERROR', payload: "No data available for this subreddit" });
        return;
      }

      // Store data with timestamp
      const dataToCache = {
        ...response.data,
        timestamp: new Date().getTime()
      };

      sessionStorage.setItem(`bestTimes-${subreddit}`, JSON.stringify(dataToCache));
      dispatch({ type: 'SET_BEST_TIMES', payload: response.data.bestTimes });

    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Error loading the data";
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      toast.error(errorMessage);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [subreddit, navigate, setIsPro, isCacheValid]);

  // Funzione per formattare l'ora
  const formatTime = useCallback((timeData: BestTime) => {
    const userTimeZone = localStorage.getItem("userTimeZone") || Intl.DateTimeFormat().resolvedOptions().timeZone;
    const is12HourFormat = localStorage.getItem("timeFormat") === "12h";

    // Use the timestamp if available, otherwise parse the hour
    let dateToFormat: Date;
    if (timeData.timestamp) {
      dateToFormat = new Date(timeData.timestamp);
    } else {
      const utcDate = new Date();
      utcDate.setUTCHours(parseInt(timeData.hour, 10), 0, 0, 0);
      dateToFormat = utcDate;
    }

    const zonedDate = toZonedTime(dateToFormat, userTimeZone);
    const timeFormat = is12HourFormat ? "hh:mm a" : "HH:mm";
    return format(zonedDate, timeFormat, { timeZone: userTimeZone });
  }, []);

  // Funzione per impostare la data nel DateTimePicker
  const handleSetTime = useCallback((day: string, timeData: BestTime) => {
    if (timeData.timestamp) {
      const dateToSet = new Date(timeData.timestamp);
      const userTimeZone = localStorage.getItem("userTimeZone") || Intl.DateTimeFormat().resolvedOptions().timeZone;
      const localDate = new Date(dateToSet.toLocaleString('en-US', { timeZone: userTimeZone }));
      setDateTime(localDate);
      return;
    }

    // Fallback nel caso in cui il timestamp non sia disponibile
    const utcDate = new Date();
    const currentDayIndex = utcDate.getUTCDay();
    const targetDayIndex = WEEK_MAP[day];

    if (targetDayIndex === undefined) {
      toast.error(`Invalid day: ${day}`);
      return;
    }

    let daysToAdd = targetDayIndex - currentDayIndex;
    if (daysToAdd <= 0) {
      daysToAdd += 7;
    }

    const targetUtcDate = new Date(utcDate);
    targetUtcDate.setUTCDate(targetUtcDate.getUTCDate() + daysToAdd);
    targetUtcDate.setUTCHours(parseInt(timeData.hour, 10), 0, 0, 0);

    setDateTime(targetUtcDate);
  }, [setDateTime]);

  // Funzione per gestire il checkout
  const redirectCheckout = useCallback(async () => {
    setIsFunctionLoading(true);
    getCheckout();
    setIsFunctionLoading(false);
  }, []);

  // Funzione per caricare i dati dai server
  useEffect(() => {
    if (subreddit.trim() && isPro) {
      handleFetchData();
    } else if (subreddit.trim() === "") {
      dispatch({ type: 'SET_BEST_TIMES', payload: {} });
    }
  }, [subreddit, isPro, handleFetchData]);

  // Funzione per generare i componenti WeekTimeCard
  const weekCards = useMemo(() => {
    if (state.loading) {
      return <Loader2 className="animate-spin" />;
    }

    if (state.error) {
      return (
        <div className="w-full flex flex-col items-center justify-center p-4">
          <p className="text-red-500 mb-4">{state.error}</p>
          {!isPro && (
            <Button onClick={redirectCheckout} className="bg-blue-600 hover:bg-blue-700">
              <TrendingUp className="mr-2 h-4 w-4" />
              Upgrade to Pro
            </Button>
          )}
        </div>
      );
    }

    // If user is not pro, show upgrade button instead of cards
    if (!isPro) {
      return (
        <div className="w-full flex flex-col items-center justify-center p-8 bg-zinc-200 rounded-lg shadow-md">
          <p className="text-gray-600 text-base text-balance text-center  mb-6">
            Upgrade to Pro to see the best posting times for each day of the week
          </p>
          <Button
            onClick={redirectCheckout}
            className="bg-orange-600 hover:bg-orange-700 text-white">
            {isFunctionLoading ? (
              <>
                <Loader2 className="animate-spin" />
                Loading
              </>
            ) : (
              <>
                Upgrade to Pro
                <ArrowUpRight />
              </>
            )}

          </Button>
        </div >
      );
    }

    // For pro users, always render cards for all days of the week
    return DAYS_OF_WEEK.map((day) => {
      const timeData = state.bestTimes[day];

      return (
        <WeekTimeCard
          key={day}
          dayOfWeek={day}
          time={timeData ? formatTime(timeData) : "No data available"}
          score={timeData ? timeData.score.toFixed(0) : "No score"}
          onClick={timeData ? () => handleSetTime(day, timeData) : undefined}
        />
      );
    });
  }, [state.loading, state.error, state.bestTimes, isPro, formatTime, handleSetTime, redirectCheckout]);

  return (
    <div className="w-full h-auto flex flex-col md:flex-row md:flex-wrap gap-4">
      {weekCards}
    </div>
  );
}