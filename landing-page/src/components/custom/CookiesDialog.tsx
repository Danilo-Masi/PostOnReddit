import { useAppContext } from "@/context/AppContext";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { X } from "lucide-react";

export default function CookiesDialog() {

    const { isCookiesBannerOpened, setCookiesBannerOpened } = useAppContext();

    const handleAccept = () => {
        localStorage.setItem("cookieBanner", "true");
        setCookiesBannerOpened(false);
    }

    return (
        <AlertDialog open onOpenChange={() => setCookiesBannerOpened(!isCookiesBannerOpened)}>
            <AlertDialogContent className="w-[90%] rounded-xl">
                <AlertDialogHeader className="w-full flex flex-row items-center justify-between">
                    <AlertDialogTitle>Cookie Policy</AlertDialogTitle>
                    <AlertDialogCancel>
                        <Button
                            aria-label="close-button"
                            name="close-button"
                            variant="outline"
                            className="w-6 h-6 p-4 text-zinc-500 hover:text-orange-500 hover:bg-background hover:border-orange-500">
                            <X />
                        </Button>
                    </AlertDialogCancel>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    <p className="text-base text-balance text-zinc-500">
                        We do not use any cookies on our platform except for a third-party cookie from Simple Analytics to track page views.
                        This cookie helps us understand the traffic to our website, but we do not track any personal information.
                    </p>
                    <p className="text-base text-balance text-zinc-500 mt-4">
                        By clicking "Accept", you consent to the use of this third-party cookie. If you do not accept, your experience will not be affected, but we won't be able to track page views.
                    </p>
                </AlertDialogDescription>
                <AlertDialogFooter className="flex flex-col md:flex-row gap-y-3 ">
                    <Button
                        type="button"
                        className="bg-orange-500 hover:bg-orange-600"
                        onClick={handleAccept}>
                        Accept
                    </Button>
                    <Button
                        type="button"
                        className="bg-gray-300 hover:bg-gray-400 text-black"
                        onClick={() => setCookiesBannerOpened(false)}>
                        Cancel
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
