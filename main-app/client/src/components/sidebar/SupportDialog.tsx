// Context
import { useAppContext } from "../context/AppContext";
// Shadcnui
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
// Icons
import { X } from "lucide-react";

export default function SupportDialog() {

    const { isSupportDialogOpen, setSupportDialogOpen } = useAppContext();

    return (
        <AlertDialog open={isSupportDialogOpen} onOpenChange={() => setSupportDialogOpen(!isSupportDialogOpen)}>
            <AlertDialogContent className="w-[90%] rounded-lg">
                <AlertDialogHeader>
                    <div className="flex justify-between items-start">
                        <AlertDialogTitle className="text-balance">Do you have any feedback or problem?</AlertDialogTitle>
                        <AlertDialogCancel className="w-8 h-8 bg-white border shadow-none hover:border-border hover:bg-white">
                            <X />
                        </AlertDialogCancel>
                    </div>
                    <AlertDialogDescription className="text-balance">
                        For any issues, question or feedback, send an email at
                        <span>
                            <p className="text-textColor hover:underline"> danilomasi999@gmail.com</p>
                        </span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    );
}
