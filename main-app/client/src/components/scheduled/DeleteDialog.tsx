// Shadcnui
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from '@radix-ui/react-alert-dialog';
import { AlertDialogFooter, AlertDialogHeader } from '../ui/alert-dialog';
// Context
import { useAppContext } from '../context/AppContext';
// Axios
import axios from "axios";
import { toast } from 'sonner';

// Url del server di produzione
const SERVER_URL = 'http://localhost:3000';

type PostType = {
    title: string;
    content: string;
    date: string;
    community: string;
    status: string;
    id: string;
  }

export default function DeleteDialog() {

    const { isDeleteDialogOpen, setDeleteDialogOpen, setPostList } = useAppContext();

    // Funzione per eliminare un determinato un post dal DB
    const handleDeletePost = async (postId: string) => {
        try {
            const authToken = localStorage.getItem('authToken');
            const response = await axios.post(`${SERVER_URL}/supabase/delete-post`, {
                post_id: postId
            }, {
                headers: { Authorization: `Bearer ${authToken}` },
            });

            if (response.status === 200) {
                toast.info("Post succesfully deleted!");
                setPostList((prevList) => prevList.filter((post) => post.id !== postId));
            }
        } catch (error: any) {
            console.log("CLIENT: Errore durante l'eliminazione del post", error.message);
            toast.warning("Error during the deleting process. Try later!");
        }
    }

    return (
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={() => setDeleteDialogOpen(!isDeleteDialogOpen)}>
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
                        onClick={handleDeletePost(1)}>
                        Confirm Logout
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
