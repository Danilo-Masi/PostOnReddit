import { Suspense, lazy, memo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppContext } from "./components/context/AppContext";
import PreviewDialog from "./components/custom/PreviewDialog";
import Fallback from "./components/custom/Fallback";

const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegistrationPage = lazy(() => import("./pages/RegistrationPage"));

const MemoizedPreviewDialog = memo(PreviewDialog);

function AppRoutes() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
      </Routes>
    </Suspense>
  );
}

const MemoizedAppRoutes = memo(AppRoutes);

export default function App() {
  const { isPreviewDialogOpen } = useAppContext();

  return (
    <BrowserRouter>
      <MemoizedAppRoutes />
      {isPreviewDialogOpen && <MemoizedPreviewDialog />}
    </BrowserRouter>
  );
}

