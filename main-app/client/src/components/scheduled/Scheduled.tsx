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
import { Loader2, Pencil } from "lucide-react";
import { format, toZonedTime } from "date-fns-tz";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

type PostType = {
  title: string;
  content: string;
  date: string;
  community: string;
  status: string;
  id: string;
}

const formatDate = (isoString: string) => {
  const userTimeZone = localStorage.getItem("userTimeZone") || Intl.DateTimeFormat().resolvedOptions().timeZone;
  const is24hFormat = localStorage.getItem("timeFormat") === "24h";

  const date = new Date(isoString);
  const zonedDate = toZonedTime(date, userTimeZone);

  // Formattazione dinamica in base alle preferenze utente
  const timeFormat = is24hFormat ? "HH:mm" : "hh:mm a"; // 24h o 12h AM/PM
  return format(zonedDate, `dd MMMM yyyy, ${timeFormat} zzz`, { timeZone: userTimeZone });
};

export default function Scheduled() {

  const { setSelectedSection, postList, setPostList } = useAppContext();
  const [selectedDate, setSelectedDate] = useState<string>("today");
  const [isLoading, setLoading] = useState<boolean>(false);

  // Funzione per caricare i post contentuti nel DB
  const fetchPosts = async () => {
    setLoading(true);
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
        setLoading(false);
      }
    } catch (error: any) {
      console.error("CLIENT: Errore durante il caricamento dei dati da DB", error.stack);
      toast.warning("An error occured during the posts loading");
      setLoading(false);
      return;
    } finally {
      setLoading(false);
    }
  }

  // Funzione per filtratre i post in base al periodo di tempo selezionato
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
    <div className="w-full h-svh md:h-full flex flex-col gap-10 p-5 rounded-xl bg-zinc-200 dark:bg-zinc-700">
      <SelectDate
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate} />
      {isLoading ?
        <div className="w-full h-auto md:h-[80svh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-zinc-500 animate-spin" />
        </div>
        : filteredPosts.length <= 0 ? (
          <div className="w-full h-full flex flex-col justify-center items-center text-center p-6">
            <h2 className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">
              No scheduled posts
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
              Schedule a post now and keep your audience engaged
            </p>
            <Button
              type="button"
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 dark:bg-orange-600 hover:bg-orange-600 dark:hover:bg-orange-700 text-white rounded-md transition-all"
              onClick={() => setSelectedSection("dashboard")}>
              <Pencil className="w-4 h-4" />
              Schedule a post
            </Button>
          </div>
        ) : (
          <div className="w-full h-full max-h-svh flex flex-col md:flex-row md:flex-wrap justify-start items-start gap-4 overflow-scroll">
            {filteredPosts.map((post, index) => (
              <Post
                key={index}
                title={post.title}
                content={post.content}
                date={formatDate(post.date)}
                community={post.community}
                status={post.status}
                postId={post.id} />
            ))}
          </div>
        )}
    </div>
  );
}
