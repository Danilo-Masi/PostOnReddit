import { createRoot } from 'react-dom/client'
import './index.css';
import { AppProvider } from './context/AppContext.tsx';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <App />
  </AppProvider>
);
