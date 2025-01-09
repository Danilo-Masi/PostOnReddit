// React
import { useState, createContext, useContext } from "react"

// Definisci il tipo per il contesto
type AppContextType = {
    selectedSection: string;
    setSelectedSection: (section: string) => void;
    isExitDialogOpen: boolean;
    setExitDialogOpen: (section: boolean) => void;
    isSupportDialogOpen: boolean;
    setSupportDialogOpen: (section: boolean) => void;
    isCreditsDialogOpen: boolean;
    setCreditsDialogOpen: (section: boolean) => void;
    isCreditsUpdate: boolean;
    setCreditsUpdate: (section: boolean) => void;
}

// Crea il contesto e fornisci un valore predefinito
const AppContext = createContext<AppContextType | undefined>(undefined);

// Crea un provider per il contesto
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    // Stato che gestisce la tab aperta nella sidebar
    const [selectedSection, setSelectedSection] = useState<string>("dashboard");
    // Stato che gestisce il modal per il logout
    const [isExitDialogOpen, setExitDialogOpen] = useState<boolean>(false);
    // Stato che gestisce il modal per il supporto
    const [isSupportDialogOpen, setSupportDialogOpen] = useState<boolean>(false);
    // Stato che gestisce il modal per i crediti
    const [isCreditsDialogOpen, setCreditsDialogOpen] = useState<boolean>(false);
    // Stato che gestisce l'aggiornamento dei crediti
    const [isCreditsUpdate, setCreditsUpdate] = useState<boolean>(false);

    return (
        <AppContext.Provider
            value={{ selectedSection, setSelectedSection, isExitDialogOpen, setExitDialogOpen, isSupportDialogOpen, setSupportDialogOpen, isCreditsDialogOpen, setCreditsDialogOpen, isCreditsUpdate, setCreditsUpdate }}>
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
