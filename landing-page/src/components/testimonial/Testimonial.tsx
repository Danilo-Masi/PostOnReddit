import { ReactNode } from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { useIsMobile } from "@/utility/useMobile";
import ava from '../../assets/images/ava-face.webp';
import drew from '../../assets/images/drew-face.webp';
import isabelle from '../../assets/images/isabelle-face.webp';
import jake from '../../assets/images/jake-face.webp';
import lena from '../../assets/images/lena-face.webp';
import lucas from '../../assets/images/lucas-face.webp';
import maya from '../../assets/images/maya-face.webp';
import Starticon from "../custom/StarIcon";

const testimonial1 = [
    {
        name: "Lena Moretti",
        image: lena,
        description: "Honestly didn't think I'd care about scheduling Reddit posts, but here I am, saving time and actually growing my following. Wild.",
        rating: 4.6,
    },
    {
        name: "Jake Tanaka",
        image: jake,
        description: "I run a niche SaaS and this thing helped me double my signups from Reddit. Not magic, just smart timing and solid tools.",
        rating: 4.9,
    },
    {
        name: "Isabelle Costa",
        image: isabelle,
        description: "The analytics alone are worth it. I now post when my audience's actually awake. Who knew that mattered so much?",
        rating: 4.4,
    },
];

const testimonial2 = [
    {
        name: "Drew Patterson",
        image: drew,
        description: "Didn't expect much, but wow Reddit actually works when you post like a human and not a bot. This app made that easy.",
        rating: 4.5,
    },
    {
        name: "Maya Singh",
        image: maya,
        description: "I used to post randomly and pray for upvotes. Now I have a strategy. Scheduling saved me from chaos.",
        rating: 4.8,
    },
    {
        name: "Luca F.",
        image: lucas,
        description: "I got 112 upvotes and 6 trial signups from a single post, all scheduled with postonreddit",
        rating: 4.7,
    },
    {
        name: "Ava Becker",
        image: ava,
        description: "Finally, a tool that doesn't feel like it's made by robots for robots. I can stay consistent without burning out.",
        rating: 4.3,
    },
];

function TestimonialColumn({ children }: { children: ReactNode }) {
    return (
        <div className="w-full md:w-[calc(50%-0.5rem)] h-auto flex flex-col items-center justify-center">
            {children}
        </div>
    );
}

function TestimonialCard({ testimonial }: { testimonial: any }) {
    return (
        <div className="w-full h-auto p-5 rounded-lg mb-4 bg-background border border-border">
            <p className="flex flex-row items-center justify-start gap-2">
                <Starticon />
                {testimonial.rating}</p>
            <p>{testimonial.description}</p>
            <Separator className="w-full my-4" />
            <div className="flex flex-row items-center justify-start gap-2">
                <div className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden bg-accent">
                    <img
                        src={testimonial.image}
                        alt={`${testimonial.name} face`}
                        className="w-full h-full object-cover"
                        loading="lazy" />
                </div>
                <p>{testimonial.name}</p>
            </div>
        </div>
    );
}

export default function Testimonial() {

    const handleGetStarted = () => {
        window.sa_event?.("testimonial_get_started");
        window.location.href = "https://app.postonreddit.com/registration";
    }

    return (
        <div className="w-full h-auto md:h-svh flex flex-col items-center justify-start overflow-hidden bg-accent">
            <div className="w-[90%] md:w-[80%] h-full flex flex-col md:flex-row items-center justify-center gap-20 md:gap-10 py-24 md:py-0">
                <div className="w-full md:w-[40%] h-full flex flex-col items-start justify-center gap-3">
                    <h3 className="text-sm text-balance font-medium text-primary mb-2">
                        What our users say
                    </h3>
                    <h1 className="text-4xl text-balance font-bold text-foreground">
                        Real People. Real Posts. Real Obsession.
                    </h1>
                    <p className="text-base text-balance font-medium text-muted-foreground mb-2">
                        Don't take our word for it, listen to the folks who stopped crying over Reddit karma once they met postonreddit.
                    </p>
                    <Button
                        aria-label="Get Started"
                        onClick={handleGetStarted}
                        className="w-fit text-primary-foreground bg-primary hover:bg-primary/85">
                        Get Started
                        <ChevronRight />
                    </Button>
                </div>
                <div className="w-full md:w-[60%] flex flex-wrap gap-4 relative">
                    {!useIsMobile() && (<div className="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-accent via-transparent to-accent" />)}
                    <TestimonialColumn>
                        {testimonial1.map((testimonial) => (
                            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
                        ))}
                    </TestimonialColumn>
                    <TestimonialColumn>
                        {testimonial2.map((testimonial) => (
                            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
                        ))}
                    </TestimonialColumn>
                </div>
            </div>
        </div>
    );
}
