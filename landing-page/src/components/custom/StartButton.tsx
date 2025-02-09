// Shacnui
import { Button } from "../ui/button";
// Icons
import { Sparkles } from "lucide-react";

interface StartButtonProps {
    buttonStyle?: string;
}

export default function StartButton({ buttonStyle }: StartButtonProps) {

    const handleClick = () => {
        window.location.href = "https://postonredditclient.vercel.app";
    };

    return (
        <Button
            type="button"
            className={`py-5 cursor-pointer z-40 ${buttonStyle && buttonStyle}`}
            onClick={handleClick}>
            Begin posting
            <Sparkles />
        </Button>
    );
}
