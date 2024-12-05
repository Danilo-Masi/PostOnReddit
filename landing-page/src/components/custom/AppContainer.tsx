// React
import { ReactNode } from "react";

interface AppContainerProps {
    children: ReactNode;
}

export default function AppContainer({ children }: AppContainerProps) {
    return (
        <div className="w-screen h-auto min-h-svh flex items-center justify-center">
            <div className="w-[90%] md:w-[70%] lg:w-[80%] h-auto min-h-svh flex flex-col items-start justify-start mt-5">
                {children}
            </div>
        </div>
    );
}
