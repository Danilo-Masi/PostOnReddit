import { Suspense, lazy, memo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Fallback from "./components/custom/Fallback";
import PreviewDialog from "./components/dashboard/PreviewDialog";
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegistrationPage = lazy(() => import("./pages/RegistrationPage"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const PaymentError = lazy(() => import("./pages/PaymentError"));

const MemoizedPreviewDialog = memo(PreviewDialog);
// Funzione per proteggere le routes di pagamento
const ProtectedPaymentRoute = ({ children }: { children: React.ReactNode }) => {
  const referrer = document.referrer;
  const isFromBackend = referrer.includes(import.meta.env.VITE_SERVER_URL || 'http://localhost:3000');

  if (!isFromBackend) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route
          path="/payment-success"
          element={
            <ProtectedPaymentRoute>
              <PaymentSuccess />
            </ProtectedPaymentRoute>
          }
        />
        <Route
          path="/payment-error"
          element={
            <ProtectedPaymentRoute>
              <PaymentError />
            </ProtectedPaymentRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}

const MemoizedAppRoutes = memo(AppRoutes);

export default function App() {
  return (
    <BrowserRouter>
      <MemoizedAppRoutes />
      <MemoizedPreviewDialog />
    </BrowserRouter>
  );
}

