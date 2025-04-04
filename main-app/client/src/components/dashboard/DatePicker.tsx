import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "../ui/label";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns-tz";
import { useAppContext } from "../context/AppContext";

export function DatePicker() {
    const [isOpen, setIsOpen] = useState(false);
    const { dateTime, setDateTime } = useAppContext();

    const handleDateSelect = (selectedDate: Date | undefined) => {
        if (selectedDate) {
            setDateTime(new Date(selectedDate.setHours(0, 0, 0, 0)));
        }
    };

    const formatDate = (date: Date) => {
        const userTimeZone = localStorage.getItem("userTimeZone") || Intl.DateTimeFormat().resolvedOptions().timeZone;
        return format(date, "dd/MM/yyyy", { timeZone: userTimeZone });
    };

    return (
        <div className="w-full md:w-[calc(50%-0.75rem)] flex flex-col gap-y-3">
            <Label className="text-zinc-700 dark:text-zinc-200">Select a date</Label>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            "w-full justify-start text-left font-normal dark:bg-zinc-700 dark:hover:bg-zinc-600",
                            !dateTime && "text-muted-foreground"
                        )}>
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {dateTime ? formatDate(dateTime) : "Select date"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={dateTime ?? new Date()}
                        onSelect={handleDateSelect}
                        initialFocus
                        disabled={(day) => day < new Date(new Date().setHours(0, 0, 0, 0))}
                        className="dark:bg-zinc-700" />
                </PopoverContent>
            </Popover>
        </div>
    );
} 