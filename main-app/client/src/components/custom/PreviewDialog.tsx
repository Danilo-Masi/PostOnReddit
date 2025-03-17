import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppContext } from "../context/AppContext";
import { generateHTML } from "@tiptap/react";
import { JSONContent } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import DOMPurify from "dompurify";

export default function PreviewDialog() {
    const { isPreviewDialogOpen, setPreviewDialogOpen, titleValue, descriptionValue } = useAppContext();

    const getDescriptionHTML = () => {
        if (!descriptionValue || typeof descriptionValue === "string") {
            return descriptionValue || "<p>No content...</p>";
        }
        try {
            // Converte JSONContent in HTML
            return generateHTML(descriptionValue as JSONContent, [StarterKit]);
        } catch (error) {
            console.error("Errore nella conversione TipTap -> HTML:", error);
            return "<p>No content...</p>";
        }
    };

    return (
        <AlertDialog open={isPreviewDialogOpen} onOpenChange={() => setPreviewDialogOpen(!isPreviewDialogOpen)}>
            <AlertDialogContent className="w-[90%] h-[90svh] rounded-md flex flex-col">
                <AlertDialogHeader>
                    <AlertDialogTitle>Post review</AlertDialogTitle>
                </AlertDialogHeader>

                <AlertDialogDescription className="h-full flex flex-col min-h-0">
                    <ScrollArea className="w-full h-full flex flex-col overflow-auto min-h-0">
                        <div className="w-full h-[10svh] max-h-[10svh] overflow-hidden p-3 rounded-md mb-6 bg-zinc-100">
                            <h3 className="text-zinc-700 font-semibold">{titleValue || "No title..."}</h3>
                        </div>
                        <div
                            className="w-full h-[55svh] prose p-3 rounded-md overflow-scroll text-sm text-zinc-500 bg-zinc-100"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(getDescriptionHTML()) }} />
                    </ScrollArea>
                </AlertDialogDescription>

                <AlertDialogFooter>
                    <AlertDialogAction onClick={() => setPreviewDialogOpen(!isPreviewDialogOpen)}>Close Preview</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}