import { useState, createContext, useContext, Dispatch, SetStateAction } from "react";

type AppContextType = {
    isCookiesBannerOpened: boolean;
    setCookiesBannerOpened: (section: boolean) => void;
    subreddit: string;
    setSubreddit: Dispatch<SetStateAction<string>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {

    const [isCookiesBannerOpened, setCookiesBannerOpened] = useState<boolean>(false);
    const [subreddit, setSubreddit] = useState<string>("");

    return (
        <AppContext.Provider
            value={{ isCookiesBannerOpened, setCookiesBannerOpened, subreddit, setSubreddit }}>
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