import CardBase from "../custom/CardBase";
import Changelog from "./Changelog";

const updates = [
    { day: "17", date: "Feb. 2025", title: "Launch Day 🎉", description: "The platform is now live and ready for use!" },
    { day: "18", date: "Feb. 2025", title: "Bug Fixes 👾", description: "Fixed some bugs and added a new feedback page" },
    { day: "20", date: "Feb. 2025", title: "Best Posting Time 🕒", description: "You can see the best time to post for today or the entire week" },
    { day: "12", date: "Mar. 2025", title: "Post Preview 🧐", description: "Check your post before scheduling" },
    { day: "13", date: "Mar. 2025", title: "Time Format ⏰", description: "Choose your preferred time format" },
    { day: "17", date: "Mar. 2025", title: "1 Month Live 🎉", description: "postonreddit has been live for a month! Thanks for your support" },
    { day: "31", date: "Mar. 2025", title: "Time zone 🌍", description: "View post times in your local time zone or whatever you prefer" }
]

export default function ChangelogSettings() {
    return (
        <CardBase
            cardTitle='Changelog'
            cardDescription='Track updates and changes to the platform'
            mdWidth="md:w-1/3">
            <div className="w-full flex flex-col gap-y-3 overflow-scroll">
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
