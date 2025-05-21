import { ReactNode } from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
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
        description: "I wasn’t even looking for something like this, but I gave it a shot. Turns out, scheduling posts actually helped me stay consistent without feeling like I was trying too hard. It’s just… less chaotic now.",
        rating: 4.6,
    },
    {
        name: "Jake Tanaka",
        image: jake,
        description: "I have a small SaaS with a weird niche. I used to post manually, whenever I had time. This just made everything easier. Same effort, but now people actually see my posts.",
        rating: 4.9,
    },
    {
        name: "Isabelle Costa",
        image: isabelle,
        description: "Honestly, I didn’t realize how much timing mattered. I used to post when I was free, now I schedule when my audience is online. Small change, but it made a difference.",
        rating: 4.4,
    },
];

const testimonial2 = [
    {
        name: "Drew Patterson",
        image: drew,
        description: "Reddit felt like a mystery to me for a long time. I tried tools before, but they felt clunky. This one’s simple and doesn’t try to do too much. It just works and feels normal to use.",
        rating: 4.5,
    },
    {
        name: "Maya Singh",
        image: maya,
        description: "Before this, I’d post and then forget about it… or overthink it for days. Now I write when I feel like it and schedule it out. Way less mental clutter.",
        rating: 4.8,
    },
    {
        name: "Luca F.",
        image: lucas,
        description: "I got a few signups and more visibility just by being consistent. Nothing fancy. Just helped me show up regularly without thinking about it every day.",
        rating: 4.7,
    },
    {
        name: "Ava Becker",
        image: ava,
        description: "What I like is that it doesn’t feel like I’m using a growth hack tool. It just helps me post without burning out. I don’t dread it anymore.",
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
                        postonreddit helped these makers go from 0 to real conversations, real traction, and real users,without feeling spammy or salesy.
                    </p>
                    <Button
                        aria-label="Get Started"
                        onClick={handleGetStarted}
                        className="w-fit text-primary-foreground bg-primary hover:bg-primary/85">
                        Get Started now 
                        <ArrowRight />
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
