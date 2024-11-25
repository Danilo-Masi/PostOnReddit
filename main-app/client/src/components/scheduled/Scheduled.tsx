// Components
import { useState } from "react";
import Post from "./Post";
import SelectDate from "./SelectDate";
// Shadcnui
import { Button } from "../ui/button";
// Context
import { useAppContext } from "../context/AppContext"
import { Pencil } from "lucide-react";

type PostType = {
  title: string;
  content: string;
  date: string;
}

export default function Scheduled() {

  const { setSelectedSection } = useAppContext();
  const [postList, setPostList] = useState<PostType[]>([]);

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
