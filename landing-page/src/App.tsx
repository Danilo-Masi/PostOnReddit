// React
import { useEffect } from "react";
// React-router
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Context
import { useAppContext } from "../src/context/AppContext";
// Pages
import Homepage from "./pages/Homepage";
import Termspage from "./pages/Termspage";
import Privacypage from "./pages/Privacypage";
import Cookiepage from "./pages/Cookiepage";
// Components
import WailtistDialog from "./components/custom/WailtistDialog";
import CookiesDialog from "./components/custom/CookiesDialog";
import Errorpage from "./pages/Errorpage";

function App() {

  const { isWaitlistOpen, isCookiesBannerOpened, setCookiesBannerOpened } = useAppContext();

  useEffect(() => {
    if (localStorage.getItem('cookieBanner')) {
      setCookiesBannerOpened(false);
      // Simple analytics
      const script = document.createElement('script');
      script.src = "https://scripts.simpleanalyticscdn.com/latest.js";
      script.async = true;
      script.defer = true;
      script.setAttribute('data-hostname', 'www.postonreddit.com');
      script.onerror = (error: any) => {
        console.error("CLIENT: Errore nel caricamento di Simple Analytics", error.message);
      }
      document.head.appendChild(script);
    } else {
      setCookiesBannerOpened(true);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/terms-services" element={<Termspage />} />
          <Route path="/privacy-policy" element={<Privacypage />} />
          <Route path="/cookie-policy" element={<Cookiepage />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </BrowserRouter>
      {isWaitlistOpen && <WailtistDialog />}
      {isCookiesBannerOpened && <CookiesDialog />}
    </>
  );
}

export default App
