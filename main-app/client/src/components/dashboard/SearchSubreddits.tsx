// React
import { Dispatch, SetStateAction, useCallback, useState } from "react";
// React-router
import { NavigateFunction, useNavigate } from "react-router-dom";
// Axios
import axios, { AxiosError } from "axios";
// Shadcn/ui
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverTrigger } from "../ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Label } from "../ui/label";
// Icons
import { ChevronsUpDown, Loader2 } from "lucide-react";

// Url del server
const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

interface SearchInputProps {
    communityValue: string;
    setCommunityValue: Dispatch<SetStateAction<string>>;
}

export default function SearchSubreddits({ communityValue, setCommunityValue }: SearchInputProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const navigate: NavigateFunction = useNavigate();

    // Funzione per ricercare i subreddit
    const handleSearch = async (searchTerm: string) => {
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
    };

    // Funzione per gestire l'input dell'utente
    const onSearchChange = useCallback((value: string) => {
        setQuery(value);
        handleSearch(value);
    }, []);

    // Funzione per selezionare una community tra quelle disponibili
    const handleSelectCommunity = (community: string) => {
        setCommunityValue(community);
        setOpen(false);
        setQuery("");
        setResults([]);
    };

    return (
        <div className="w-full md:w-[calc(50%-0.5rem)] flex flex-col gap-y-3">
            <Label className="text-zinc-700 dark:text-zinc-200">Select a subreddit</Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between dark:bg-zinc-700 dark:hover:bg-zinc-600">
                        {communityValue ? (
                            <p className="font-medium text-sm text-textPrimary">{communityValue}</p>
                        ) : (
                            <p className="font-medium text-sm text-textSecondary">Select a community</p>
                        )}
                        <ChevronsUpDown className="opacity-50 ml-2 w-4 h-4 shrink-0" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="z-50">
                    <Command className="w-[250px] border-elevation3 shadow-elevation3 shadow-md mt-1 border dark:bg-zinc-700 dark:hover:bg-zinc-600">
                        {/* Input di ricerca */}
                        <CommandInput placeholder="Search for communities..." value={query} onValueChange={onSearchChange} />
                        <CommandList>
                            {/* Mostra un indicatore di caricamento */}
                            {loading && <CommandEmpty className="flex items-center justify-center"><Loader2 className="animate-spin"/></CommandEmpty>}
                            {/* Mostra i risultati della ricerca */}
                            {results.length > 0 && (
                                <CommandGroup heading="Suggestions">
                                    {results.map((subreddit, index) => (
                                        <CommandItem key={index} onSelect={() => handleSelectCommunity(subreddit)}>
                                            {subreddit}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            )}
                            {/* Mostra un indicatore quando non ci sono risultati */}
                            {!loading && results.length === 0 && query.length >= 2 && (
                                <CommandEmpty>No results found.</CommandEmpty>
                            )}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}