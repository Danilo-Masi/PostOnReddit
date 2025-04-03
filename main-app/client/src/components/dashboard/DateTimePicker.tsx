import { DatePicker } from "./DatePicker";
import { TimePicker } from "./TimePicker";

export function DateTimePicker() {
    return (
        <div className="w-full flex flex-wrap gap-6">
            <DatePicker />
            <TimePicker />
        </div>
    );
}