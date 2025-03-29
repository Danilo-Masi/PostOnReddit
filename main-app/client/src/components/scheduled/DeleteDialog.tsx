import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { toast } from 'sonner';
import { useAppContext } from '../context/AppContext';
import axios from "axios";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

export default function DeleteDialog() {
    const { isDeleteDialogOpen, setDeleteDialogOpen, postList, setPostList, postId } = useAppContext();
    const [isLoading, setLoading] = useState<boolean>(false);

    // Funzione per eliminare un determinato post dal DB
    const handleDeletePost = async () => {
        setLoading(true);
        try {
            const authToken = localStorage.getItem('authToken');
            const response = await axios.post(`${SERVER_URL}/supabase/delete-post`, {
                post_id: postId
            }, {
                headers: { Authorization: `Bearer ${authToken}` },
                timeout: 5000,
            });

            if (response.status === 200) {
                toast.info("Post successfully deleted!");
                const updatedList = postList.filter((post) => post.id !== postId);
                setPostList(updatedList);
                setDeleteDialogOpen(false);
            }
        } catch (error: any) {
            console.log("CLIENT: Errore durante l'eliminazione del post", error.message);
            toast.warning("There was an error deleting the post. Please try again later!");
        } finally {
            setLoading(false);
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
                        aria-label="Delete post permanently"
                        className="bg-red-500 hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600 dark:text-zinc-50">
                        {isLoading ? <><Loader2 className='animate-spin' /> Deleting...</> : <><Trash2 /> Delete Permanently</>}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
