import Headline from "../custom/Headline";
import PriceCard from "./PriceCard";

export default function Pricing() {
  return (
    <div className="w-full h-auto min-h-svh flex flex-col items-center justify-start bg-white" id="pricing">
      <div className="w-[90%] md:w-[80%] h-auto flex flex-col items-center justify-center py-24 md:py-32">
        <Headline
          section="Pricing"
          title="Fair pricing, made simple."
          description="Two plans, all features. Pick what works best for you and start posting with no stress or hidden fees." />
        <div className="w-full h-auto flex flex-wrap items-center justify-center gap-8">
          <PriceCard key="monthly-plan" planTitle="Monthly Plan" planDescription="Pay as you go. Cancel anytime." price="€5" futurePrice="€7" isLifetime={false} />
          <PriceCard key="lifetime-plan" planTitle="Lifetime Plan" planDescription="One time payment. Use it forever." price="€59" futurePrice="€79" isLifetime={true} />
        </div>
      </div>
    </div>
  );
}
