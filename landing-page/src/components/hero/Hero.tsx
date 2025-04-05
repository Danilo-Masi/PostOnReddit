import { Star } from "lucide-react";
import face1 from "../../assets/images/face1.webp";
import face2 from "../../assets/images/face2.webp";
import face3 from "../../assets/images/face3.webp";
import face4 from "../../assets/images/face4.webp";
import face5 from "../../assets/images/face5.webp";

function HeroBadge() {
    return (
        <div className="px-10 py-2 bg-zinc-800 rounded-2xl text-zinc-50 shadow-lg shadow-zinc-900/20 mb-8">
            Launch you SaaS to the stars ✨
        </div>
    );
}

function HeroHeadline() {
    return (
        <div className="w-full h-auto flex flex-col items-center justify-center mb-8">
            <h1 className="text-5xl font-extrabold">Grow your SaaS with Reddit</h1>
            <p className="text-zinc-500">
                Post on Reddit is a tool that helps you grow your SaaS with Reddit.
            </p>
        </div>
    );
}

const USERS = [
    { image: face1, fallbackName: "User" },
    { image: face2, fallbackName: "Dev" },
    { image: face3, fallbackName: "Pro" },
    { image: face4, fallbackName: "Builder" },
    { image: face5, fallbackName: "Expert" },
] as const;

interface AvatarProps {
    image: string;
    fallbackName: string;
}

function Avatar({ image, fallbackName }: AvatarProps) {
    return (
        <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden">
            <img
                src={image}
                alt={`${fallbackName} avatar`}
                className="w-full h-full object-cover"
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://ui-avatars.com/api/?name=${fallbackName}&background=random`;
                }}
            />
        </div>
    );
}

function StarRating({ rating = 5 }) {
    return (
        <div className="flex items-center space-x-1">
            {[...Array(rating)].map((_, i) => (
                <Star
                    key={i}
                    className="w-6 h-6 fill-amber-400 text-amber-500"
                />
            ))}
        </div>
    );
}

function HeroSocials() {
    return (
        <div className="w-fit h-fit flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="w-fit h-full flex items-center justify-center -space-x-4">
                {USERS.map((user, index) => (
                    <Avatar key={index} {...user} />
                ))}
            </div>
            <div className="w-fit h-full flex flex-col items-center justify-center space-y-2">
                <StarRating />
                <p className="text-sm text-zinc-500">+244 productive builders</p>
            </div>
        </div>
    );
}

export default function Hero() {
    return (
        <div className="w-full h-auto min-h-svh flex items-center justify-center">
            <div className="w-[90%] md:w-[80%] h-full flex flex-col items-center justify-center">
                <HeroBadge />
                <HeroHeadline />
                <HeroSocials />
            </div>
        </div>
    );
}
