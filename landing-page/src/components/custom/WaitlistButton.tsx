// Context
import { useAppContext } from "@/context/AppContext";
// Shadcnui
import { Button } from "../ui/button";
// Icons
import { Sparkles } from "lucide-react";

interface WaitlistButtonProps {
    buttonStyle?: string;
}

export default function WaitlistButton({ buttonStyle }: WaitlistButtonProps) {

    const { setWaitlistOpen } = useAppContext();

    return (
        <Button
            type="button"
            className={`py-5 cursor-pointer z-40 ${buttonStyle && buttonStyle}`}
            onClick={() => setWaitlistOpen(true)}>
            Join the Waitlist
            <Sparkles />
        </Button>
    );
}
