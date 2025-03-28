import BlockContainer from "../custom/BlockContainer";
import Header from "../custom/Header";
import Demo from "./Demo";

export default function Features() {
    return (
        <BlockContainer>
            <Header
                title="3 easy steps to skyrocket your views!!"
                caption="Learn how our platform helps you post at the perfect time, boost engagement, and grow your presence effortlessly" />
            <Demo />
        </BlockContainer>
    )
}
