import CustomHeader from "../custom/CustomHeader";
import MainContainer from "../custom/MainContainer";
import Accordition from "./Accordition";

export default function Faqs({ id }: { id: string }) {
    return (
        <MainContainer yAlign="justify-start" id={id}>
            <CustomHeader
                badgeTitle="FAQs"
                titleHeader="Got Questions?"
                descriptionHeader="Find quick answers to the most common questions here" />
            <Accordition />
        </MainContainer>
    );
}
