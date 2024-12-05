// React
import { useEffect } from "react";
// Context
import { useAppContext } from "@/context/AppContext";
// Components
import Navbar from "../components/navbar/Navbar";
import Hero from "../components/hero/Hero";
import Features from "../components/features/Features";
import Prices from "../components/prices/Prices"
import Faqs from "../components/faqs/Faqs";
import Banner from "../components/banner/Banner";
import Footer from "../components/footer/Footer";
import AppContainer from "@/components/custom/AppContainer";
// Confett-js
import JSConfetti from "js-confetti";

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
        <AppContainer >
            <Navbar />
            <Hero id="Hero" />
            <Features id="Features" />
            <Prices id="Prices" />
            <Faqs id="Faqs" />
            <Banner />
            <Footer />
        </AppContainer>
    );
}
