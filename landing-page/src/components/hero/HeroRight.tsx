import demo from '../../assets/images/demo.mp4';

export default function HeroRight() {
    return (
        <div className="w-full md:w-1/2 h-auto md:min-h-[90svh] flex flex-col md:items-end md:justify-center justify-start mb-10 md:mb-0">
            <div className='w-fit p-3 bg-zinc-100 rounded-lg z-20'>
                <video src={demo} autoPlay className='w-full md:w-5/6' />
            </div>
        </div>
    )
}
