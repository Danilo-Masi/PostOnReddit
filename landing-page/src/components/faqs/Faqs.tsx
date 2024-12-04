// Components
import CustomHeader from "../custom/CustomHeader";
import MainContainer from "../custom/MainContainer";
import Accordition from "./Accordition";

export default function Faqs() {
    return (
        <MainContainer yAlign="justify-start">
            <CustomHeader
                badgeTitle="FAQs"
                titleHeader="Got Questions?"
                descriptionHeader="Find quick answers to the most common questions here" />
            <Accordition />
        </MainContainer>
    );
}
