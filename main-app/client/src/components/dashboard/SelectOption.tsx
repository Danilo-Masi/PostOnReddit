// React
import { Dispatch, SetStateAction, useEffect, useState } from "react";
// Axios
import axios from "axios";
// Shadcui
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

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

    const [options, setOptions] = useState<string[]>([]);

    const handleLoadFlags = async () => {
        // Verifica che prima sia stata selezionata una community
        if (!communityValue) {
            setOptions([]);
            return;
        }
        try {
            // Effettua la chiamata al backend
            const response = await axios.get(`${SERVER_URL}/api/search-flair?q=${communityValue}`);
            // Accede ai dati della risposta
            const flags = response.data.flags || [];
            // Imposta le opzioni della select
            setOptions(flags);
        } catch (error: any) {
            console.error('CLIENT: Errore generico nella chiamata al server', error.stack);
        }
    }

    useEffect(() => {
        handleLoadFlags();
    }, [communityValue]);

    return (
        <Select
            disabled={isDisabled}
            value={value}
            onValueChange={(val) => setValue(val)}>
            <SelectTrigger className="w-full z-0">
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
