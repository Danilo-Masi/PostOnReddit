// React-router
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import { useAppContext } from "./components/context/AppContext";
import PreviewDialog from "./components/custom/PreviewDialog";

function App() {

  const { isPreviewDialogOpen } = useAppContext();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
        </Routes>
      </BrowserRouter>
      {isPreviewDialogOpen && <PreviewDialog />}
    </>
  );
}

export default App
