import { Loader2 } from "lucide-react";

export default function Fallback() {
    return (
        <div className="w-full h-svh flex items-center justify-center">
            <Loader2 className="animate-spin" />
        </div>
    );
}
