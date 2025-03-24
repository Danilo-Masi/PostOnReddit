import { ReactNode } from "react";

export default function AppContainer({ children }: { children: ReactNode }) {
    return (
        <div className="w-full h-auto flex flex-col items-start justify-center">
            {children}
        </div>
    );
}
