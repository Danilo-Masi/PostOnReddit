export default function Headline({ title, description }: { title: string, description: string }) {
    return (
        <div className="w-[90%] md:w-[80%] flex flex-col items-center justify-center gap-4 mb-10">
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="text-zinc-600 text-md leading-tight">{description}</p>
        </div>
    );
}
