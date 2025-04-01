import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "../ui/label"
import { useAppContext } from "@/context/AppContext"

const subreddits = [
    {
        value: "SaaS",
        label: "r/SaaS",
    },
    {
        value: "Entrepreneur",
        label: "r/Entrepreneur",
    },
    {
        value: "EntrepreneurRideAlong",
        label: "r/EntrepreneurRideAlong",
    },
    {
        value: "SideProject",
        label: "r/SideProject",
    },
    {
        value: "buildinpublic",
        label: "r/buildinpublic",
    },
]

export function DemoCombobox() {
    const [open, setOpen] = useState(false);
    const { subreddit, setSubreddit } = useAppContext();

    return (
        <div className="w-full md:w-[calc(50%-0.75rem)] flex flex-col gap-3">
            <Label>Select a subreddit</Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between">
                        {subreddit
                            ? subreddits.find((framework) => framework.value === subreddit)?.label
                            : "Select subreddit..."}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[240px] p-0">
                    <Command>
                        <CommandInput placeholder="Search framework..." className="h-9" />
                        <CommandList>
                            <CommandEmpty>No subreddit found.</CommandEmpty>
                            <CommandGroup>
                                {subreddits.map((framework) => (
                                    <CommandItem
                                        key={framework.value}
                                        value={framework.value}
                                        onSelect={(currentValue) => {
                                            setSubreddit(currentValue === subreddit ? "" : currentValue)
                                            setOpen(false)
                                        }}>
                                        {framework.label}
                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                subreddit === framework.value ? "opacity-100" : "opacity-0"
                                            )} />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
