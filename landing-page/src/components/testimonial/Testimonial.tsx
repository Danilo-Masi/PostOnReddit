// Components
import CustomBadge from "../custom/CustomBadge";
import CustomHeader from "../custom/CustomHeader";
import MainContainer from "../custom/MainContainer";

export default function Testimonial() {
    return (
        <MainContainer yAlign="justify-start">
            <CustomBadge badgeText="TESTIMONIAL" />
            <CustomHeader titleHeader="What peple think about us" descriptionHeader="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
            
        </MainContainer>
    );
}
