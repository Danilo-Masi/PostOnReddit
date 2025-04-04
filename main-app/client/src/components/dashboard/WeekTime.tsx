import { useEffect, useReducer, useCallback, useMemo } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { WeekTimeCard } from "../custom/TimeCard";
import { Loader2, TrendingUp } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { format, toZonedTime } from "date-fns-tz";
import { Button } from "../ui/button";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

interface BestTime {
  hour: string;
  score: number;
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

          if (parsedData && typeof parsedData === 'object' && parsedData.bestTimesByDay) {
            const formattedData: { [day: string]: BestTime } = {};
            Object.entries(parsedData.bestTimesByDay).forEach(([day, data]: [string, any]) => {
              if (data) {
                formattedData[day] = { hour: data.hour.toString(), score: data.score };
              }
            });

            dispatch({ type: 'SET_BEST_TIMES', payload: formattedData });
            return;
          } else if (typeof parsedData === 'object' && Object.keys(parsedData).length > 0) {
            dispatch({ type: 'SET_BEST_TIMES', payload: parsedData });
            return;
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

      if (response.status === 204) {
        setIsPro(false);
        dispatch({ type: 'SET_ERROR', payload: "Upgrade to a Pro membership to unlock this data." });
        return;
      }

      if (response.status !== 200 || !response.data.bestTimesByDay) {
        dispatch({ type: 'SET_ERROR', payload: "No data available for this subreddit" });
        return;
      }

      const formattedData: { [day: string]: BestTime } = {};
      Object.entries(response.data.bestTimesByDay).forEach(([day, data]: [string, any]) => {
        if (data) {
          formattedData[day] = { hour: data.hour.toString(), score: data.score };
        }
      });

      sessionStorage.setItem(`bestTimes-${subreddit}`, JSON.stringify(response.data));
      dispatch({ type: 'SET_BEST_TIMES', payload: formattedData });

    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Error loading the data";
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      toast.error(errorMessage);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [subreddit, navigate, setIsPro]);

  // Funzione per formattare l'ora
  const formatTime = useCallback((hour: string) => {
    const userTimeZone = localStorage.getItem("userTimeZone") || Intl.DateTimeFormat().resolvedOptions().timeZone;
    const is12HourFormat = localStorage.getItem("timeFormat") === "12h";
    const utcDate = new Date();
    utcDate.setUTCHours(parseInt(hour, 10), 0, 0, 0);
    const zonedDate = toZonedTime(utcDate, userTimeZone);
    const timeFormat = is12HourFormat ? "hh:mm a" : "HH:mm";
    return format(zonedDate, timeFormat, { timeZone: userTimeZone });
  }, []);

  // Funzione per impostare la data nel DateTimePicker
  const handleSetTime = useCallback((day: string, hour: string) => {
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

    targetUtcDate.setUTCHours(parseInt(hour, 10), 0, 0, 0);

    setDateTime(targetUtcDate);

  }, [setDateTime]);

  // Funzione per gestire il checkout
  const redirectCheckout = useCallback(async () => {
    toast.info("Pro membership will be available soon! 😉");
    //getCheckout();
  }, []);

  // Funzione per caricare i dati dai server
  useEffect(() => {
    if (subreddit.trim() && isPro) {
      handleFetchData();
    } else if (subreddit.trim() === "") {
      dispatch({ type: 'SET_BEST_TIMES', payload: {} });
    }
  }, [subreddit, isPro, handleFetchData]);

  // Funzione per generare il componente ProUpgrade
  const renderProUpgrade = useMemo(() => (
    <div className="w-full min-h-[40svh] md:min-h-[25svh] flex justify-center items-center bg-zinc-200 rounded-lg">
      <Button
        variant="default"
        onClick={redirectCheckout}
        className="flex items-center gap-2">
        Unlock Pro Features
        <TrendingUp className="w-4 h-4" />
      </Button>
    </div>
  ), [redirectCheckout]);

  // Funzione per generare i componenti WeekTimeCard
  const renderTimeCards = useMemo(() => {
    if (state.loading) {
      return <Loader2 className="animate-spin" />;
    }

    if (state.error) {
      return (
        <div className="w-full text-center text-red-500">
          {state.error}
        </div>
      );
    }

    return DAYS_OF_WEEK.map((day) => {
      const hasData = state.bestTimes && state.bestTimes[day];
      const time = hasData ? formatTime(state.bestTimes[day].hour) : "No data available";
      const score = hasData ? state.bestTimes[day].score.toFixed(0) : "No score";

      return (
        <WeekTimeCard
          key={day}
          dayOfWeek={day}
          time={time}
          score={score}
          onClick={hasData ? () => handleSetTime(day, state.bestTimes[day].hour) : undefined}
        />
      );
    });
  }, [state.loading, state.error, state.bestTimes, formatTime, handleSetTime]);

  return (
    <div className="w-full h-auto flex flex-col md:flex-row md:flex-wrap gap-4">
      {!isPro ? renderProUpgrade : renderTimeCards}
    </div>
  );
}