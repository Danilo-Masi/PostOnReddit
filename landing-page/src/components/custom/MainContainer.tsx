// React
import { ReactNode } from "react";

interface MainContainerProps {
    children: ReactNode;
    minHeigth?: string;
    yAlign?: string;
    marginTop?: string;
}

export default function MainContainer({ children, minHeigth, yAlign, marginTop }: MainContainerProps) {
    return (
        <div className={`w-full h-auto flex flex-col items-center gap-y-16 text-center  ${minHeigth && minHeigth} ${yAlign ? yAlign : 'justify-center'} ${marginTop ? marginTop : 'mt-24'}`}>
            {children}
        </div>
    );
}
