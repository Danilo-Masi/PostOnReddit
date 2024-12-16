// Utils
import { cn } from "@/lib/utils"
import { format } from "date-fns"
// Shadcnui
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from '../ui/label';
// Icons
import { Calendar as CalendarIcon } from "lucide-react"
import { Dispatch, SetStateAction } from "react"

type DataPickerProps = {
    date: Date;
    setDateValue: Dispatch<SetStateAction<Date>>;
}

export default function DataPicker({ date, setDateValue }: DataPickerProps) {

    return (
        <div className='w-full flex flex-col gap-y-2'>
            <Label>Select the date</Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(selectedDate: any) => setDateValue(selectedDate)}
                        initialFocus />
                </PopoverContent>
            </Popover>
        </div>
    )
}
