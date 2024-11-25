// React
import { useRef, useState } from "react";
// time-picker
import { TimePickerInput } from "./time-picker-input";
import { TimePeriodSelect } from "./period-select";
import { Period } from "./time-picker-utils";
// Shadcui
import { Label } from "@/components/ui/label";

interface TimePickerDemoProps {
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
}

export function TimePicker({ date, setDate }: TimePickerDemoProps) {
    const [period, setPeriod] = useState<Period>("PM");

    const minuteRef = useRef<HTMLInputElement>(null);
    const hourRef = useRef<HTMLInputElement>(null);
    const secondRef = useRef<HTMLInputElement>(null);
    const periodRef = useRef<HTMLButtonElement>(null);

    return (
        <div className="flex items-start gap-2">
            <div className="grid gap-2 text-center">
                <Label htmlFor="hours" className="text-xs">
                    Hours
                </Label>
                <TimePickerInput
                    picker="12hours"
                    period={period}
                    date={date}
                    setDate={setDate}
                    ref={hourRef}
                    onRightFocus={() => minuteRef.current?.focus()}
                />
            </div>
            <div className="grid gap-2 text-center">
                <Label htmlFor="minutes" className="text-xs">
                    Minutes
                </Label>
                <TimePickerInput
                    picker="minutes"
                    id="minutes12"
                    date={date}
                    setDate={setDate}
                    ref={minuteRef}
                    onLeftFocus={() => hourRef.current?.focus()}
                    onRightFocus={() => secondRef.current?.focus()}
                />
            </div>
            <div className="grid gap-1 text-center">
                <Label htmlFor="period" className="text-xs">
                    Period
                </Label>
                <TimePeriodSelect
                    period={period}
                    setPeriod={setPeriod}
                    date={date}
                    setDate={setDate}
                    ref={periodRef}
                    onLeftFocus={() => secondRef.current?.focus()}
                />
            </div>
        </div>
    );
}