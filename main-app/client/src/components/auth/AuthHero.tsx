import { Avatar, AvatarImage } from "../ui/avatar";
import face1 from '../../assets/face1.webp';
import face2 from '../../assets/face2.webp';
import face3 from '../../assets/face3.webp';
import face4 from '../../assets/face4.webp';
import face5 from '../../assets/face5.webp';
import { Clock, TrendingUp, Users } from "lucide-react";

const GroupAvatar = () => {
    return (
        <div className="flex -space-x-3">
            {[face1, face2, face3, face4, face5].map((face, index) => (
                <Avatar key={index} className="w-9 h-9 ring-2 ring-white shadow-lg hover:scale-110 transition-transform duration-300">
                    <AvatarImage src={face} className="object-cover object-center" />
                </Avatar>
            ))}
        </div>
    );
};

const FeatureItem = ({ icon: Icon, text }: { icon: any, text: string }) => (
    <div className="flex items-center gap-x-3 text-white/90">
        <div className="bg-white/20 p-1.5 rounded-full">
            <Icon className="w-5 h-5 text-white" />
        </div>
        <p className="text-sm font-medium">{text}</p>
    </div>
);

export default function AuthHero() {
    return (
        <div className="w-1/2 h-svh hidden md:flex flex-col items-center justify-center px-8 bg-gradient-to-br from-orange-600 via-orange-500 to-orange-400 dark:from-orange-700 dark:via-orange-600 dark:to-orange-500 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMXYxaC0xeiIgZmlsbD0iI2ZmZiIvPjwvZz48L3N2Zz4=')] bg-repeat"></div>
            </div>

            <div className="max-w-md z-10">
                <h1 className="text-white font-extrabold text-5xl leading-tight">
                    Schedule Smarter, <span className="text-orange-200">Grow Faster</span>
                </h1>
                <h3 className="text-white/90 font-medium text-lg mt-4">
                    Post at the best times with data-driven insights.
                </h3>

                <div className="mt-8 space-y-4">
                    <FeatureItem icon={Clock} text="Post at optimal times for maximum engagement" />
                    <FeatureItem icon={TrendingUp} text="Boost your Reddit performance with analytics" />
                    <FeatureItem icon={Users} text="Understand your audience better" />
                </div>

                <div className="mt-10 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                    <div className="flex items-center gap-x-3">
                        <GroupAvatar />
                        <div>
                            <p className="text-white font-medium">Join 100+ happy users</p>
                            <div className="flex items-center gap-x-1 mt-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                                <span className="text-white/80 text-sm ml-1">4.9/5 rating</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/10 to-transparent"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-300/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </div>
    );
}