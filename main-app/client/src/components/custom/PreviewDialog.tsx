import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppContext } from "../context/AppContext";
import DialogDescriptionContainer from "./DialogDescriptionContainer";
import DOMPurify from "dompurify";

export default function PreviewDialog() {
    const { isPreviewDialogOpen, setPreviewDialogOpen, titleValue, descriptionValue, communityValue, flairValue, dateTime } = useAppContext();

    return (
        <AlertDialog open={isPreviewDialogOpen} onOpenChange={() => setPreviewDialogOpen(!isPreviewDialogOpen)}>
            <AlertDialogContent className="w-[90%] rounded-md">
                <AlertDialogHeader>
                    <AlertDialogTitle>Post review</AlertDialogTitle>
                    <AlertDialogDescription>
                        <ScrollArea className="w-full h-[70svh] text-left">
                            <DialogDescriptionContainer>
                                <h1 className="text-md font-bold text-zinc-900">Title</h1>
                                <div className="w-full max-h-[20svh] bg-zinc-100 p-3 rounded-md overflow-scroll">
                                    <h3>{titleValue || "Not selected"}</h3>
                                </div>
                            </DialogDescriptionContainer>
                            <DialogDescriptionContainer>
                                <h1 className="text-md font-bold text-zinc-900">Content</h1>
                                <div className="prose w-full max-h-[50svh] bg-zinc-100 p-3 rounded-md overflow-scroll" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(descriptionValue || "<p>No content</p>") }} />
                            </DialogDescriptionContainer>
                            <DialogDescriptionContainer>
                                <h1 className="text-md font-bold text-zinc-900">Subreddit</h1>
                                <p>{communityValue || "Not selected"}</p>
                            </DialogDescriptionContainer>
                            <DialogDescriptionContainer>
                                <h1 className="text-md font-bold text-zinc-900">Flair</h1>
                                <p>{flairValue || "Not selected"}</p>
                            </DialogDescriptionContainer>
                            <DialogDescriptionContainer>
                                <h1 className="text-md font-bold text-zinc-900">Date and time</h1>
                                <p>{dateTime?.toLocaleString() || "Not selected"}</p>
                            </DialogDescriptionContainer>
                        </ScrollArea>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={() => setPreviewDialogOpen(!isPreviewDialogOpen)}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}