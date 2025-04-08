import { useState } from "react";
import { Minus, Plus } from "lucide-react"

const faqItems = [
    {
        question: "What is postonreddit?",
        answer: "postonreddit is a powerful tool designed to help you schedule and manage your posts on Reddit efficiently. It allows you to plan your content ahead of time, ensuring you reach your audience at the best moments."
    },
    {
        question: "How does postonreddit work?",
        answer: "postonreddit simplifies the posting process by allowing you to schedule your content for specific times. You can create your posts, set the desired posting time, and the tool will automatically publish them for you, saving you time and effort."
    },
    {
        question: "What is the pricing for postonreddit?",
        answer: "postonreddit offers a free plan for basic scheduling features. For advanced features and increased capabilities, you can upgrade to one of our paid plans, which provide enhanced analytics and scheduling options."
    },
    {
        question: "What is the pricing for PostOnReddit?",
        answer: "PostOnReddit offers a free plan for basic scheduling features. For advanced features and increased capabilities, you can upgrade to one of our paid plans, which provide enhanced analytics and scheduling options."
    },
    {
        question: "What is the click for PostOnReddit?",
        answer: "The click for PostOnReddit refers to the action of selecting a specific time to post your content. This feature allows you to optimize your posting schedule for maximum engagement and reach."
    },
];

function FaqItem({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="w-full h-auto p-4 rounded-lg bg-zinc-50 border border-zinc-200">
            <h3 className="text-zinc-700 flex flex-row items-center justify-between">{question}
                <span onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <Minus className="w-4 h-4 text-zinc-500 cursor-pointer" /> : <Plus className="w-4 h-4 text-zinc-500 cursor-pointer" />}
                </span>
            </h3>
            {isOpen && (
                <div className="mt-4">
                    <p className="text-sm text-zinc-500">{answer}</p>
                </div>
            )}
        </div>
    );
}

export default function Faq() {
    return (
        <div className="w-full h-auto flex flex-col items-center justify-start overflow-hidden bg-white" id="faq">
            <div className="w-[90%] md:w-[80%] h-full flex flex-col md:flex-row items-center justify-center gap-20 md:gap-10 py-24 md:py-32">
                <div className="w-full md:w-[40%] h-full flex flex-col items-start justify-center gap-3">
                    <h3 className="text-sm font-medium text-zinc-400 mb-2">Frequently Asked Questions</h3>
                    <h1 className="text-4xl font-bold text-zinc-700">Got Questions? We've Got Answers!</h1>
                    <p className="text-base font-medium text-zinc-400">
                        Find quick answers to common questions about our features, pricing, and how to get started. If you can't find what you're looking for, feel free to reach out to our support team.
                    </p>
                </div>
                <div className="w-full md:w-[60%] flex flex-wrap gap-4">
                    {faqItems.map((item) => (
                        <FaqItem key={item.question} question={item.question} answer={item.answer} />
                    ))}
                </div>
            </div>
        </div>
    );
}
