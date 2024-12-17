import { useEffect, Suspense, lazy } from "react";
// Context
import { useAppContext } from "@/context/AppContext";
// Confett-js
import JSConfetti from "js-confetti";
// Components
import AppContainer from "@/components/custom/AppContainer";
import Navbar from "../components/navbar/Navbar";
import Hero from "../components/hero/Hero";
// Components (caricamento dinamico)
const Features = lazy(() => import("../components/features/Features"));
const Prices = lazy(() => import("../components/prices/Prices"));
const Faqs = lazy(() => import("../components/faqs/Faqs"));
const Banner = lazy(() => import("../components/banner/Banner"));
const Footer = lazy(() => import("../components/footer/Footer"));

export default function Homepage() {

    const { isConfettiActive, setConfettiActive } = useAppContext();

    useEffect(() => {
        if (isConfettiActive) {
            const jsConfetti = new JSConfetti();
            jsConfetti.addConfetti({
                emojis: ['✨', '🎉', '🎈', '🥳'],
                confettiColors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1'],
            });
            setConfettiActive(false);
        }
    }, [isConfettiActive]);

    return (
        <AppContainer>
            <Navbar />
            <Hero id="Hero" />
            <Suspense fallback={<div>Loading...</div>}>
                <Features id="Features" />
                <Prices id="Prices" />
                <Faqs id="Faqs" />
                <Banner />
                <Footer />
            </Suspense>
        </AppContainer>
    );
}