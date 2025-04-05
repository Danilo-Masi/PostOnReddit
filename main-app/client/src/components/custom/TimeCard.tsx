interface DailyTimeCardProps {
    place: string;
    time: string;
    score: string;
    date?: Date;
    onClick?: () => void;
}

interface WeekCardProps {
    dayOfWeek: string;
    time: string;
    score: string;
    onClick?: () => void;
}

export function DailyTimeCard({ place, time, score, date, onClick }: DailyTimeCardProps) {
    const today = new Date();
    const displayDate = date || today;

    const day = displayDate.getDate();
    const month = displayDate.toLocaleString('en-US', { month: 'short' });
    const year = displayDate.getFullYear();
    const formattedDate = `${day} ${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;

    const dateDisplay = formattedDate;

    return (
        <div
            onClick={onClick}
            className={`w-full md:w-[calc(50%-0.5rem)] h-fit rounded-xl p-4 cursor-pointer bg-zinc-200 dark:bg-zinc-400 shadow-sm transition-all hover:bg-zinc-300 dark:hover:bg-zinc-700 hover:shadow-lg border`}>
            <h1 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">{place}</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">{dateDisplay} - {time}</p>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-500">⭐ Score: {score}</p>
        </div>
    );
}

export function WeekTimeCard({ dayOfWeek, time, score, onClick }: WeekCardProps) {
    return (
        <div
            onClick={onClick}
            className={`w-full md:w-[calc(50%-0.5rem)] h-fit rounded-xl p-4 cursor-pointer bg-zinc-200 dark:bg-zinc-400 shadow-sm transition-all hover:bg-zinc-300 dark:hover:bg-zinc-700 hover:shadow-lg border`}>
            <h1 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">{dayOfWeek}</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">{time}</p>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-500">⭐ Score: {score}</p>
        </div>
    );
}
