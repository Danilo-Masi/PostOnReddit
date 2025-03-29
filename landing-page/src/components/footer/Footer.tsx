import { Link } from "react-router";

export default function Footer() {
    return (
        <div className="w-[90%] md:w-[80%] h-auto flex flex-col md:flex-row gap-y-10 mt-40 mb-20">
            <div className="w-full md:w-1/2 h-auto flex flex-col items-center md:items-start gap-3">
                <h1 className="text-2xl md:text-lg font-extrabold">postonreddit</h1>
                <h3 className="max-w-xs text-zinc-500 text-center md:text-start md:text-sm">Effortlessly schedule Reddit posts and reach your audience at the right time</h3>
            </div>
            <div className="w-full md:w-1/2 h-auto flex flex-col md:flex-row md:justify-end items-center md:items-start text-center md:text-start gap-10">
                <div className="flex flex-col gap-6">
                    <p className="text-lg md:text-base font-semibold">More</p>
                    <ul className="text-zinc-500 md:text-sm">
                        <li><a href="https://www.describify.it" target="_blank">Describify</a></li>
                    </ul>
                </div>
                <div className="flex flex-col gap-6">
                    <p className="text-lg md:text-base font-semibold">Legal</p>
                    <ul className="flex flex-col gap-3 text-zinc-500 md:text-sm">
                        <li><Link to="/">Terms of services</Link></li>
                        <li><Link to="/">Privacy policy</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}