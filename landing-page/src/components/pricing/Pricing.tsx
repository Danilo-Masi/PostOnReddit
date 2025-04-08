import Headline from "../custom/Headline";
import PriceCard from "./PriceCard";

const goodFeaturesFreeTrial = [
  "Lorem ipsum dolor sit amet",
  "Lorem ipsum dolor sit amet",
];

const badFeaturesFreeTrial = [
  "Lorem ipsum dolor sit amet",
  "Lorem ipsum dolor sit amet",
  "Lorem ipsum dolor sit amet",
];

const goodFeaturesPro = [
  "Lorem ipsum dolor sit amet",
  "Lorem ipsum dolor sit amet",
  "Lorem ipsum dolor sit amet",
  "Lorem ipsum dolor sit amet",
  "Lorem ipsum dolor sit amet",
];

export default function Pricing() {
  return (
    <div className="w-full h-auto min-h-svh flex flex-col items-center justify-start bg-zinc-100" id="pricing">
      <div className="w-[90%] md:w-[80%] h-auto flex flex-col items-center justify-center py-24 md:py-32">
        <Headline section="Pricing" title="Lorem ipsum dolor sit amet" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." />
        <div className="w-full h-auto flex flex-wrap items-center justify-center gap-8">
          <PriceCard planTitle="Free Trial" planDescription="To get started" price="€0" priceDescription="no credit card required" goodFeatures={goodFeaturesFreeTrial} badFeatures={badFeaturesFreeTrial} isCardPro={false} />
          <PriceCard planTitle="Lifetime Access" planDescription="Pay once, use forever" price="€27" priceDescription="just one time" goodFeatures={goodFeaturesPro} isCardPro={true} />
        </div>
      </div>
    </div>
  )
}
