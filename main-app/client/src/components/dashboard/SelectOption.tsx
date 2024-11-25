// React
import { Dispatch, SetStateAction } from "react";
// Shadcui
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

type SelectOptionProps = {
    placeholder: string;
    selectLabel: string;
    options: string[];
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
}

export default function SelectOption({ placeholder, selectLabel, options, value, setValue }: SelectOptionProps) {
    return (
        <Select value={value} onValueChange={(val) => setValue(val)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{selectLabel}</SelectLabel>
                    {options.map((option, index) => (
                        <SelectItem
                            key={index}
                            value={option}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
