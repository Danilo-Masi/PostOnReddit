import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppContext } from "./context/AppContext";
// Lazy loading delle pagine
const Homepage = lazy(() => import("./pages/Homepage"));
const Termspage = lazy(() => import("./pages/Termspage"));
const Privacypage = lazy(() => import("./pages/Privacypage"));
const Errorpage = lazy(() => import("./pages/Errorpage"));

function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/terms-of-services" element={<Termspage />} />
        <Route path="/privacy-policy" element={<Privacypage />} />
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  /*
  const { isCookiesBannerOpened, setCookiesBannerOpened } = useAppContext();

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
  }, []); */

  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}



