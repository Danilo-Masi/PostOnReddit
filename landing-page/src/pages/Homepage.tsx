import Hero from "@/components/hero/Hero";
import Features from "@/components/features/Features";
import Testimonial from "@/components/testimonial/Testimonial";
import Demo from "@/components/demo/Demo";
import Pricing from "@/components/pricing/Pricing";
import Faq from "@/components/faq/Faq";
import FooterHero from "@/components/footerHero/FooterHero";
import Footer from "@/components/footer/Footer";

export default function Homepage() {
    return (
        <div className="w-full h-auto min-h-svh flex flex-col items-center bg-zinc-50">
            <Hero />
            <Features />
            <Testimonial />
            <Demo />
            <Pricing />
            <Faq />
            <FooterHero />
            <Footer />
        </div>
    );
}
