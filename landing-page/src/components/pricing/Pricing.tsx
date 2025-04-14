import Headline from "../custom/Headline";
import PriceCard from "./PriceCard";

const goodFeaturesFreeTrial = [
  "Schedule 1 post at a time",
  "Best time to post in the next 24 hours",
];

const badFeaturesFreeTrial = [
  "Best time to post over the next 7 days",
  "One-click posting to multiple subreddits",
  "AI tips for posts & subreddit targeting",
  "Access to all future features and updates",
];

const goodFeaturesPro = [
  "Schedule unlimited posts",
  "Best time to post in the next 24 hours",
  "Best time to post over the next 7 days",
];

const futureFeaturesPro = [
  "One-click posting to multiple subreddits",
  "AI tips for posts & subreddit targeting",
  "Access to all future features and updates",
]

export default function Pricing() {
  return (
    <div className="w-full h-auto min-h-svh flex flex-col items-center justify-start bg-white" id="pricing">
      <div className="w-[90%] md:w-[80%] h-auto flex flex-col items-center justify-center py-24 md:py-32">
        <Headline
          section="Pricing"
          title="Let’s talk money (Don’t worry, it’s cheap)"
          description="Get powerful tools without selling a kidney. Just one plan, everything included. Easy."
        />
        <div className="w-full h-auto flex flex-wrap items-center justify-center gap-8">
          <PriceCard key="free-trial" planTitle="Free Trial" planDescription="To get started" price="€0" priceDescription="no credit card required" goodFeatures={goodFeaturesFreeTrial} badFeatures={badFeaturesFreeTrial} isCardPro={false} />
          <PriceCard key="lifetime-access" planTitle="Lifetime Access" planDescription="Pay once, use forever" price="€27" priceDescription="just one time" goodFeatures={goodFeaturesPro} futureFeatures={futureFeaturesPro} isCardPro={true} />
        </div>
      </div>
    </div>
  )
}
