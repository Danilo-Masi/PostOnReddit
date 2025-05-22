import { ArrowRight, CheckIcon, Info } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface PriceCardProps {
    planTitle: string;
    planDescription: string;
    price: string;
    futurePrice: string;
    isLifetime: boolean;
}

const features = [
    "Schedule unlimited posts",
    "Best time to post in the next 24 hours",
    "Best time to post over the next 7 days",
];

const futureFeatures = [
    "One-click posting to multiple subreddits",
    "AI tips for posts & subreddit targeting",
    "Access to all future features and updates",
];

export default function PriceCard({ planTitle, planDescription, price, futurePrice, isLifetime }: PriceCardProps) {

    const handleRedirect = () => {
        if (isLifetime) {
            window.location.href = "https://app.postonreddit.com/registration?lifetime";
        } else {
            window.location.href = "https://app.postonreddit.com/registration?monthly";
        }
    }

    return (
        <div className={`w-full md:w-fit h-auto flex flex-col items-start justify-start py-8 px-6 rounded-xl bg-background border border-border ${isLifetime && "border-primary md:scale-105"}`}>
            <h3 className="text-2xl font-bold text-foreground">{planTitle}</h3>
            <p className="text-sm text-muted-foreground mb-4">{planDescription}</p>
            <p className="text-3xl font-extrabold text-foreground">
                <span className="text-xl text-muted-foreground font-semibold line-through mr-2">{futurePrice}</span>
                {price}</p>
            <Separator className="w-full my-6" />
            <ul className="w-full flex flex-col items-start justify-start gap-2">
                {features.map((feature, index) => (
                    <li key={index} className="flex flex-row items-center justify-start gap-2 text-foreground"><CheckIcon className="w-4 h-4" /> {feature}</li>
                ))}
                {futureFeatures.map((feature, index) => (
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
                aria-label={isLifetime ? "Get Lifetime Access" : "Get Started"}
                onClick={handleRedirect}
                className={`w-full mt-6 bg-black hover:bg-black/80 ${isLifetime && "bg-primary hover:bg-primary/85"}`}>
                {isLifetime ? "Get Lifetime Access" : "Get Started"}
                {isLifetime && <ArrowRight className="w-4 h-4" />}
            </Button>
        </div>
    );
}
