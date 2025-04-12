import { ArrowRight, CheckIcon, X } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface PriceCardProps {
    planTitle: string;
    planDescription: string;
    price: string;
    priceDescription: string;
    goodFeatures: string[];
    badFeatures?: string[];
    isCardPro: boolean;
}

export default function PriceCard({ planTitle, planDescription, price, priceDescription, goodFeatures, badFeatures, isCardPro }: PriceCardProps) {

    const handleRedirect = () => {
        if (isCardPro) {
            window.location.href = "https://app.postonreddit.com/registration?redirect";
        } else {
            window.location.href = "https://app.postonreddit.com/registration";
        }
    }

    return (
        <div className={`w-full md:w-1/3 h-auto flex flex-col items-start justify-start py-8 px-6 rounded-xl bg-white border border-zinc-200 ${isCardPro && "border-orange-500 shadow-lg transition-transform transform hover:scale-105"}`}>
            <h3 className="text-2xl font-bold text-zinc-800">{planTitle}</h3>
            <p className="text-sm text-zinc-500 mb-4">{planDescription}</p>
            <p className="text-3xl font-extrabold text-gray-800">
                <span className="text-xl text-zinc-300 font-semibold line-through mr-2">€32</span>
                {price}</p>
            <p className="text-sm text-zinc-500">{priceDescription}</p>
            <Separator className="w-full my-6" />
            <ul className="w-full flex flex-col items-start justify-start gap-2">
                {goodFeatures.map((feature, index) => (
                    <li key={index} className="flex flex-row items-center justify-start gap-2 text-zinc-800"><CheckIcon className="w-4 h-4 text-orange-600" /> {feature}</li>
                ))}
                {badFeatures && badFeatures.map((feature, index) => (
                    <li key={index} className="flex flex-row items-center justify-start gap-2 text-zinc-300"><X className="w-4 h-4" /> {feature}</li>
                ))}
            </ul>
            <Button
                onClick={handleRedirect}
                variant="default"
                className={`w-full mt-6 text-white ${isCardPro && "bg-orange-500 hover:bg-orange-600"}`}>
                {isCardPro ? "Get Lifetime Access" : "Get Started"}
                {isCardPro && <ArrowRight className="w-4 h-4" />}
            </Button>
        </div>
    );
}
