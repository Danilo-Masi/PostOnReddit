import heroImage from "@/assets/images/hero.webp";
import Headline from "../custom/Headline";

function FeatureCard({ image, title, description, style }: { image: string, title: string, description: string, style?: string }) {
    return (
        <div className={`${style ? style : "w-full md:w-[calc(50%-0.75rem)]"} flex flex-col items-start justify-center gap-4 rounded-xl border border-zinc-200`}>
            <div className="w-full md:h-[80%] flex items-center justify-center overflow-hidden relative">
                <div className="w-full h-full bg-gradient-to-b from-transparent via-transparent to-zinc-50 rounded-t-xl absolute top-0 left-0" />
                <img src={image} alt={title} className="object-cover w-full h-full rounded-t-xl" />
            </div>
            <div className="w-full md:h-[20%] flex flex-col items-start justify-center gap-2 p-4">
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">{description}</p>
            </div>
        </div>
    );
}

const features = [
    {
        "image": heroImage,
        "title": "Effortless Scheduling",
        "description": "Easily schedule your posts to maximize engagement and reach your audience at the right time.",
        style: "w-full md:w-[calc(45%-0.50rem)] h-auto md:h-[70svh]"
    },
    {
        "image": heroImage,
        "title": "Automated Reminders",
        "description": "Set up automatic reminders for your followers to keep them engaged and informed.",
        style: "w-full md:w-[calc(55%-0.50rem)] h-auto md:h-[70svh]"
    },
    {
        "image": heroImage,
        "title": "Analytics Dashboard",
        "description": "Track your post performance with detailed analytics to refine your strategy.",
        style: "w-full md:w-[calc(60%-0.50rem)] h-auto md:h-[70svh]"
    },
    {
        "image": heroImage,
        "title": "Customizable Templates",
        "description": "Choose from a variety of templates to create visually appealing posts that stand out.",
        style: "w-full md:w-[calc(40%-0.50rem)] h-auto md:h-[70svh]"
    },
];

export default function Features() {
    return (
        <div className="w-full flex flex-col items-center justify-center bg-white">
            <div className="w-[90%] md:w-[80%] flex flex-wrap items-center justify-center gap-4 py-52">
                <Headline title="Features" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." />
                {features.map((feature, index) => (
                    <FeatureCard key={`${feature.title}-${index}`} {...feature} />
                ))}
            </div>
        </div>
    )
}
