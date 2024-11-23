// Context
import { useAppContext } from "../context/AppContext";
// Shadcnui
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
// Icons
import { X } from "lucide-react";

export default function CreditsDialog() {

    const { isCreditsDialogOpen, setCreditsDialogOpen } = useAppContext();

    return (
        <AlertDialog open={isCreditsDialogOpen} onOpenChange={() => setCreditsDialogOpen(!isCreditsDialogOpen)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="flex justify-between items-center">
                        <AlertDialogTitle>Don't have any more credits available?</AlertDialogTitle>
                        <AlertDialogCancel className="w-8 h-8 bg-white border shadow-none hover:border-border hover:bg-white">
                            <X />
                        </AlertDialogCancel>
                    </div>
                    <AlertDialogDescription>
                     
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    );
}
