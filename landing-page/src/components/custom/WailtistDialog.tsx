// Context
import { useAppContext } from "@/context/AppContext";
// Shadcnui
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { Button } from "../ui/button";
// Icons
import { X } from "lucide-react";

export default function WailtistDialog() {

    const { isWaitlistOpen, setWaitlistOpen } = useAppContext();

    return (
        <AlertDialog open onOpenChange={() => setWaitlistOpen(!isWaitlistOpen)}>
            <AlertDialogContent>
                <AlertDialogHeader className="w-full  flex flex-row items-center justify-between">
                    <AlertDialogTitle>Join the wailtist</AlertDialogTitle>
                    <AlertDialogCancel>
                        <Button>
                            <X />
                        </Button>
                    </AlertDialogCancel>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </AlertDialogDescription>
            </AlertDialogContent>
        </AlertDialog>
    );
}
