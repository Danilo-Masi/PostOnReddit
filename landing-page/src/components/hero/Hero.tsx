import { motion } from "motion/react";
import hero from '../../assets/images/hero.webp';
import icon from '../../assets/images/icon.png';
import { Link } from "react-router";
import { Button } from "../ui/button";
import { TrendingUp } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import face1 from '../../assets/images/face1.webp';
import face2 from '../../assets/images/face2.webp';
import face3 from '../../assets/images/face3.webp';
import face4 from '../../assets/images/face4.webp';
import face5 from '../../assets/images/face5.webp';

const Navbar = () => {
    return (
        <nav className="w-full flex items-center justify-between px-4 py-4 md:py-2">
            <div className="flex items-center gap-2">
                <img src={icon} className="max-h-[7svh]" />
                <h1 className="text-base font-bold md:text-2xl text-zinc-700">postonreddit</h1>
            </div>
            <div className="flex items-center gap-12">
                <ul className="hidden md:flex gap-x-6 ">
                    <li><Link to="/">Features</Link></li>
                    <li><Link to="/">Pricing</Link></li>
                    <li><Link to="/">Faqs</Link></li>
                </ul>
                <Button className="font-medium text-white transition-all duration-300 hover:-translate-y-0.5 shadow-md shadow-zinc-300 bg-orange-600 hover:bg-orange-700">
                    Start growing
                    <TrendingUp />
                </Button>
            </div>
        </nav>
    );
};

const GroupAvatar = () => {
    return (
        <div className="flex -space-x-3">
            {[face1, face2, face3, face4, face5].map((face, index) => (
                <Avatar key={index} className="w-9 h-9 ring-2 ring-white shadow-lg">
                    <AvatarImage src={face} className="object-cover object-center" />
                </Avatar>
            ))}
        </div>
    );
};

export default function Hero() {
    return (
        <div className="w-full relative flex flex-col items-center justify-center bg-gradient-to-t from-zinc-50 via-orange-100 to-zinc-50">
            <Navbar />
            <div className="px-4 py-10 md:py-20 flex flex-col items-center">
                <h1 className="relative z-10 mx-auto max-w-4xl text-center text-6xl font-extrabold text-zinc-700">
                    {"Grow your SaaS with Reddit"
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
                <motion.p
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        duration: 0.3,
                        delay: 0.8,
                    }}
                    className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-zinc-600">
                    In ac volutpat sem, vitae luctus augue, praesent velit dolor, euismod eget purus a, mollis pulvinar
                </motion.p>
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        duration: 0.3,
                        delay: 1,
                    }}
                    className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4">
                    <Button
                        className="w-60 transform rounded-lg px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 shadow-md shadow-zinc-300 bg-orange-600 hover:bg-orange-700">
                        Start growing
                        <TrendingUp />
                    </Button>
                    <Button
                        variant="outline"
                        className="w-60 md:w-fit transform rounded-lg px-6 py-2 font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-100">
                        Explore more
                    </Button>
                </motion.div>
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        duration: 0.3,
                        delay: 1,
                    }}
                    className="z-10 mt-6 flex flex-col items-center justify-center gap-2">
                    <GroupAvatar />
                    <p className="text-sm text-zinc-500">Join <span className="font-bold text-zinc-700">100+ redditors </span> today posting at the right times</p>
                </motion.div>
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 10,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.3,
                        delay: 1.2,
                    }}
                    className="md:w-[80%] relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md">
                    <div className="overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
                        <img
                            src={hero}
                            alt="Landing page preview"
                            className="aspect-[16/9] h-auto w-full object-cover"
                            height={1000}
                            width={1000} />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

