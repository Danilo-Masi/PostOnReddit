import { ArrowRight, CheckIcon, Info, X } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


interface PriceCardProps {
    planTitle: string;
    planDescription: string;
    price: string;
    priceDescription: string;
    goodFeatures: string[];
    badFeatures?: string[];
    futureFeatures?: string[];
    isCardPro: boolean;
}

export default function PriceCard({ planTitle, planDescription, price, priceDescription, goodFeatures, badFeatures, futureFeatures, isCardPro }: PriceCardProps) {

    const handleRedirect = () => {
        if (isCardPro) {
            window.location.href = "https://app.postonreddit.com/registration?redirect";
        } else {
            window.location.href = "https://app.postonreddit.com/registration";
        }
    }

    return (
        <div className={`w-full md:w-fit h-auto flex flex-col items-start justify-start py-8 px-6 rounded-xl bg-white border border-zinc-200 ${isCardPro && "border-orange-600 md:scale-105"}`}>
            <h3 className="text-2xl font-bold text-zinc-800">{planTitle}</h3>
            <p className="text-sm text-zinc-500 mb-4">{planDescription}</p>
            <p className="text-3xl font-extrabold text-gray-800">
                <span className="text-xl text-zinc-300 font-semibold line-through mr-2">€32</span>
                {price}</p>
            <p className="text-sm text-zinc-500">{priceDescription}</p>
            <Separator className="w-full my-6" />
            <ul className="w-full flex flex-col items-start justify-start gap-2">
                {goodFeatures.map((feature, index) => (
                    <li key={index} className="flex flex-row items-center justify-start gap-2 text-zinc-700"><CheckIcon className="w-4 h-4 text-orange-600" /> {feature}</li>
                ))}
                {badFeatures && badFeatures.map((feature, index) => (
                    <li key={index} className="flex flex-row items-center justify-start gap-2 text-zinc-300"><X className="w-4 h-4" /> {feature}</li>
                ))}
                {futureFeatures && futureFeatures.map((feature, index) => (
                    <li key={index} className="flex flex-row items-center justify-start gap-2 text-zinc-700">
                        <CheckIcon className="w-4 h-4 text-orange-600" />
                        {feature}
                        <TooltipProvider>
                            <Tooltip key={index}>
                                <TooltipTrigger>
                                    <Info className="w-4 h-4 text-zinc-400" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Not available yet, but will be soon!</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </li>
                ))}
            </ul>
            <Button
                onClick={handleRedirect}
                variant="default"
                className={`w-full mt-6 text-white ${isCardPro && "bg-orange-600 hover:bg-orange-700"}`}>
                {isCardPro ? "Get Lifetime Access" : "Get Started"}
                {isCardPro && <ArrowRight className="w-4 h-4" />}
            </Button>
        </div>
    );
}
