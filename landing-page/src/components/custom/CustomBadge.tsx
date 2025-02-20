import { Badge } from "@/components/ui/badge"

export default function CustomBadge({ badgeText }: { badgeText: string }) {
    return (
        <Badge variant="outline" className="text-sm w-fit">
            {badgeText}
        </Badge>
    );
}
