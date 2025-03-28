import { Dispatch, SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Label } from "../ui/label";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";

interface DateTimePickerProps {
    date: Date;
    setDate: Dispatch<SetStateAction<Date>>;
}

export function DateTimePicker({ date, setDate }: DateTimePickerProps) {
    const [isOpen, setIsOpen] = useState(false);

    const hours = Array.from({ length: 12 }, (_, i) => i + 1);

    const handleDateSelect = (selectedDate: Date | undefined) => {
        if (selectedDate) {
            const utcDate = new Date(Date.UTC(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                selectedDate.getDate(),
                selectedDate.getHours(),
                selectedDate.getMinutes()
            ));
            setDate(utcDate);
        }
    };

    // Funzione per gestire la data e l'orario selezionati
    const handleTimeChange = (type: "hour" | "minute" | "ampm", value: string) => {
        if (date) {
            console.log("Data selezionata: " + date);
            let newDate = new Date(date);
            if (type === "hour") {
                const hourValue = parseInt(value) % 12;
                newDate.setUTCHours((newDate.getUTCHours() >= 12 ? 12 : 0) + hourValue);
            } else if (type === "minute") {
                newDate.setUTCMinutes(parseInt(value));
            } else if (type === "ampm") {
                const currentHours = newDate.getUTCHours();
                if (value === "PM" && currentHours < 12) {
                    newDate.setUTCHours(currentHours + 12);
                } else if (value === "AM" && currentHours >= 12) {
                    newDate.setUTCHours(currentHours - 12);
                }
            }
            newDate.setSeconds(0);
            newDate.setMilliseconds(0);
            console.log("Data convertita: " + newDate);
            setDate(newDate);
        }
    };

    const formatDate = (date: Date) => {
        return format(date, "dd/MM/yyyy hh:mm aa");
    }

    return (
        <div className="w-full flex flex-col gap-y-3">
            <Label className="text-zinc-700 dark:text-zinc-200">Select a date and time</Label>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            "w-full justify-start text-left font-normal dark:bg-zinc-700 dark:hover:bg-zinc-600",
                            !date && "text-muted-foreground"
                        )}>
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {date ? formatDate(date) : formatDate(new Date())}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <div className="sm:flex">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={handleDateSelect}
                            initialFocus
                            disabled={(day) => day < new Date(new Date().setHours(0, 0, 0, 0))}
                            className="dark:bg-zinc-700" />
                        <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x dark:bg-zinc-700">
                            <ScrollArea className="w-64 sm:w-auto">
                                <div className="flex sm:flex-col p-2">
                                    {hours.reverse().map((hour) => (
                                        <Button
                                            key={hour}
                                            size="icon"
                                            variant={date && date.getUTCHours() % 12 === hour % 12 ? "default" : "ghost"}
                                            className="sm:w-full shrink-0 aspect-square"
                                            onClick={() => handleTimeChange("hour", hour.toString())}>
                                            {hour}
                                        </Button>
                                    ))}
                                </div>
                                <ScrollBar orientation="horizontal" className="sm:hidden" />
                            </ScrollArea>
                            <ScrollArea className="w-64 sm:w-auto">
                                <div className="flex sm:flex-col p-2">
                                    {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                                        <Button
                                            key={minute}
                                            size="icon"
                                            variant={
                                                date && date.getUTCMinutes() === minute
                                                    ? "default"
                                                    : "ghost"
                                            }
                                            className="sm:w-full shrink-0 aspect-square"
                                            onClick={() =>
                                                handleTimeChange("minute", minute.toString())
                                            }>
                                            {minute}
                                        </Button>
                                    ))}
                                </div>
                                <ScrollBar orientation="horizontal" className="sm:hidden" />
                            </ScrollArea>
                            <ScrollArea className="">
                                <div className="flex sm:flex-col p-2">
                                    {["AM", "PM"].map((ampm) => (
                                        <Button
                                            key={ampm}
                                            size="icon"
                                            variant={
                                                date &&
                                                    ((ampm === "AM" && date.getUTCHours() < 12) ||
                                                        (ampm === "PM" && date.getUTCHours() >= 12))
                                                    ? "default"
                                                    : "ghost"
                                            }
                                            className="sm:w-full shrink-0 aspect-square"
                                            onClick={() => handleTimeChange("ampm", ampm)}>
                                            {ampm}
                                        </Button>
                                    ))}
                                </div>
                            </ScrollArea>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}