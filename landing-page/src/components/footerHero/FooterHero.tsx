import { Link } from "react-router";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { scrollToElement } from "@/utility/use-animation";

export default function FooterHero() {
    return (
        <section className="w-full py-24 md:py-32 bg-gradient-to-b from-white to-orange-50">
            <div className="w-[90%] md:w-[80%] mx-auto">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500 shadow-xl">
                    <div className="relative px-6 py-16 md:px-12 md:py-24">
                        <div className="mx-auto max-w-3xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                                Ready to stop posting like a caveman?
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-orange-100">
                                Thousands of smart (and slightly lazy) Reddit users are already using postonreddit to save time and grow faster. You in?
                            </p>
                            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Button
                                    onClick={() => window.location.href = "https://app.postonreddit.com/registration"}
                                    size="lg">
                                    Get Started Free
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    size="lg"
                                    className="text-zinc-700">
                                    <Link to="/" onClick={() => scrollToElement("#pricing")}>
                                        View Pricing
                                    </Link>
                                </Button>
                            </div>
                            <p className="mt-6 text-sm text-orange-200">
                                No credit card required • 14-day free trial • Cancel anytime
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
