import { Link } from "react-router";
import { scrollToElement } from "@/utility/useAnimation";
import logo from "../../assets/images/icon.png";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center justify-center bg-zinc-900 text-zinc-300">
      {/* Main Footer Content */}
      <div className="w-[90%] md:w-[80%] flex flex-col md:flex-row items-start justify-center gap-x-4 gap-y-12 py-16">
        {/* Brand Section */}
        <div className="w-full md:w-1/4 flex flex-col items-center md:items-start justify-start space-y-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <img src={logo} alt="PostOnReddit Logo" className="h-10 w-10" />
            <span className="text-xl font-bold text-white">postonreddit</span>
          </div>
          <p className="text-zinc-400 leading-relaxed">
            Optimize your Reddit presence with our intelligent posting tool. Schedule, analyze, and grow your community with data-driven insights.
          </p>
        </div>

        {/* Product Links */}
        <div className="w-full md:w-1/4 flex flex-col items-center justify-start space-y-6 text-center">
          <h3 className="text-lg font-semibold text-white">Product</h3>
          <ul className="space-y-3">
            <li>
              <Link to="/" onClick={() => scrollToElement("#features")} className="hover:text-white transition-colors">
                Features
              </Link>
            </li>
            <li>
              <Link to="/" onClick={() => scrollToElement("#pricing")} className="hover:text-white transition-colors">
                Pricing
              </Link>
            </li>
            {/*<li>
              <Link to="/" onClick={() => scrollToElement("#demo")} className="hover:text-white transition-colors">
                Demo
              </Link>
            </li>
            */}
            <li>
              <Link to="/" onClick={() => scrollToElement("#faq")} className="hover:text-white transition-colors">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Links */}
        <div className="w-full md:w-1/4 flex flex-col items-center justify-start space-y-6 text-center">
          <h3 className="text-lg font-semibold text-white">Legal</h3>
          <ul className="space-y-3">
            <li>
              <Link to="/terms" onClick={() => scrollTo(0, 0)} className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/privacy" onClick={() => scrollTo(0, 0)} className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources Links */}
        <div className="w-full md:w-1/4 flex flex-col items-center justify-start space-y-6 text-center">
          <h3 className="text-lg font-semibold text-white">Resources</h3>
          <ul className="space-y-3">
            <li>
              <a href="https://www.reddit.com/user/WerewolfCapital4616" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Reddit
              </a>
            </li>
            <li>
              <a href="https://x.com/dmasiiii" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Twitter (X)
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full border-t border-zinc-800">
        <div className="w-[90%] md:w-[80%] mx-auto py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} postonreddit. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-zinc-500">
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
