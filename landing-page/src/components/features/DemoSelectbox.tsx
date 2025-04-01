import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "../ui/label";
import { useAppContext } from "@/context/AppContext";

const flairMap: Record<string, { value: string; label: string }[]> = {
    SaaS: [
        { value: "NoFlair", label: "No Flair" },
        { value: "B2BSaaS", label: "B2B SaaS" },
        { value: "B2CSaaS", label: "B2C SaaS" },
        { value: "BuildInPublic", label: "Build in public" }
    ],
    Entrepreneur: [
        { value: "CaseStudy", label: "Case Study" },
        { value: "AMA", label: "AMA" },
        { value: "StartupHelp", label: "Startup Help" },
        { value: "Tools", label: "Tools" },
        { value: "HowDoI", label: "How Do I?" },
        { value: "InvestorWanted", label: "Investor Wanted" },
        { value: "Operations", label: "Operations" },
        { value: "Other", label: "Other" },
        { value: "InternshipOffers", label: "Internship Offers" },
        { value: "Recommendations", label: "Recommendations" },
        { value: "BestPractices", label: "Best Practices" },
        { value: "YoungEntrepreneur", label: "Young Entrepreneur" },
        { value: "HowToGrow", label: "How to Grow" },
        { value: "LessonsLearned", label: "Lessons Learned" },
        { value: "FeedbackPlease", label: "Feedback Please" }
    ],
    EntrepreneurRideAlong: [
        { value: "IdeaValidation", label: "Idea Validation" },
        { value: "SeekingAdvice", label: "Seeking Advice" },
        { value: "RideAlongStory", label: "Ride Along Story" },
        { value: "Other", label: "Other" }
    ],
    SideProject: [
        { value: "NoFlair", label: "No Flair" }
    ],
    buildinpublic: [
        { value: "NoFlair", label: "No Flair" }
    ]
};

export function DemoSelectbox() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const { subreddit } = useAppContext();

    const availableFlair = flairMap[subreddit] || [];

    return (
        <div className="w-full md:w-[calc(50%-0.75rem)] flex flex-col gap-3">
            <Label>Select a flair</Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between">
                        {value
                            ? availableFlair.find((flair) => flair.value === value)?.label
                            : "Select flair..."}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[240px] p-0">
                    <Command>
                        <CommandList>
                            <CommandEmpty>No flair found</CommandEmpty>
                            <CommandGroup>
                                {availableFlair.map((flair) => (
                                    <CommandItem
                                        key={flair.value}
                                        value={flair.value}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue);
                                            setOpen(false);
                                        }}>
                                        {flair.label}
                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                value === flair.value ? "opacity-100" : "opacity-0"
                                            )} />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}