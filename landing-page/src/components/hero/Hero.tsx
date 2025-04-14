import { Link } from "react-router";
import { scrollToElement } from "@/utility/use-animation";
import { Button } from "../ui/button";
import { ChevronRight, Gift, TrendingUp } from "lucide-react";
import face1 from "../../assets/images/face1.webp";
import face2 from "../../assets/images/face2.webp";
import face3 from "../../assets/images/face3.webp";
import face4 from "../../assets/images/face4.webp";
import face5 from "../../assets/images/face5.webp";
import logo from "../../assets/images/icon.png";
import { motion } from 'framer-motion';
import Starticon from "../custom/Starticon";

const blockHours1 = [
    {
        date: new Date(),
        hour: "9:30 PM",
        score: 273
    },
    {
        date: new Date(),
        hour: "11:15 PM",
        score: 5982
    },
    {
        date: new Date(),
        hour: "01:00 AM",
        score: 87
    },
    {
        date: new Date(),
        hour: "10:00",
        score: 100
    },
]

const blockHours2 = [
    {
        date: new Date(),
        hour: "02:00 PM",
        score: 199
    },
    {
        date: new Date(),
        hour: "04:15 AM",
        score: 1001
    },
    {
        date: new Date(),
        hour: "08:00 PM",
        score: 33
    },
    {
        date: new Date(),
        hour: "10:00",
        score: 100
    },
];

const blockHours3 = [
    {
        date: new Date(),
        hour: "01:15 PM",
        score: 226
    },
    {
        date: new Date(),
        hour: "07:30 AM",
        score: 651
    },
    {
        date: new Date(),
        hour: "11:00 PM",
        score: 330
    },
    {
        date: new Date(),
        hour: "10:00",
        score: 100
    },
];

function HeroNav() {
    return (
        <nav className=" w-[90%] md:w-[80%] flex py-4 items-center justify-between relative">
            {/* Logo */}
            <div className="flex items-center gap-2 z-20">
                <div className="h-10 w-10">
                    <img src={logo} alt="logo" className="w-full h-full object-cover" />
                </div>
                <span className="font-semibold">postonreddit</span>
            </div>
            {/* Link Navigation */}
            <div className="hidden md:flex items-center gap-8 text-sm text-zinc-600">
                <Link to="#" onClick={() => scrollToElement("#features")} className="hover:text-black transition-colors">Features</Link>
                <Link to="#" onClick={() => scrollToElement("#pricing")} className="hover:text-black transition-colors">Pricing</Link>
                {/*<Link to="#" onClick={() => scrollToElement("#demo")} className="hover:text-black transition-colors">Demo</Link>*/}
                <Link to="#" onClick={() => scrollToElement("#faq")} className="hover:text-black transition-colors">Faq</Link>
            </div>
            {/* Buttons */}
            <div className="flex items-center gap-2">
                <Button
                    onClick={() => window.location.href = "https://app.postonreddit.com/login"}
                    variant="outline"
                    className="items-center gap-2 hidden md:flex">
                    Sign In
                </Button>
                <Button
                    onClick={() => window.location.href = "https://app.postonreddit.com/registration"}
                    className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white">
                    Get Started <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </nav>
    );
}

function HeroCard({ block }: { block: { date: Date, hour: string, score: number } }) {
    return (
        <div className="w-full h-fit p-4 rounded-lg bg-zinc-100 border border-zinc-300">
            <h1 className="text-md font-bold text-zinc-700">{block.date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}</h1>
            <h3 className="text-sm font-medium text-zinc-500">{block.hour}</h3>
            <p className="flex flex-row items-center gap-1 text-sm font-semibold text-blue-500">
                <Starticon />
                {block.score}
            </p>
        </div>
    );
}

function HeroContent() {
    return (
        <div className="w-[90%] md:w-[80%] h-full flex flex-col md:flex-row gap-x-8 gap-y-24 items-center justify-center py-24 md:py-32">
            {/* Left Column */}
            <div className="w-full md:w-1/2 h-full flex flex-col gap-8 text-center md:text-left">
                {/* Title and subtitle */}
                <div className="space-y-6">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                        <p className="flex items-center justify-center md:justify-start text-sm font-medium text-zinc-700"><Gift className="h-4 w-4 animate-bounce text-orange-600 mr-2" />Join now and get the <span className="font-bold text-orange-600 ml-1"> 5€ discount!</span></p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-zinc-800">
                            Make your first <span className="font-extrabold text-zinc-900">$$</span> online, with <span className="text-orange-600 italic">Reddit</span>
                        </h1>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }}>
                        <p className="text-base sm:text-lg text-zinc-600 max-w-lg mx-auto md:mx-0">
                            Grow your audience, get honest feedback, and find your first paying users, all without leaving Reddit.
                        </p>
                    </motion.div>
                </div>
                {/* Buttons and user avatars */}
                <div className="flex flex-col items-center md:items-start gap-6">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.9 }}>
                        <Button
                            onClick={() => window.location.href = "https://app.postonreddit.com/registration"}
                            size="lg"
                            className="w-full sm:w-fit bg-orange-600 hover:bg-orange-700 text-white">
                            Start growing <TrendingUp className="ml-2 h-4 w-4" />
                        </Button>
                    </motion.div>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.1 }}>
                            <div className="flex -space-x-4">
                                {[face1, face2, face3, face4, face5].map((face, i) => (
                                    <img
                                        key={i}
                                        src={face}
                                        alt="User avatar"
                                        className="h-10 w-10 rounded-full border-2 object-cover border-white" />
                                ))}
                            </div>
                        </motion.div>
                        <div className="text-center sm:text-left flex flex-col items-center gap-2">
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.3 }}>
                                <div className="w-full flex items-start justify-center md:justify-start gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Starticon key={star} />
                                    ))}
                                </div>
                                <p className="text-sm font-bold text-zinc-600">200+<span className="text-zinc-600 font-normal"> founders already joined</span></p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Right Column */}
            <div className="w-full md:w-1/2 h-[60svh] flex gap-4 items-start justify-center relative overflow-hidden">
                <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-zinc-100 via-transparent to-zinc-100" />
                <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-r from-zinc-100 via-transparent to-zinc-100" />
                <div className="w-1/2 md:w-1/3 h-full flex flex-wrap gap-4 overflow-hidden mt-16">
                    {blockHours1.map((block, index) => (
                        <HeroCard key={index} block={block} />
                    ))}
                </div>
                <div className="w-1/2 md:w-1/3 h-full flex flex-wrap gap-4 overflow-hidden">
                    {blockHours2.map((block, index) => (
                        <HeroCard key={index} block={block} />
                    ))}
                </div>
                <div className="w-1/3 h-full md:flex hidden flex-wrap gap-4 overflow-hidden mt-8">
                    {blockHours3.map((block, index) => (
                        <HeroCard key={index} block={block} />
                    ))}
                </div>
            </div>

        </div>
    );
}

export default function Hero() {
    return (
        <div className="w-full h-auto min-h-svh flex flex-col items-center justify-start bg-zinc-100">
            <HeroNav />
            <HeroContent />
        </div>
    );
}
