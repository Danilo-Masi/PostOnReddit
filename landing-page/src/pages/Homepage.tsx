import { Suspense, lazy } from "react";
import AppContainer from "@/components/custom/AppContainer";
import Navbar from "../components/navbar/Navbar";
import Hero from "../components/hero/Hero";
import { Loader2 } from "lucide-react";
const Problem = lazy(() => import("../components/problem/Problem"));
const Features = lazy(() => import("../components/features/Features"));
const About = lazy(() => import("../components/about/About"));
const Prices = lazy(() => import("../components/prices/Prices"));
const Faqs = lazy(() => import("../components/faqs/Faqs"));
const Footer = lazy(() => import("../components/footer/Footer"));

export default function Homepage() {
    return (
        <AppContainer>
            <Navbar />
            <Hero id="Hero" />
            <Suspense fallback={<div><Loader2 className="animate-spin" /></div>}>
                <Problem />
                <Features id="Features" />
                <About />
                <Prices id="Prices" />
                <Faqs id="Faqs" />
                <Footer />
            </Suspense>
        </AppContainer>
    );
}