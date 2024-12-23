// React
import { createRoot } from 'react-dom/client';
// CSS
import './index.css';
// Context
import { AppProvider } from "./components/context/AppContext";
// Components
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { TooltipProvider } from "./components/ui/tooltip";
import App from './App.tsx';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <TooltipProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <App />
        <Toaster />
      </ThemeProvider>
    </TooltipProvider>
  </AppProvider>
);
