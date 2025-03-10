import { ReactNode } from 'react'

export default function DialogDescriptionContainer({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col gap-y-1 mb-6">
            {children}
        </div>
    );
}
