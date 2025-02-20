import { ReactNode } from "react";

interface FooterContainerProps {
    children: ReactNode;
    width?: string;
}

export default function FooterContainer({ children, width }: FooterContainerProps) {
    return (
        <div className={`w-full flex flex-col items-center md:items-start justify-start gap-y-3 ${width ? width : 'md:w-1/5'}`}>
            {children}
        </div>
    );
}
