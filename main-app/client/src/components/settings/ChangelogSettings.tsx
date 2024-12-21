// Components
import CardBase from "../custom/CardBase";
import Changelog from "./Changelog";

export default function ChangelogSettings() {
    return (
        <CardBase
            cardTitle='Changelog'
            cardDescription='Updates on platform changes'
            mdWidth="md:w-[40%]">
            <div className="w-full flex flex-col gap-y-3 overflow-scroll">
                <Changelog
                    day="18"
                    date="Dec. 2024"
                    title="Lorem ipsum"
                    description="Lorem ipsum dolor sit amet, ipsum dolor sit amet" />
                <Changelog
                    day="18"
                    date="Dec. 2024"
                    title="Lorem ipsum"
                    description="Lorem ipsum dolor sit amet, ipsum dolor sit amet" />
                <Changelog
                    day="18"
                    date="Dec. 2024"
                    title="Lorem ipsum"
                    description="Lorem ipsum dolor sit amet, ipsum dolor sit amet" />
                <Changelog
                    day="18"
                    date="Dec. 2024"
                    title="Lorem ipsum"
                    description="Lorem ipsum dolor sit amet, ipsum dolor sit amet" />
                <Changelog
                    day="18"
                    date="Dec. 2024"
                    title="Lorem ipsum"
                    description="Lorem ipsum dolor sit amet, ipsum dolor sit amet" />
                <Changelog
                    day="18"
                    date="Dec. 2024"
                    title="Lorem ipsum"
                    description="Lorem ipsum dolor sit amet, ipsum dolor sit amet" />
            </div>
        </CardBase>
    );
}
