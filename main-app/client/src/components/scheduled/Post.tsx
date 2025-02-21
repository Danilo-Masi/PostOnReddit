// Context
import { useAppContext } from "../context/AppContext";
// Shadcnui
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "@/components/ui/badge";
// Icons
import { Trash2 } from "lucide-react";

interface PostProps {
    title: string;
    content: string;
    date: string;
    community: string;
    status: string;
    postId: any;
}

export default function Post({ title, content, date, community, status, postId }: PostProps) {

    const { setDeleteDialogOpen, setPostId } = useAppContext();

    // Funzione per modificare lo stile dinamicamente in base allo stato del post
    const statusColor = () => {
        if (status === "pending") return "border-yellow-500 text-yellow-500 dark:border-yellow-300 dark:text-yellow-300";
        if (status === "posted") return "border-green-500 text-green-500 dark:border-green-500 dark:text-green-500";
        return "border-red-500 text-red-500 dark:border-red-500 dark:text-red-500";
    }

    // Funzione per renderizzare il contenuto del post in formato HTML
    const renderContent = (content: string) => {
        if (!content || typeof content !== "string") return null;

        // Creiamo un div temporaneo per estrarre il testo puro dall'HTML
        const tempElement = document.createElement("div");
        tempElement.innerHTML = content;
        let plainText = tempElement.textContent || tempElement.innerText || "";

        // Rimuoviamo virgolette doppie e singole all'inizio e alla fine
        plainText = plainText.trim().replace(/^["']|["']$/g, '');

        // Divide il testo in parole e lo tronca se necessario
        const words = plainText.split(/\s+/);
        const truncatedText = words.length > 30 ? words.slice(0, 30).join(" ") + "..." : plainText;

        return (
            <p className="text-zinc-500 dark:text-zinc-300">
                {truncatedText}
            </p>
        );
    };

    // Funzione per passare il postId e aprire la dialog per la cancellazione
    const handleOpenDeleteDialog = () => {
        setPostId(postId);
        setDeleteDialogOpen(true);
    }

    return (
        <Card className="w-full md:w-[calc(50%-0.5rem)] bg-zinc-100 dark:bg-zinc-800 border-0">
            <CardHeader className="gap-y-2">
                <CardTitle className="font-bold text-xl text-zinc-900 dark:text-zinc-50">
                    {title}
                </CardTitle>
                <CardDescription className="font-light text-sm text-zinc-500 dark:text-zinc-300">
                    Scheduled for <i className="font-semibold">{date}</i>
                </CardDescription>
                <div className="flex gap-2">
                    <Badge
                        variant="outline"
                        className="w-fit text-zinc-500 border-zinc-500 dark:text-zinc-300 dark:border-zinc-300">
                        {community}
                    </Badge>
                    <Badge
                        variant="outline"
                        className={`w-fit ${statusColor()}`}>
                        {status}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-2 min-h-[10svh] font-light text-clip text-m text-zinc-500 dark:text-zinc-300">
                {renderContent(content)}
            </CardContent>
            <CardFooter className="flex justify-end gap-3">
                <Button
                    onClick={handleOpenDeleteDialog}
                    variant="outline"
                    className="shadow-none border-none text-zinc-50 hover:text-zinc-50 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500">
                    <Trash2 />
                    Delete
                </Button>
            </CardFooter>
        </Card>

    );
}
