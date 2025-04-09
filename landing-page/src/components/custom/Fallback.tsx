import { Loader2 } from "lucide-react";

export default function Fallback() {
    return (
        <div className="w-full h-full min-h-svh flex items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin" />
        </div>
    );
}
