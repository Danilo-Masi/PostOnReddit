import { ReactNode } from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { useIsMobile } from "@/utility/useMobile";
import ava from '../../assets/images/ava-face.jpg';
import drew from '../../assets/images/drew-face.jpg';
import isabelle from '../../assets/images/isabelle-face.jpg';
import jake from '../../assets/images/jake-face.jpg';
import lena from '../../assets/images/lena-face.jpg';
import lucas from '../../assets/images/lucas-face.jpg';
import maya from '../../assets/images/maya-face.jpg';

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
        name: "Lucas Ferreira",
        image: lucas,
        description: "Not exaggerating my engagement literally tripled. The 'best time to post' feature just works.",
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
        <div className="w-full h-auto p-5 rounded-lg mb-4 bg-zinc-50 border border-zinc-200">
            <p className="flex flex-row items-center justify-start gap-2">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {testimonial.rating}</p>
            <p>{testimonial.description}</p>
            <Separator className="w-full my-4" />
            <div className="flex flex-row items-center justify-start gap-2">
                <div className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden bg-zinc-200">
                    <img src={testimonial.image} alt={`${testimonial.name} face`} className="w-full h-full object-cover object-center" />
                </div>
                <p>{testimonial.name}</p>
            </div>
        </div>
    );
}

export default function Testimonial() {
    return (
        <div className="w-full h-auto md:h-svh flex flex-col items-center justify-start overflow-hidden bg-zinc-100">
            <div className="w-[90%] md:w-[80%] h-full flex flex-col md:flex-row items-center justify-center gap-20 md:gap-10 py-24 md:py-0">
                <div className="w-full md:w-[40%] h-full flex flex-col items-start justify-center gap-3">
                    <h3 className="text-sm font-medium text-orange-600 mb-2">What our users say</h3>
                    <h1 className="text-4xl font-bold text-zinc-700">
                        Real People. Real Posts. Real Obsession.
                    </h1>
                    <p className="text-base font-medium text-zinc-400">
                        Don't take our word for it, listen to the folks who stopped crying over Reddit karma once they met postonreddit.
                    </p>
                    <Button
                        onClick={() => window.location.href = "https://app.postonreddit.com/registration"}
                        className="w-fit bg-orange-600 text-white hover:bg-orange-700">
                        Get Started
                        <ChevronRight />
                    </Button>
                </div>
                <div className="w-full md:w-[60%] flex flex-wrap gap-4 relative">
                    {!useIsMobile() && (<div className="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-zinc-100 via-transparent to-zinc-100" />)}
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
