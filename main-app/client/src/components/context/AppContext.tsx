// React
import { useState, createContext, useContext, Dispatch, SetStateAction } from "react";
// minimal-tiptap
import { Content } from '@tiptap/react';

type PostType = {
    title: string;
    content: string;
    date: string;
    community: string;
    status: string;
    id: string;
}

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
    isDeleteDialogOpen: boolean;
    setDeleteDialogOpen: (section: boolean) => void;
    postList: PostType[]
    setPostList: (section: PostType[]) => void;
    postId: any;
    setPostId: (section: any) => void;
    isPreviewDialogOpen: boolean;
    setPreviewDialogOpen: (section: boolean) => void;
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
}

// Crea il contesto e fornisci un valore predefinito
const AppContext = createContext<AppContextType | undefined>(undefined);

// Ottiene la data attuale
const now = new Date();
// Crea una nuova data in UTC con secondi e millisecondi impostati a 0
const utcDate = new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    0,
    0
);

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
    // Stato che gestisce se la dialog del cancellamento di un post è aperta
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
    // Stato che gestisce la lista di post caricati dal DB
    const [postList, setPostList] = useState<PostType[]>([]);
    // Stato per gestire il postId selezionato
    const [postId, setPostId] = useState<any>(null);
    // Stato per gestire l'apertura della Dialog preview
    const [isPreviewDialogOpen, setPreviewDialogOpen] = useState<boolean>(false);
    // Stati per la gestione del post
    const [titleValue, setTitleValue] = useState<string>("");
    const [descriptionValue, setDescriptionValue] = useState<Content>("");
    const [communityValue, setCommunityValue] = useState<string>("");
    const [flairValue, setFlairValue] = useState<string>("");
    const [dateTime, setDateTime] = useState<Date>(utcDate);

    return (
        <AppContext.Provider
            value={{ selectedSection, setSelectedSection, isExitDialogOpen, setExitDialogOpen, isSupportDialogOpen, setSupportDialogOpen, isCreditsDialogOpen, setCreditsDialogOpen, isCreditsUpdate, setCreditsUpdate, isDeleteDialogOpen, setDeleteDialogOpen, postList, setPostList, postId, setPostId, isPreviewDialogOpen, setPreviewDialogOpen, titleValue, setTitleValue, descriptionValue, setDescriptionValue, communityValue, setCommunityValue, flairValue, setFlairValue, dateTime, setDateTime }}>
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
