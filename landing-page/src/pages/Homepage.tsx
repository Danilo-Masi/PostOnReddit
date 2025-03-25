import AppContainer from "@/components/custom/AppContainer";
import Hero from "@/components/hero/Hero";
import Problems from "@/components/problems/Problems";

export default function Homepage() {
    return (
        <AppContainer>
            <Hero />
            <Problems />
        </AppContainer>
    );
}
