import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "@/components/ui/badge"

interface PostProps {
    title: string;
    content: string;
    date: string;
    community: string;
    status: string;
}

export default function Post({ title, content, date, community, status }: PostProps) {

    const statusColor = () => {
        if(status === "scheduled") return "border-orange-500 text-orange-500";
        if(status === "posted") return "border-green-500 text-green-500";
        return "border-red-500 text-red-500";
    }

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
        <Card className="w-full md:w-[calc(50%-0.5rem)] bg-background border border-elevation2">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-textPrimary">
                    {title}
                </CardTitle>
                <CardDescription className="text-sm font-light text-textSecondary">
                    Scheduled for <i className="font-semibold">{date}</i>
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-2 min-h-[10svh] text-m text-clip font-light text-textSecondary">
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
                    className="bg-card border-border shadow-none hover:bg-buttonHoverEmpty">
                    <Pencil />
                    Edit
                </Button>
                <Button
                    variant="outline"
                    className="bg-card border-border shadow-none hover:bg-buttonError hover:text-textForeground">
                    <Trash2 />
                    Delete
                </Button>
            </CardFooter>
        </Card>

    );
}
