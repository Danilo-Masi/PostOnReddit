export default function Headline({ section, title, description }: { section: string, title: string, description: string }) {
    return (
        <div className="w-[90%] md:w-[80%] flex flex-col items-center justify-center gap-3 mb-10">
            <h3 className="text-sm font-medium text-orange-600 mb-2">{section}</h3>
            <h1 className="text-4xl max-w-2xl text-center font-bold text-zinc-700">{title}</h1>
            <p className="text-base max-w-2xl text-center font-medium text-zinc-400">{description}</p>
        </div>
    );
}
