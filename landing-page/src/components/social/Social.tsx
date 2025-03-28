import BlockContainer from '../custom/BlockContainer'
import Header from '../custom/Header'
import SocialCards from './SocialCards';

const socialProof1 = [
    { content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam suscipit.", name: "name", usurname: "usurname" },
    { content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus luctus sapien, non auctor ante laoreet at. Quisque nisl elit, lobortis non fermentum non.", name: "name", usurname: "usurname" },
    { content: "Fusce nec turpis.", name: "name", usurname: "usurname" },
];

const socialProof2 = [
    { content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam suscipit.", name: "name", usurname: "usurname" },
    { content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus luctus sapien, non auctor ante laoreet at. Quisque nisl elit, lobortis non fermentum non.", name: "name", usurname: "usurname" },
    { content: "Sed placerat nec erat congue bibendum. Vivamus feugiat sed mauris sed tincidunt. Sed fermentum malesuada felis, at efficitur neque sollicitudin a. Pellentesque convallis magna non purus bibendum malesuada. Nunc.", name: "name", usurname: "usurname" },
];

const socialProof3 = [
    { content: "Fusce nec turpis.", name: "name", usurname: "usurname" },
    { content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam suscipit.", name: "name", usurname: "usurname" },
    { content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam suscipit.", name: "name", usurname: "usurname" },
];

const socialProof4 = [
    { content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam suscipit.", name: "name", usurname: "usurname" },
    { content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus luctus sapien, non auctor ante laoreet at. Quisque nisl elit, lobortis non fermentum non.", name: "name", usurname: "usurname" },
    { content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus luctus sapien, non auctor ante laoreet at. Quisque nisl elit, lobortis non fermentum non.", name: "name", usurname: "usurname" },
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
