import { Dispatch, SetStateAction } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface SelectDateProps {
  selectedDate: string;
  setSelectedDate: Dispatch<SetStateAction<string>>;
}

const times = [
  { value: "today", text: "Today" },
  { value: "week", text: "Next 7 days" },
  { value: "month", text: "Next 30 days" },
  { value: "year", text: "Next 365 days" },
];

export default function SelectDate({ selectedDate, setSelectedDate }: SelectDateProps) {
  return (
      <Select
        value={selectedDate}
        onValueChange={(value) => setSelectedDate(value)}>
        <SelectTrigger className="w-full md:w-[180px] bg-zinc-100 dark:bg-zinc-800">
          <SelectValue placeholder="Select period" />
        </SelectTrigger>
        <SelectContent className="bg-zinc-100 dark:bg-zinc-800">
          {times.map((item, index) => (
            <SelectItem
              key={index}
              value={item.value}
              className={`cursor-pointer ${selectedDate === item.value ? "font-bold text-gray-900 dark:text-gray-100" : "text-gray-600 dark:text-gray-400"}`}>
              {item.text}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
  );
}
