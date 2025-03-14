import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppContext } from "../context/AppContext";
import DialogDescriptionContainer from "./DialogDescriptionContainer";
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
            <AlertDialogContent className="w-[90%] rounded-md">
                <AlertDialogHeader>
                    <AlertDialogTitle>Post review</AlertDialogTitle>
                    <AlertDialogDescription>
                        <ScrollArea className="w-full h-full min-h-[70svh] text-left">
                            <DialogDescriptionContainer>
                                <h1 className="text-md font-bold text-zinc-900">Title</h1>
                                <div className="w-full max-h-[20svh] bg-zinc-100 p-3 rounded-md overflow-scroll">
                                    <h3 className="text-zinc-700 font-semibold">{titleValue || "No title..."}</h3>
                                </div>
                            </DialogDescriptionContainer>
                            <DialogDescriptionContainer>
                                <h1 className="text-md font-bold text-zinc-900">Content</h1>
                                <div
                                    className="w-full min-h-[50svh] prose p-3 rounded-md overflow-scroll text-sm text-zinc-500 bg-zinc-100"
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(getDescriptionHTML()) }} />
                            </DialogDescriptionContainer>
                        </ScrollArea>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={() => setPreviewDialogOpen(!isPreviewDialogOpen)}>Close Preview</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}