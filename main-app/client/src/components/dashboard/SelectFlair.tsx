import { Dispatch, SetStateAction, useEffect, useState, useCallback, useMemo } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import axios from "axios";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Loader2 } from "lucide-react";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

interface FlairOption {
    id: string;
    text: string;
}

interface SelectFlairProps {
    subreddit: string;
    isDisabled: boolean;
    placeholder: string;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
}

export default function SelectFlair({ subreddit, isDisabled, placeholder, value, setValue }: SelectFlairProps) {
    const navigate: NavigateFunction = useNavigate();
    const [options, setOptions] = useState<FlairOption[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchFlairs = useCallback(async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            toast.error("User without permissions");
            navigate('/login');
            return;
        }

        if (subreddit.trim().length < 2) {
            setOptions([]);
            setError(null);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${SERVER_URL}/api/search-flair`, {
                params: { q: subreddit },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            const flair = response.data.flair || [];
            setOptions(flair);

            if (flair.length === 0) {
                setError("No flairs available for this subreddit");
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "An error occurred. Please try again later";
            setError(errorMessage);
            toast.warning(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [subreddit, navigate]);

    useEffect(() => {
        setOptions([]);
        setError(null);
        fetchFlairs();
    }, [subreddit, fetchFlairs]);

    const handleValueChange = useCallback((val: string) => {
        setValue(val);
        setError(null);
    }, [setValue]);

    const renderSelectContent = useMemo(() => {
        if (loading) {
            return (
                <SelectItem disabled value="loading">
                    <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Loading flairs...</span>
                    </div>
                </SelectItem>
            );
        }

        if (error) {
            return (
                <SelectItem disabled value="error">
                    {error}
                </SelectItem>
            );
        }

        if (options.length === 0 && subreddit.trim().length >= 2) {
            return (
                <SelectItem disabled value="no-flairs">
                    No flairs found
                </SelectItem>
            );
        }

        return options.map((option) => (
            <SelectItem
                key={option.id}
                value={option.id}
                aria-label={`flair-${option.text}`}
            >
                {option.text}
            </SelectItem>
        ));
    }, [loading, error, options, subreddit]);

    return (
        <div className="w-full md:w-[calc(50%-0.5rem)] flex flex-col gap-y-3">
            <Label className="text-zinc-700 dark:text-zinc-200">Select a flair</Label>
            <Select
                disabled={isDisabled || loading}
                value={value}
                onValueChange={handleValueChange}
            >
                <SelectTrigger
                    className="w-full z-0 bg-zinc-50 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:disabled:bg-zinc-900"
                    aria-label="flair-selector"
                >
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className="dark:bg-zinc-700">
                    <SelectGroup>
                        {renderSelectContent}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}