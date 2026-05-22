import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Menu, X } from "lucide-react";

// Shadcn UI Elements
import { Button } from "../ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "Games", href: "#games" },
    { label: "Eye Theory", href: "#theory" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href) => {
    setIsOpen(false);
    
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 pt-4 antialiased">
      {/* MNC Standard Premium Bar Container */}
      <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-md border border-neutral-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.03),0_1px_2px_rgb(0,0,0,0.01)] rounded-[20px] px-6 sm:px-8 py-3.5 flex items-center justify-between transition-all">
        
        {/* 🌟 LOGO OVERHAUL: Custom Tech-Ophthalmology Premium Identity */}
        <div className="flex items-center gap-3 flex-shrink-0 group cursor-pointer">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff7a00] to-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-500/20 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
            {/* Main Eye Grid Icon */}
            <Eye className="w-5.5 h-5.5 text-white stroke-[2.5]" />
            
            {/* 💎 AI Target Tracking Dot: Human Hand-Crafted Detail */}
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-white rounded-full ring-2 ring-[#ff7a00] animate-pulse" />
          </div>
          
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight text-neutral-900 leading-none">Naintaara</h1>
            <span className="text-[9px] text-[#ff7a00] font-bold tracking-widest uppercase mt-1">Eye Fitness</span>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              className="px-4 py-1.5 text-sm font-semibold text-neutral-600 rounded-xl transition-all duration-150 hover:bg-neutral-50 hover:text-[#ff7a00]"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* MNC Grade Premium CTA Block */}
        <div className="hidden lg:flex items-center">
          <Button 
            asChild 
            className="h-11 px-6 bg-[#ff7a00] hover:bg-orange-600 text-white font-bold rounded-xl border-0 text-sm shadow-md shadow-orange-500/10 transition-all duration-200 active:scale-[0.985] hover:-translate-y-[1px]"
          >
            <Link to="/login">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-neutral-600 hover:text-[#ff7a00] transition-colors focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Panel Layer */}
      <div
        className={`lg:hidden mx-4 mt-2 bg-white rounded-[20px] border border-neutral-200/60 overflow-hidden transition-all duration-300 ease-out origin-top ${
          isOpen ? "max-h-96 shadow-xl opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-5 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              className="w-full text-left px-4 py-2 text-sm font-semibold text-neutral-600 rounded-xl hover:bg-neutral-50 hover:text-[#ff7a00] transition-colors"
            >
              {item.label}
            </button>
          ))}
          
          {/* Mobile CTA */}
          <div className="pt-3 border-t border-neutral-100 mt-2">
            <Button 
              asChild 
              className="w-full h-11 bg-[#ff7a00] hover:bg-orange-600 text-white font-bold rounded-xl border-0 text-sm shadow-none"
            >
              <Link to="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;