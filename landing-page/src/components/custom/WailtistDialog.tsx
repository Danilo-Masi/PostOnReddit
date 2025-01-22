// Context
import { useAppContext } from "@/context/AppContext";
// Shadcnui
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
// Icons
import { X } from "lucide-react";
// Components
import WaitlistWidget from "./WaitlistWidget";

export default function WailtistDialog() {

    const { isWaitlistOpen, setWaitlistOpen } = useAppContext();

    const handleOpenChange = () => {
        setWaitlistOpen(!isWaitlistOpen);
    }

    return (
        <AlertDialog open onOpenChange={handleOpenChange}>
            <AlertDialogContent className="w-[90%] rounded-xl">
                <AlertDialogHeader className="w-full flex flex-row items-center justify-between">
                    <AlertDialogTitle>Secure your spot now</AlertDialogTitle>
                    <AlertDialogCancel className="border p-2 rounded-lg text-zinc-500 hover:text-orange-500 hover:bg-background hover:border-orange-500">
                        <X className="w-4 h-4" />
                    </AlertDialogCancel>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    <WaitlistWidget />
                </AlertDialogDescription>
            </AlertDialogContent>
        </AlertDialog>
    );
}
