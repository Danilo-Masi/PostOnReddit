// React
import { useState, createContext, useContext } from "react";

// Definisci il tipo per il contesto
type AppContextType = {
    isWaitlistOpen: boolean;
    setWaitlistOpen: (section: boolean) => void;
    isConfettiActive: boolean;
    setConfettiActive: (section: boolean) => void;
    isCookiesBannerOpened: boolean;
    setCookiesBannerOpened: (section: boolean) => void;
}

// Crea il contesto e fornisci un valore predefinito
const AppContext = createContext<AppContextType | undefined>(undefined);

// Crea un provider per il contesto
export const AppProvider = ({ children }: { children: React.ReactNode }) => {

    const [isWaitlistOpen, setWaitlistOpen] = useState<boolean>(false);
    const [isConfettiActive, setConfettiActive] = useState<boolean>(false);
    const [isCookiesBannerOpened, setCookiesBannerOpened] = useState<boolean>(false);

    return (
        <AppContext.Provider
            value={{ isWaitlistOpen, setWaitlistOpen, isConfettiActive, setConfettiActive, isCookiesBannerOpened, setCookiesBannerOpened }}>
            {children}
        </AppContext.Provider>
    );
};


// Hook per usare il contesto
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("CLIENT: useAppContext must be used within an AppProvider");
    }
    return context;
}