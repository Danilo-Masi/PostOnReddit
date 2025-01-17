// Components
import { useEffect, useState } from "react";
// Context
import { useAppContext } from "../context/AppContext";
// Axios
import axios from "axios";
// Components
import Post from "./Post";
import SelectDate from "./SelectDate";
// Shadcnui
import { Button } from "../ui/button";
import { toast } from "sonner";
// Icons
import { Pencil } from "lucide-react";

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

// Funzione per formattare la data visualizzata
const formatDate = (isoString: any) => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export default function Scheduled() {

  const { setSelectedSection } = useAppContext();
  const [postList, setPostList] = useState<PostType[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("today");

  // Funzione per eliminare un determinato un post dal DB
  const handleDelete = async (postId: string) => {
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

  // Funzione per caricare i post contentuti nel DB
  const fetchPosts = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.get(`${SERVER_URL}/supabase/retrieve-posts`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (response.status === 200) {
        const listaPost = response.data.posts;
        const formattedPosts = listaPost.map((post: any) => ({
          title: post.title,
          content: JSON.stringify(post.content),
          date: post.date_time,
          community: post.community,
          status: post.status,
          id: post.id,
        }));
        setPostList(formattedPosts);
      }
    } catch (error: any) {
      console.error("CLIENT: Errore durante il caricamento dei dati da DB", error.stack);
      toast.warning("An error occured during the posts loading");
      return;
    }
  }

  // Funzione per filtratre i post in base alla data selezionata
  const filterPosts = (posts: PostType[], filter: string) => {
    const now = new Date();
    return posts.filter((post) => {
      const postDate = new Date(post.date);
      if (filter === "today") {
        return postDate.toDateString() === now.toDateString();
      } else if (filter === "week") {
        return postDate >= now && postDate <= new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      } else if (filter === "month") {
        return postDate >= now && postDate <= new Date(now.setMonth(now.getMonth() + 1));
      } else if (filter === "year") {
        return postDate >= now && postDate <= new Date(now.setFullYear(now.getFullYear() + 1));
      }
      return true;
    });
  }

  useEffect(() => {
    fetchPosts();
  }, [setSelectedSection]);

  const filteredPosts = filterPosts(postList, selectedDate);

  return (
    <div className="flex md:flex-row flex-col md:flex-wrap gap-4 p-3 w-full overflow-scroll">
      <SelectDate
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate} />
      {filteredPosts.length <= 0 ? (
        <div className="flex flex-col justify-center items-center gap-y-3 w-full h-[70svh] text-center">
          <h1>You have no posts scheduled for the selected date</h1>
          <Button
            type="button"
            className="bg-buttonColor hover:bg-buttonHoverColor"
            onClick={() => setSelectedSection("dashboard")}>
            Schedule a post
            <Pencil />
          </Button>
        </div>
      ) : (
        filteredPosts.map((post, index) => (
          <Post
            key={index}
            title={post.title}
            content={post.content}
            date={formatDate(post.date)}
            community={post.community}
            status={post.status}
            onDelete={() => handleDelete(post.id)} />
        ))
      )}
    </div>
  );
}
