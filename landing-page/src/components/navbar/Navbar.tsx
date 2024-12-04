// Components
import WaitlistButton from "../custom/WaitlistButton";

export default function Navbar() {
    return (
        <div className="w-[90%] md:w-[80%] h-[10svh] flex items-center justify-between px-3 rounded-xl fixed z-50 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50 border border-zinc-200 bg-zinc-100">
            <h1 className='text-xl md:text-3xl font-bold text-zinc-900'>poston<span className='text-orange-500'>reddit</span></h1>
            <ul className="hidden md:flex gap-x-3 cursor-pointer">
                <li>Home</li>
                <li>Features</li>
                <li>Prices</li>
                <li>Faqs</li>
            </ul>
            <WaitlistButton buttonStyle="bg-orange-500 hover:bg-orange-600"/>
        </div>
    );
}
