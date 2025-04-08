import { useState } from "react";
import { Link } from "react-router";
import { scrollToElement } from "@/utility/use-animation";
import { Button } from "../ui/button";
import { ArrowRight, ChevronRight, Menu, X } from "lucide-react";
import face1 from "../../assets/images/face1.webp";
import face2 from "../../assets/images/face2.webp";
import face3 from "../../assets/images/face3.webp";
import face4 from "../../assets/images/face4.webp";
import face5 from "../../assets/images/face5.webp";
import logo from "../../assets/images/icon.png";

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
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <nav className=" w-[90%] md:w-[80%] flex py-4 items-center justify-between relative">
            {/* Logo */}
            <div className="flex items-center gap-2 z-20">
                <div className="h-10 w-10">
                    <img src={logo} alt="logo" className="w-full h-full object-cover" />
                </div>
                <span className="font-semibold">postonreddit</span>
            </div>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden z-20 p-2">
                {isMenuOpen ? (
                    <X className="h-6 w-6" />
                ) : (
                    <Menu className="h-6 w-6" />
                )}
            </button>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 text-sm text-zinc-600">
                <Link to="#" onClick={() => scrollToElement("#features")} className="hover:text-black transition-colors">Features</Link>
                <Link to="#" onClick={() => scrollToElement("#pricing")} className="hover:text-black transition-colors">Pricing</Link>
                <Link to="#" onClick={() => scrollToElement("#demo")} className="hover:text-black transition-colors">Demo</Link>
                <Link to="#" onClick={() => scrollToElement("#faq")} className="hover:text-black transition-colors">Faq</Link>
            </div>
            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center gap-2">
                <Button variant="outline" className="items-center gap-2">
                    Sign In
                </Button>
                <Button className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white">
                    Get Started <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
            {/* Mobile Menu */}
            <div className={`fixed inset-0 bg-white z-10 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
                <div className="flex flex-col items-center justify-center h-full gap-8">
                    <div className="flex flex-col items-center gap-6 text-lg">
                        <Link to="#" onClick={() => scrollToElement("#features")} className="hover:text-orange-600 transition-colors">Features</Link>
                        <Link to="#" onClick={() => scrollToElement("#pricing")} className="hover:text-orange-600 transition-colors">Pricing</Link>
                        <Link to="#" onClick={() => scrollToElement("#demo")} className="hover:text-orange-600 transition-colors">Demo</Link>
                        <Link to="#" onClick={() => scrollToElement("#faq")} className="hover:text-orange-600 transition-colors">Faq</Link>
                    </div>
                    <div className="flex flex-col gap-4 w-[80%] max-w-xs">
                        <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                            Get Started
                        </Button>
                        <Button variant="outline" className="w-full">
                            Sign In
                        </Button>
                    </div>
                </div>
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
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
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
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight">
                        Schedule Smarter, Create Faster!
                    </h1>
                    <p className="text-base sm:text-lg text-zinc-600 max-w-lg mx-auto md:mx-0">
                        Maximize your reach and engagement by scheduling your content with postonreddit. Whether you're selling products, promoting your brand, or tools make it easy to achieve your goals.
                    </p>
                </div>
                {/* Buttons and user avatars */}
                <div className="flex flex-col items-center md:items-start gap-6">
                    <Button size="lg" className="w-full sm:w-fit bg-orange-600 hover:bg-orange-700 text-white">
                        Start growing <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="flex -space-x-4">
                            {[face1, face2, face3, face4, face5].map((face, i) => (
                                <img
                                    key={i}
                                    src={face}
                                    alt="User avatar"
                                    className="h-10 w-10 rounded-full border-2 object-cover border-white" />
                            ))}
                        </div>
                        <div className="text-center sm:text-left flex flex-col items-center gap-2">
                            <div className="w-full flex items-start justify-center md:justify-start gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-sm font-bold text-zinc-600">200+<span className="text-zinc-600 font-normal"> people already joined</span></p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Right Column */}
            <div className="w-full md:w-1/2 h-[60svh] flex gap-4 items-start justify-center relative overflow-hidden">
                <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-zinc-100 via-transparent to-zinc-100" />
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
