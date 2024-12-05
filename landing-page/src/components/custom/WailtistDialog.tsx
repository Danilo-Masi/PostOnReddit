// Context
import { useAppContext } from "@/context/AppContext";
// Shadcnui
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { Button } from "../ui/button";
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
                    <AlertDialogTitle>Get Ready! Your Spot is Waiting!</AlertDialogTitle>
                    <AlertDialogCancel>
                        <Button variant="outline" className="w-6 h-6 p-4 text-zinc-500 hover:text-orange-500 hover:bg-background hover:border-orange-500">
                            <X />
                        </Button>
                    </AlertDialogCancel>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    <WaitlistWidget />
                </AlertDialogDescription>
            </AlertDialogContent>
        </AlertDialog>
    );
}
