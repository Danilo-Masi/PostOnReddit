import me from '../../assets/images/me.webp';
import BlockContainer from '../custom/BlockContainer';


export default function About() {
    return (
        <BlockContainer>
            <div className='w-full md:w-[70%]  flex flex-col md:flex-row justify-start items-start gap-5'>
                <img
                    alt='picture image'
                    src={me}
                    className='w-2/3 md:w-1/3 h-auto object-contain rounded-xl' />
                <p className='w-full md:w-2/3 text-balance'>
                    Hey, it's Danilo 👋
                    <br />
                    <br />
                    Back in 2018, I thought I could be the next Mark Zuckerberg. I built a startup for a year, but it didn't go as planned, and I ended up with no users...
                    <br />
                    <br />
                    After a few tough years, I decided to approach things differently. I learned from my failures, took things step by step, and now, I'm excited to have launched postonreddit. It's been a journey of growth, and I'm finally on a path that feels right.
                </p>
            </div>
        </BlockContainer>
    );
}