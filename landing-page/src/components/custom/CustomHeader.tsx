// Components
import CustomBadge from "./CustomBadge";

interface CustomHeaderProps {
    badgeTitle: string;
    titleHeader: string;
    descriptionHeader: string;
}

export default function CustomHeader({ badgeTitle, titleHeader, descriptionHeader }: CustomHeaderProps) {
    return (
        <div className="flex items-center justify-center flex-col gap-y-2">
            <CustomBadge badgeText={badgeTitle} />
            <h1 className="text-4xl font-bold text-zinc-900">{titleHeader}</h1>
            <h3 className="text-xl font-medium text-zinc-500 md:max-w-xl">{descriptionHeader}</h3>
        </div>
    );
}
