// Components
import CustomHeader from "../custom/CustomHeader";
import MainContainer from "../custom/MainContainer";
import PriceCard from "./PriceCard";
// Context
import { useAppContext } from "@/context/AppContext";

export default function Prices() {

    const { setWaitlistOpen } = useAppContext();

    const handleBuyCredit = () => {
        setWaitlistOpen(true);
    }

    return (
        <MainContainer yAlign="justify-start">
            <CustomHeader
                badgeTitle="PRICES"
                titleHeader="Pay-As-You-Go"
                descriptionHeader="Only pay for what you need. Simple, flexible, and efficient." />
            <div className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-6">
                <PriceCard
                    title="Basic pack"
                    description="Perfect for occasional users who want to schedule posts effortlessly."
                    futurePrice="7.5"
                    price="5.00"
                    details={['10 credits included', '€0.50 per credit', 'Email support with 1-hour response time']}
                    buttonText="Buy 10 Credits"
                    onClick={handleBuyCredit}
                />
                <PriceCard
                    border="border-2 border-orange-500"
                    title="Premium pack"
                    description="Ideal for power users who need more credits at a lower cost"
                    futurePrice="15.00"
                    price="10.00"
                    details={['25 credits included', '€0.40 per credit', 'Email support with 1-hour response time']}
                    buttonText="Buy 25 Credits"
                    onClick={handleBuyCredit}
                />
            </div>
        </MainContainer>
    );
}
