// Shadcnui
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { toast } from 'sonner';
// Context
import { useAppContext } from '../context/AppContext';
// Axios
import axios from "axios";
// Icons
import { Trash2 } from "lucide-react";

// Url del server di produzione
const SERVER_URL = 'http://localhost:3000';

export default function DeleteDialog() {

    const { isDeleteDialogOpen, setDeleteDialogOpen, postList, setPostList, postId } = useAppContext();

    // Funzione per eliminare un determinato post dal DB
    const handleDeletePost = async () => {
        try {
            const authToken = localStorage.getItem('authToken');
            const response = await axios.post(`${SERVER_URL}/supabase/delete-post`, {
                post_id: postId
            }, {
                headers: { Authorization: `Bearer ${authToken}` },
            });

            if (response.status === 200) {
                toast.info("Post succesfully deleted!");
                const updatedList = postList.filter((post) => post.id !== postId);
                setPostList(updatedList);
                setDeleteDialogOpen(false);
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
                    <AlertDialogTitle>Confirm Post Deletion</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this post? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="hover:bg-gray-100">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDeletePost}
                        className="bg-red-500 hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600 dark:text-zinc-50">
                        <Trash2 />
                        Delete Permanently
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
