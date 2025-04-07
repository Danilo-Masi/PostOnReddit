import { ArrowRight, ChevronRight, Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import face1 from "../../assets/images/face1.webp";
import face2 from "../../assets/images/face2.webp";
import face3 from "../../assets/images/face3.webp";
import face4 from "../../assets/images/face4.webp";
import face5 from "../../assets/images/face5.webp";
import heroImage from "../../assets/images/hero.webp";
import { Link } from "react-router";
import logo from "../../assets/images/icon.png";
import { useState } from "react";
import { useIsMobile } from "@/utility/useMobile";

function HeroNav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="relative w-[90%] md:w-[80%] py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 z-20">
                    <div className="h-10 w-10">
                        <img src={logo} alt="logo" className="w-full h-full object-cover" />
                    </div>
                    <span className="font-semibold">PostOnReddit</span>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden z-20 p-2"
                >
                    {isMenuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8 text-sm text-zinc-600">
                    <Link to="#" className="hover:text-black transition-colors">Features</Link>
                    <Link to="#" className="hover:text-black transition-colors">Pricing</Link>
                    <Link to="#" className="hover:text-black transition-colors">Demo</Link>
                    <Link to="#" className="hover:text-black transition-colors">Faq</Link>
                </div>

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center gap-2">
                    <Button variant="outline" className="items-center gap-2">
                        Sign In
                    </Button>
                    <Button className="flex items-center gap-2 bg-orange-600 text-white hover:bg-orange-700">
                        Get Started <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

                {/* Mobile Menu */}
                <div className={`
                    fixed inset-0 bg-white z-10 transition-transform duration-300 ease-in-out
                    ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
                    md:hidden
                `}>
                    <div className="flex flex-col items-center justify-center h-full gap-8">
                        <div className="flex flex-col items-center gap-6 text-lg">
                            <Link to="#" className="hover:text-orange-600 transition-colors">Features</Link>
                            <Link to="#" className="hover:text-orange-600 transition-colors">Pricing</Link>
                            <Link to="#" className="hover:text-orange-600 transition-colors">Demo</Link>
                            <Link to="#" className="hover:text-orange-600 transition-colors">Faq</Link>
                        </div>
                        <div className="flex flex-col gap-4 w-[80%] max-w-xs">
                            <Button variant="outline" className="w-full">
                                Sign In
                            </Button>
                            <Button className="w-full bg-orange-600 text-white hover:bg-orange-700">
                                Get Started
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

function HeroContent() {
    return (
        <div className="w-[90%] md:w-[80%] h-full flex flex-col md:flex-row gap-8 md:gap-16 items-center justify-center py-10 md:py-20">
            {/* Left Column */}
            <div className="w-full md:w-1/2 h-full flex flex-col gap-8 text-center md:text-left">
                <div className="space-y-6">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight">
                        Schedule Better.
                        <br />
                        Create Faster.
                    </h1>
                    <p className="text-base sm:text-lg text-zinc-600 max-w-lg mx-auto md:mx-0">
                        Schedule your product — selling, promotion, or gain followers — using tons of powerful templates and easy-to-use tools in PostOnReddit App. Available for all platforms.
                    </p>
                </div>

                <div className="flex flex-col items-center md:items-start gap-6">
                    <Button size="lg" className="w-full sm:w-fit bg-orange-600 text-white hover:bg-orange-700">
                        Start growing <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="flex -space-x-4">
                            {[face1, face2, face3, face4, face5].map((face, i) => (
                                <img
                                    key={i}
                                    src={face}
                                    alt="User avatar"
                                    className="h-8 sm:h-10 w-8 sm:w-10 rounded-full border-2 object-cover border-white"
                                />
                            ))}
                        </div>
                        <div className="text-sm text-center sm:text-left">
                            <span className="font-medium">200+</span>
                            <span className="text-zinc-600"> people already joined</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div className="w-full md:w-1/2 h-auto flex flex-col items-start justify-center gap-8 relative">
                <div className={`w-fit h-fit px-5 py-2 rounded-lg animate-bounce transition-all duration-1000 bg-zinc-100 absolute ${useIsMobile() ? "-bottom-10 right-0" : "-top-10 right-0"}`}>
                    <p className="text-xs text-green-500">230%</p>
                    <h1 className="text-2xl font-medium">ciaociao</h1>
                    <h3 className="text-sm text-zinc-500">lorem ipsum dolor sit amet</h3>
                </div>
                <div className="w-full h-[50svh] p-2 rounded-lg bg-zinc-200">
                    <img src={heroImage} alt="hero" className="w-full h-full object-cover rounded-lg" />
                </div>
            </div>
        </div>
    );

}

export default function Hero() {
    return (
        <div className="w-full h-auto min-h-svh flex flex-col items-center justify-start relative bg-zinc-50/50">
            <div className="bg-gradient-to-b from-transparent via-transparent to-zinc-100 absolute top-0 left-0 w-full h-full"/>
            <HeroNav />
            <HeroContent />
        </div>
    );
}
