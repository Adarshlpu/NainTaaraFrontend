import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Menu, X, ChevronRight } from "lucide-react";

// Shadcn UI Elements
import { Button } from "../ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for premium glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "Games", href: "#games" },
    { label: "Eye Therapy", href: "#theory" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Animation variants
  const navItemVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0, y: -20 },
    visible: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94], staggerChildren: 0.04 },
    },
    exit: {
      opacity: 0,
      height: 0,
      y: -20,
      transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 px-4 pt-4 transition-all duration-300 ${
        scrolled ? "pt-3" : ""
      }`}
    >
      {/* Premium Glass Container */}
      <motion.div
        className={`max-w-7xl mx-auto backdrop-blur-xl border transition-all duration-300 rounded-2xl px-5 sm:px-7 py-3 
          flex items-center justify-between
          ${scrolled 
            ? "bg-white/70 border-neutral-200/60 shadow-lg shadow-neutral-900/5" 
            : "bg-white/50 border-neutral-200/40 shadow-md shadow-neutral-900/3"
          }`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        
        {/* ✨ Premium Logo Section */}
        <Link 
          to="/" 
          className="flex items-center gap-3 flex-shrink-0 group"
          onClick={() => scrollToSection("#home")}
        >
          {/* Animated Logo Icon */}
          <motion.div
            className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff7a00] via-[#ff9f43] to-[#ff7a00] 
                      flex items-center justify-center shadow-lg shadow-[#ff7a00]/20"
            whileHover={{ scale: 1.05, rotate: 3 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <Eye className="w-5.5 h-5.5 text-white stroke-[2.5]" />
            {/* Premium AI Pulse Dot */}
            <motion.span
              className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-white rounded-full border-2 border-[#ff7a00]"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
          </motion.div>
          
          {/* Brand Text - Premium Typography */}
          <div className="flex flex-col justify-center">
            <h1 className="text-lg sm:text-xl font-black tracking-tight text-neutral-900 leading-none">
              NAINOCULAR
            </h1>
            <span className="text-[10px] text-[#ff7a00] font-bold tracking-wider uppercase mt-0.5">
              by Naintaara
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navItems.map((item, index) => (
            <motion.button
              key={item.label}
              custom={index}
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              onClick={() => scrollToSection(item.href)}
              className="group relative px-4 py-2 text-sm font-semibold text-neutral-600 
                       rounded-xl transition-colors duration-200 hover:text-[#ff7a00]"
            >
              {item.label}
              {/* Subtle hover indicator */}
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 
                           bg-gradient-to-r from-[#ff7a00] to-[#ff9f43] rounded-full
                           group-hover:w-3/4 transition-all duration-300" />
            </motion.button>
          ))}
        </nav>

        {/* Desktop CTA + Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Button 
            asChild 
            className="h-10 px-5 bg-gradient-to-r from-[#ff7a00] to-[#ff9f43] 
                     hover:from-[#ff9f43] hover:to-[#ff7a00] 
                     text-white font-bold rounded-xl border-0 text-sm 
                     shadow-md shadow-[#ff7a00]/15 
                     transition-all duration-200 active:scale-[0.98]"
          >
            <Link to="/login" className="flex items-center gap-1.5">
              Get Started
              <ChevronRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-neutral-600 hover:text-[#ff7a00] 
                   transition-colors rounded-lg hover:bg-neutral-100/50"
          whileTap={{ scale: 0.95 }}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
              >
                <X className="w-5 h-5" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.15 }}
              >
                <Menu className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* ✨ Premium Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="lg:hidden mx-4 mt-2 bg-white/95 backdrop-blur-xl 
                     rounded-2xl border border-neutral-200/60 overflow-hidden 
                     shadow-xl shadow-neutral-900/10"
          >
            <div className="px-5 py-4 space-y-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  custom={index}
                  variants={navItemVariants}
                  onClick={() => scrollToSection(item.href)}
                  className="w-full text-left px-4 py-3 text-sm font-semibold text-neutral-700 
                           rounded-xl hover:bg-neutral-50 hover:text-[#ff7a00] 
                           transition-colors duration-200 flex items-center justify-between group"
                >
                  {item.label}
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 
                                       group-hover:translate-x-1 transition-all duration-200" />
                </motion.button>
              ))}
              
              {/* Mobile CTA */}
              <div className="pt-4 mt-2 border-t border-neutral-100">
                <Button 
                  asChild 
                  className="w-full h-11 bg-gradient-to-r from-[#ff7a00] to-[#ff9f43] 
                           hover:from-[#ff9f43] hover:to-[#ff7a00] 
                           text-white font-bold rounded-xl border-0 text-sm 
                           shadow-md shadow-[#ff7a00]/15"
                >
                  <Link to="/login" className="flex items-center justify-center gap-1.5">
                    Get Started
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;