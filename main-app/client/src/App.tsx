// React-router
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Context
import { AppProvider } from "./components/context/AppContext";
// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
// Components
import { ThemeProvider } from "./components/theme/ThemeProvider";

function App() {
  return (
    <AppProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App
