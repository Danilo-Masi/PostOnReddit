import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
export default function Homepage() {
    return (
        <div className="w-full h-auto min-h-svh flex flex-col items-center justify-start bg-zinc-50">
            <Navbar />
            <Hero />
        </div>
    );
}
