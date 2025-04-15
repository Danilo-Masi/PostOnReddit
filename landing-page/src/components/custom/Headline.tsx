export default function Headline({ section, title, description }: { section: string, title: string, description: string }) {
    return (
        <div className="w-[90%] md:w-[80%] flex flex-col items-center justify-center gap-3 mb-20">
            <h3 className="text-sm font-medium text-primary mb-2">{section}</h3>
            <h1 className="text-4xl max-w-2xl text-center text-balance font-bold text-foreground">{title}</h1>
            <p className="text-base max-w-2xl text-balance text-center font-medium text-muted-foreground">{description}</p>
        </div>
    );
}
