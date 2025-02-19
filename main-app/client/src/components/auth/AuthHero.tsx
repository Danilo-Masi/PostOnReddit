// Shadcnui
import { Avatar, AvatarImage } from "../ui/avatar";
// Assets
import face1 from '../../assets/face1.webp';
import face2 from '../../assets/face2.webp';
import face3 from '../../assets/face3.webp';
import face4 from '../../assets/face4.webp';
import face5 from '../../assets/face5.webp';

const GroupAvatar = () => {
    return (
        <div className="flex -space-x-3">
            {[face1, face2, face3, face4, face5].map((face, index) => (
                <Avatar key={index} className="w-9 h-9 ring-2 ring-white shadow-lg">
                    <AvatarImage src={face} className="object-cover object-center" />
                </Avatar>
            ))}
        </div>
    );
};

export default function AuthHero() {
    return (
        <div className="w-1/2 h-svh hidden md:flex flex-col items-start justify-center gap-y-8 px-8 bg-orange-500 dark:bg-orange-500">
            <div className="max-w-md">
                <h1 className="text-white font-extrabold text-4xl leading-tight">
                    Post at the Best Time
                </h1>
                <h3 className="text-white/90 font-medium text-xl mt-2">
                    Get more engagement with data-driven insights.
                </h3>
            </div>

            <div className="flex flex-col gap-y-3">
                <p className="text-white text-sm">Join 500+ founders and creators</p>
                <GroupAvatar />
            </div>
        </div>
    );
}