import { useAppContext } from "../context/AppContext";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";

interface PostProps {
    title: string;
    content: string;
    date: string;
    community: string;
    status: string;
    postId: any;
}

export default function Post({ title, content, date, community, status, postId }: PostProps) {

    const { setDeleteDialogOpen, setPostId } = useAppContext();

    // Function to dynamically change the style based on the post status
    const statusColor = () => {
        if (status === "pending") return "border-yellow-500 text-yellow-500 dark:border-yellow-300 dark:text-yellow-300";
        if (status === "posted") return "border-green-500 text-green-500 dark:border-green-500 dark:text-green-500";
        return "border-red-500 text-red-500 dark:border-red-500 dark:text-red-500";
    }

    // Function to render the post content in HTML format
    const renderContent = (content: string) => {
        if (!content || typeof content !== "string") return null;

        // Create a temporary div to extract plain text from HTML
        const tempElement = document.createElement("div");
        tempElement.innerHTML = content;
        let plainText = tempElement.textContent || tempElement.innerText || "";

        // Remove double and single quotes at the beginning and end
        plainText = plainText.trim().replace(/^["']|["']$/g, '');

        // Split the text into words and truncate if necessary
        const words = plainText.split(/\s+/);
        const truncatedText = words.length > 30 ? words.slice(0, 30).join(" ") + "..." : plainText;

        return (
            <p className="text-zinc-500 dark:text-zinc-300">
                {truncatedText}
            </p>
        );
    };

    // Function to pass the postId and open the delete dialog
    const handleOpenDeleteDialog = () => {
        setPostId(postId);
        setDeleteDialogOpen(true);
    }

    return (
        <Card className="w-full md:w-[calc(50%-0.5rem)] bg-zinc-100 dark:bg-zinc-800 border-0">
            <CardHeader className="gap-y-2">
                <CardTitle className="font-bold text-xl text-zinc-900 dark:text-zinc-50">
                    {title}
                </CardTitle>
                <CardDescription className="font-light text-sm text-zinc-500 dark:text-zinc-300">
                    Scheduled for <i className="font-semibold">{date}</i>
                </CardDescription>
                <div className="flex gap-2">
                    <Badge
                        variant="outline"
                        className="w-fit text-zinc-500 border-zinc-500 dark:text-zinc-300 dark:border-zinc-300">
                        {community}
                    </Badge>
                    <Badge
                        variant="outline"
                        className={`w-fit ${statusColor()}`}>
                        {status}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-2 min-h-[10svh] font-light text-clip text-m text-zinc-500 dark:text-zinc-300">
                {renderContent(content)}
            </CardContent>
            <CardFooter className="flex justify-end gap-3">
                <Button
                    onClick={handleOpenDeleteDialog}
                    variant="outline"
                    className="shadow-none border-none text-zinc-50 hover:text-zinc-50 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500">
                    <Trash2 />
                    Delete
                </Button>
            </CardFooter>
        </Card>
    );
}
