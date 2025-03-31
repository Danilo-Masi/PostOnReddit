import { useState, createContext, useContext, Dispatch, SetStateAction } from "react";
import { Content } from "@tiptap/react";

type PostType = {
    title: string;
    content: string;
    date: string;
    community: string;
    status: string;
    id: string;
};

type AppContextType = {
    selectedSection: string;
    setSelectedSection: Dispatch<SetStateAction<string>>;
    isExitDialogOpen: boolean;
    setExitDialogOpen: Dispatch<SetStateAction<boolean>>;
    isSupportDialogOpen: boolean;
    setSupportDialogOpen: Dispatch<SetStateAction<boolean>>;
    isDeleteDialogOpen: boolean;
    setDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
    postList: PostType[];
    setPostList: Dispatch<SetStateAction<PostType[]>>;
    postId: string | null;
    setPostId: Dispatch<SetStateAction<string | null>>;
    isPreviewDialogOpen: boolean;
    setPreviewDialogOpen: Dispatch<SetStateAction<boolean>>;
    titleValue: string;
    setTitleValue: Dispatch<SetStateAction<string>>;
    descriptionValue: Content;
    setDescriptionValue: Dispatch<SetStateAction<Content>>;
    communityValue: string;
    setCommunityValue: Dispatch<SetStateAction<string>>;
    flairValue: string;
    setFlairValue: Dispatch<SetStateAction<string>>;
    dateTime: Date;
    setDateTime: Dispatch<SetStateAction<Date>>;
    isPro: boolean;
    setIsPro: Dispatch<SetStateAction<boolean>>;
};

// Funzione per ottenere la data UTC
const getUTCDate = () => {
    const now = new Date();
    return new Date(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes(),
        0,
        0
    );
};

// Creazione del contesto con valori predefiniti
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider del contesto
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedSection, setSelectedSection] = useState("dashboard");
    const [isExitDialogOpen, setExitDialogOpen] = useState(false);
    const [isSupportDialogOpen, setSupportDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [postList, setPostList] = useState<PostType[]>([]);
    const [postId, setPostId] = useState<string | null>(null);
    const [isPreviewDialogOpen, setPreviewDialogOpen] = useState(false);
    const [titleValue, setTitleValue] = useState("");
    const [descriptionValue, setDescriptionValue] = useState<Content>("");
    const [communityValue, setCommunityValue] = useState("");
    const [flairValue, setFlairValue] = useState("");
    const [dateTime, setDateTime] = useState(getUTCDate);
    const [isPro, setIsPro] = useState<boolean>(false);

    return (
        <AppContext.Provider
            value={{
                selectedSection,
                setSelectedSection,
                isExitDialogOpen,
                setExitDialogOpen,
                isSupportDialogOpen,
                setSupportDialogOpen,
                isDeleteDialogOpen,
                setDeleteDialogOpen,
                postList,
                setPostList,
                postId,
                setPostId,
                isPreviewDialogOpen,
                setPreviewDialogOpen,
                titleValue,
                setTitleValue,
                descriptionValue,
                setDescriptionValue,
                communityValue,
                setCommunityValue,
                flairValue,
                setFlairValue,
                dateTime,
                setDateTime,
                isPro,
                setIsPro,
            }}>
            {children}
        </AppContext.Provider>
    );
};

// Hook personalizzato per usare il contesto
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};