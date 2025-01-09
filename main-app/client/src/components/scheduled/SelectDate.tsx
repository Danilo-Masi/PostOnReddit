// React
import { Dispatch, SetStateAction } from "react";
// Shadcnui
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface SelectDateProps {
  selectedDate: string;
  setSelectedDate: Dispatch<SetStateAction<string>>;
}

export default function SelectDate({ selectedDate, setSelectedDate }: SelectDateProps) {

  return (
    <div className="w-full">
      <Select
        value={selectedDate}
        onValueChange={(value) => setSelectedDate(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="week">Next 7 days</SelectItem>
          <SelectItem value="month">Next 30 days</SelectItem>
          <SelectItem value="year">Next 365 days</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
