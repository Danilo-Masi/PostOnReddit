import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
    const navigate = useNavigate();
    return (
        <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="w-fit">
            <ArrowLeft className="w-4 h-4" />
            Back
        </Button>
    );
}
