import { ReactNode } from "react";

export default function BlockContainer({ children }: { children: ReactNode }) {
    return (
        <div className="w-[90%] md:w-[80%] h-auto flex flex-col items-center justify-center mt-40">
            {children}
        </div>
    )
}
