// React-router
import { NavigateFunction, useNavigate } from "react-router-dom";
// Context
import { useAppContext } from "../context/AppContext";
// Axios
import axios from 'axios';
// Shadcnui
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";

// Url del server di produzione
const SERVER_URL = 'http://localhost:3000';

export default function ExitDialog() {

    const navigate: NavigateFunction = useNavigate();
    const { isExitDialogOpen, setExitDialogOpen } = useAppContext();

    const handleLogout = async () => {
        try {
            const response = await axios.post(`${SERVER_URL}/logout`, {
                header: { 'Content-Type': 'application/json' }
            });

            if (response.status === 400) {
                console.error('CLIENT: Errore di rete');
                return;
            }

            if (response.status === 200) {
                localStorage.removeItem('authToken');
                navigate('/login');
            }

        } catch (error: any) {
            console.error('CLIENT: Errore generico del server', error.message);
            return;
        }
    }

    return (
        <AlertDialog open={isExitDialogOpen} onOpenChange={() => setExitDialogOpen(!isExitDialogOpen)}>
            <AlertDialogContent className="w-[90%] rounded-lg">
                <AlertDialogHeader>
                    <AlertDialogTitle>Logout</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to log out? You will need to login again to access your account.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="hover:bg-gray-100">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-red-500 text-white hover:bg-red-600"
                        onClick={() => handleLogout()}>
                        Confirm Logout
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
