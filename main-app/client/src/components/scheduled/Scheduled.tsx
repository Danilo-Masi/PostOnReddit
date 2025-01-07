// Components
import { useEffect, useState } from "react";
import Post from "./Post";
import SelectDate from "./SelectDate";
// Shadcnui
import { Button } from "../ui/button";
// Context
import { useAppContext } from "../context/AppContext"
import { Pencil } from "lucide-react";
import axios from "axios";

// Url del server di produzione
const SERVER_URL = 'http://localhost:3000';

type PostType = {
  title: string;
  content: string;
  date: string;
  community: string;
  status: string;
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

  // Funzione per caricare i post contentuti nel DB
  const fetchPosts = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.get(`${SERVER_URL}/retrieve-posts`, {
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
        }));
        setPostList(formattedPosts);
      }
    } catch (error) {
      console.error("CLIENT: Errore durante il caricamento dei dati da DB");
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
    <div className="w-full flex flex-col md:flex-row md:flex-wrap gap-4 p-3 overflow-scroll">
      <SelectDate
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate} />
      {filteredPosts.length <= 0 ? (
        <div className="w-full h-[70svh] flex flex-col gap-y-3 items-center justify-center text-center">
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
            status={post.status} />
        ))
      )}
    </div>
  );
}
