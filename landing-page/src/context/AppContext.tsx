import { useState, createContext, useContext } from "react";

type AppContextType = {
    isCookiesBannerOpened: boolean;
    setCookiesBannerOpened: (section: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {

    const [isCookiesBannerOpened, setCookiesBannerOpened] = useState<boolean>(false);

    return (
        <AppContext.Provider
            value={{ isCookiesBannerOpened, setCookiesBannerOpened }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("CLIENT: useAppContext must be used within an AppProvider");
    }
    return context;
}