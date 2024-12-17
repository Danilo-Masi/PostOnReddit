// Components
import MainContainer from "../custom/MainContainer";
import WaitlistButton from "../custom/WaitlistButton";
import { BackgroundBeamsWithCollision } from "../ui/background-beams-with-collision";

export default function Banner() {
    return (
        <MainContainer>
            <BackgroundBeamsWithCollision>
                <div className="flex flex-col gap-y-3">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl text-balance font-semibold text-zinc-50">
                        <i className="font-bold">Take control</i> of your Reddit strategy
                    </h1>
                    <h3 className="text-xl md:text-2xl lg:text-2xl text-balance font-light text-zinc-100">
                        Schedule posts effortlessly, <i className="font-semibold text-zinc-50">reach more people</i>, and grow your impact. Join today and be among the first to elevate your<i className="font-semibold text-zinc-50"> Reddit game.</i>
                    </h3>
                </div>
                <WaitlistButton />
            </BackgroundBeamsWithCollision>
        </MainContainer>
    );
}
