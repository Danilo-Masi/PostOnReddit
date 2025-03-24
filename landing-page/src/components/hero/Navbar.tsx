import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router";
import icon from '../../assets/images/icon.png';

export default function Navbar() {
    return (
        <div className="w-full h-[12svh] flex items-center z-20">
            <div className="w-1/2 flex items-center justify-start gap-x-1">
                <img src={icon} className="w-1/3 md:w-1/12" />
                <h1 className="hidden md:flex font-bold text-2xl text-zinc-50">postonreddit</h1>
            </div>
            <div className="w-1/2 flex items-center justify-end gap-x-10">
                <ul className="hidden md:flex gap-x-6 text-zinc-50">
                    <li><Link to="/">Features</Link></li>
                    <li><Link to="/">Pricing</Link></li>
                    <li><Link to="/">Faqs</Link></li>
                </ul>
                <Button className="bg-orange-600 hover:bg-orange-500 hover:ring-2 hover:ring-orange-300 hover:ring-offset-2 hover:ring-offset-transparent">
                    Start posting
                    <ArrowRight />
                </Button>
            </div>
        </div>
    )
}
