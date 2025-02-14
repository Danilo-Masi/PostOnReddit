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
                    <AlertDialogTitle id="alert-dialog-title" className="text-balance">Need Assistance or Have Feedback?</AlertDialogTitle>
                    <AlertDialogDescription id="alert-dialog-description" className="text-balance">
                        If you encounter any issues or have any suggestions, feel free to reach out by emailing us at
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
