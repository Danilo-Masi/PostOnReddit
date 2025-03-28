import { ReactNode } from "react";

interface LinkContainersProps {
    title: string;
    children: ReactNode;
}

export default function LinkContainers({ title, children }: LinkContainersProps) {
    return (
        <div className="w-full md:w-1/4 flex flex-col gap-y-6 items-center md:items-start text-center md:text-left">
            <h1 className="text-lg md:text-sm font-medium text-foreground">{title}</h1>
            <ul className="text-md md:text-sm font-medium text-muted-foreground flex flex-col gap-3">
                {children}
            </ul>
        </div>
    );
}