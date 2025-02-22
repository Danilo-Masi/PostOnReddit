import { PlaneTakeoff, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

interface PriceCardProps {
    cardStyle?: string;
    title: string;
    description: string;
    futurePrice?: string;
    price: string;
    details: string[];
    buttonText: string;
    onClick: () => void;
    isPriceDisabled?: boolean;
}

export default function PriceCard({ cardStyle, title, description, futurePrice, price, details, buttonText, onClick, isPriceDisabled }: PriceCardProps) {
    return (
        <Card className={`w-full md:w-1/3 h-full bg-background text-left ${cardStyle && cardStyle} ${isPriceDisabled && 'bg-zinc-200 text-zinc-500 shadow-none'}`}>
            <CardHeader>
                <CardTitle className="text-2xl font-semibold text-zinc-900"><span className="text-zinc-500 mr-2 line-through">{title}</span>free</CardTitle>
                <CardDescription className="text-md font-light text-zinc-500">{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <p className="text-2xl font-bold text-zinc-900">
                    €{price}
                    {futurePrice &&
                        <span className="text-xl font-medium text-zinc-400 line-through ml-2">€{futurePrice}</span>
                    }
                </p>
                {details.map((item, index) => (
                    <div className="flex items-center justify-start gap-x-2 " key={index}>
                        <div className={`w-2 h-2 bg-orange-500 rounded-full ${isPriceDisabled && 'bg-zinc-900'}`} />
                        <p>{item}</p>
                    </div>
                ))}
            </CardContent>
            <CardFooter>
                <Button
                    disabled={isPriceDisabled}
                    type="button"
                    className="w-full bg-orange-500 hover:bg-orange-600 py-5 disabled:bg-zinc-900 disabled:cursor-not-allowed"
                    onClick={onClick}>
                    {isPriceDisabled ? <PlaneTakeoff /> : <Sparkles />}
                    {buttonText}
                </Button>
            </CardFooter>
        </Card>
    );
}