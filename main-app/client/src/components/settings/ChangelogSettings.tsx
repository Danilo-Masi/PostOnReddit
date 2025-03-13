import CardBase from "../custom/CardBase";
import Changelog from "./Changelog";

const updates = [
    { day: "17", date: "Feb. 2025", title: "Launch Day 🎉", description: "The platform is now live and ready for use!" },
    { day: "18", date: "Feb. 2025", title: "Bug Fixes 👾", description: "Fixed some bugs on the dashboard and added a new feedback page" },
    { day: "20", date: "Feb. 2025", title: "Best Posting Time 🕒", description: "Now you can see the best time to post on subreddits!" },
    { day: "12", date: "Mar. 2025", title: "Post Preview 🧐", description: "Check your post before scheduling" },
    { day: "13", date: "Mar. 2025", title: "Time Format ⏰", description: "Choose your preferred time format" }
]

export default function ChangelogSettings() {
    return (
        <CardBase
            cardTitle='Changelog'
            cardDescription='Track updates and changes to the platform'
            mdWidth="md:w-1/3">
            <div className="w-full h-auto max-h-[80svh] flex flex-col gap-y-3 overflow-scroll">
                {updates && updates.slice().reverse().map((item, index) => (
                    <Changelog
                        key={index}
                        day={item.day}
                        date={item.date}
                        title={item.title}
                        description={item.description} />
                ))}
            </div>
        </CardBase>
    );
}
