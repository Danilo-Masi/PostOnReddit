interface ChangelogProps {
    day: string;
    date: string;
    title: string;
    description: string;
}

export default function Changelog({ day, date, title, description }: ChangelogProps) {
    return (
        <div className="w-full h-[15svh] flex gap-3 rounded-xl p-2  border border-elevation3 bg-zinc-200 dark:bg-zinc-800">
            <div className="w-fit h-full flex flex-col items-center justify-center text-center aspect-square rounded-lg bg-zinc-100 border border-elevation3 dark:bg-zinc-700">
                <p className="font-semibold text-2xl dark:text-zinc-50">{day}</p>
                <p className="font-light text-sm dark:text-zinc-50">{date}</p>
            </div>
            <div className="flex flex-col">
                <p className="font-semibold text-zinc-900 dark:text-zinc-50">{title}</p>
                <p className="font-light text-sm text-zinc-500 dark:text-zinc-300">{description}</p>
            </div>
        </div>
    );
}
