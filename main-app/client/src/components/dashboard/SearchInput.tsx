// React
import { Dispatch, SetStateAction, useCallback, useState } from "react";
// Axios
import axios from "axios";
// Debounce (per ritardare la richiesta)
import debounce from 'debounce';
// Shadncui
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverTrigger } from "../ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { Button } from "../ui/button";
// Icons
import { ChevronsUpDown } from "lucide-react";

// Url del server di produzione
const SERVER_URL = 'http://localhost:3000';

export default function SearchInput({ communityValue, setCommunityValue }: { communityValue: string, setCommunityValue: Dispatch<SetStateAction<string>> }) {

    // Stato per la query dell'utente
    const [query, setQuery] = useState("");
    // Stato per i risultati
    const [results, setResults] = useState<string[]>([]);
    // Stato di caricamento
    const [loading, setLoading] = useState(false);
    // Stato per gestire il popup aperto
    const [open, setOpen] = useState(false);

    const handleSearch = async (searchTerm: string) => {
        // Aggiorna la query
        setQuery(searchTerm);
        // Mostra risultati solo se la query ha almeno 2 caratteri
        if (searchTerm.length < 2) {
            setResults([]);
            return;
        }
        setLoading(true);
        try {
            // Chiamata al backend per cercare subreddit
            const response = await axios.get(`${SERVER_URL}/api/search-subreddits?q=${searchTerm}`);
            // Aggiorna i risulatiti con i nomi dei subreddit
            const subredditNames = response.data.subreddits || [];
            // Aggiorna i risultati
            setResults(subredditNames);
        } catch (error: any) {
            console.error("Errore durante la ricerca:", error.message);
        } finally {
            setLoading(false);
        }
    };

    // Funzione che utilizza debounde per ritardare la chiamata
    const debounceSearch = useCallback(debounce(handleSearch, 200), []);

    const handleSelectCommunity = (community: string) => {
        setCommunityValue(community);
        setOpen(false);
        setQuery("");
        setResults([]);
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between border-elevation3 bg-background w-full">
                    {communityValue
                        ? <p className="font-medium text-sm text-textPrimary">{communityValue}</p>
                        : <p className="font-medium text-sm text-textSecondary">Select a community</p>}
                    <ChevronsUpDown className="opacity-50 ml-2 w-4 h-4 shrink-0" />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Command className="z-50 border-elevation3 bg-white shadow-elevation3 shadow-md mt-1 border w-full">
                    {/* Input di ricerca */}
                    <CommandInput
                        placeholder="Search for communities..."
                        value={query}
                        onValueChange={(value) => debounceSearch(value)}
                    />
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
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover >
    );
}