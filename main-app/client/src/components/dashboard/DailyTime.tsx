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

// Funzione per caricare i dati dall'endpoint 
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
            console.log("Ora dal backend in UTC: " + response.data.bestTimes[0].hour); //LOG
            setBestTimes(response.data.bestTimes);
        } catch (error: any) {
            console.error("Errore durante il caricamento dei dati:", error.message);
            toast.error("Error loading the data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (subreddit && subreddit.trim() !== "") {
            handleFetchData();
        }
    }, [subreddit]);

    // Funzione che formatta la visualizzazione degli orari
    const formatTime = (hour: string) => {
        const userTimeZone = localStorage.getItem("userTimeZone") || Intl.DateTimeFormat().resolvedOptions().timeZone;
        const is12HourFormat = localStorage.getItem("timeFormat") === "12h";
        // Creazione di una data UTC con l'ora specificata
        const utcDate = new Date();
        utcDate.setUTCHours(parseInt(hour, 10), 0, 0, 0);
        // Conversione nel fuso orario dell'utente
        const zonedDate = toZonedTime(utcDate, userTimeZone);
        console.log("Data visualizzata formattata con fuso orario: " + zonedDate.getHours()); //LOG
        // Formattazione dinamica
        const timeFormat = is12HourFormat ? "hh:mm a" : "HH:mm";
        const formattedDate = format(zonedDate, timeFormat, { timeZone: userTimeZone });
        return formattedDate;
    };

    // Funzione per impostare la data e l'orario selezionati
    const handleSetTime = (hour: string) => {
        // Crea una data di base in UTC
        const now = new Date();
        now.setUTCHours(parseInt(hour, 10), 0, 0, 0);
        console.log("Data creata per il setDateTime: " + now.getHours()); //LOG
        // Salva la data nel fuso orario corretto
        setDateTime(now);
    };

    // Funzione per impostare i suffissi alle card
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
                        onClick={() => handleSetTime(time.hour)} />
                        //isCardSelected={isSameDay && isSameHour} />
                );
            })}
        </div>
    );
}