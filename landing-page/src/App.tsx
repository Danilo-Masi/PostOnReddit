import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Fallback from "./components/custom/Fallback";
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
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}



