// Context
import { useAppContext } from "../context/AppContext";
// Shadcnui
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";

export default function SupportDialog() {

    const { isSupportDialogOpen, setSupportDialogOpen } = useAppContext();

    return (
        <AlertDialog open={isSupportDialogOpen} onOpenChange={() => setSupportDialogOpen(!isSupportDialogOpen)}>
            <AlertDialogContent
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="w-[90%] rounded-lg">
                <AlertDialogHeader>
                    <AlertDialogTitle id="alert-dialog-title" className="text-balance">How can we help?</AlertDialogTitle>
                    <AlertDialogDescription id="alert-dialog-description" className="text-balance">
                        If you need any assistance or have suggestions, don't hesitate to contact us by emailing
                        <span className="text-orange-500 hover:underline"> support@postonreddit.com</span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="hover:bg-gray-100">Close</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
