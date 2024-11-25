// Shadenui
import { ShoppingBag } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";

type CreditsCardProps = {
    title: string;
    description: string;
    futurePrice: string;
    price: string;
    details: string[];
    buttonText: string;
    onClick: () => void;
}

export default function CreditsCard({ title, description, futurePrice, price, details, buttonText, onClick }: CreditsCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl font-semibold text-textPrimary">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <p className="text-lg font-light text-textSecondary text-balance">{description}</p>
                <p className="text-2xl font-bold text-textPrimary">
                    €{price}
                    <span className="text-xl font-medium text-textSecondary line-through ml-2">€{futurePrice}</span>
                </p>
                {details.map((item, index) => (
                    <div className="flex items-center justify-start gap-x-2 " key={index}>
                        <div className="w-2 h-2 bg-buttonColor rounded-full" />
                        <p>{item}</p>
                    </div>
                ))}
            </CardContent>
            <CardFooter>
                <Button
                    type="button"
                    className="w-full bg-buttonColor hover:bg-buttonHoverColor"
                    onClick={onClick}>
                    <ShoppingBag />
                    {buttonText}
                </Button>
            </CardFooter>
        </Card>

    );
}
