import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Verify", path: "/verify" },
        { name: "News", path: "/news" },
    ];

    return (
        <header className="sticky top-0 z-50 bg-[#0a0118] border-b border-violet-900/20 py-3 md:py-4 shadow-2xl">
            <div className="container-constrained px-6 md:px-10">
                <div className="grid grid-cols-2 md:grid-cols-3 items-center w-full">

                    {/* Left: Brand */}
                    <div className="flex justify-start">
                        <Link to="/" className="flex items-center gap-2 group">
                            <span className="text-xl font-black text-white group-hover:text-violet-500 transition-colors tracking-tighter uppercase">
                                FalsifAI
                            </span>
                        </Link>
                    </div>

                    {/* Center: Welcome Statement */}
                    <div className="hidden md:flex justify-center">
                        <span className="text-[10px] font-black text-violet-500/60 uppercase tracking-[0.4em] whitespace-nowrap">
                            Welcome to FalsifAI Portal
                        </span>
                    </div>

                    {/* Right: Navigation Links */}
                    <div className="flex justify-end">
                        <nav className="flex items-center gap-6 md:gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`text-[10px] font-black uppercase tracking-[0.25em] transition-all hover:text-violet-500 ${location.pathname === link.path
                                        ? "text-violet-500 font-bold"
                                        : "text-violet-300/40"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
