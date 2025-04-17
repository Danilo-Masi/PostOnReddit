import { Skeleton } from "../ui/skeleton";

export default function TimeCardSkeleton({ numSkeleton }: { numSkeleton: number }) {
    return (
        <div className="w-full h-auto flex-wrap flex items-start justify-start gap-4">
            {Array.from({ length: numSkeleton }).map((_, index) => (
                <Skeleton key={index} className="w-full md:w-[calc(50%-0.5rem)] h-[15svh] rounded-xl" />
            ))}
        </div>
    );
}
