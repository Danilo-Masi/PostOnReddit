import { useEffect, useReducer, useCallback, useMemo } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { DailyTimeCard } from "../custom/TimeCard";
import { useAppContext } from "../context/AppContext";
import { format, toZonedTime } from "date-fns-tz";
import { isToday } from "date-fns";
import TimeCardSkeleton from "../custom/TimeCardSkeleton";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

// Cache validity duration in milliseconds (1 hour)
const CACHE_VALIDITY_DURATION = 60 * 60 * 1000;

interface DailyTimeProps {
  subreddit: string;
}

interface BestTime {
  hour: string;
  score: number;
  giorno: string;
  timestamp: number;
  dayOfWeek?: number;
  confidence?: number;
}

interface State {
  bestTimes: BestTime[];
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_BEST_TIMES'; payload: BestTime[] }
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

  // Function to check if cached data is still valid
  const isCacheValid = useCallback((timestamp: number) => {
    const now = new Date().getTime();
    return now - timestamp < CACHE_VALIDITY_DURATION;
  }, []);

  // Function to check if data is from today
  const isDataFromToday = useCallback((data: any) => {
    if (!data || !data.bestTimes || !Array.isArray(data.bestTimes) || data.bestTimes.length === 0) {
      return false;
    }

    // Check if the first best time has a giorno property and if it's today
    const firstBestTime = data.bestTimes[0];
    if (firstBestTime && firstBestTime.giorno) {
      const dataDate = new Date(firstBestTime.giorno);
      return isToday(dataDate);
    }

    return false;
  }, []);

  // Funzione per caricare i dati dai server
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
        try {
          const parsedData = JSON.parse(cachedData);

          // Check if the cache has a timestamp, is still valid, and is from today
          if (parsedData.timestamp &&
            isCacheValid(parsedData.timestamp) &&
            isDataFromToday(parsedData)) {
            if (parsedData && typeof parsedData === 'object' && parsedData.bestTimes) {
              if (Array.isArray(parsedData.bestTimes)) {
                dispatch({ type: 'SET_BEST_TIMES', payload: parsedData.bestTimes });
                return;
              }
            } else if (Array.isArray(parsedData)) {
              dispatch({ type: 'SET_BEST_TIMES', payload: parsedData });
              return;
            }
          } else {
            console.log('Cache expired, not from today, or invalid, fetching fresh data');
          }
        } catch (error) {
          console.error('Error parsing cached data:', error);
        }
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

      const bestTimes = Array.isArray(response.data.bestTimes)
        ? response.data.bestTimes
        : [];

      // Store data with timestamp
      const dataToCache = {
        ...response.data,
        timestamp: new Date().getTime()
      };

      sessionStorage.setItem(`bestTimes_${subreddit}`, JSON.stringify(dataToCache));
      dispatch({ type: 'SET_BEST_TIMES', payload: bestTimes });

    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Error loading the data";
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      toast.error(errorMessage);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [subreddit, navigate, isCacheValid, isDataFromToday]);

  useEffect(() => {
    if (subreddit?.trim()) {
      const cachedData = sessionStorage.getItem(`bestTimes_${subreddit}`);
      if (cachedData) {
        try {
          const parsedData = JSON.parse(cachedData);
          console.log('Cached data:', parsedData);

          // Check if the cache has a timestamp, is still valid, and is from today
          if (parsedData.timestamp &&
            isCacheValid(parsedData.timestamp) &&
            isDataFromToday(parsedData)) {
            if (parsedData && typeof parsedData === 'object' && parsedData.bestTimes) {
              if (Array.isArray(parsedData.bestTimes)) {
                dispatch({ type: 'SET_BEST_TIMES', payload: parsedData.bestTimes });
              } else {
                console.error('bestTimes property is not an array:', parsedData.bestTimes);
                dispatch({ type: 'SET_ERROR', payload: "Invalid data format" });
              }
            } else if (Array.isArray(parsedData)) {
              dispatch({ type: 'SET_BEST_TIMES', payload: parsedData });
            } else {
              console.error('Cached data is not in expected format:', parsedData);
              dispatch({ type: 'SET_ERROR', payload: "Invalid data format" });
            }
          } else {
            console.log('Cache expired, not from today, or invalid, fetching fresh data');
            handleFetchData();
          }
        } catch (error) {
          console.error('Error parsing cached data:', error);
          dispatch({ type: 'SET_ERROR', payload: "Error parsing cached data" });
          handleFetchData();
        }
      } else {
        handleFetchData();
      }
    }
  }, [subreddit, handleFetchData, isCacheValid, isDataFromToday]);

  useEffect(() => {
    if (subreddit?.trim() === "") {
      dispatch({ type: 'SET_BEST_TIMES', payload: [] });
    }
  }, [subreddit]);

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
  const handleSetTime = useCallback((timeData: BestTime) => {
    // Use the timestamp if available, otherwise parse the hour
    let dateToSet: Date;
    if (timeData.timestamp) {
      dateToSet = new Date(timeData.timestamp);
    } else {
      const utcDate = new Date();
      utcDate.setUTCHours(parseInt(timeData.hour, 10), 0, 0, 0);
      dateToSet = utcDate;
    }

    const userTimeZone = localStorage.getItem("userTimeZone") || Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localDate = new Date(dateToSet.toLocaleString('en-US', { timeZone: userTimeZone }));
    setDateTime(localDate);
  }, [setDateTime]);

  // Funzione per ottenere il suffisso ordinale
  const getOrdinalSuffix = useCallback((n: number) => {
    if (n % 100 >= 11 && n % 100 <= 13) return `${n}th`;
    switch (n % 10) {
      case 1: return `${n}st`;
      case 2: return `${n}nd`;
      case 3: return `${n}rd`;
      default: return `${n}th`;
    }
  }, []);

  // Funzione per generare i componenti DailyTimeCard
  const timeCards = useMemo(() => {
    if (state.loading) {
      return <TimeCardSkeleton numSkeleton={4} />;
    }

    if (state.error || !Array.isArray(state.bestTimes) || state.bestTimes.length === 0) {
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

    return state.bestTimes.map((time, index) => {
      // Create a Date object from the timestamp or giorno
      let dateObj: Date | undefined;
      if (time.timestamp) {
        dateObj = new Date(time.timestamp);
      } else if (time.giorno) {
        dateObj = new Date(time.giorno);
      }

      return (
        <DailyTimeCard
          key={`${time.hour}-${index}`}
          place={`${getOrdinalSuffix(index + 1)} place`}
          time={formatTime(time)}
          score={time.score.toFixed(0)}
          date={dateObj}
          onClick={() => handleSetTime(time)}
        />
      );
    });
  }, [state.loading, state.error, state.bestTimes, getOrdinalSuffix, formatTime, handleSetTime]);

  return (
    <div className="w-full h-auto flex flex-col md:flex-row md:flex-wrap gap-4">
      {timeCards}
    </div>
  );
}