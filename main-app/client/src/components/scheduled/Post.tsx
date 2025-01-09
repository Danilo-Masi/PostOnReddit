// Shadcnui
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "@/components/ui/badge";
// Icons
import { Pencil, Trash2 } from "lucide-react";

interface PostProps {
    title: string;
    content: string;
    date: string;
    community: string;
    status: string;
    onDelete: () => void;
}

export default function Post({ title, content, date, community, status, onDelete }: PostProps) {

    // Funzione per modificare lo stile dinamicamente in base allo stato del post
    const statusColor = () => {
        if (status === "scheduled") return "border-orange-500 text-orange-500";
        if (status === "posted") return "border-green-500 text-green-500";
        return "border-red-500 text-red-500";
    }

    // Funzione per renderizzare il contenuto del post in formato JSON
    const renderContent = (content: any) => {
        if (!content || typeof content !== "object") return null;
        return content.content.map((node: any, index: number) => {
            if (node.type === "paragraph") {
                return (
                    <p key={index} className="text-zinc-500">
                        {node.content?.map((child: any, childIndex: number) =>
                            <span key={childIndex}>{child.text}</span>
                        )}
                    </p>
                );
            }
        });
    }

    return (
        <Card className="border-elevation2 bg-background border w-full md:w-[calc(50%-0.5rem)]">
            <CardHeader>
                <CardTitle className="font-bold text-textPrimary text-xl">
                    {title}
                </CardTitle>
                <CardDescription className="font-light text-sm text-textSecondary">
                    Scheduled for <i className="font-semibold">{date}</i>
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-2 min-h-[10svh] font-light text-clip text-m text-textSecondary">
                <div className="flex gap-3">
                    <Badge
                        variant="outline"
                        className="w-fit">
                        {community}
                    </Badge>
                    <Badge
                        variant="outline"
                        className={`w-fit ${statusColor()}`}>
                        {status}
                    </Badge>
                </div>
                {renderContent(JSON.parse(content))}
            </CardContent>
            <CardFooter className="flex justify-end gap-3">
                <Button
                    variant="outline"
                    className="bg-card hover:bg-buttonHoverEmpty shadow-none border-border">
                    <Pencil />
                    Edit
                </Button>
                <Button
                    onClick={onDelete}
                    variant="outline"
                    className="bg-card hover:bg-buttonError shadow-none border-border hover:text-textForeground">
                    <Trash2 />
                    Delete
                </Button>
            </CardFooter>
        </Card>

    );
}
