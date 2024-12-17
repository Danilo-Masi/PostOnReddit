// Shadcnui
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion"

export default function Accordition() {
    return (
        <Accordion type="single" collapsible className="w-full md:w-2/3 lg:w-2/4 text-left">
            <AccordionItem value="item-1">
                <AccordionTrigger className="text-md text-zinc-900">What’s postonreddit?</AccordionTrigger>
                <AccordionContent className="text-sm text-zinc-500">
                    Postonreddit is a platform that lets you write and schedule Reddit posts for specific dates and times. Optimize your posting strategy effortlessly.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger className="text-md text-zinc-900">How can I use it to increase traffic on my platform?</AccordionTrigger>
                <AccordionContent className="text-sm text-zinc-500">
                    By scheduling posts at the most active times on relevant subreddits, you can reach a larger audience, drive engagement, and attract traffic to your platform.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger className="text-md text-zinc-900">How much does 1 token cost?</AccordionTrigger>
                <AccordionContent className="text-sm text-zinc-500">
                    The cost per token varies by package. For example, with the Basic Pack, each token costs €0.50, and with the Premium Pack, it costs €0.40.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
                <AccordionTrigger className="text-md text-zinc-900">What can I do with 1 token?</AccordionTrigger>
                <AccordionContent className="text-sm text-zinc-500">
                    One token allows you to schedule one post on Reddit. You can choose the subreddit, time, and date for maximum impact.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
