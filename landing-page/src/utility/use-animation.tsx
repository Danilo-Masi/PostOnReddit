import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export const scrollToElement = (elementId: string) => {
    gsap.to(window, { duration: 1, scrollTo: { y: elementId, offsetY: 50 } });
}