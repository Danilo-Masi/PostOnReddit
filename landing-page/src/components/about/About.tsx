// Components
import MainContainer from '../custom/MainContainer'
// Images
import me from '../../assets/images/me.webp';

export default function About() {
    return (
        <MainContainer>
            <div className='w-full md:w-2/3 flex flex-col gap-6'>
                <div className='w-full flex flex-col md:flex-row gap-6'>
                    <img
                        src={me}
                        alt='my profile picture'
                        className="rounded-lg w-1/2 md:w-1/4 object-cover" />
                    <div className='flex flex-col gap-3 text-start'>
                        <h1 className='text-3xl font-bold text-zinc-900'>Hey, I’m Danilo 👋</h1>
                        <p className='text-zinc-500'>
                            At the end of 2023, I started working on my first SaaS, writing code non-stop for an entire year. I was so focused on building it that I never thought about how I would reach users. When it was finally time to launch, I asked myself, “How do I show the world what I’ve created?” I tried social media, then writing blog articles… but nothing worked.
                        </p>
                    </div>
                </div>
                <div className='w-full flex flex-col items-start justify-start gap-6 text-start text-zinc-500'>
                    <p>
                        Then, one day, I randomly discovered Reddit. I started posting without expecting much and… BOOM! Some of my posts got 10K, 20K views. I thought I had finally found the key, but I soon realized it was just luck. Those posts happened to be in the right place at the right time, and I had no control over it. So, on a boring Friday night, with too much caffeine still in my system, I thought: “What if I could create my own luck?”
                    </p>
                    <p>
                        That weekend, I started building postonreddit, and everything changed. My posts no longer relied on luck but on a solid strategy. I learned how to make the most of Reddit, finally attracting users to my SaaS and meeting amazing people from all over the world.
                    </p>
                </div>
            </div>
        </MainContainer>
    );
}
