// Shadcnui
import { Badge } from "@/components/ui/badge"

export default function CustomBadge({ badgeText }: { badgeText: string }) {
    return (
        <Badge variant="outline" className="text-base w-fit">
            {badgeText}
        </Badge>
    );
}
