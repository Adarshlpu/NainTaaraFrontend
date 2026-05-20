import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "Games", href: "#games" },
    { label: "Eye Theory", href: "#theory" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 pt-4">
      <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-lg border border-orange-100 shadow-lg rounded-full px-8 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff7a00] to-orange-600 flex items-center justify-center text-white text-lg font-bold shadow-md">
            O
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Naintaara</h1>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              className="px-5 py-2 text-sm font-medium text-gray-700 rounded-full transition-all duration-200 hover:bg-orange-100 hover:text-[#ff7a00] active:scale-95"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <button className="px-6 py-2.5 bg-[#ff7a00] hover:bg-orange-600 text-white text-sm font-semibold rounded-full transition-all duration-200 shadow-md hover:shadow-lg active:scale-95">
            Get Started →
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span className={`w-6 h-0.5 bg-gray-900 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-gray-900 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-gray-900 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu - Outside but integrated */}
      <div
        className={`lg:hidden mx-4 mt-2 bg-white/90 backdrop-blur-lg border border-orange-100 rounded-3xl overflow-hidden transition-all duration-300 ease-out origin-top ${
          isOpen ? 'max-h-96 shadow-lg' : 'max-h-0'
        }`}
      >
        <div className="px-6 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-orange-100 hover:text-[#ff7a00] transition-colors"
            >
              {item.label}
            </button>
          ))}
          <button className="w-full mt-4 px-6 py-2.5 bg-[#ff7a00] hover:bg-orange-600 text-white text-sm font-semibold rounded-full transition-colors">
            Get Started →
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;