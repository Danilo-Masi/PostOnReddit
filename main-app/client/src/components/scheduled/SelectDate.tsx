// Shadcui
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function SelectDate() {
  return (
    <div className="w-full">
      <Select>
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
  )
}
