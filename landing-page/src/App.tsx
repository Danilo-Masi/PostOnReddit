import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppContext } from "./context/AppContext";
import Fallback from "./components/custom/Fallback";
import CookiesDialog from "./components/cookies/CookiesDialog";
const Homepage = lazy(() => import("./pages/Homepage"));
const Termspage = lazy(() => import("./pages/Termspage"));
const Privacypage = lazy(() => import("./pages/Privacypage"));
const Errorpage = lazy(() => import("./pages/Errorpage"));

function AppRoutes() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/terms" element={<Termspage />} />
        <Route path="/privacy" element={<Privacypage />} />
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  const { setCookiesBannerOpen } = useAppContext();
  const cookiesBanner = localStorage.getItem('cookieBanner');

  const handleCookiesBanner = () => {
    if (cookiesBanner === 'true') {
      setCookiesBannerOpen(false);
      loadAnalyticsScript();
    } else if (cookiesBanner === 'false') {
      setCookiesBannerOpen(false);
    } else {
      setCookiesBannerOpen(true);
    }
  };

  const loadAnalyticsScript = () => {
    const script = document.createElement('script');
    script.src = "https://scripts.simpleanalyticscdn.com/latest.js";
    script.async = true;
    script.defer = true;
    script.setAttribute('data-hostname', 'www.postonreddit.com');
    script.onerror = (error: any) => {
      console.error("Error loading Simple Analytics script", error.message);
    };
    document.head.appendChild(script);
    return () => { document.head.removeChild(script) };
  };

  useEffect(() => {
    handleCookiesBanner();
  }, [cookiesBanner]);

  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <CookiesDialog />
    </>
  );
}



