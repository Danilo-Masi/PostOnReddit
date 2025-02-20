import { ReactNode } from "react";

interface MainContainerProps {
    children: ReactNode;
    minHeigth?: string;
    yAlign?: string;
    marginTop?: string;
    id?: string;
}

export default function MainContainer({ children, minHeigth, yAlign, marginTop, id }: MainContainerProps) {
    return (
        <div
            id={id}
            className={`w-full h-auto flex flex-col items-center gap-y-16 text-center ${minHeigth && minHeigth} ${yAlign ? yAlign : 'justify-center'} ${marginTop ? marginTop : 'mt-44'}`}>
            {children}
        </div>
    );
}
