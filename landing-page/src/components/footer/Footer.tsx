// Components
import FooterContainer from "./FooterContainer"

export default function Footer() {
    return (
        <div className="w-full h-auto flex flex-col md:flex-row items-start gap-6 my-12">
            <FooterContainer width="md:w-2/5">
                <h1 className='text-xl md:text-3xl font-bold text-zinc-900'>poston<span className='text-orange-500'>reddit</span></h1>
                <h3 className="text-base font-light text-zinc-500 max-w-sm md:text-left text-center">
                    Effortlessly schedule Reddit posts and reach your audience at the right time
                </h3>
                <p className="text-base font-light text-zinc-500">Made with ☕ and 🍕 by <span className="hover:text-orange-500"><a href="https://x.com/dmasiiii" target="_blank">Danilo</a></span></p>
            </FooterContainer>
            <FooterContainer>
                <h3 className="text-lg font-semibold text-zinc-900">Links</h3>
                <ul className="font-light text-zinc-500 flex flex-col gap-y-1 cursor-pointer">
                    <li>Home</li>
                    <li>Features</li>
                    <li>Prices</li>
                    <li>Faqs</li>
                </ul>
            </FooterContainer>
            <FooterContainer>
                <h3 className="text-lg font-semibold text-zinc-900">Legal</h3>
                <ul className="font-light text-zinc-500 flex flex-col gap-y-1 cursor-pointer">
                    <li>Terms of services</li>
                    <li>Privacy policy</li>
                    <li>Cookie policy</li>
                </ul>
            </FooterContainer>
            <FooterContainer>
                <h3 className="text-lg font-semibold text-zinc-900">Other by me</h3>
                <ul className="font-light text-zinc-500 flex flex-col gap-y-1 cursor-pointer">
                    <li><a href="https://www.describify.it" target="_blank" className="hover:text-orange-500">Describify</a></li>
                </ul>
            </FooterContainer>
        </div>
    );
}
