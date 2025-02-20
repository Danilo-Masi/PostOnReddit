// Components
import CardBase from "../custom/CardBase";
import Changelog from "./Changelog";

export default function ChangelogSettings() {
    return (
        <CardBase
            cardTitle='Changelog'
            cardDescription='Track updates and changes to the platform'
            mdWidth="md:w-1/3">
            <div className="w-full flex flex-col gap-y-3 overflow-scroll">
                <Changelog
                    day="20"
                    date="Feb. 2025"
                    title="Best Posting Time 🕒"
                    description="Now you can see the best time to post on subreddits!"/>
                <Changelog
                    day="18"
                    date="Feb. 2025"
                    title="Bug Fixes 👾"
                    description="Fixed some bugs on the dashboard and added a new feedback page" />
                <Changelog
                    day="17"
                    date="Feb. 2025"
                    title="Launch Day 🎉"
                    description="The platform is now live and ready for use!" />
            </div>
        </CardBase>
    );
}
