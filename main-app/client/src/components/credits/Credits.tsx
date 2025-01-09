// Shadcnui
import { toast } from "sonner";
// Components
import CreditsCard from "./CreditsCard";

export default function Credits() {

    const handleBuyCredit = () => {
        toast.error("Buy more credit, IDIOT!!");
    }

    return (
        <div className="flex md:flex-row flex-col gap-6 mt-3 min-h-[40svh]">
            <CreditsCard
                title="Basic pack"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                futurePrice="7.5"
                price="5.00"
                details={['10 credits', '€0.50/credit', 'Email support (1h reponses)']}
                buttonText="Buy 10 credits"
                onClick={handleBuyCredit}
            />
            <CreditsCard
                title="Premium pack"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                futurePrice="15.00"
                price="10.00"
                details={['25 credits', '€0.40/credit', 'Email support (1h reponses)']}
                buttonText="Buy 25 credits"
                onClick={handleBuyCredit}
            />
        </div>
    );
}
