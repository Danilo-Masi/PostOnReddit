// Components
import MainContainer from "../custom/MainContainer";
import CustomHeader from "../custom/CustomHeader";
import FeaturesCarousel from "./FeaturesCarousel";

export default function Features() {
    return (
        <MainContainer yAlign="justify-start">
            <CustomHeader
                badgeTitle="HOW DOEAS IT WORK?"
                titleHeader="How the platform start?"
                descriptionHeader="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
            <FeaturesCarousel />
        </MainContainer>
    );
}
