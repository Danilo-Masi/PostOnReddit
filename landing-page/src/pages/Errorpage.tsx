import AppContainer from "@/components/custom/AppContainer";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

export default function ErrorPage() {
    return (
        <AppContainer>
            <div className="w-full min-h-[90svh] md:min-h-[calc(100svh-2.5rem)] flex flex-col items-center justify-center gap-8 text-center">
                <h1 className="font-extrabold text-5xl md:text-6xl text-zinc-800">
                    404 - Page Not Found
                </h1>
                <p className="text-lg md:text-xl text-zinc-600 max-w-md">
                    Oops...Looks like you're lost in the vast internet space 🪐
                    let's get you back on track!
                </p>
                <Button
                    className="px-6 py-3 shadow-md transition-all"
                    onClick={() => window.location.href = '/'}>
                    <Rocket />
                    Take Me Home
                </Button>
            </div>
        </AppContainer>
    );
}
