// Components
import CardBase from "../custom/CardBase";
import Changelog from "./Changelog";

export default function ChangelogSettings() {
    return (
        <CardBase
            cardTitle='Changelog'
            cardDescription='Updates on platform changes'
            mdWidth="md:w-1/3">
            <div className="w-full flex flex-col gap-y-3 overflow-scroll">
                <Changelog
                    day="1"
                    date="Feb. 2025"
                    title="Launch day 🎉"
                    description="platform is compplete and we are ready to launch" />
            </div>
        </CardBase>
    );
}
