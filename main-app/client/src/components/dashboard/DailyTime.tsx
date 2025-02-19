import { DailyTimeCard } from "../custom/TimeCard"


export default function DailyTime() {
    return (
        <div className="w-full h-auto flex flex-col md:flex-row md:flex-wrap gap-4">
            <DailyTimeCard place="1th place" time="03:00 AM" />
            <DailyTimeCard place="2th place" time="03:00 AM" />
            <DailyTimeCard place="3th place" time="03:00 AM" />
            <DailyTimeCard place="4th place" time="03:00 AM" />
        </div>
    );
}
