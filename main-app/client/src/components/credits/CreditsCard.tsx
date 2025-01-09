// Shadcnui
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
// Icons
import { ShoppingBag } from "lucide-react";

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
                <CardTitle className="font-semibold text-3xl text-textPrimary">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <p className="font-light text-balance text-lg text-textSecondary">{description}</p>
                <p className="font-bold text-2xl text-textPrimary">
                    €{price}
                    <span className="ml-2 font-medium text-textSecondary text-xl line-through">€{futurePrice}</span>
                </p>
                {details.map((item, index) => (
                    <div className="flex justify-start items-center gap-x-2" key={index}>
                        <div className="bg-buttonColor rounded-full w-2 h-2" />
                        <p>{item}</p>
                    </div>
                ))}
            </CardContent>
            <CardFooter>
                <Button
                    type="button"
                    className="bg-buttonColor hover:bg-buttonHoverColor w-full"
                    onClick={onClick}>
                    <ShoppingBag />
                    {buttonText}
                </Button>
            </CardFooter>
        </Card>
    );
}
