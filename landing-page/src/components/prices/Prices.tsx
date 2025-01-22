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
                titleHeader="Get started for Free"
                descriptionHeader="We’re in the testing phase, and because you believe in us, you get full access to the platform—completely free" />
            <div className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-6">
                <PriceCard
                    title="Free Plan"
                    description="No cost, no limits, just results"
                    price="0.0"
                    details={['Unlimited posting credits', 'Absolutely free, no hidden fees', 'Email support with 1-hour response time']}
                    buttonText="Join the waitlist now"
                    onClick={handleBuyCredit}
                />
            </div>
        </MainContainer>
    );
}