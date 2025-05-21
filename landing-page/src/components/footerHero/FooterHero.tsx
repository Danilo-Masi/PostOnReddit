import { Link } from "react-router";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { scrollToElement } from "@/utility/useAnimation";

export default function FooterHero() {

    const handleGetStarted = () => {
        window.sa_event?.("footer_hero_get_started");
        window.location.href = "https://app.postonreddit.com/registration";
    }

    const handleViewPricing = () => {
        window.sa_event?.("footer_hero_view_pricing");
        scrollToElement("#pricing");
    }

    return (
        <section className="w-full py-24 md:py-32 bg-background">
            <div className="w-[90%] md:w-[80%] mx-auto">
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-300 via-orange-500 to-orange-300 shadow-xl">
                    <div className="relative px-6 py-16 md:px-12 md:py-24">
                        <div className="mx-auto max-w-3xl text-center">
                            <h2 className="text-3xl font-bold text-balance tracking-tight text-background sm:text-4xl md:text-5xl">
                                Start posting smarter. Your future self will thank you.
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-background/80 text-balance">
                                Thousands of founders and makers are already using postonreddit to save hours, stay consistent, and actually grow. Wanna join them?
                            </p>
                            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Button
                                    variant="default"
                                    aria-label="Get Started Free"
                                    onClick={handleGetStarted}
                                    size="lg"
                                    className="bg-black text-background hover:bg-black/80">
                                    Get Started Free
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                                <Button
                                    aria-label="View Pricing"
                                    asChild
                                    variant="outline"
                                    size="lg"
                                    className="text-foreground hover:bg-background/90">
                                    <Link to="/" onClick={handleViewPricing}>
                                        View Pricing
                                    </Link>
                                </Button>
                            </div>
                            <p className="mt-6 text-sm text-background/80">
                                No credit card required • Cancel anytime
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
