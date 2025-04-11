import { ReactNode } from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/utility/useMobile";

const testimonial1 = [
    {
        name: "Sarah Johnson",
        image: "https://via.placeholder.com/150",
        description: "PostOnReddit transformed how I manage my content. The scheduling features are intuitive, and the engagement metrics have helped me grow my community by 40% in just two months.",
        rating: 4.5,
    },
    {
        name: "Michael Chen",
        image: "https://via.placeholder.com/150",
        description: "As a small business owner, finding the right time to post was always a challenge. This tool has been a game-changer for my marketing strategy. My reach has doubled!",
        rating: 4.5,
    },
    {
        name: "Emma Rodriguez",
        image: "https://via.placeholder.com/150",
        description: "The analytics dashboard is incredibly detailed. I can see exactly when my audience is most active and tailor my content accordingly. It's like having a marketing team in your pocket.",
        rating: 4.5,
    },
]

const testimonial2 = [
    {
        name: "David Wilson",
        image: "https://via.placeholder.com/150",
        description: "I was skeptical at first, but the ROI has been incredible. My posts now consistently reach the top of relevant subreddits, and my engagement rates have never been better.",
        rating: 4.5,
    },
    {
        name: "Olivia Thompson",
        image: "https://via.placeholder.com/150",
        description: "The automated scheduling feature saves me hours every week. I can plan my content calendar in advance and focus on creating quality posts instead of worrying about timing.",
        rating: 4.5,
    },
    {
        name: "James Martinez",
        image: "https://via.placeholder.com/150",
        description: "The best posting time recommendations are spot-on. I've seen a 60% increase in upvotes since I started following the suggested schedule. Worth every penny!",
        rating: 4.5,
    },
    {
        name: "Sophia Lee",
        image: "https://via.placeholder.com/150",
        description: "As a content creator, consistency is key. PostOnReddit helps me maintain a regular posting schedule without the stress. My followers have noticed the improvement!",
        rating: 4.5,
    },
]

function TestimonialColumn({ children }: { children: ReactNode }) {
    return (
        <div className="w-full md:w-[calc(50%-0.5rem)] h-auto flex flex-col items-center justify-center">
            {children}
        </div>
    )
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
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-200" >
                    {testimonial.name.slice(0, 2)}
                </div>
                <p>{testimonial.name}</p>
            </div>
        </div>
    )
}

export default function Testimonial() {
    return (
        <div className="w-full h-auto md:h-svh flex flex-col items-center justify-start overflow-hidden bg-zinc-100">
            <div className="w-[90%] md:w-[80%] h-full flex flex-col md:flex-row items-center justify-center gap-20 md:gap-10 py-24 md:py-0">
                <div className="w-full md:w-[40%] h-full flex flex-col items-start justify-center gap-3">
                    <h3 className="text-sm font-medium text-zinc-400 mb-2">What Our Users Say</h3>
                    <h1 className="text-4xl font-bold text-zinc-700">We go above and beyond to meet your needs!</h1>
                    <p className="text-base font-medium text-zinc-400">
                        Discover how postonreddit has transformed the way our users engage with their audience. Our commitment to excellence ensures that you have the tools you need to succeed in your Reddit journey.
                    </p>
                    <Button variant="default" className="w-fit bg-orange-600 text-white hover:bg-orange-700">
                        Get Started
                        <ArrowRight />
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
