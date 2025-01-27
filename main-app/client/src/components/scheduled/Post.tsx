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
        if (status === "pending") return "border-yellow-500 text-yellow-500";
        if (status === "posted") return "border-green-500 text-green-500";
        return "border-red-500 text-red-500";
    }

    // Funzione per renderizzare il contenuto del post in formato JSON
    const renderContent = (content: any) => {
        if (!content || typeof content !== "object") return null;

        // Unisce tutti i paragrafi in un unico testo
        const fullText = content.content
            .filter((node: any) => node.type === "paragraph")
            .flatMap((node: any) => node.content?.map((child: any) => child.text) || [])
            .join(" ");

        // Divide il testo in parole e tronca se necessario
        const words = fullText.split(/\s+/);
        const truncatedText = words.length > 30 ? words.slice(0, 30).join(" ") + "..." : fullText;

        return (
            <p className="text-zinc-500">
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
        <Card className="border-elevation2 bg-background border w-full md:w-[calc(50%-0.5rem)]">
            <CardHeader className="gap-y-2">
                <CardTitle className="font-bold text-textPrimary text-xl">
                    {title}
                </CardTitle>
                <CardDescription className="font-light text-sm text-textSecondary">
                    Scheduled for <i className="font-semibold">{date}</i>
                </CardDescription>
                <div className="flex gap-2">
                    <Badge
                        variant="outline"
                        className="w-fit">
                        {community}
                    </Badge>
                    <Badge
                        variant="outline"
                        className={`w-fit ${statusColor()}`}>
                        {status}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-2 min-h-[10svh] font-light text-clip text-m text-textSecondary">
                {renderContent(JSON.parse(content))}
            </CardContent>
            <CardFooter className="flex justify-end gap-3">
                <Button
                    onClick={handleOpenDeleteDialog}
                    variant="outline"
                    className="bg-card hover:bg-buttonError shadow-none border-border hover:text-textForeground">
                    <Trash2 />
                    Delete
                </Button>
            </CardFooter>
        </Card>

    );
}
