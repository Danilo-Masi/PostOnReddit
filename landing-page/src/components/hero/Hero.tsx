// Components
import MainContainer from "../custom/MainContainer";
import WaitlistButton from "../custom/WaitlistButton";
import { BackgroundLines } from "../ui/backgound-lines";

export default function Hero({ id }: { id: string }) {
    return (
        <MainContainer marginTop="mt-0" minHeigth="min-h-svh" id={id}>
            <BackgroundLines className="flex flex-col items-center justify-center gap-y-12">
                <div className="flex flex-col items-center justify-center gap-y-6">
                    <h1 className="text-6xl text-balance font-bold text-zinc-900 z-40">
                        Reach your audience at the
                        <span className="text-zinc-50 bg-orange-500 px-4 pb-2 ml-2 rounded-xl">
                            perfect moment
                        </span>
                    </h1>
                    <h3 className="text-xl font-light text-zinc-500 z-40">
                        Write once, schedule effortlessly, <br />and reach <span className="text-orange-500 font-bold">Reddit</span> at its best.
                    </h3>
                </div>
                <WaitlistButton buttonStyle="bg-orange-500 hover:bg-orange-600" />
            </BackgroundLines>
        </MainContainer>
    );
}
