// Components
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import Features from "./components/features/Features";
//import Testimonial from "./components/testimonial/Testimonial";
import Prices from "./components/prices/Prices";
import Faqs from "./components/faqs/Faqs";
import Banner from "./components/banner/Banner";
import Footer from "./components/footer/Footer";
// Context
import { useAppContext } from "./context/AppContext";
import WailtistDialog from "./components/custom/WailtistDialog";

function App() {

  const { isWaitlistOpen } = useAppContext();

  return (
    <div className="w-screen h-auto min-h-svh flex items-center justify-center">
      <div className="w-[90%] md:w-[70%] lg:w-[80%] h-auto min-h-svh flex flex-col items-start justify-start mt-5">
        <Navbar />
        <Hero />
        <Features />
        <Prices />
        <Faqs />
        <Banner />
        <Footer />
        {isWaitlistOpen && <WailtistDialog />}
      </div>
    </div>
  );
}

export default App
