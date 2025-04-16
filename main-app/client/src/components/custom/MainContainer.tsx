import { ReactNode } from "react";

export default function MainContainer({ children }: { children: ReactNode }) {
    return (
        <div className="w-full h-fit md:h-full p-3 mb-10 bg-zinc-100 dark:bg-zinc-800">
            {children}
        </div>
    );
}
