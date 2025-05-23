import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import axios from 'axios';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

export default function ExitDialog() {
    const navigate: NavigateFunction = useNavigate();
    const { isExitDialogOpen, setExitDialogOpen } = useAppContext();

    // Funzione per effettuare il logout
    const handleLogout = async () => {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            toast.info("You're already logged out");
            navigate('/login');
            return;
        }
        try {
            const response = await axios.post(`${SERVER_URL}/auth/logout`, null, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            });

            if (response.status !== 200) {
                toast.error("Logout failed. Please try again");
                return;
            }

            localStorage.removeItem('authToken');
            navigate('/login');

        } catch (error: any) {
            if (error.response) {
                console.error("Server error:", error.stack);
                toast.error("Server error. Please try again later");
            } else if (error.request) {
                console.error("Network error: ", error.message);
                toast.error("Network error. Check your connection");
            } else {
                console.error("Generic error: ", error.message);
                toast.error("An unexpected error occurred. Please try again later");
            }
        }
    }

    return (
        <AlertDialog open={isExitDialogOpen} onOpenChange={() => setExitDialogOpen(!isExitDialogOpen)}>
            <AlertDialogContent
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="rounded-lg w-[90%]">
                <AlertDialogHeader>
                    <AlertDialogTitle id="alert-dialog-title">Log Out</AlertDialogTitle>
                    <AlertDialogDescription id="alert-dialog-description">
                        Are you sure you want to log out? You will need to log in again to access your account.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="hover:bg-gray-100">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-red-500 hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600 dark:text-zinc-50"
                        onClick={handleLogout}>
                        <LogOut />
                        Confirm Log Out
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
