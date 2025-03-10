import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAppContext } from "../context/AppContext";
import DialogDescriptionContainer from "./DialogDescriptionContainer";

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
                                <h3>{titleValue ? titleValue : 'Not selected'}</h3>
                            </DialogDescriptionContainer>
                            <DialogDescriptionContainer>
                                <h1 className="text-md font-bold text-zinc-900">Content</h1>
                                <Textarea value={descriptionValue?.toString()} readOnly className="h-[30svh] resize-none" />
                            </DialogDescriptionContainer>
                            <DialogDescriptionContainer>
                                <h1 className="text-md font-bold text-zinc-900">Subreddit</h1>
                                <p>{communityValue ? communityValue : 'Not selected'}</p>
                            </DialogDescriptionContainer>
                            <DialogDescriptionContainer>
                                <h1 className="text-md font-bold text-zinc-900">Flair</h1>
                                <p>{flairValue ? flairValue : 'Not selected'}</p>
                            </DialogDescriptionContainer>
                            <DialogDescriptionContainer>
                                <h1 className="text-md font-bold text-zinc-900">Date and time</h1>
                                <p>{dateTime.toLocaleString()}</p>
                            </DialogDescriptionContainer>
                        </ScrollArea>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={() => setPreviewDialogOpen(false)}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
