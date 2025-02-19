interface TimeCardProps {
    place: string;
    time: string;
}

interface WeekCardProps {
    dayOfWeek: string;
    time: string;
}

export function DailyTimeCard({ place, time }: TimeCardProps) {

    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('us-US', { month: 'long' });
    const year = today.getFullYear();
    const formattedDate = `${day} ${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;

    return (
        <div className="w-full md:w-[calc(50%-0.5rem)] h-fit rounded-lg p-3 cursor-pointer bg-zinc-200 border border-zinc-300">
            <h1 className="font-semibold">{place}</h1>
            <p className="text-sm">{formattedDate}</p>
            <p className="text-sm">{time}</p>
        </div>
    );
}

export function WeekTimeCard({ dayOfWeek, time }: WeekCardProps) {
    return (
        <div className="w-full md:w-[calc(50%-0.5rem)] h-fit rounded-lg p-3 cursor-pointer bg-zinc-200 border border-zinc-300">
            <h1 className="font-semibold">{dayOfWeek}</h1>
            <p className="text-sm">19 Febbario 2025</p>
            <p className="text-sm">{time}</p>
        </div>
    );
}
