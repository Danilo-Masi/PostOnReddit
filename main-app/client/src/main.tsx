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

createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <TooltipProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </TooltipProvider>
  </AppProvider>
);
