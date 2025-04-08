import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export default function FooterHero() {
    return (
        <section className="w-full py-24 md:py-32 bg-gradient-to-b from-white to-orange-50">
            <div className="w-[90%] md:w-[80%] mx-auto">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500 shadow-xl">
                    <div className="relative px-6 py-16 md:px-12 md:py-24">
                        <div className="mx-auto max-w-3xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                                Ready to Optimize Your Reddit Strategy?
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-orange-100">
                                Join thousands of content creators and marketers who are already using PostOnReddit to grow their communities and increase engagement.
                            </p>
                            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Button
                                    size="lg">
                                    Get Started Free
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="text-zinc-700">
                                    View Pricing
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
