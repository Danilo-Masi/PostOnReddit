import { createRoot } from 'react-dom/client'
import './index.css';
import '@smastrom/react-rating/style.css';
import { AppProvider } from './context/AppContext.tsx';
import App from './App.tsx';
import { Toaster } from "@/components/ui/sonner";

createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <App />
    <Toaster />
  </AppProvider>
);
