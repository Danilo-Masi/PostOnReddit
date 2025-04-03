import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "../ui/label";
import { Clock } from "lucide-react";
import { format } from "date-fns-tz";
import { useAppContext } from "../context/AppContext";

export function TimePicker() {
    const [isOpen, setIsOpen] = useState(false);
    const { dateTime, setDateTime } = useAppContext();
    const timeFormat = localStorage.getItem("timeFormat") || "12h";

    useEffect(() => {
        if (!dateTime) {
            const userTimeZone = localStorage.getItem("userTimeZone") || Intl.DateTimeFormat().resolvedOptions().timeZone;
            const now = new Date();
            const localDate = new Date(now.toLocaleString("en-US", { timeZone: userTimeZone }));
            setDateTime(localDate);
        }
    }, [dateTime, setDateTime]);

    const timeOptions = useMemo(() => {
        const options = [];
        const is12Hour = timeFormat === "12h";
        const interval = 30;

        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += interval) {
                const date = new Date();
                date.setHours(hour, minute, 0, 0);
                
                let displayTime;
                if (is12Hour) {
                    const period = hour < 12 ? "AM" : "PM";
                    const displayHour = hour % 12 || 12;
                    displayTime = `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
                } else {
                    displayTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                }

                options.push({
                    value: `${hour}:${minute}`,
                    display: displayTime,
                    date: new Date(date)
                });
            }
        }
        return options;
    }, [timeFormat]);

    const handleTimeSelect = (selectedTime: { value: string; date: Date }) => {
        if (!dateTime) return;
        
        const [hours, minutes] = selectedTime.value.split(':').map(Number);
        const newDate = new Date(dateTime);
        newDate.setHours(hours, minutes, 0, 0);
        setDateTime(newDate);
    };

    const formatTime = (date: Date) => {
        const userTimeZone = localStorage.getItem("userTimeZone") || Intl.DateTimeFormat().resolvedOptions().timeZone;
        return format(date, timeFormat === "12h" ? "hh:mm aa" : "HH:mm", { timeZone: userTimeZone });
    };

    return (
        <div className="w-full md:w-[calc(50%-0.75rem)] flex flex-col gap-y-3">
            <Label className="text-zinc-700 dark:text-zinc-200">Select a time</Label>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            "w-full justify-start text-left font-normal dark:bg-zinc-700 dark:hover:bg-zinc-600",
                            !dateTime && "text-muted-foreground"
                        )}>
                        <Clock className="mr-2 h-4 w-4" />
                        {dateTime ? formatTime(dateTime) : "Select time"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <ScrollArea className="h-[300px] w-[200px]">
                        <div className="flex flex-col p-2">
                            {timeOptions.map((time) => (
                                <Button
                                    key={time.value}
                                    variant={dateTime && 
                                        dateTime.getHours() === time.date.getHours() && 
                                        dateTime.getMinutes() === time.date.getMinutes() 
                                        ? "default" 
                                        : "ghost"}
                                    className="justify-start font-normal px-4"
                                    onClick={() => handleTimeSelect(time)}>
                                    {time.display}
                                </Button>
                            ))}
                        </div>
                    </ScrollArea>
                </PopoverContent>
            </Popover>
        </div>
    );
} 