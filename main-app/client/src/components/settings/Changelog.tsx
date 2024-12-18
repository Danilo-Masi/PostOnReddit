interface ChangelogProps {
    day: string;
    date: string;
    title: string;
    description: string;
}

export default function Changelog({ day, date, title, description }: ChangelogProps) {
    return (
        <div className="w-full h-[15svh] flex gap-3 rounded-xl p-2 bg-zinc-200 border border-elevation3">
            <div className="w-fit h-full flex flex-col items-center justify-center text-center aspect-square rounded-lg bg-zinc-100 border border-elevation3">
                <p className="font-semibold text-2xl">{day}</p>
                <p className="font-light text-sm">{date}</p>
            </div>
            <div className="flex flex-col">
                <p className="font-semibold text-zinc-900">{title}</p>
                <p className="font-light text-sm text-zinc-500">{description}</p>
            </div>
        </div>
    );
}
