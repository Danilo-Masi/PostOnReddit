import About from "@/components/about/About";
import AppContainer from "@/components/custom/AppContainer";
import Faqs from "@/components/Faqs/Faqs";
import Features from "@/components/features/Features";
import Footer from "@/components/footer/Footer";
import Hero from "@/components/hero/Hero";
import Pricing from "@/components/pricing/Pricing";
import Social from "@/components/social/Social";

export default function Homepage() {
    return (
        <AppContainer>
            <Hero />
            <Features />
            <Social />
            <About />
            <Pricing />
            <Faqs />
            <Footer />
        </AppContainer>
    );
}
