// React
import { ReactNode } from "react";

export default function MainContainer({ children }: { children: ReactNode }) {
    return (
        <div className="w-full h-auto md:h-[100svh-2rem] px-2 py-5 flex flex-col rounded-lg bg-background shadow-md shadow-elevation3">
            {children}
        </div>
    )
}
