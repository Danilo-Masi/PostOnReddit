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
                    day="9"
                    date="Feb. 2025"
                    title="Launch Day 🎉"
                    description="The platform is now live and ready for use!" />
            </div>
        </CardBase>
    );
}
