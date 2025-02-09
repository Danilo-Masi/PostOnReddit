// Shacnui
import { Button } from "../ui/button";
// Icons
import { Sparkles } from "lucide-react";

interface StartButtonProps {
    buttonStyle?: string;
}

export default function StartButton({ buttonStyle }: StartButtonProps) {
    return (
        <Button
            type="button"
            className={`py-5 cursor-pointer z-40 ${buttonStyle && buttonStyle}`}>
            Begin posting
            <Sparkles />
        </Button>
    );
}
