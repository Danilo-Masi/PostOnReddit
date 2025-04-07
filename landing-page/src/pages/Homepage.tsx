import Hero from "@/components/hero/Hero";
import Features from "@/components/features/Features";
export default function Homepage() {
    return (
        <div className="w-full h-auto min-h-svh flex flex-col items-center bg-zinc-50">
            <Hero />
            <Features />
        </div>
    );
}
