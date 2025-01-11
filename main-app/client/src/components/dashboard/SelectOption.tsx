// React
import { Dispatch, SetStateAction, useEffect, useState } from "react";
// Axios
import axios from "axios";
// Shadcui
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner";
import { NavigateFunction, useNavigate } from "react-router-dom";

// Url del server di produzione
const SERVER_URL = 'http://localhost:3000';

type SelectOptionProps = {
    communityValue: string;
    isDisabled: boolean;
    placeholder: string;
    selectLabel: string;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
}

export default function SelectOption({ communityValue, isDisabled, placeholder, selectLabel, value, setValue }: SelectOptionProps) {

    const navigate: NavigateFunction = useNavigate();
    const [options, setOptions] = useState<string[]>([]);

    // Funzione per selezionare una flair
    const handleLoadFlair = async () => {

        const token = localStorage.getItem('authToken');
        if (!token) {
            toast.error("User without permissions");
            navigate('/login');
            return;
        }

        if (communityValue.trim().length < 2) {
            setOptions([]);
            return;
        }

        try {
            const response = await axios.get(`${SERVER_URL}/api/search-flair`, {
                params: { q: communityValue },
                timeout: 5000,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            const flair = response.data.flair || [];
            setOptions(flair);

            if (flair.length === 0) {
                toast.info("No flair found");
            }

        } catch (error: any) {
            console.error('CLIENT: Errore generico nella chiamata al server', error.stack);
            toast.warning("An error occured. Please try again later");
        }
    }

    useEffect(() => {
        handleLoadFlair();
    }, [communityValue]);

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
