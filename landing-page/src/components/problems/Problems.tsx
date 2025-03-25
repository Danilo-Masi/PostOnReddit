import { Check, X } from "lucide-react";

const problems = [
    "Your posts get ignored and don’t gain visibility",
    "You post when no one is online, missing the best time",
    "Few interactions and low views on your content",
    "Time and effort spent with little results",
]

const solutions = [
    "Schedule posts for peak times to maximize visibility",
    "Increase engagement with an active audience",
    "More upvotes and more traffic to your SaaS",
    "Automate the process and let your posts work for you",
]


export default function Problems() {
    return (
        <div className="w-full md:w-[80%] flex flex-col md:flex-row items-center justify-center gap-6 my-10">
            <ul className="flex flex-col gap-4 p-10 bg-red-200 rounded-lg">
                {problems.map((item, index) => (
                    <li key={index} className="flex text-sm"><X className="mr-1" />{item}</li>
                ))}
            </ul>
            <ul className="flex flex-col gap-4 p-10 bg-green-200 rounded-lg">
                {solutions.map((item, index) => (
                    <li key={index} className="flex text-sm"><Check className="mr-1" />{item}</li>
                ))}
            </ul>
        </div>
    );
}
