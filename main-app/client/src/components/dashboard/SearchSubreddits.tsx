import { Dispatch, SetStateAction, useCallback, useState, useMemo, useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverTrigger } from "../ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, Loader2 } from "lucide-react";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

interface SearchSubredditsProps {
    communityValue: string;
    setCommunityValue: Dispatch<SetStateAction<string>>;
    error?: string;
}

export default function SearchSubreddits({ communityValue, setCommunityValue, error }: SearchSubredditsProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [hasFixed, setHasFixed] = useState(false);

    const showError = error && !hasFixed;
    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        if (showError) {
            toast.error(error);
        }
    }, [showError, error]);

    const handleSearch = useCallback(async (searchTerm: string) => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            toast.error("User without permissions");
            navigate("/login");
            return;
        }

        setQuery(searchTerm);
        if (searchTerm.trim().length < 2 || searchTerm.length > 100) {
            setResults([]);
            return;
        }

        try {
            setLoading(true);
            const response = await axios.get(`${SERVER_URL}/api/search-subreddits`, {
                params: { q: searchTerm },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const subredditNames = response?.data?.subreddits || [];
            setResults(subredditNames);

            if (subredditNames.length === 0) {
                toast.info("No subreddit found");
            }
        } catch (error: any) {
            if (axios.isCancel(error)) {
                console.warn("Request cancelled");
            } else if (error instanceof AxiosError) {
                if (error.response?.status === 400) {
                    toast.error("The query isn't valid");
                } else if (error.response?.status === 502) {
                    toast.error("Error retrieving subreddit. Please try again later");
                } else {
                    toast.warning("You need to grant permission to access Reddit before proceeding.");
                }
                console.error("Axios error: ", error.stack);
            } else {
                toast.error("An unexpected error occurred. Please try again later");
                console.error("Unknown error: ", error.stack);
            }
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    const onSearchChange = useCallback((value: string) => {
        setQuery(value);
        handleSearch(value);
    }, [handleSearch]);

    const handleSelectCommunity = useCallback((community: string) => {
        setCommunityValue(community);
        setOpen(false);
        setQuery("");
        setResults([]);
        setHasFixed(true);
    }, [setCommunityValue]);

    const commandContent = useMemo(() => (
        <Command className="w-[250px] border-elevation3 shadow-elevation3 shadow-md mt-1 border dark:bg-zinc-700 dark:hover:bg-zinc-600">
            <CommandInput placeholder="Search for communities..." value={query} onValueChange={onSearchChange} />
            <CommandList>
                {loading && (
                    <CommandEmpty className="flex items-center justify-center">
                        <Loader2 className="animate-spin" />
                    </CommandEmpty>
                )}
                {results.length > 0 && (
                    <CommandGroup heading="Suggestions">
                        {results.map((subreddit, index) => (
                            <CommandItem key={index} onSelect={() => handleSelectCommunity(subreddit)}>
                                {subreddit}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}
                {!loading && results.length === 0 && query.length >= 2 && (
                    <CommandEmpty>No results found.</CommandEmpty>
                )}
            </CommandList>
        </Command>
    ), [loading, results, query, onSearchChange, handleSelectCommunity]);

    return (
        <div className="w-full md:w-[calc(50%-0.5rem)] flex flex-col gap-y-3">
            <Label className={cn(
                "text-zinc-700 dark:text-zinc-200",
                showError && "text-red-500 dark:text-red-400"
            )}>
                Select a subreddit
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn(
                            "w-full justify-between dark:bg-zinc-700 dark:hover:bg-zinc-600",
                            showError && "border-red-500 dark:border-red-400"
                        )}>
                        {communityValue ? (
                            <p className="font-medium text-sm text-textPrimary">{communityValue}</p>
                        ) : (
                            <p className="font-medium text-sm text-textSecondary">Select a community</p>
                        )}
                        <ChevronsUpDown className="opacity-50 ml-2 w-4 h-4 shrink-0" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="z-50">
                    {commandContent}
                </PopoverContent>
            </Popover>
        </div>
    );
}