import About from "@/components/about/About";
import AppContainer from "@/components/custom/AppContainer";
import Hero from "@/components/hero/Hero";

export default function Homepage() {
    return (
        <AppContainer>
            <Hero />
            <About />
        </AppContainer>
    );
}
