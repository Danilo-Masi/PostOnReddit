import BlockContainer from "../custom/BlockContainer";
import Header from "../custom/Header";
import PriceCard from "./PriceCard";

const starterValidPoints = [
    "Optimal posting time for today",
];

const starterInvalidPoints = [
    "Weekly posting insights not included",
    "Limited to one scheduled post at a time",
    "No access to upcoming premium features",
];

const premiumValidPoints = [
    "Optimal posting time for today",
    "Best posting time for the entire week",
    "Unlimited scheduled posts",
    "Early access to future features",
]

export default function Pricing() {
    return (
        <BlockContainer id="Pricing">
            <Header
                title="Find the Best Plan for Your Growth"
                caption="Whether you're just starting out or need unlimited scheduling, we have the right plan for you." />
            <div className="w-full flex flex-col md:flex-row items-center justify-center gap-10 mt-20">
                <PriceCard
                    title="Free plan"
                    price="0"
                    discountedPrice="0"
                    validPoint={starterValidPoints}
                    invalidPoint={starterInvalidPoints}
                    textButton="Start for Free"
                    bestOffer={false}
                    handleClick={() => (window.location.href = "https://app.postonreddit.com/login")} />
                <PriceCard
                    title="Lifetime Access"
                    price="27"
                    discountedPrice="23"
                    validPoint={premiumValidPoints}
                    textButton="Unlock Pro Features"
                    bestOffer={true}
                    handleClick={() => (window.location.href = "https://app.postonreddit.com/registration")} />
            </div>
        </BlockContainer>
    )
}
