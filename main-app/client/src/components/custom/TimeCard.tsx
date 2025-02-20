interface TimeCardProps {
    place: string;
    time: string;
    score: string;
}

interface WeekCardProps {
    dayOfWeek: string;
    time: string;
    score: string;
}

export function DailyTimeCard({ place, time, score }: TimeCardProps) {

    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('en-US', { month: 'short' });
    const year = today.getFullYear();
    const formattedDate = `${day} ${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;

    return (
        <div className="w-full md:w-[calc(50%-0.5rem)] h-fit rounded-xl p-4 cursor-pointer bg-zinc-200 dark:bg-zinc-600 border border-zinc-300 dark:border-zinc-800 shadow-sm transition-all hover:bg-zinc-300 dark:hover:bg-zinc-700 hover:shadow-lg">
            <h1 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">{place}</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">{formattedDate} - {time}</p>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-500">⭐ Score: {score}</p>
        </div>
    );
}

export function WeekTimeCard({ dayOfWeek, time, score }: WeekCardProps) {
    return (
        <div className="w-full md:w-[calc(50%-0.5rem)] h-fit rounded-xl p-4 cursor-pointer bg-zinc-200 dark:bg-zinc-600 border border-zinc-300 dark:border-zinc-800 shadow-sm transition-all hover:bg-zinc-300 dark:hover:bg-zinc-700 hover:shadow-lg">
            <h1 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">{dayOfWeek}</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">{time}</p>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-500">⭐ Score: {score}</p>
        </div>
    );
}
