type Proof = {
    content: string;
    name: string;
    usurname: string;
}

interface SocialCardsProps {
    proofs: Proof[],
}

export default function SocialCards({ proofs }: SocialCardsProps) {
    return (
        <div className="w-full md:w-[calc(25%-0.25rem)] h-auto flex flex-col gap-y-4">
            {proofs.map((item, index) => (
                <div
                    key={index}
                    className="w-full h-fit p-5 flex flex-col gap-y-5 rounded-lg bg-card text-card-foreground border border-border shadow-md">
                    <p>{item.content}</p>
                    <div className="flex gap-x-3">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center p-3 bg-muted-foreground text-foreground font-semibold">
                            <p>{item.name.slice(0, 2).toUpperCase()}</p>
                        </div>
                        <div>
                            <p className="text-foreground">{item.name}</p>
                            <p className="text-muted-foreground">@{item.usurname}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    );
}