import { Suspense, lazy } from 'react';
import Fallback from '@/components/custom/Fallback';
const Hero = lazy(() => import('@/components/hero/Hero'));
const Features = lazy(() => import('@/components/features/Features'));
const Testimonial = lazy(() => import('@/components/testimonial/Testimonial'));
const Pricing = lazy(() => import('@/components/pricing/Pricing'));
const Faq = lazy(() => import('@/components/faq/Faq'));
const FooterHero = lazy(() => import('@/components/footerHero/FooterHero'));
const Footer = lazy(() => import('@/components/footer/Footer'));

export default function Homepage() {
    return (
        <div className="w-full h-auto min-h-svh flex flex-col items-center">
            <Suspense fallback={<Fallback />}>
                <Hero />
                <Features />
                <Testimonial />
                <Pricing />
                <Faq />
                <FooterHero />
                <Footer />
            </Suspense>
        </div>
    );
}
