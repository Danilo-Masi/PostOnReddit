// Shadcnui
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "../ui/button";
import { toast } from "sonner";
// Icons
import { Circle, Sparkles, TriangleAlert } from "lucide-react";
// React
import { useState } from "react";
// Axios
import axios from 'axios';
// Context
import { useAppContext } from "@/context/AppContext";

const WAITLIST_ID = import.meta.env.VITE_WAITLIST_ID;
const WAITLIST_URL = import.meta.env.VITE_WAITLIST_URL;

interface LabelInputProps {
    divStyle: string;
    htmlForValue: string;
    labelValue: string;
    typeValue: string;
    placeholderValue: string;
    value: string;
    onChange: any;
}

const LabelInput = ({ divStyle, htmlForValue, labelValue, typeValue, placeholderValue, value, onChange }: LabelInputProps) => {
    return (
        <div className={`${divStyle} flex flex-col gap-3`}>
            <Label
                htmlFor={htmlForValue}
                className="text-zinc-900">
                {labelValue}
            </Label>
            <Input
                autoComplete={typeValue}
                required
                type={typeValue}
                placeholder={placeholderValue}
                value={value}
                onChange={onChange}
                className="text-zinc-900" />
        </div>
    );
}

export default function WaitlistWidget() {

    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(false);

    const { setWaitlistOpen, setConfettiActive } = useAppContext();

    const validateEmail = (email: string) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true;
        }
        return false;
    }

    const handleSubmit = async () => {
        // Resettiamo gli errori 
        setError("");

        // Validazioni
        let validationError = "";
        if (name.trim().length === 0) {
            validationError = "Please enter a valid name";
        } else if (surname.trim().length === 0) {
            validationError = "Please enter a valid surname";
        } else if (email.trim().length === 0 || !validateEmail(email)) {
            validationError = "Please enter a valid email";
        }

        // Se c'è un errore, lo mostriamo e fermiamo l'esecuzione
        if (validationError) {
            setError(validationError);
            return;
        }

        // Prepariamo i dati
        const data = {
            first_name: name.trim(),
            last_name: surname.trim(),
            email: email.trim(),
            waitlist_id: WAITLIST_ID,
            referral_link: document.URL,
        };

        setLoading(true);

        try {
            const response = await axios.post(WAITLIST_URL, data, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.status === 200) {
                setLoading(false);
                setWaitlistOpen(false);
                setConfettiActive(true);
                toast(`🎉 ${name}, you've been successfully added to the waitlist! ✌🏼`);
            } else {
                setError("Something went wrong. Please try again!");
                setLoading(false);
            }
        } catch (error: any) {
            console.error("Waitlist API error:", error.message);
            setError("An error occurred. Please try again later.");
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex flex-col md:flex-row flex-wrap gap-6">
            <LabelInput
                divStyle="w-full md:w-[calc(50%-1rem)]"
                htmlForValue="first-name"
                labelValue="First Name"
                typeValue="text"
                placeholderValue="Enter your first name"
                value={name}
                onChange={(e: any) => setName(e.target.value)} />
            <LabelInput
                divStyle="w-full md:w-[calc(50%-1rem)]"
                htmlForValue="last-name"
                labelValue="Last Name"
                typeValue="text"
                placeholderValue="Enter your last name"
                value={surname}
                onChange={(e: any) => setSurname(e.target.value)} />
            <LabelInput
                divStyle="w-full"
                htmlForValue="email"
                labelValue="Email Address"
                typeValue="email"
                placeholderValue="Enter your email address"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)} />
            {error.length > 0 && (
                <Label className="text-red-500 flex justify-center items-center">
                    <TriangleAlert className="mr-2" />
                    {error}
                </Label>
            )}
            {isLoading ? (
                <Button
                    className="w-full py-5 bg-orange-500 hover:bg-orange-600">
                    Loading
                    <Circle className="animate-spin" />
                </Button>
            ) : (
                <Button
                    type="button"
                    className="w-full py-5 bg-orange-500 hover:bg-orange-600"
                    onClick={handleSubmit}>
                    Join the Waitlist
                    <Sparkles className="ml-2" />
                </Button>
            )}

        </div>
    );
}