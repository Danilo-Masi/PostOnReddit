import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export default function Post({ title, content, date }: { title: string, content: string, date: string }) {
    return (
        <Card className="w-full md:w-[calc(33%-0.5rem)]">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-textPrimary">
                    {title}
                </CardTitle>
                <CardDescription className="text-sm font-light text-textSecondary">
                    {`Scheduled for ${date}`}
                </CardDescription>
            </CardHeader>
            <CardContent className="min-h-[10svh] text-m text-clip font-light text-textSecondary">
                <p>{content}</p>
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
