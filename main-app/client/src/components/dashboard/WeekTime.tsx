import { WeekTimeCard } from "../custom/TimeCard";

export default function WeekTime() {
    return (
        <div className="w-full h-auto flex flex-col md:flex-row md:flex-wrap gap-4">
            <WeekTimeCard dayOfWeek="Monday" time="03:00 PM" />
            <WeekTimeCard dayOfWeek="Tuesday" time="03:00 PM" />
            <WeekTimeCard dayOfWeek="Wednesday" time="03:00 PM" />
            <WeekTimeCard dayOfWeek="Thursday" time="03:00 PM" />
            <WeekTimeCard dayOfWeek="Friday" time="03:00 PM" />
            <WeekTimeCard dayOfWeek="Saturday" time="03:00 PM" />
            <WeekTimeCard dayOfWeek="Sunday" time="03:00 PM" />
        </div>
    );
}