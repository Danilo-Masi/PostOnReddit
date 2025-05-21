import { ReactNode } from "react";
import Headline from "../custom/Headline";
import { FeaturesSections1, FeaturesSections2, FeaturesSections3, FeaturesSections4 } from "./FeaturesSections";

const features = [
    {
        section: <FeaturesSections1 />,
        title: "Stop wasting posts, find the perfect subreddit and get real traction",
        description: "We tell you exactly where your content will shine, so you don’t get buried again.",
        style: "md:w-[calc(50%-0.50rem)]"
    },
    {
        section: <FeaturesSections2 />,
        title: "Get 3x more views by posting at the exact right time (without guessing)",
        description: "We analyze data to tell you when your post will blow up, down to the minute.",
        style: "md:w-[calc(50%-0.50rem)]"
    },
    {
        section: <FeaturesSections3 />,
        title: "Schedule your Reddit post once, watch it work while you sleep",
        description: "No alarms, no stress. We’ll post for you at the optimal time, automatically.",
        style: "md:w-[calc(55%-0.50rem)]"
    },
    {
        section: <FeaturesSections4 />,
        title: "Turn Reddit into your growth engine, without living on it",
        description: "More upvotes, followers, and karma by posting smarter not longer.",
        style: "md:w-[calc(45%-0.50rem)]"
    },
];

function FeatureCard({ section, title, description, style }: { section: ReactNode, title: string, description: string, style?: string }) {
    return (
        <div className={`${style ? style : "w-full md:w-[calc(50%-0.75rem)]"} flex flex-col items-start justify-center gap-4 rounded-xl border border-border`}>
            <div className="w-full md:h-[70%] flex items-center justify-center overflow-hidden relative">
                {section}
            </div>
            <div className="w-full md:h-[30%] flex flex-col items-start justify-center gap-2 p-4">
                <h3 className="text-xl text-balance font-semibold text-foreground">{title}</h3>
                <p className="text-sm text-balance text-muted-foreground ">{description}</p>
            </div>
        </div>
    );
}

export default function Features() {
    return (
        <div className="w-full h-auto min-h-svh flex flex-col items-center justify-center bg-background" id="features">
            <div className="w-[90%] md:w-[80%] flex flex-wrap items-center justify-center gap-4 py-24 md:py-32">
                <Headline
                    section="Features"
                    title="Tools built for traction, not upvotes"
                    description="You've got a product worth sharing. We make sure it gets seen" />
                {features.map((feature) => (
                    <FeatureCard key={feature.title} {...feature} />
                ))}
            </div>
        </div>
    );
}
