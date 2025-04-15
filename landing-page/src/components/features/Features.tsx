import { ReactNode } from "react";
import Headline from "../custom/Headline";
import { FeaturesSections1, FeaturesSections2, FeaturesSections3, FeaturesSections4 } from "./FeaturesSections";

const features = [
    {
        section: <FeaturesSections1 />,
        title: "Find your subreddit soulmate",
        description: "No more posting in random places. Choose the subreddit where your post actually belongs (and thrives).",
        style: "md:w-[calc(45%-0.50rem)]"
    },
    {
        section: <FeaturesSections2 />,
        title: "Post like a time wizard",
        description: "We'll tell you exactly when to post for max visibility, today or next Thursday at 3:17 PM. Yes, really.",
        style: "md:w-[calc(55%-0.50rem)]"
    },
    {
        section: <FeaturesSections3 />,
        title: "Schedule it. Forget it. Celebrate.",
        description: "Write your post, hit schedule, and go live your life. We'll make sure your post shows up at just the right moment.",
        style: "md:w-[calc(60%-0.50rem)]"
    },
    {
        section: <FeaturesSections4 />,
        title: "Make Reddit love you",
        description: "Post smarter, not harder. Get more upvotes, followers, and karma, without living on Reddit 24/7.",
        style: "md:w-[calc(40%-0.50rem)]"
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
                    title="Meet the tools you didn't know you needed"
                    description="Manual posting? That's adorable. postonreddit lets you automate, analyze, and win, without breaking a sweat." />
                {features.map((feature) => (
                    <FeatureCard key={feature.title} {...feature} />
                ))}
            </div>
        </div>
    );
}
