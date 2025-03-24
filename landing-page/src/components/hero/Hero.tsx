import { Boxes } from "../ui/background-boxes";
import HeroLeft from "./HeroLeft";
import HeroRight from "./HeroRight";
import Navbar from "./Navbar";

export default function Hero() {
    return (
        <div className="w-full h-auto flex justify-center overflow-hidden relative">
            <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
            <Boxes />
            <div className="w-[95%] md:w-[90%] flex flex-wrap">
                <Navbar />
                <HeroLeft />
                <HeroRight />
            </div>
        </div>
    );
}
