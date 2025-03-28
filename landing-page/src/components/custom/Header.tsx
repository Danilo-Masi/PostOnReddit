interface HeaderProps {
    title: string;
    caption: string;
}

export default function Header({ title, caption }: HeaderProps) {
    return (
        <div className="w-full h-auto flex flex-col gap-3 items-center">
            <h2 className="font-bold text-5xl text-zinc-700 max-w-lg text-center">{title}</h2>
            <h3 className="font-medium text-lg text-zinc-500 max-w-lg text-center">{caption}</h3>
        </div>
    );
}
