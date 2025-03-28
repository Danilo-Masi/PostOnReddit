import { Check, X } from "lucide-react";
import { Button } from "../ui/button";

interface PriceCardProps {
    title: string,
    price: string,
    discountedPrice: string,
    validPoint: string[],
    invalidPoint?: string[],
    textButton: string;
    bestOffer?: string;
}

export default function PriceCard({ title, price, discountedPrice, validPoint, invalidPoint, textButton, bestOffer }: PriceCardProps) {

    const handleClick = () => {
        alert('Price Button clicked');
    }

    return (
        <div className={`w-full md:w-2/5 h-auto min-h-[50svh] p-5 flex flex-col gap-y-6 rounded-lg bg-card text-card-foreground border-2 shadow-md ${bestOffer && bestOffer === title ? 'border-principal' : 'border-border'}`}>
            <h3 className="text-2xl font-semibold">{title}</h3>
            <h3 className="text-4xl font-bold">
                <span className="text-lg font-medium line-through text-muted-foreground mr-3">${price}</span>
                ${discountedPrice}</h3>
            <div>
                <ul>
                    {validPoint.map((item, index) => (
                        <li
                            className="flex mb-3"
                            key={index}><Check className="mr-2" />
                            {item}
                        </li>
                    ))}
                </ul>
                <ul>
                    {invalidPoint && invalidPoint.map((item, index) => (
                        <li
                            className="flex mb-3 text-muted-foreground"
                            key={index}><X className="mr-2" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
            <Button className="w-full">
                {textButton}
            </Button>
        </div>
    );
}