import { motion } from "motion/react";
import hero from '../../assets/images/hero.webp';
import icon from '../../assets/images/icon.png';
import { Link } from "react-router";
import { Button } from "../ui/button";
import { CirclePlay, TrendingUp } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import face1 from '../../assets/images/face1.webp';
import face2 from '../../assets/images/face2.webp';
import face3 from '../../assets/images/face3.webp';
import face4 from '../../assets/images/face4.webp';
import face5 from '../../assets/images/face5.webp';
import { Rating } from '@smastrom/react-rating';
import { BackgroundBeamsWithCollision } from "../ui/background-beams-with-collision";
import { scrollToElement } from "@/utility/use-animation";

const Navbar = () => {
    return (
        <nav className="w-full md:w-[80%] flex items-center justify-between px-4 py-4 md:py-2 z-20">
            <div className="flex items-center gap-2">
                <img src={icon} className="max-h-[7svh]" />
                <h1 className="text-base font-bold md:text-2xl text-zinc-700">postonreddit</h1>
            </div>
            <div className="flex items-center gap-12">
                <ul className="hidden md:flex gap-x-6 ">
                    <li><Link to="/" onClick={() => scrollToElement("#Features")}>How it works</Link></li>
                    <li><Link to="/" onClick={() => scrollToElement("#Pricing")}>Pricing</Link></li>
                    <li><Link to="/" onClick={() => scrollToElement("#Support")}>Support</Link></li>
                </ul>
                <Button className="font-medium text-white transition-all duration-300 hover:-translate-y-0.5 shadow-md shadow-zinc-300 bg-orange-600 hover:bg-orange-700">
                    Start now
                    <TrendingUp />
                </Button>
            </div>
        </nav>
    );
};

const GroupAvatar = () => {
    return (
        <div className="w-full md:w-fit flex -space-x-3 justify-center md:justify-start">
            {[face1, face2, face3, face4, face5].map((face, index) => (
                <Avatar key={index} className="w-11 h-11 ring-2 ring-zinc-50 shadow-lg">
                    <AvatarImage src={face} className="object-cover object-center" />
                </Avatar>
            ))}
        </div>
    );
};

const Testimonial = () => {
    return (
        <div className="flex flex-col md:flex-row gap-3 items-center justify-start mt-6 md:mt-0">
            <GroupAvatar />
            <div className="w-full flex flex-col items-center md:items-start">
                <Rating style={{ maxWidth: 150 }} value={4.7} readOnly />
                <p className="text-sm text-zinc-500"><span className="font-bold text-zinc-700">100+ founders </span> scheduling smarter on Reddit</p>
            </div>
        </div>
    );
}

export default function Hero() {
    return (
        <div className="w-full relative flex flex-col items-center justify-center">
            <BackgroundBeamsWithCollision>
                <Navbar />
                <div className="w-full md:w-[80%] px-4 py-10 md:py-20 flex flex-col items-center gap-8">
                    {/* Link alla demo */}
                    <motion.span
                        initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                        transition={{
                            duration: 0.3,
                            delay: 0.1,
                            ease: "easeInOut",
                        }} className="flex items-center justify-center">
                        <Link to="/" onClick={() => scrollToElement("#Features")} className="flex gap-2 underline text-sm text-orange-600"><CirclePlay className="h-5 w-5" /> Try the Demo</Link>
                    </motion.span>
                    {/* Titolo */}
                    <h1 className="relative z-10 mx-auto max-w-2xl text-center text-6xl font-extrabold text-zinc-700">
                        {"Boost your SaaS with Reddit"
                            .split(" ")
                            .map((word, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.1,
                                        ease: "easeInOut",
                                    }}
                                    className="mr-2 inline-block">
                                    {word}
                                </motion.span>
                            ))}
                    </h1>
                    {/* Sottotitolo */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.8 }}
                        className="relative z-10 mx-auto max-w-lg text-center text-lg font-normal text-zinc-600">
                        Schedule your posts and maximize engagement effortlessly.
                    </motion.p>
                    {/* Bottoni */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 1.1 }}
                        className="relative z-10 flex flex-wrap items-center justify-center gap-4">
                        <Button
                            className="w-60 transform rounded-lg px-6 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 shadow-md shadow-zinc-300 bg-orange-600 hover:bg-orange-700">
                            Get started
                            <TrendingUp />
                        </Button>
                        <Button
                            variant="outline"
                            className="w-60 md:w-fit transform rounded-lg px-6 font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-100">
                            Learn more
                        </Button>
                    </motion.div>
                    {/* Testimonial */}
                    <motion.div
                        initial={{ opacity: 0, }}
                        animate={{ opacity: 1, }}
                        transition={{ duration: 0.3, delay: 1.4 }}
                        className="z-10 flex flex-col items-center justify-center">
                        <Testimonial />
                    </motion.div>
                    {/* Immagine */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 1.7 }}
                        className="md:w-[80%] relative mt-10 rounded-3xl border border-zinc-100 bg-zinc-50 p-4 shadow-lg">
                        <div className="overflow-hidden rounded-xl border border-zinc-100 relative">
                            <img
                                src={hero}
                                alt="Landing page preview"
                                className="aspect-[16/9] h-auto w-full object-cover"
                                height={1000}
                                width={1000} />
                        </div>
                    </motion.div>
                </div>
            </BackgroundBeamsWithCollision>
        </div>
    );
}
