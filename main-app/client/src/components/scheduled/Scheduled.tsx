import { useEffect, useState, useMemo } from "react";
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

const formatDate = (isoString: string) => {
  const userTimeZone = localStorage.getItem("userTimeZone") || Intl.DateTimeFormat().resolvedOptions().timeZone;
  const is12HourFormat = localStorage.getItem("timeFormat") === "12h";
  // Crea la data in UTC senza time zone
  const dateParts = isoString.split(/[-T:.Z]/);
  const date = new Date(Date.UTC(
    parseInt(dateParts[0]), // Anno
    parseInt(dateParts[1]) - 1, // Mese (0-based)
    parseInt(dateParts[2]), // Giorno
    parseInt(dateParts[3]), // Ore
    parseInt(dateParts[4]), // Minuti
    parseInt(dateParts[5]), // Secondi
    parseInt(dateParts[6]) || 0 // Millisecondi (se presenti)
  ));
  // Convertiamo la data UTC nel time zone dell'utente
  const zonedDate = toZonedTime(date, userTimeZone);
  // Convertiamo l'ora secondo il time format dell'utente
  const timeFormat = is12HourFormat ? "hh:mm a" : "HH:mm";
  return format(zonedDate, `dd MMM yyyy, ${timeFormat} zzz`, { timeZone: userTimeZone });
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
      const { data } = await axios.get(`${SERVER_URL}/supabase/retrieve-posts`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      const formattedPosts = data.posts.map((post: any) => ({
        title: post.title,
        content: JSON.stringify(post.content),
        date: post.date_time,
        community: post.community,
        status: post.status,
        id: post.id,
      }));

      setPostList(formattedPosts);
    } catch (error: any) {
      console.error("CLIENT: Errore caricamento dati", error.stack);
      toast.warning("Error loading posts");
    } finally {
      setLoading(false);
    }
  }

  // Funzione per filtratre i post in base al periodo di tempo selezionato
  const filteredPosts = useMemo(() => {
    const now = new Date();
    return postList.filter((post) => {
      const postDate = new Date(post.date);
      switch (selectedDate) {
        case "today":
          return postDate.toDateString() === now.toDateString();
        case "week":
          return postDate >= now && postDate <= new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        case "month":
          return postDate >= now && postDate <= new Date(now.setMonth(now.getMonth() + 1));
        case "year":
          return postDate >= now && postDate <= new Date(now.setFullYear(now.getFullYear() + 1));
        default:
          return true;
      }
    });
  }, [postList, selectedDate]);

  useEffect(() => {
    fetchPosts();
  }, [setSelectedSection]);

  return (
    <div className="w-full h-svh md:h-full flex flex-col gap-10 p-5 rounded-xl bg-zinc-200 dark:bg-zinc-700">
      <SelectDate
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate} />
      {isLoading ? (
        <div className="w-full h-auto md:h-[80svh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-zinc-500 animate-spin" />
        </div>
      ) : filteredPosts.length === 0 ? (
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
        <div className="w-full h-full max-h-svh flex flex-col md:flex-row md:flex-wrap justify-start items-start gap-4 overflow-auto">
          {filteredPosts.map((post) => (
            <Post
              key={post.id}
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
