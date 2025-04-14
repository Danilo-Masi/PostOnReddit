import { useState } from "react";
import { Minus, Plus } from "lucide-react"

const faqItems = [
    {
        question: "What is postonreddit?",
        answer: "postonreddit is a powerful tool designed to help you schedule and manage your posts on Reddit efficiently. It allows you to plan your content ahead of time, ensuring you reach your audience at the best moments."
    },
    {
        question: "Can I schedule posts in multiple subreddits at once?",
        answer: "You can do it soon, it is a feature that will soon be available on the paid plan. You can schedule a single post to go live in multiple subreddits with just one click, perfect for cross-posting and reaching different communities."
    },
    {
        question: "How does postonreddit choose the best time to post?",
        answer: "We analyze subreddit activity patterns and user engagement data to suggest the best moments to post. This helps maximize visibility and interaction on your posts."
    },
    {
        question: "Do I need to keep my browser open for scheduled posts to work?",
        answer: "No, once your post is scheduled, we handle everything on our servers. You can close your browser and we'll make sure your post goes live at the right time."
    },
    {
        question: "Is postonreddit safe to use with my Reddit account?",
        answer: "Yes. We use Reddit’s official OAuth system, which means you log in securely via Reddit and can revoke access at any time from your Reddit account settings."
    },
    {
        question: "What happens if a post fails to publish?",
        answer: "In case of an error, you'll get an email notification with the reason for the failure and suggestions to fix it. You can also reschedule the post manually."
    }
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
        <div className="w-full h-auto flex flex-col items-center justify-start overflow-hidden bg-zinc-100" id="faq">
            <div className="w-[90%] md:w-[80%] h-full flex flex-col md:flex-row items-center justify-center gap-20 md:gap-10 py-24 md:py-32">
                <div className="w-full md:w-[40%] h-full flex flex-col items-start justify-center gap-3">
                    <h3 className="text-sm font-medium text-orange-600 mb-2">Frequently asked questions</h3>
                    <h1 className="text-4xl font-bold text-zinc-700">
                        Got Questions? Totally fair.
                    </h1>
                    <p className="text-base font-medium text-zinc-400">
                        We get it, things can be confusing at first. Here are some quick answers to help you out (so you don’t have to pretend you already know).
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
