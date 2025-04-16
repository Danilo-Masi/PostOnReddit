import { ArrowRight, CheckIcon, Info, X } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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
        <div className={`w-full md:w-fit h-auto flex flex-col items-start justify-start py-8 px-6 rounded-xl bg-background border border-border ${isCardPro && "border-primary md:scale-105"}`}>
            <h3 className="text-2xl font-bold text-foreground">{planTitle}</h3>
            <p className="text-sm text-muted-foreground mb-4">{planDescription}</p>
            <p className="text-3xl font-extrabold text-foreground">
                <span className="text-xl text-muted-foreground font-semibold line-through mr-2">€37</span>
                {price}</p>
            <p className="text-sm text-muted-foreground">{priceDescription}</p>
            <Separator className="w-full my-6" />
            <ul className="w-full flex flex-col items-start justify-start gap-2">
                {goodFeatures.map((feature, index) => (
                    <li key={index} className="flex flex-row items-center justify-start gap-2 text-foreground"><CheckIcon className="w-4 h-4" /> {feature}</li>
                ))}
                {badFeatures && badFeatures.map((feature, index) => (
                    <li key={index} className="flex flex-row items-center justify-start gap-2 text-muted-foreground"><X className="w-4 h-4" /> {feature}</li>
                ))}
                {futureFeatures && futureFeatures.map((feature, index) => (
                    <li key={index} className="flex flex-row items-center justify-start gap-2 text-foreground">
                        <CheckIcon className="w-4 h-4" />
                        {feature}
                        <TooltipProvider>
                            <Tooltip key={index}>
                                <TooltipTrigger>
                                    <Info className="w-4 h-4 text-muted-foreground" />
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
                aria-label={isCardPro ? "Get Lifetime Access" : "Get Started"}
                onClick={handleRedirect}
                className={`w-full mt-6 bg-black hover:bg-black/80 ${isCardPro && "bg-primary hover:bg-primary/85"}`}>
                {isCardPro ? "Get Lifetime Access" : "Get Started"}
                {isCardPro && <ArrowRight className="w-4 h-4" />}
            </Button>
        </div>
    );
}
