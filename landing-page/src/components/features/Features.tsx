// Components
import MainContainer from "../custom/MainContainer";
import CustomHeader from "../custom/CustomHeader";
import FeaturesCarousel from "./FeaturesCarousel";

export default function Features({ id }: { id: string }) {
    return (
        <MainContainer yAlign="justify-start" id={id}>
            <CustomHeader
                badgeTitle="HOW DOES IT WORK?"
                titleHeader="3 steps to skyrocket your views!!"
                descriptionHeader="Learn how our platform helps you post at the perfect time, boost engagement, and grow your presence effortlessly" />
            <FeaturesCarousel />
        </MainContainer>
    );
}
