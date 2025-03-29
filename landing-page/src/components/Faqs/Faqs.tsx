import BlockContainer from "../custom/BlockContainer";
import Header from "../custom/Header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const faqs = [
    { trigger: "What do I get exactly?", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a nunc sem. Duis bibendum turpis id accumsan commodo. Pellentesque nulla." },
    { trigger: "What do I get exactly?1", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a nunc sem. Duis bibendum turpis id accumsan commodo. Pellentesque nulla." },
    { trigger: "What do I get exactly?2", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a nunc sem. Duis bibendum turpis id accumsan commodo. Pellentesque nulla." },
    { trigger: "What do I get exactly?3", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a nunc sem. Duis bibendum turpis id accumsan commodo. Pellentesque nulla." },
    { trigger: "What do I get exactly?4", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a nunc sem. Duis bibendum turpis id accumsan commodo. Pellentesque nulla." },
    { trigger: "What do I get exactly?5", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a nunc sem. Duis bibendum turpis id accumsan commodo. Pellentesque nulla." },
    { trigger: "What do I get exactly?6", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a nunc sem. Duis bibendum turpis id accumsan commodo. Pellentesque nulla." },
    { trigger: "What do I get exactly?7", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a nunc sem. Duis bibendum turpis id accumsan commodo. Pellentesque nulla." },
];

export default function Faqs() {
    return (
        <BlockContainer>
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
