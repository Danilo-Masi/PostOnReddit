import BlockContainer from "../custom/BlockContainer";
import Header from "../custom/Header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const faqs = [
    { 
        trigger: "What do I get with the free plan?", 
        content: "With the free plan, you can discover the best posting time for a single day and schedule one post at a time. It's perfect for trying out our service before upgrading!" 
    },
    { 
        trigger: "What does the lifetime plan include?", 
        content: "The lifetime plan grants you unlimited scheduled posts, insights into the best posting time for the entire week, and access to all future premium features—without any recurring payments!" 
    },
    { 
        trigger: "Can I change my scheduled post after it's been set?", 
        content: "Yes, you can edit or delete any scheduled post before it's published, ensuring full control over your Reddit strategy." 
    },
    { 
        trigger: "Do you support all Reddit communities?", 
        content: "Most public subreddits are supported, but some communities have restrictions on automated posting. We recommend checking the subreddit rules before scheduling." 
    },
    { 
        trigger: "Is there a refund policy for the lifetime plan?", 
        content: "We offer a 7-day refund policy. If you're not satisfied, contact us within this period for a full refund, no questions asked!" 
    },
    { 
        trigger: "Will new features be added in the future?", 
        content: "Absolutely! We continuously improve the platform, and as a lifetime user, you’ll get access to all future updates and premium features." 
    },
    { 
        trigger: "Can I use this tool on mobile?", 
        content: "Yes, our platform is fully responsive and works seamlessly on mobile devices, allowing you to schedule posts on the go." 
    },
    { 
        trigger: "How do I get support if I have issues?", 
        content: "You can reach out via email or Twitter, and we’ll be happy to assist you with any questions or technical difficulties." 
    }
];

export default function Faqs() {
    return (
        <BlockContainer id="Support">
            <Header
                title="Frequently Asked Questions"
                caption="Have another question? Contact me on Twitter or by email" />
            <Accordion
                type="single"
                collapsible
                className="w-full md:w-1/2 text-foreground mt-20">
                {faqs && faqs.map((item, index) => (
                    <AccordionItem
                        key={index}
                        value={item.trigger}>
                        <AccordionTrigger className="cursor-pointer">{item.trigger}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                            {item.content}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </BlockContainer>
    )
}
