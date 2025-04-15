import { ReactNode } from "react";

export default function LegalContainer({ children }: { children: ReactNode }) {
    return (
        <div className="w-full h-auto min-h-svh flex items-start justify-center bg-accent">
            <div className="w-[90%] md:w-[40%] h-full flex flex-col items-start justify-center gap-6 py-10">
                {children}
            </div>
        </div>
    );
}
