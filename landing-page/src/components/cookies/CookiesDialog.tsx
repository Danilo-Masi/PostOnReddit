import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useAppContext } from "@/context/AppContext";

export default function CookiesDialog() {
    const { isCookiesBannerOpen, setCookiesBannerOpen } = useAppContext();

    const handleAcceptCookies = () => {
        localStorage.setItem('cookieBanner', 'true');
        setCookiesBannerOpen(false);
    }

    const handleDeclineCookies = () => {
        localStorage.setItem('cookieBanner', 'false');
        setCookiesBannerOpen(false);
    }

    return (
        <AlertDialog open={isCookiesBannerOpen} onOpenChange={() => setCookiesBannerOpen(!isCookiesBannerOpen)}>
            <AlertDialogContent className="w-[90%] md:w-fit max-w-[600px] rounded-lg">
                <AlertDialogHeader>
                    <AlertDialogTitle>Cookies policy</AlertDialogTitle>
                    <AlertDialogDescription>
                        If you continue to use this website, you agree to the use of cookies.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-col md:flex-row gap-2">
                    <AlertDialogAction
                        onClick={() => handleAcceptCookies()}
                        className="bg-primary hover:bg-primary/85 text-primary-foreground">
                        Accept
                    </AlertDialogAction>
                    <AlertDialogCancel
                        onClick={() => handleDeclineCookies()}>
                        Decline
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
