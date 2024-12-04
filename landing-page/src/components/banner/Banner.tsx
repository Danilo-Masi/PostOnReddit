// Components
import MainContainer from "../custom/MainContainer";
import WaitlistButton from "../custom/WaitlistButton";

export default function Banner() {
    return (
        <MainContainer>
            <div className="w-full h-[80svh] flex flex-col items-center justify-center gap-y-12 rounded-xl bg-orange-500">
                <div className="flex flex-col gap-y-3">
                    <h1 className="text-5xl md:text-6xl max-w-xl font-bold text-zinc-50">
                        TAKE CONTROL of your Reddit strategy
                    </h1>
                    <h3 className="text-xl font-light text-balance max-w-xl text-zinc-200">
                        Schedule posts effortlessly, reach more people, and grow your impact. Join today and be among the first to elevate your Reddit game.
                    </h3>
                </div>
                <WaitlistButton />
            </div>
        </MainContainer>
    );
}
