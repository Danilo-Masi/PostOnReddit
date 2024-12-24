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
}

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
          date: formatDate(post.date_time),
        }));
        setPostList(formattedPosts);
      }
    } catch (error) {
      console.error("CLIENT: Errore durante il caricamento dei dati da DB");
      return;
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [setSelectedSection]);

  return (
    <div className="w-full flex flex-col md:flex-row md:flex-wrap gap-4 p-3 overflow-scroll">
      <SelectDate />
      {postList.length <= 0 ? (
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
        postList.map((post, index) => (
          <Post key={index} title={post.title} content={post.content} date={post.date} />
        ))
      )}
    </div>
  );
}
