import Post from "./Post";
import SelectDate from "./SelectDate";


export default function Scheduled() {
  return (
    <div className="w-full flex flex-col md:flex-row flex-wrap gap-4 p-3 overflow-scroll">
      <SelectDate />
      <Post
        title="If not now, when?"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies molestie metus nec ullamcorper. Donec non ipsum dui. Donec volutpat."
        date="21/12/2024" />
      <Post
        title="Be fucking honest"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies molestie metus nec ullamcorper. Donec non ipsum dui. Donec volutpat."
        date="19/12/2024" />
      <Post
        title="I made a dumb mistake"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies molestie metus nec ullamcorper. Donec non ipsum dui. Donec volutpat."
        date="15/12/2024" />
    </div>
  );
}
