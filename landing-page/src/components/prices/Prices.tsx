// React
import { useState } from "react";
// Components
import CustomHeader from "../custom/CustomHeader";
import MainContainer from "../custom/MainContainer";
import PriceCard from "./PricesCard";
// Context
import { useAppContext } from "@/context/AppContext";

export default function Prices({ id }: { id: string }) {

    const { setWaitlistOpen } = useAppContext();
    const [isPriceDisabled] = useState<boolean>(true);

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
                    title="Free pack"
                    description="No cost, no limits, just results"
                    price="0.0"
                    details={['Unlimited posting credits', 'Absolutely free, no hidden fees', 'Email support with 1-hour response time']}
                    cardStyle="border-2 border-orange-500 shadow-2xl"
                    buttonText="Join the waitlist now"
                    onClick={handleBuyCredit} />
                <PriceCard
                    title="Basic pack"
                    description="More accurate and complete data"
                    price="5.0"
                    futurePrice="7.5"
                    details={['20 post credits included', 'Only €0.25 per post', 'Email support with 1-hour response time']}
                    buttonText="Coming soon"
                    onClick={handleBuyCredit}
                    isPriceDisabled={isPriceDisabled} />
            </div>
        </MainContainer>
    );
}