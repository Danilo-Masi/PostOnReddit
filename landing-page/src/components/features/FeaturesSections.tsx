import { Heart } from "lucide-react"
import { Button } from "../ui/button"
import { Progress } from "../ui/progress"
import { useEffect, useState } from "react"
import Confetti from 'react-confetti';

function SubredditCard({ subreddit, isSelected, style }: { subreddit: string, isSelected: boolean, style?: string }) {
    return (
        <div className={`w-fit h-fit min-w-[200px] flex items-center justify-between p-2 bg-zinc-100 rounded-xl ${style && style}`}>
            <div className="flex items-center gap-3">
                <div className={`w-4 h-4 bg-white border border-zinc-200 rounded-full ${isSelected && "bg-orange-400"}`} />
                <p>{subreddit}</p>
            </div>
            {isSelected && <Heart className="w-4 h-4 ml-10 text-red-500" />}
        </div>
    )
}

export function FeaturesSections1() {
    return (
        <div className="w-full h-full rounded-t-xl flex items-center justify-center relative">
            <div className="w-full h-full absolute top-0 left-0 rounded-xl bg-gradient-to-b from-zinc-50 via-transparent to-white z-20" />
            <SubredditCard subreddit="r/SaaS" isSelected={false} style="absolute top-10 left-10" />
            <SubredditCard subreddit="r/SideProject" isSelected={false} style="absolute top-8 right-8" />
            <SubredditCard subreddit="r/EntrepreneurRideAlong" isSelected={false} style="absolute bottom-5 left-12" />
            <SubredditCard subreddit="r/buildinpublic" isSelected={false} style="absolute bottom-10 right-3" />
            <SubredditCard subreddit="r/Entrepreneur" isSelected={true} style="absolute top-50 left-50 shadow-lg" />
        </div>
    )
}

function TimeCard({ time, score }: { time: string, score: number }) {
    return (
        <div className="w-fit min-w-[200px] h-fit p-4 rounded-lg bg-zinc-100 border border-zinc-300">
            <h1 className="text-md font-bold text-zinc-700">{new Date().toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}</h1>
            <h3 className="text-sm font-medium text-zinc-500">{time}</h3>
            <p className="flex flex-row items-center gap-1 text-sm font-semibold text-blue-500">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {score}
            </p>
        </div>
    )
}

export function FeaturesSections2() {
    return (
        <div className="w-full h-full rounded-t-xl flex flex-col items-center justify-start gap-6 relative">
            <div className="w-full h-full absolute top-0 left-0 rounded-t-xl bg-gradient-to-b from-zinc-50 via-transparent to-white" />
            <div className="w-full h-full absolute top-0 left-0 rounded-x-xl bg-gradient-to-r from-white via-transparent to-white" />
            <div className="w-full h-1/3 flex items-center justify-start p-2 gap-3">
                {Array.from({ length: 10 }).map((_, index) => (
                    <TimeCard key={index} time="10:00 AM" score={451} />
                ))}
            </div>
            <div className="w-full h-1/3 flex items-center justify-center p-2 gap-3">
                {Array.from({ length: 10 }).map((_, index) => (
                    <TimeCard key={index} time="10:00 AM" score={1002} />
                ))}
            </div>
            <div className="w-full h-1/3 flex items-center justify-center p-2 gap-3">
                {Array.from({ length: 10 }).map((_, index) => (
                    <TimeCard key={index} time="10:00 AM" score={1002} />
                ))}
            </div>
        </div>
    )
}

function PostCard({ title, content, style }: { title: string, content: string, style?: string }) {
    return (
        <div className={`w-2/3 h-full flex flex-col items-start justify-start gap-2 p-5 rounded-xl bg-white border border-zinc-200 ${style && style}`}>
            <h1 className="text-lg font-bold text-zinc-700">{title}</h1>
            <p className="text-sm text-zinc-400">Scheduled for 18 Feb. 2025 at 03:17 AM</p>
            <p className="text-sm text-zinc-500">{content}</p>
            <div className="flex flex-row items-center justify-end w-full gap-2">
                <Button>Edit</Button>
                <Button variant="destructive">Delete</Button>
            </div>
        </div>
    );
}

export function FeaturesSections3() {
    return (
        <div className="w-full h-full rounded-t-xl flex items-center justify-center py-5 gap-3 relative overflow-hidden">
            <div className="w-full h-full absolute top-0 left-0 rounded-t-xl bg-gradient-to-b from-zinc-50 via-transparent to-white z-10" />
            <PostCard
                title="I’m 500 users away from either changing my life or"
                content="It’s been six years since I started messing around, thinking I’d stumble onto my path like in a movie. Spoiler: nothing fucking happened..."
                style="absolute -left-36 z-0" />
            <PostCard
                title="Stay up all fuc**ng night"
                content="I’m 25. Still young, still figuring stuff out, but I know one thing for sure: I’m not about to live a life someone else designed for me..."
                style="absolute -right-28 z-0" />
        </div>
    );
}

function GrowthCard() {
    const [progress, setProgress] = useState(14);


    useEffect(() => {
        while (progress < 100) {
            const interval = setInterval(() => {
                setProgress(progress + 1);
            }, 100);
            return () => clearInterval(interval);
        }
    }, [progress]);

    return (
        <div className={`w-2/3 h-fit flex flex-col items-start justify-start gap-2 p-5 rounded-xl bg-white border border-zinc-200`}>
            <h3 className="text-sm font-medium text-zinc-500">Users growth</h3>
            <h1 className="text-2xl font-bold text-zinc-700">+{progress}%</h1>
            <Progress value={progress} color="orange" />
        </div>
    )
}

export function FeaturesSections4() {
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        const confettiTimer = setTimeout(() => {
            setShowConfetti(false);
        }, 10000);
        return () => clearTimeout(confettiTimer);
    }, [showConfetti]);

    return (
        <div className="w-full h-full rounded-t-xl flex items-center justify-center relative">
            <div className="w-full h-full absolute top-0 left-0 rounded-t-xl bg-gradient-to-b from-zinc-50 via-transparent to-white z-10" />
            {showConfetti && (
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
            )}
            <GrowthCard />
        </div>
    )
}
