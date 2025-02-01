// React
import { ReactNode } from "react";
// Shadcnui
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CardBase {
    children: ReactNode;
    cardTitle: string;
    cardDescription: string;
    mdWidth: string;
}

export default function CardBase({ children, cardTitle, cardDescription, mdWidth }: CardBase) {
    return (
        <Card className={`w-full md:min-h-full overflow-auto ${mdWidth} dark:bg-zinc-700`}>
            <CardHeader>
                <CardTitle>{cardTitle}</CardTitle>
                <CardDescription>{cardDescription}</CardDescription>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
}
