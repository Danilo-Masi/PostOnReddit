// React
import { Dispatch, SetStateAction, useEffect, useState } from "react";
// Axios
import axios from "axios";
// Shadcui
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner";
import { NavigateFunction, useNavigate } from "react-router-dom";

// Url del server di produzione
const SERVER_URL = 'http://localhost:3000';

type SelectOptionProps = {
    subreddit: string;
    isDisabled: boolean;
    placeholder: string;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
}

export default function SelectOption({ subreddit, isDisabled, placeholder, value, setValue }: SelectOptionProps) {

    const navigate: NavigateFunction = useNavigate();
    const [options, setOptions] = useState<string[]>([]);

    // Funzione per selezionare una flair
    const fetchFlairs = async () => {
        const token = localStorage.getItem('authToken');

        if (!token) {
            toast.error("User without permissions");
            navigate('/login');
            return;
        }

        if (subreddit.trim().length < 2) {
            setOptions([]);
            return;
        }

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

        } catch (error: any) {
            console.error('CLIENT: Errore generico nella chiamata al server', error.stack);
            toast.warning("An error occured. Please try again later");
        }
    }

    useEffect(() => {
        setOptions([]);
        fetchFlairs();
    }, [subreddit]);

    return (
        <Select
            disabled={isDisabled}
            value={value}
            onValueChange={(val) => setValue(val)}>
            <SelectTrigger className="z-0 w-full">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {options.length === 0 && subreddit.trim().length >= 2 && (
                        <SelectItem disabled value="No flair found">
                            No flair found
                        </SelectItem>
                    )}
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
