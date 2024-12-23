// Components
import MainContainer from "../custom/MainContainer";
import WaitlistButton from "../custom/WaitlistButton";
import { BackgroundLines } from "../ui/backgound-lines";

export default function Hero({ id }: { id: string }) {
    return (
        <MainContainer marginTop="mt-0" minHeigth="min-h-svh" id={id}>
            <BackgroundLines className="flex flex-col items-center justify-center gap-y-12">
                <div className="flex flex-col items-center justify-center gap-y-6">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl text-balance font-bold text-zinc-900 z-40">
                        Reach your audience at the
                        <span className="text-zinc-50 bg-orange-500 px-4 pb-2 ml-2 rounded-xl">
                            perfect moment
                        </span>
                    </h1>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-zinc-500 z-40">
                        Write once, schedule effortlessly, <br />and reach <span className="text-orange-500 font-bold">Reddit</span> at its best.
                    </h3>
                </div>
                <div className="w-full flex flex-col items-center justify-center gap-y-3 z-30">
                    <p className="font-basic text-zinc-900">🎉 <b className="italic">+3 free</b> credits for early sign-ups!</p>
                    <WaitlistButton buttonStyle="bg-orange-500 hover:bg-orange-600" />
                </div>
            </BackgroundLines>
        </MainContainer>
    );
}
