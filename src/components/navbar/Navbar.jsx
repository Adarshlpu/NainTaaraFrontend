import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Menu, X, ChevronRight } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll boundaries cleanly to toggle compact padding shifts
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile navigation layout dynamically on routing changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "How It Works", href: "#features" },
    { label: "Vision Programs", href: "#games" },
    { label: "For Parents", href: "#theory" },
    { label: "FAQ", href: "#contact" },
  ];

  const scrollToSection = (href) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -4 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.04, duration: 0.25, ease: "easeOut" },
    }),
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.2, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.15, ease: "easeInOut" },
    },
  };

  return (
    // 💡 DUB THEME: Completely flat white canvas header strip with crisp light grey bottom divider hairline
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 bg-[#ffffff] border-b border-[#e5e5e5] ${
        scrolled ? "py-2.5 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]" : "py-4"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 flex items-center justify-between">
        
        {/* ==================== CRISP LOGO SECTION ==================== */}
        <Link 
          to="/" 
          className="flex items-center gap-3 shrink-0 group select-none"
          onClick={() => scrollToSection("#home")}
        >
          {/* 💡 FIXED: Configured icon background to use the exact matching brand Orange/Yellow token (#ea580c) */}
          <div className="w-9 h-9 rounded-lg bg-[#ea580c] flex items-center justify-center transition-opacity group-hover:opacity-90 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
            <Eye className="w-5 h-5 text-white stroke-[2]" />
          </div>
          
          <div className="flex flex-col text-left">
            <h1 className="text-lg font-bold tracking-tight text-[#0a0a0a] font-sans leading-none uppercase">
              Nainocular
            </h1>
            <span className="text-[10px] text-[#404040] font-medium tracking-normal mt-0.5">
              Powered by Naintaara
            </span>
          </div>
        </Link>

        {/* ==================== DESKTOP LINK MATRIX ==================== */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item, index) => (
            <motion.button
              key={item.label}
              custom={index}
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              onClick={() => scrollToSection(item.href)}
              className="px-3.5 py-1.5 text-sm font-medium text-[#404040] hover:text-[#0a0a0a] hover:bg-[#f5f5f5] rounded-md transition-all font-sans"
            >
              {item.label}
            </motion.button>
          ))}
        </nav>

        {/* ==================== DESKTOP CORES CALL-TO-ACTION ==================== */}
        <div className="hidden lg:flex items-center">
          <button 
            onClick={() => navigate("/login")}
            className="h-9 px-4 bg-[#ea580c] hover:bg-[#c2410c] text-white font-medium text-sm rounded-lg transition-all flex items-center gap-1 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] cursor-pointer active:scale-[0.98]"
          >
            Get Started
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Mobile Menu Action Toggle Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-[#0a0a0a] hover:bg-[#f5f5f5] transition-colors rounded-lg"
          aria-label="Toggle Navigation Panel"
        >
          {isOpen ? <X className="w-5 h-5 stroke-[2]" /> : <Menu className="w-5 h-5 stroke-[2]" />}
        </button>

      </div>

      {/* ==================== MOBILE COMPACT OVERLAY STACK ==================== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="lg:hidden w-full bg-white border-t border-[#e5e5e5] mt-2 text-left absolute left-0 shadow-md"
          >
            <div className="max-w-[1200px] mx-auto px-6 py-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-[#171717] rounded-lg hover:bg-[#f5f5f5] hover:text-[#0a0a0a] transition-colors flex items-center justify-between"
                >
                  {item.label}
                  <ChevronRight className="w-4 h-4 text-[#d4d4d4]" />
                </button>
              ))}
              
              {/* Mobile CTA Border Block */}
              <div className="pt-3 mt-2 border-t border-[#e5e5e5] px-2">
                <button 
                  onClick={() => navigate("/login")}
                  className="w-full h-10 bg-[#ea580c] text-white font-medium text-sm rounded-lg flex items-center justify-center gap-1 transition-all active:scale-[0.99]"
                >
                  Get Started
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;