import { Link } from "react-router";
import { scrollToElement } from "@/utility/useAnimation";
import { Button } from "../ui/button";
import { ChevronRight, Gift, TrendingUp } from "lucide-react";
import face1 from "../../assets/images/face1.webp";
import face2 from "../../assets/images/face2.webp";
import face3 from "../../assets/images/face3.webp";
import face4 from "../../assets/images/face4.webp";
import face5 from "../../assets/images/face5.webp";
import logo from "../../assets/images/icon.png";
import { motion } from 'framer-motion';
import Starticon from "../custom/StarIcon";

function Logo() {
    return (
        <div className="flex items-center gap-2 z-20">
            <div className="h-10 w-10">
                <img src={logo} alt="logo postonreddit" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <span className="font-semibold">postonreddit</span>
        </div>
    );
}

function HeroNav() {

    const handleSignIn = () => {
        window.sa_event?.("navbar_sign_in");
        window.location.href = "https://app.postonreddit.com/login";
    };

    const handleGetStarted = () => {
        window.sa_event?.("navbar_get_started");
        window.location.href = "https://app.postonreddit.com/registration";
    }

    return (
        <nav className=" w-[90%] md:w-[80%] flex py-4 items-center justify-between relative">
            <Logo />
            {/* Link Navigation */}
            <div className="hidden md:flex items-center gap-8 text-sm text-secondary-foreground hover:text-black transition-colors">
                <Link to="#" onClick={() => scrollToElement("#features")}>Features</Link>
                <Link to="#" onClick={() => scrollToElement("#pricing")}>Pricing</Link>
                <Link to="#" onClick={() => scrollToElement("#faq")}>Faq</Link>
            </div>
            {/* Buttons */}
            <div className="flex items-center gap-2">
                <Button
                    aria-label="Sign In"
                    variant="outline"
                    className="hidden md:flex"
                    onClick={handleSignIn}>
                    Sign In
                </Button>
                <Button
                    aria-label="Get Started"
                    className="bg-primary hover:bg-primary/85 text-primary-foreground"
                    onClick={handleGetStarted}>
                    Get Started <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </nav>
    );
}

function HeroCard() {

    const randomDate = () => {
        return new Date();
    }

    const randomHour = () => {
        const hour = Math.floor(Math.random() * 12);
        const minute = Math.floor(Math.random() * 60);
        return `${hour}:${minute.toString().padStart(2, '0')}`;
    }

    const randomScore = () => {
        return Math.floor(Math.random() * 1111);
    }

    return (
        <div className="w-full h-fit p-4 rounded-lg bg-secondary border border-border">
            <h1 className="text-md font-bold text-secondary-foreground">{randomDate().toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}</h1>
            <h3 className="text-sm font-medium text-muted-foreground">{randomHour()} {randomDate().getHours() < 12 ? "AM" : "PM"}</h3>
            <p className="flex flex-row items-center gap-1 text-sm font-semibold text-blue-500">
                <Starticon />
                {randomScore()}
            </p>
        </div>
    );
}

function HeroContent() {

    const handleGetStarted = () => {
        window.sa_event?.("hero_get_started");
        window.location.href = "https://app.postonreddit.com/registration";
    }

    return (
        <div className="w-[90%] md:w-[80%] h-full flex flex-col md:flex-row gap-x-8 gap-y-24 items-center justify-center py-24 md:py-32">
            {/* Left Column */}
            <div className="w-full md:w-1/2 h-full flex flex-col gap-8 text-center md:text-left">
                {/* Title and subtitle */}
                <div className="space-y-6">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                        <p className="flex items-center justify-center md:justify-start text-sm font-medium text-foreground"><Gift className="h-4 w-4 animate-bounce text-primary mr-2" />Join now and get the <span className="font-bold text-primary ml-1"> 5€ discount!</span></p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-foreground">
                            Grow your SaaS with <span className="text-primary italic">Reddit</span>
                        </h1>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }}>
                        <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto md:mx-0">
                            postonreddit helps SaaS founders drive traffic and signups by posting at the best time, in the right subreddits, with zero guesswork.
                        </p>
                    </motion.div>
                </div>
                {/* Buttons and user avatars */}
                <div className="flex flex-col items-center md:items-start gap-6">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.9 }}>
                        <Button
                            aria-label="Start growing"
                            onClick={handleGetStarted}
                            size="lg"
                            className="w-full sm:w-fit bg-primary hover:bg-primary/85 text-primary-foreground">
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
                                <p className="text-sm font-bold text-foreground">170+<span className="text-foreground font-normal"> founders already joined</span></p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Right Column */}
            <div className="w-full md:w-1/2 h-[60svh] flex gap-4 items-start justify-center relative overflow-hidden">
                <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-accent via-transparent to-accent" />
                <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-r from-accent via-transparent to-accent" />
                <div className="w-1/2 md:w-1/3 h-full flex flex-wrap gap-4 overflow-hidden mt-16">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <HeroCard key={index} />
                    ))}
                </div>
                <div className="w-1/2 md:w-1/3 h-full flex flex-wrap gap-4 overflow-hidden">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <HeroCard key={index} />
                    ))}
                </div>
                <div className="w-1/3 h-full md:flex hidden flex-wrap gap-4 overflow-hidden mt-8">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <HeroCard key={index} />
                    ))}
                </div>
            </div>

        </div>
    );
}

export default function Hero() {
    return (
        <div className="w-full h-auto min-h-svh flex flex-col items-center justify-start bg-accent">
            <HeroNav />
            <HeroContent />
        </div>
    );
}
