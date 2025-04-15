import { useEffect, useState } from "react"
import Confetti from 'react-confetti';
import { Progress } from "../ui/progress"
import { Blackheartsuit } from "../custom/Blackheartsuit";
import StarIcon from "../custom/StarIcon";

function SubredditCard({ subreddit, isSelected, style }: { subreddit: string, isSelected: boolean, style?: string }) {
    return (
        <div className={`w-fit h-fit flex items-center justify-between px-4 py-2 bg-accent rounded-xl text-sm ${style && style}`}>
            <div className={`flex items-center gap-3 ${isSelected && "cursor-pointer hover:scale-105 transition-all duration-300"}`}>
                {isSelected && <Blackheartsuit />}
                <p>{subreddit}</p>
            </div>
        </div>
    );
}

export function FeaturesSections1() {
    return (
        <div className="w-full h-[50svh] rounded-t-xl flex items-center justify-center relative">
            <div className="w-full h-full absolute top-0 left-0 rounded-xl bg-gradient-to-b from-zinc-50 via-transparent to-white blur-2xl z-20" />
            <div className="w-full h-full absolute top-0 left-0 rounded-xl bg-gradient-to-r from-zinc-50 via-transparent to-white blur-2xl z-20" />
            <SubredditCard subreddit="r/SaaS" isSelected={false} style="absolute top-10 left-10" />
            <SubredditCard subreddit="r/startups" isSelected={false} style="absolute top-8 left-44" />

            <SubredditCard subreddit="r/SideProject" isSelected={false} style="absolute top-24 right-12" />
            <SubredditCard subreddit="r/failinpublic" isSelected={false} style="absolute top-8 right-8 " />

            <SubredditCard subreddit="r/EntrepreneurRideAlong" isSelected={false} style="absolute bottom-5 left-8 " />
            <SubredditCard subreddit="r/indiehackers" isSelected={false} style="absolute bottom-24 left-2 " />

            <SubredditCard subreddit="r/buildinpublic" isSelected={false} style="absolute bottom-10 right-3 " />
            <SubredditCard subreddit="r/Endgame" isSelected={false} style="absolute bottom-2 right-36" />

            <SubredditCard subreddit="r/Entrepreneur" isSelected={true} style="absolute top-50 left-50 shadow-lg z-20" />
        </div>
    );
}

function TimeCard({ time, score }: { time: string, score: number }) {
    return (
        <div className="w-fit min-w-[200px] h-fit p-4 rounded-lg bg-accent border border-border">
            <h1 className="text-md font-bold text-foreground">{new Date().toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}</h1>
            <h3 className="text-sm font-medium text-muted-foreground">{time}</h3>
            <p className="flex flex-row items-center gap-1 text-sm font-semibold text-blue-500">
                <StarIcon />
                {score}
            </p>
        </div>
    );
}

export function FeaturesSections2() {

    const randomTime = () => {
        return Math.floor(Math.random() * 12);
    }

    const randomScore = () => {
        return Math.floor(Math.random() * 1111);
    }

    return (
        <div className="h-[50svh] rounded-t-xl flex flex-col items-center justify-start overflow-hidden gap-6 relative">
            <div className="w-full h-full absolute top-0 left-0 rounded-t-xl bg-gradient-to-b from-zinc-50/90 via-transparent to-white" />
            <div className="w-full h-full absolute top-0 left-0 rounded-x-xl bg-gradient-to-r from-zinc-50/90 via-transparent to-zinc-50/90" />
            <div className="h-1/3 flex items-center justify-start py-2 ml-12 gap-3">
                {Array.from({ length: 10 }).map((_, index) => (
                    <TimeCard key={index} time={`${randomTime()}:00 PM`} score={randomScore()} />
                ))}
            </div>
            <div className="h-1/3 flex items-center justify-center py-2 gap-3">
                {Array.from({ length: 10 }).map((_, index) => (
                    <TimeCard key={index} time={`${randomTime()}:00 PM`} score={randomScore()} />
                ))}
            </div>
            <div className="h-1/3 flex items-center justify-center py-2 ml-24 gap-3">
                {Array.from({ length: 10 }).map((_, index) => (
                    <TimeCard key={index} time={`${randomTime()}:00 PM`} score={randomScore()} />
                ))}
            </div>
        </div>
    );
}

function PostCard({ title, content, style }: { title: string, content: string, style?: string }) {
    return (
        <div className={`w-2/3 flex flex-col items-start justify-start gap-2 p-5 rounded-xl bg-background border border-border ${style && style}`}>
            <h1 className="text-lg font-bold text-foreground">{title}</h1>
            <p className="text-sm text-muted-foreground">Scheduled for 18 Feb. 2025 at 03:17 AM</p>
            <p className="text-sm text-muted-foreground">{content}</p>
        </div>
    );
}

export function FeaturesSections3() {
    return (
        <div className="w-full h-[50svh] rounded-t-xl flex items-center justify-center py-5 gap-3 relative overflow-hidden">
            <div className="w-full h-full absolute top-0 left-0 rounded-t-xl bg-gradient-to-b from-zinc-50/50 via-transparent to-whitez-10" />
            <div className="w-full h-full absolute top-0 left-0 rounded-x-xl bg-gradient-to-r from-zinc-50/50 via-transparent to-zinc-50/50 z-10" />
            <PostCard
                title="I’m 500 users away from either changing my life"
                content="It’s been six years since I started messing around, thinking I’d stumble onto my path like in a movie. Spoiler: nothing fucking happened..."
                style="absolute -right-96 z-0" />
            <PostCard
                title="Stay up all fuc**ng night"
                content="I’m 25. Still young, still figuring stuff out, but I know one thing for sure: I’m not about to live a life someone else designed for me..."
                style="absolute -right-50 z-10 border hover:border-orange-600 cursor-pointer hover:scale-110 transition-all duration-500" />
            <PostCard
                title="I’m 500 users away from either changing my life or"
                content="It’s been six years since I started messing around, thinking I’d stumble onto my path like in a movie. Spoiler: nothing fucking happened..."
                style="absolute -left-96 z-0" />
        </div>
    );
}

function GrowthCard() {
    const [progress, setProgress] = useState(14);
    useEffect(() => {
        while (progress < 299) {
            const interval = setInterval(() => {
                setProgress(progress + 1);
            }, 100);
            return () => clearInterval(interval);
        }
    }, [progress]);

    return (
        <div className={`w-2/3 h-fit flex flex-col items-start justify-start gap-2 p-5 rounded-xl bg-background border border-border`}>
            <h3 className="text-sm font-medium text-muted-foreground">Users growth<span className="text-xs text-green-600 ml-2">+42%</span></h3>
            <h1 className="text-2xl font-bold text-foreground">+{progress} <span className="text-lg font-medium text-muted-foreground">new users</span></h1>
            <Progress value={progress} about="new users" />
        </div>
    );
}

export function FeaturesSections4() {
    return (
        <div className="w-full h-[50svh] rounded-t-xl flex items-center justify-center relative">
            <div className="w-full h-full absolute top-0 left-0 rounded-t-xl bg-gradient-to-b from-zinc-50 via-transparent to-white z-10" />
            <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                recycle={true}
                numberOfPieces={200}
                gravity={0.2}
                initialVelocityY={20}
                initialVelocityX={10}
                colors={['#FFD700', '#FFA500', '#FF6347', '#FF4500', '#FF1493', '#00FF00', '#00BFFF', '#4169E1']}
                style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 1000 }}
            />
            <GrowthCard />
        </div>
    );
}
