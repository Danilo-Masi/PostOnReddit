import { Link } from "react-router"
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

function NavbarLogo() {
    return (
        <div className="md:w-1/3 h-full flex flex-row items-center justify-start">
            <h1 className="text-2xl font-bold">postonreddit</h1>
        </div>
    );
}

function NavbarLinks({ isMobile = false, onClose = () => { } }) {
    const linkClass = isMobile
        ? "block py-3 text-lg font-medium hover:text-orange-500 transition-colors"
        : "hover:text-orange-500 transition-colors";

    return (
        <div className={`${isMobile ? 'w-full' : 'md:w-1/3'} h-full flex flex-row items-center ${isMobile ? 'justify-start' : 'justify-center'}`}>
            <ul className={`flex ${isMobile ? 'flex-col w-full' : 'flex-row items-center gap-12'}`}>
                <li><Link to="/" className={linkClass} onClick={onClose}>Features</Link></li>
                <li><Link to="/" className={linkClass} onClick={onClose}>Pricing</Link></li>
                <li><Link to="/" className={linkClass} onClick={onClose}>Faq</Link></li>
            </ul>
        </div>
    );
}

function NavbarButton({ isMobile = false, onClose = () => { } }) {
    return (
        <div className={`${isMobile ? 'w-full mt-4' : 'md:w-1/3'} h-full flex ${isMobile ? 'flex-col' : 'flex-row'} items-center ${isMobile ? 'justify-start' : 'justify-end'} gap-4`}>
            <Button variant="outline" className={isMobile ? 'w-full' : ''} onClick={onClose}>Login</Button>
            <Button className={isMobile ? 'w-full' : ''} onClick={onClose}>Get Started</Button>
        </div>
    );
}

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (mobileMenuOpen && !(event.target as Element).closest('.navbar-container')) {
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [mobileMenuOpen]);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [mobileMenuOpen]);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 navbar-container ${scrolled
                ? "bg-white/80 backdrop-blur-md shadow-sm"
                : "bg-transparent"
            }`}>
            <div className="w-full h-[10svh] flex items-center justify-center border-b border-zinc-200/50">
                <div className="w-full md:w-[80%] h-full flex flex-row items-center justify-between px-4 md:px-0">
                    <NavbarLogo />

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:w-2/3 md:flex-row md:items-center md:justify-between">
                        <NavbarLinks />
                        <NavbarButton />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleMobileMenu}
                            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        >
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden fixed inset-0 top-[10svh] bg-white z-40 transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <div className="flex flex-col p-6 space-y-6">
                    <NavbarLinks isMobile={true} onClose={closeMobileMenu} />
                    <NavbarButton isMobile={true} onClose={closeMobileMenu} />
                </div>
            </div>
        </div>
    )
}
