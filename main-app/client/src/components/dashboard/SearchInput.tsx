// React
import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
// Axios
import axios, { AxiosError } from "axios";
// Debounce (per ritardare la richiesta)
import debounce from 'debounce';
// Shadncui
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverTrigger } from "../ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Label } from "../ui/label";
// Icons
import { ChevronsUpDown } from "lucide-react";

// Url del server di produzione
const SERVER_URL = 'http://localhost:3000';

interface SearchInputProps {
    communityValue: string;
    setCommunityValue: Dispatch<SetStateAction<string>>;
}

export default function SearchInput({ communityValue, setCommunityValue }: SearchInputProps) {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    // AbortController per annullare richieste obsolete
    const abortControllerRef = useRef<AbortController | null>(null);

    // Funzione di ricerca
    const handleSearch = async (searchTerm: string) => {
        setQuery(searchTerm);

        if (searchTerm.trim().length < 2 || searchTerm.length > 100) {
            setResults([]);
            return;
        }

        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();

        setLoading(true);

        try {
            const response = await axios.get(`${SERVER_URL}/api/search-subreddits`, {
                params: { q: searchTerm },
                signal: abortControllerRef.current.signal,
                timeout: 5000,
                headers: { 'Content-Type': 'application/json' }
            });

            const subredditNames = response.data.subreddits || [];
            setResults(subredditNames);

            if (subredditNames.length === 0) {
                toast.info("No subreddit found");
            }

        } catch (error: any) {
            if (axios.isCancel(error)) {
                console.warn("CLIENT: Richiesta annullata");
            } else if (error instanceof AxiosError) {
                if (error.response?.status === 400) {
                    toast.error("The query isn't valid");
                } else if (error.response?.status === 502) {
                    toast.error("Error to get subreddit. Please try again later");
                } else {
                    toast.error("An error occurred. Please try again later");
                }
                console.error("CLIENT: Errore di Axios: ", error.stack);
            } else {
                console.error("CLIENT: Errore sconosciuto: ", error.stack);
                toast.error("An unexpected error occured. Please try again later");
            }
        } finally {
            setLoading(false);
        }
    };

    // Funzione che utilizza debounde per ritardare la chiamata di 300ms
    const debounceSearch = useCallback(debounce(handleSearch, 300), []);

    const handleSelectCommunity = (community: string) => {
        setCommunityValue(community);
        setOpen(false);
        setQuery("");
        setResults([]);
    }

    return (
        <div className="w-full md:w-[calc(50%-0.5rem)] flex flex-col gap-y-3">
            <Label>
                Select a subreddit
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between border-elevation3 bg-background">
                        {communityValue
                            ? <p className="font-medium text-sm text-textPrimary">{communityValue}</p>
                            : <p className="font-medium text-sm text-textSecondary">Select a community</p>}
                        <ChevronsUpDown className="opacity-50 ml-2 w-4 h-4 shrink-0" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="z-50">
                    <Command className="w-[250px] border-elevation3 bg-white shadow-elevation3 shadow-md mt-1 border">
                        {/* Input di ricerca */}
                        <CommandInput
                            placeholder="Search for communities..."
                            value={query}
                            onValueChange={(value) => debounceSearch(value)} />
                        <CommandList>
                            {/* Mostra un indicatore di caricamento */}
                            {loading && <CommandEmpty>Loading...</CommandEmpty>}
                            {/* Mostra i risultati della ricerca */}
                            {results.length > 0 && (
                                <CommandGroup heading="Suggestions">
                                    {results.map((subreddit, index) => (
                                        <CommandItem
                                            key={index}
                                            onSelect={() => handleSelectCommunity(subreddit)}>
                                            {subreddit}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            )}
                            {/* Mostra un indicatore quando non ci sono risulatati */}
                            {!loading && results.length === 0 && query.length >= 2 && (
                                <CommandEmpty>No results found.</CommandEmpty>
                            )}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover >
        </div>
    );
}