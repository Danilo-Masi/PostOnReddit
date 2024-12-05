// Shadenui
import { ShoppingBag } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

interface PriceCardProps {
    border?: string;
    title: string;
    description: string;
    futurePrice: string;
    price: string;
    details: string[];
    buttonText: string;
    onClick: () => void;
}

export default function PriceCard({ border, title, description, futurePrice, price, details, buttonText, onClick }: PriceCardProps) {
    return (
        <Card className={`w-full md:w-1/3 bg-background text-left ${border && border}`}>
            <CardHeader>
                <CardTitle className="text-3xl font-semibold text-zinc-900">{title}</CardTitle>
                <CardDescription className="text-md font-light text-zinc-500">{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <p className="text-2xl font-bold text-zinc-900">
                    €{price}
                    <span className="text-xl font-medium text-zinc-400 line-through ml-2">€{futurePrice}</span>
                </p>
                {details.map((item, index) => (
                    <div className="flex items-center justify-start gap-x-2 " key={index}>
                        <div className="w-2 h-2 bg-orange-500 rounded-full" />
                        <p>{item}</p>
                    </div>
                ))}
            </CardContent>
            <CardFooter>
                <Button
                    type="button"
                    className="w-full bg-orange-500 hover:bg-orange-600 py-5"
                    onClick={onClick}>
                    <ShoppingBag />
                    {buttonText}
                </Button>
            </CardFooter>
        </Card>
    );
}