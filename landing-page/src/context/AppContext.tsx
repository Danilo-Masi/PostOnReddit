import { useState, createContext, useContext, Dispatch, SetStateAction } from "react";

type AppContextType = {
    isCookiesBannerOpen: boolean;
    setCookiesBannerOpen: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {

    const [isCookiesBannerOpen, setCookiesBannerOpen] = useState(false);

    return (
        <AppContext.Provider
            value={{ isCookiesBannerOpen, setCookiesBannerOpen }}>
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