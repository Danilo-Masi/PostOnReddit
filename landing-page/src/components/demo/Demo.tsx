import Headline from "../custom/Headline";

export default function Demo() {
    return (
        <div className="w-full h-auto min-h-svh flex flex-col items-center justify-start bg-white" id="demo">
            <div className="w-[90%] md:w-[80%] h-auto flex flex-col items-center justify-center py-24 md:py-32">
                <Headline
                    section="Demo"
                    title="See postonreddit in action"
                    description="Experience how postonreddit can transform your Reddit strategy. Watch as we showcase the key features and benefits that will help you grow your community and increase engagement."
                />
                <div className="w-full  h-auto flex flex-col items-center justify-center rounded-xl bg-zinc-200">
                    <iframe
                        className="w-full h-full rounded-xl aspect-video"
                        src="https://www.youtube-nocookie.com/embed/bVbnNEYqDwQ?si=ciciiMMpATJfPZRz&amp;controls=0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                </div>
            </div>
        </div>
    )
}
