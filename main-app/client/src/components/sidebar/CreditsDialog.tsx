// Context
import { useAppContext } from "../context/AppContext";
// Shadcnui
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
// Icons
import { X } from "lucide-react";
// Components
import Credits from "../credits/Credits";

export default function CreditsDialog() {

    const { isCreditsDialogOpen, setCreditsDialogOpen } = useAppContext();

    return (
        <AlertDialog
            open={isCreditsDialogOpen}
            onOpenChange={() => setCreditsDialogOpen(!isCreditsDialogOpen)}>
            <AlertDialogContent className="w-[90%] md:min-w-fit max-h-[90svh] overflow-scroll rounded-lg">
                <AlertDialogHeader>
                    <div className="flex justify-between items-center">
                        <AlertDialogTitle className="text-balance">Don't have any more credits available?</AlertDialogTitle>
                        <AlertDialogCancel className="w-8 h-8 bg-white border shadow-none hover:border-border hover:bg-white">
                            <X />
                        </AlertDialogCancel>
                    </div>
                    <AlertDialogDescription>
                        <Credits />
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    );
}
