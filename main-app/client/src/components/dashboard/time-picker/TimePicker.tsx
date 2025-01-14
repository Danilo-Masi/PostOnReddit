// React
import { useEffect, useRef, useState } from "react";
// time-picker
import { TimePickerInput } from "./time-picker-input";
import { TimePeriodSelect } from "./period-select";
import { Period } from "./time-picker-utils";
// Shadcnui
import { Label } from "@/components/ui/label";

interface TimePickerDemoProps {
    date: Date | undefined;
    setDate: any;
    minTime?: Date;
}

export function TimePicker({ date, setDate, minTime }: TimePickerDemoProps) {
    const [period, setPeriod] = useState<Period>("PM");

    const minuteRef = useRef<HTMLInputElement>(null);
    const hourRef = useRef<HTMLInputElement>(null);

    // Sincronizza il periodo (AM/PM) con la data
    useEffect(() => {
        if (date) {
            const hours = date.getHours();
            setPeriod(hours >= 12 ? "PM" : "AM");
        }
    }, [date]);

    const handleTimeChange = (hours: number, minutes: number) => {
        if (!date) return;

        const newDate = new Date(date);
        newDate.setHours(period === "PM" ? hours + 12 : hours);
        newDate.setMinutes(minutes);

        // Validazione rispetto a minTime
        if (minTime && newDate < minTime) {
            return;
        }
        setDate(newDate);
    }

    return (
        <div className="w-full md:w-[calc(50%-0.5rem)] flex flex-col gap-y-3">
            <Label>
                Select the time
            </Label>
            <div className="w-full flex gap-3">
                <div className="grid gap-2 text-center">
                    <TimePickerInput
                        picker="12hours"
                        period={period}
                        date={date}
                        setDate={setDate}
                        ref={hourRef}
                        onRightFocus={() => minuteRef.current?.focus()}
                        onChange={(value: any) => handleTimeChange(parseInt(value, 10), date?.getMinutes() || 0)}
                    />
                </div>
                <div className="grid gap-2 text-center">
                    <TimePickerInput
                        picker="minutes"
                        id="minutes12"
                        date={date}
                        setDate={setDate}
                        ref={minuteRef}
                        onLeftFocus={() => hourRef.current?.focus()}
                        onRightFocus={() => hourRef.current?.focus()}
                        onChange={(value: any) => handleTimeChange(date?.getHours() || 0, parseInt(value, 10))}
                    />
                </div>
                <div className="grid gap-1 text-center">
                    <TimePeriodSelect
                        period={period}
                        setPeriod={(newPeriod) => {
                            setPeriod(newPeriod);
                            if (date) {
                                handleTimeChange(date.getHours(), date.getMinutes());
                            }
                        }}
                        date={date}
                        setDate={setDate}
                    />
                </div>
            </div>
        </div>
    );
}