import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion"

export default function Accordition() {
    return (
        <Accordion type="single" collapsible className="w-full md:w-2/3 lg:w-2/4 text-left">
            <AccordionItem value="item-1">
                <AccordionTrigger className="text-md text-zinc-900">What is postonreddit?</AccordionTrigger>
                <AccordionContent className="text-sm text-zinc-500">
                    postonreddit is an intuitive platform that helps you write and schedule Reddit posts with precision. Plan your content ahead of time and never miss an opportunity to engage with your audience.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger className="text-md text-zinc-900">How can I use it to increase traffic to my platform?</AccordionTrigger>
                <AccordionContent className="text-sm text-zinc-500">
                    By scheduling your posts at the most active hours in your target subreddits, you maximize visibility and drive organic engagement, leading to more clicks and potential customers.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger className="text-md text-zinc-900">Why is the platform free?</AccordionTrigger>
                <AccordionContent className="text-sm text-zinc-500">
                    We are currently in the testing phase and want to gather valuable feedback from early adopters like you. This helps us improve the platform before introducing paid plans in the future.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
                <AccordionTrigger className="text-md text-zinc-900">How can I start using postonreddit?</AccordionTrigger>
                <AccordionContent className="text-sm text-zinc-500">
                    Just click the “Begin posting button, and you’ll be taken to the registration page. From there, you can create an account and start using postonreddit right away completely free!
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
