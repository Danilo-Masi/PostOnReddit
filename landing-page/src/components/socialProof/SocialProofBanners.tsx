// Components
import MainContainer from "../custom/MainContainer";
// Shadcnui
import { Card } from "../ui/card";

const SocialProofBanner = ({ mdWidth }: { mdWidth: string }) => {
    return (
        <Card className={`w-full h-[30svh] ${mdWidth} flex items-center justify-center`}>
            <p>social proof</p>
        </Card>
    );
}

export default function SocialProofBanners() {
    return (
        <MainContainer>
            <div className="w-full min-h-[80svh] flex flex-col md:flex-row flex-wrap gap-x-4">
                <SocialProofBanner mdWidth="md:w-[calc(50%-11px)]" />
                <SocialProofBanner mdWidth="md:w-[calc(25%-11px)]" />
                <SocialProofBanner mdWidth="md:w-[calc(25%-10px)]" />
                <SocialProofBanner mdWidth="md:w-[calc(30%-11px)]" />
                <SocialProofBanner mdWidth="md:w-[calc(50%-11px)]" />
                <SocialProofBanner mdWidth="md:w-[calc(20%-10px)]" />
            </div>
        </MainContainer>
    );
}
