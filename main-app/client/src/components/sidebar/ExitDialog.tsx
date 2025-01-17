// React-router
import { NavigateFunction, useNavigate } from "react-router-dom";
// Context
import { useAppContext } from "../context/AppContext";
// Axios
import axios from 'axios';
// Shadcnui
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { toast } from "sonner";

// Url del server di produzione
const SERVER_URL = 'http://localhost:3000';

export default function ExitDialog() {

    const navigate: NavigateFunction = useNavigate();
    const { isExitDialogOpen, setExitDialogOpen } = useAppContext();

    // Funzione per effettuare il logout
    const handleLogout = async () => {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            toast.info("You're alredy logged out");
            navigate('/login');
            return;
        }
        try {
            const response = await axios.post(`${SERVER_URL}/auth/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            });
            if (response.status === 200) {
                localStorage.removeItem('authToken');
                navigate('/login');
            } else {
                toast.error("Logout failed. Please try again");
            }
        } catch (error: any) {
            if (error.response) {
                console.error("CLIENT: Server error:", error.stack);
                toast.error("Server error. Please try again later");
            } else if (error.request) {
                console.error("CLIENT: Network error: ", error.message);
                toast.error("Network error. Check your connection");
            } else {
                console.error("CLIENT: Generic error: ", error.message);
                toast.error("An unexpected error occurred. Please try again later");
            }
        }
    }

    return (
        <AlertDialog open={isExitDialogOpen} onOpenChange={() => setExitDialogOpen(!isExitDialogOpen)}>
            <AlertDialogContent className="rounded-lg w-[90%]">
                <AlertDialogHeader>
                    <AlertDialogTitle>Logout</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to log out? You will need to login again to access your account
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="hover:bg-gray-100">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-red-500 hover:bg-red-600 text-white"
                        onClick={() => handleLogout()}>
                        Confirm Logout
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
