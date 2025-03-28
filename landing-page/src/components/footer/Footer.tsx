import { Link } from "react-router-dom";
import LinkContainers from "./LinkContainers";
import { scrollToElement } from "@/utility/use-animation";
import icon from '../../assets/images/icon.png';

const landingLinks = ["Features", "Pricing", "Faqs"];
const legalLinks = [
    { title: "Terms of services", path: "/terms-of-services" },
    { title: "Privacy policy", path: "/privacy-policy" },
];
const moreLinks = [
    { title: "describify", path: "https://www.describify.it" },
];

export default function Footer() {
    return (
        <div className="w-full md:w-[80%] h-auto flex flex-col md:flex-row items-start justify-start gap-10 md:gap-6 mt-40 mb-20 ">
            <div className="w-full md:w-1/4 flex flex-col items-center md:items-start gap-6 md:gap-3">
                <div className="w-full h-1/2 flex items-center justify-center md:justify-start gap-2">
                    <img src={icon} className="w-[15%]" />
                    <h1 className="text-lg md:text-3xl font-bold text-foreground">
                        postonreddit
                    </h1>
                </div>
            </div>
            <LinkContainers title="LINKS">
                {landingLinks.map((item, index) => (
                    <li key={index}><Link to="/" onClick={() => scrollToElement(`#${item}`)}>{item}</Link></li>
                ))}
            </LinkContainers>
            <LinkContainers title="LEGALS">
                {legalLinks.map((item, index) => (
                    <li key={index}><Link to={item.path} onClick={() => scrollTo(0, 0)}>{item.title}</Link></li>
                ))}
            </LinkContainers>
            <LinkContainers title="MORE">
                {moreLinks.map((item, index) => (
                    <li key={index}>
                        <a href={item.path} target="_blank">{item.title}</a>
                    </li>
                ))}
            </LinkContainers>
        </div>
    );
}