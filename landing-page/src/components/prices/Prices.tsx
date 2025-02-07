// Components
import CustomHeader from "../custom/CustomHeader";
import MainContainer from "../custom/MainContainer";
import PriceCard from "./PricesCard";
// Context
import { useAppContext } from "@/context/AppContext";

export default function Prices({ id }: { id: string }) {

    const { setWaitlistOpen } = useAppContext();

    const handleBuyCredit = () => {
        setWaitlistOpen(true);
    }

    return (
        <MainContainer yAlign="justify-start" id={id}>
            <CustomHeader
                badgeTitle="PRICING"
                titleHeader="Start for FREE – Limited time ⏰"
                descriptionHeader="We’re in beta! Enjoy full access for FREE now!!" />
            <div className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-6">
                <PriceCard
                    title="Year plan"
                    description="Everything you need for a full year"
                    price="0.0"
                    futurePrice="25.00"
                    details={['Unlimited scheduled posts', 'Optimize timing for maximum reach', 'Priority email support (1-hour response)']}
                    buttonText="Join the waitlist now"
                    onClick={handleBuyCredit} />
                <PriceCard
                    title="Lifetime plan"
                    description="Unlock the full potential of your Reddit posts"
                    price="0.0"
                    futurePrice="45.00"
                    details={['Advanced post analytics', 'Personalized posting recommendations', 'Priority email support (1-hour response)']}
                    cardStyle="border-2 border-orange-500 shadow-2xl"
                    buttonText="Join the waitlist now"
                    onClick={handleBuyCredit} />
            </div>
        </MainContainer>
    );
}