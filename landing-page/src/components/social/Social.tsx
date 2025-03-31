import BlockContainer from '../custom/BlockContainer'
import Header from '../custom/Header'
import SocialCards from './SocialCards';

const socialProof1 = [
    { content: "Finding the best time to post used to be a guessing game. Now I get peak engagement every time!", name: "Ethan", usurname: "Miller" },
    { content: "My posts finally get noticed! This tool takes the guesswork out of Reddit marketing.", name: "Olivia", usurname: "Walker" },
    { content: "Simple, effective, and saves me so much time!", name: "Daniel", usurname: "King" },
];

const socialProof2 = [
    { content: "This app boosted my subreddit’s growth significantly. Knowing the right time to post makes all the difference!", name: "Emma", usurname: "Rodriguez" },
    { content: "I used to post at random times and get barely any traction. Now, my engagement has doubled.", name: "Liam", usurname: "Carter" },
    { content: "The analytics are a game changer. I finally understand when my audience is active.", name: "Noah", usurname: "Mitchell" },
];

const socialProof3 = [
    { content: "Reddit rewards good timing, and this app nails it!", name: "Sophia", usurname: "Adams" },
    { content: "I was skeptical, but my last three posts got way more upvotes than usual. This works!", name: "Lucas", usurname: "Evans" },
    { content: "If you want to maximize your reach on Reddit, you need this tool.", name: "Harper", usurname: "Wright" },
];

const socialProof4 = [
    { content: "I save hours every week scheduling posts at the best times. Totally worth it!", name: "Benjamin", usurname: "Lopez" },
    { content: "Reddit success is all about timing, and this tool gives me the edge.", name: "Mia", usurname: "Scott" },
    { content: "It’s like having a secret weapon for engagement. My posts have never performed better!", name: "Henry", usurname: "Green" },
];

export default function Social() {
    return (
        <BlockContainer>
            <Header
                title='6771 makers built AI tools, SaaS, and more'
                caption='They made their first $ online, and some even quit their 9-5!' />
            <div className="w-full h-auto flex flex-col md:flex-row gap-4 my-20">
                <SocialCards proofs={socialProof1} />
                <SocialCards proofs={socialProof2} />
                <SocialCards proofs={socialProof3} />
                <SocialCards proofs={socialProof4} />
            </div>
        </BlockContainer>
    );
}
