import me from '../../assets/images/me.webp';
import BlockContainer from '../custom/BlockContainer';


export default function About() {
    return (
        <BlockContainer>
            {/* Immagine e primo paragrafo */}
            <div className='w-full md:w-[60%] md:h-[30svh] flex flex-col md:flex-row gap-5'>
                <img
                    alt='picture image'
                    src={me}
                    className='w-fit h-[40svh] md:h-full rounded-lg' />
                <p className='text-balance'>
                    Hey, it's Danilo 👋
                    <br />
                    <br />
                    In 2018, I believed I was Mark Zuckerberg, built a startup for 1 year, and got 0 users...
                    <br />
                    <br />
                    A few years after my burnout, I restarted the journey differently: I shipped like a madman—16 startups in 2 years. Now I'm happy and earn $45,000 a month.
                </p>
            </div>
        </BlockContainer>
    );
}