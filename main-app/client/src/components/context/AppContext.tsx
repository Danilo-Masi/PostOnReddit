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
}

// Crea il contesto e fornisci un valore predefinito
const AppContext = createContext<AppContextType | undefined>(undefined);

// Crea un provider per il contesto
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedSection, setSelectedSection] = useState<string>("dashboard");
    const [isExitDialogOpen, setExitDialogOpen] = useState<boolean>(false);
    const [isSupportDialogOpen, setSupportDialogOpen] = useState<boolean>(false);
    const [isCreditsDialogOpen, setCreditsDialogOpen] = useState<boolean>(false);

    return (
        <AppContext.Provider
            value={{ selectedSection, setSelectedSection, isExitDialogOpen, setExitDialogOpen, isSupportDialogOpen, setSupportDialogOpen, isCreditsDialogOpen, setCreditsDialogOpen }}>
            {children}
        </AppContext.Provider>
    );
};

// Hook per usare facilmente il contesto
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("CLIENT: useAppContext must be used within an AppProvider");
    }
    return context;
}
