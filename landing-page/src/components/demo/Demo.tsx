import Headline from "../custom/Headline";

export default function Demo() {
    return (
        <div className="w-full h-auto min-h-svh flex flex-col items-center justify-start bg-background" id="demo">
            <div className="w-[90%] md:w-[80%] h-auto flex flex-col items-center justify-center py-24 md:py-32">
                <Headline
                    section="Demo"
                    title="See how postonreddit works"
                    description="Too lazy to read? No worries. Watch this quick demo and see how easy it is to post like a pro without lifting a finger."
                />
                <div className="w-full h-auto flex flex-col items-center justify-center rounded-xl">
                    demo
                </div>
            </div>
        </div>
    )
}
