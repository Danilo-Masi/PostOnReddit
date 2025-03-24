import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export default function HeroLeft() {
    return (
        <div className="w-full md:w-1/2 h-auto min-h-[90svh] flex flex-col justify-center text-center md:text-left">
            <h1 className="font-extrabold text-6xl text-balance text-zinc-50 mb-3 z-20">Grow your SaaS with <span className="text-orange-600"> perfect</span> Reddit<span className="text-orange-600"> timing</span></h1>
            <h3 className="font-medium text-lg text-balance text-zinc-100 mb-10 z-20">Let data decide the best time to engage your audience</h3>
            <div className="relative inline-block">
                <div className="w-full md:w-2/4 absolute inset-0 ring-4 ring-orange-300 animate-pulse ring-offset-2 ring-offset-transparent rounded-md z-20"></div>
                <Button className="relative w-full md:w-2/4 py-6 text-lg z-20 bg-orange-600 hover:bg-orange-500">
                    Start posting
                    <ArrowRight />
                </Button>
            </div>
        </div>
    );
}
