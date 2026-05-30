import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye, Smartphone, Brain, MessageSquare, ChevronDown, Target, LineChart, Sparkles, ShieldCheck
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import heroImage from "../../assets/images/h1.png";
import homeim from "../../assets/images/fa.png";

// ==================== INTERACTIVE GAME ILLUSTRATIONS (SVGs) ====================
const EyeBlinkIllustration = () => (
  <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <style>{`
      .blink-lid { animation: blinkLid 3s ease-in-out infinite; transform-origin: 80px 74px; }
      @keyframes blinkLid {
        0%,40%,60%,100% { transform: scaleY(0); }
        48%,52% { transform: scaleY(1); }
      }
      .pulse-ring { animation: pulseRing 2s ease-in-out infinite; transform-origin: 80px 80px; }
      @keyframes pulseRing {
        0%,100% { opacity:0.15; transform: scale(0.85); }
        50% { opacity:0.5; transform: scale(1.1); }
      }
    `}</style>
    <ellipse cx="80" cy="80" rx="52" ry="30" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5"/>
    <circle cx="80" cy="80" r="16" fill="#1d4ed8"/>
    <circle cx="80" cy="80" r="9" fill="#0f172a"/>
    <circle cx="74" cy="74" r="3" fill="white" opacity="0.8"/>
    <rect x="28" y="50" width="104" height="30" rx="4" fill="#1e40af" className="blink-lid"/>
    <ellipse cx="80" cy="80" rx="60" ry="38" fill="none" stroke="#93c5fd" strokeWidth="1" className="pulse-ring"/>
  </svg>
);

const ShapeFusionIllustration = () => (
  <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <style>{`
      .s1 { animation: float1 2.8s ease-in-out infinite; }
      .s2 { animation: float2 2.4s ease-in-out infinite; }
      .s3 { animation: float3 3.2s ease-in-out infinite; }
      .s4 { animation: float4 2.6s ease-in-out infinite; }
      @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
      @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)} }
      @keyframes float3 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
      @keyframes float4 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
    `}</style>
    <rect x="30" y="35" width="40" height="40" rx="6" fill="#a855f7" className="s1"/>
    <polygon points="110,35 130,75 90,75" fill="#6366f1" className="s2"/>
    <ellipse cx="42" cy="110" rx="22" ry="16" fill="#ec4899" className="s3"/>
    <rect x="88" y="95" width="36" height="36" rx="18" fill="#8b5cf6" className="s4"/>
  </svg>
);

const OddNOutIllustration = () => (
  <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <style>{`
      .oddout-odd { animation: wobble 2s ease-in-out infinite; transform-origin: 120px 100px; }
      @keyframes wobble {
        0%,100%{transform:scale(1)} 30%{transform:scale(1.15)} 70%{transform:scale(1.15)}
      }
      .ring-pulse { animation: rpulse 2s ease-in-out infinite; }
      @keyframes rpulse { 0%,100%{opacity:0} 50%{opacity:0.35} }
    `}</style>
    <circle cx="40" cy="60" r="18" fill="#f97316"/>
    <circle cx="80" cy="60" r="18" fill="#f97316"/>
    <circle cx="120" cy="60" r="18" fill="#f97316"/>
    <circle cx="40" cy="100" r="18" fill="#f97316"/>
    <circle cx="80" cy="100" r="18" fill="#f97316"/>
    <circle cx="120" cy="100" r="22" fill="#0ea5e9" className="oddout-odd"/>
    <circle cx="120" cy="100" r="32" fill="none" stroke="#0ea5e9" strokeWidth="1.5" className="ring-pulse"/>
  </svg>
);

const TrackingIllustration = () => (
  <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <style>{`
      .dot-move { animation: moveDot 3s ease-in-out infinite; }
      @keyframes moveDot {
        0%   { transform: translate(0,0); }
        20%  { transform: translate(30px,-20px); }
        40%  { transform: translate(50px,10px); }
        60%  { transform: translate(20px,35px); }
        80%  { transform: translate(-20px,15px); }
        100% { transform: translate(0,0); }
      }
    `}</style>
    <circle cx="80" cy="80" r="50" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="4 4" opacity="0.3"/>
    <circle cx="80" cy="80" r="35" fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.2"/>
    <circle cx="80" cy="80" r="20" fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.3"/>
    <g transform="translate(55,68)">
      <circle cx="25" cy="12" r="11" fill="#16a34a" className="dot-move"/>
      <circle cx="25" cy="12" r="5" fill="white" className="dot-move"/>
    </g>
  </svg>
);

// ==================== SLIDER METRICS CONSTANTS DATA GRID ====================
const slides = [
  {
    badge: { icon: <Sparkles className="w-3 h-3" />, text: "Trusted by Parents" },
    badgeClass: "bg-[#f5f5f5] text-[#171717] border border-[#e5e5e5]",
    bg: "bg-[#ffffff]",
    heading: "Start Your Child's Vision Journey Today",
    headingClass: "text-[#0a0a0a]",
    sub: "Join thousands of parents who trust Naintaara for functional eye development. Engage with clean, validated screen sessions.",
    subClass: "text-[#404040]",
    stats: [
      { num: "12K+", label: "Happy Kids" },
      { num: "98%", label: "Parent Approval" },
      { num: "6+", label: "Eye Games" },
    ],
    statNumClass: "text-[#ea580c]",
    statLabelClass: "text-[#404040]",
    primaryBtn: { text: "Get Started", class: "bg-[#000000] text-[#ffffff] hover:bg-[#171717]", action: "start" },
    secondaryBtn: { text: "Learn More", class: "bg-[#ffffff] text-[#0a0a0a] border border-[#e5e5e5] hover:bg-[#f5f5f5]", action: "games" },
  },
  {
    badge: { icon: <Eye className="w-3 h-3" />, text: "AI-Powered Games" },
    badgeClass: "bg-white/15 text-[#fff7ed] border border-white/30",
    bg: "bg-[#ea580c]",
    heading: "Fun Eye Exercises That Actually Work",
    headingClass: "text-white",
    sub: "Clinically designed mini-games make eye therapy feel like play. Kids improve focus, tracking, and convergence — without even knowing it.",
    subClass: "text-white/90",
    stats: [
      { num: "5 Min", label: "Daily Session" },
      { num: "30 Day", label: "Results" },
      { num: "Free", label: "To Start" },
    ],
    statNumClass: "text-white",
    statLabelClass: "text-white/70",
    primaryBtn: { text: "Play Now", class: "bg-white text-[#ea580c] font-medium hover:bg-[#fff7ed]", action: "games" },
    secondaryBtn: { text: "See All Games", class: "bg-transparent text-white border border-white/30 hover:bg-white/10", action: "games" },
  },
  {
    badge: { icon: <ShieldCheck className="w-3 h-3" />, text: "Screen Safe" },
    badgeClass: "bg-[#262626] text-[#fb923c] border border-[#404040]",
    bg: "bg-[#0a0a0a]",
    heading: "Doctor-Validated. Screen Time That Heals.",
    headingClass: "text-[#f5f5f5]",
    sub: "Unlike passive screen time, Nainocular sessions are purposeful. Every minute strengthens your child's eyes instead of straining them.",
    subClass: "text-[#404040]",
    stats: [
      { num: "0", label: "Ads Ever" },
      { num: "100%", label: "Safe Content" },
      { num: "4.9★", label: "Rating" },
    ],
    statNumClass: "text-[#ea580c]",
    statLabelClass: "text-[#404040]",
    primaryBtn: { text: "Get Started Free", class: "bg-[#ea580c] text-white hover:bg-[#c2410c]", action: "start" },
    secondaryBtn: { text: "Read Research", class: "bg-transparent text-[#a3a3a3] border border-[#262626] hover:bg-[#171717]", action: "about" },
  },
];

// FIXED: Moved globally so it's accessible anywhere within the file frame structure
const faqs = [
  { q: "Is it safe for screen time?", a: "Yes. Unlike passive streaming, our exercises engage eye muscles actively. Sessions are limited to 15 minutes daily to prevent strain while effectively training focus." },
  { q: "What age does it work for?", a: "Naintaara is optimized for kids aged 4 to 14 years during critical visual development stages. Games automatically adjust difficulty based on performance metrics." },
  { q: "Do we need a prescription?", a: "No prescription is required. It serves as home fitness for eyes. However, we recommend regular eye specialist checkups to track overall recovery." },
  { q: "How long till we see results?", a: "Most parents report noticeable improvements in children's visual tracking, depth perception, and focus accuracy within 4 to 6 weeks of daily disciplined play." },
  { q: "Will it work alongside glasses?", a: "Yes. Naintaara trains visual brain processing tracking paths. Children should wear their normally prescribed reading or distance glasses while playing the games." },
  { q: "Is it covered by insurance?", a: "Currently, digital eye tracking treatments are out-of-pocket expenses. For specific clinic documentation or help, reach out directly on our Contact Page." },
];

// ==================== SUB COMPONENT: CTA SLIDER BANNER MODULE ====================
const CtaBanner = ({ handleStartPlaying }) => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const progressRef = useRef(null);

  const goTo = (idx) => {
    setCurrent(idx);
    setProgress(0);
    clearTimeout(timerRef.current);
    clearInterval(progressRef.current);

    let p = 0;
    progressRef.current = setInterval(() => {
      p += 100 / 30;
      setProgress(Math.min(p, 100));
    }, 100);

    timerRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
  };

  useEffect(() => {
    goTo(0);
    return () => {
      clearTimeout(timerRef.current);
      clearInterval(progressRef.current);
    };
  }, []);

  useEffect(() => {
    goTo(current);
  }, [current]);

  const handleAction = (action) => {
    if (action === "start") handleStartPlaying();
    else if (action === "games") navigate("/games");
    else if (action === "about") navigate("/about");
  };

  const slide = slides[current];

  return (
    <section id="contact" className="border-t border-[#e5e5e5] overflow-hidden bg-[#ffffff]">
      <div
        className={`relative ${slide.bg} py-16 sm:py-20 px-4 sm:px-6 text-center transition-colors duration-500 min-h-[420px] sm:min-h-[380px] flex items-center justify-center`}
      >
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center w-full">
          <span className={`inline-flex items-center gap-1.5 text-[10px] font-medium tracking-wider uppercase px-3.5 py-1 rounded-full mb-5 font-mono ${slide.badgeClass}`}>
            {slide.badge.icon}
            {slide.badge.text}
          </span>

          <h2 className={`font-semibold text-xl sm:text-4xl leading-tight mb-5 tracking-tight font-['Satoshi',sans-serif] ${slide.headingClass}`}>
            {slide.heading}
          </h2>

          <div className="flex gap-4 sm:gap-8 justify-center mb-6 flex-wrap font-mono">
            {slide.stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center min-w-[65px] sm:min-w-[70px]">
                <span className={`text-lg sm:text-2xl font-bold tracking-tight ${slide.statNumClass}`}>{s.num}</span>
                <span className={`text-[10px] sm:text-[11px] font-sans font-normal mt-0.5 ${slide.statLabelClass}`}>{s.label}</span>
              </div>
            ))}
          </div>

          <p className={`text-xs sm:text-sm leading-relaxed max-w-lg mb-8 font-normal font-sans px-2 ${slide.subClass}`}>
            {slide.sub}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center w-full sm:w-auto px-4 sm:px-0">
            <button
              onClick={() => handleAction(slide.primaryBtn.action)}
              className={`h-10 px-6 rounded-lg text-xs sm:text-sm font-medium transition-all active:scale-[0.98] cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.05)] border-0 w-full sm:w-auto ${slide.primaryBtn.class}`}
            >
              {slide.primaryBtn.text}
            </button>
            <button
              onClick={() => handleAction(slide.secondaryBtn.action)}
              className={`h-10 px-6 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer w-full sm:w-auto ${slide.secondaryBtn.class}`}
            >
              {slide.secondaryBtn.text}
            </button>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 h-[2px] bg-[#ea580c] opacity-40 transition-none"
          style={{ width: `${progress}%`, transition: progress === 0 ? "none" : "width 0.1s linear" }}
        />
      </div>

      <div className="flex justify-center gap-2 py-4 bg-[#ffffff] border-t border-[#e5e5e5]">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === current ? "bg-[#ea580c] scale-125" : "bg-[#d4d4d4]"}`}
            aria-label={`Go to slide index ${i}`}
          />
        ))}
      </div>
    </section>
  );
};

// ==================== MAIN MASTER ROUTE COMPONENT ====================
const Home = () => {
  const navigate = useNavigate();
  const words = ["Vision Therapy", "Myopia Control", "Lazy Eye Recovery", "Eye Muscle Fitness"];
  const [index, setIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  
  const [activeTab, setActiveTab] = useState("All");
  const categories = ["All", "Tracking", "Focus", "Coordination"];

  const games = [
    { 
      emoji: "👁️", 
      title: "Eye Blink Detection", 
      category: "Focus",
      desc: "Blink-based exercises using face tracking to improve focus and eye muscle strength.", 
      illustration: <EyeBlinkIllustration />,
      color: "from-blue-500 to-indigo-500"
    },
    { 
      emoji: "🔷", 
      title: "Shape Fusion", 
      category: "Coordination",
      desc: "Stereoscopic fusion mini-games engineered cleanly to support depth calibration.", 
      illustration: <ShapeFusionIllustration />,
      color: "from-purple-500 to-fuchsia-500"
    },
    { 
      emoji: "🎨", 
      title: "Odd N Out", 
      category: "Focus",
      desc: "Fast-paced visual processing tasks designed to improve target search metrics.", 
      illustration: <OddNOutIllustration />,
      color: "from-amber-500 to-orange-500"
    },
    { 
      emoji: "🎯", 
      title: "Tracking Challenge", 
      category: "Tracking",
      desc: "Track fast-moving continuous vector points to eliminate reading path drift errors.", 
      illustration: <TrackingIllustration />,
      color: "from-emerald-500 to-teal-500"
    },
  ];

  const filteredGames = activeTab === "All" 
    ? games 
    : games.filter(game => game.category === activeTab);

  const handleStartPlaying = () => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
    else navigate("/login");
  };

  const toggleFaq = (idx) => setOpenFaq(openFaq === idx ? null : idx);

  const handleWhatsAppRedirect = () => {
    const phoneNumber = "919205050993";
    const textMessage = encodeURIComponent("Hello Naintaara Team! I want to know more about the Eye Fitness games and vision training for my child.");
    window.open(`https://wa.me/${phoneNumber}?text=${textMessage}`, "_blank");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // ==================== ANIMATION VARIANTS ====================
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  };

  const fadeLeftVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  const fadeRightVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  const scaleUpVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  };

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };

  const staggerItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* ==================== SECTION 1: HERO ==================== */}
      <section id="home" className="pt-24 pb-16 sm:pt-36 sm:pb-24 bg-[#f5ede0] relative overflow-hidden text-[#0a0a0a] font-sans">
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none z-0"
          style={{ backgroundImage: `radial-gradient(#000000 1px, transparent 0)`, backgroundSize: '24px 24px' }}
        />
        <div className="absolute top-[15%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-[240px] sm:w-[450px] h-[240px] sm:h-[450px] bg-gradient-to-tr from-[#ea580c]/5 to-transparent rounded-full blur-[60px] sm:blur-[120px] pointer-events-none z-0" />
        
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 relative z-10">
          <motion.div
            className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
          >
            {/* LEFT */}
            <motion.div variants={itemVariants} className="flex flex-col text-left items-start w-full lg:col-span-6 order-2 lg:order-1">
              <div className="inline-flex items-center bg-[#ede3d6] text-[#171717] border border-[#ddd0c0] px-3.5 py-1 rounded-full text-xs font-medium mb-5 select-none shadow-[0_1px_2px_rgba(0,0,0,0.02)] max-w-full truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] mr-2 animate-pulse shrink-0" />
                Clinically Guided Vision Therapy
              </div>

              <h1 className="text-2xl sm:text-5xl lg:text-[48px] font-bold tracking-tight text-[#0a0a0a] leading-[1.2] sm:leading-[1.15] mb-5 w-full font-['Satoshi',sans-serif]">
                Home Vision Therapy <br />
                For Growing Kids <br />
                <div className="inline-block h-[38px] sm:h-[55px] lg:h-[60px] overflow-hidden relative w-full mt-1">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={words[index]}
                      initial={{ y: "40%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "-40%", opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="text-[#ea580c] absolute left-0 top-0 block w-full font-bold"
                    >
                      {words[index]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </h1>

              <p className="text-[#5a4a3a] text-xs sm:text-base leading-relaxed max-w-md mb-8 font-normal">
                Interactive, scientifically designed exercises that strengthen focus, depth perception, and eye tracking directly from home.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-8">
                <button
                  onClick={handleStartPlaying}
                  className="h-11 px-6 bg-[#ea580c] hover:bg-[#c2410c] text-white font-medium text-sm rounded-lg transition-all active:scale-[0.98] cursor-pointer w-full sm:w-auto text-center border-0"
                >
                  Start Training Now
                </button>
                <button
                  onClick={handleWhatsAppRedirect}
                  className="h-11 px-5 bg-[#ede3d6] border border-[#ddd0c0] hover:bg-[#e4d5c3] text-[#0a0a0a] font-medium text-sm rounded-lg transition-all flex items-center justify-center gap-1.5 w-full sm:w-auto shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 text-[#5a4a3a]" />
                  Chat with Us
                </button>
              </div>

              <div className="flex flex-wrap gap-2 w-full">
                {["15 Minutes Daily", "Doctor Guided", "Trusted by Parents"].map((tag, i) => (
                  <span key={i} className="text-[11px] sm:text-xs font-medium text-[#5a4a3a] bg-[#ede3d6] border border-[#ddd0c0] px-3 py-1 rounded-full shadow-sm">{tag}</span>
                ))}
              </div>
            </motion.div>

            {/* RIGHT */}
            <motion.div className="relative w-full lg:col-span-6 order-1 lg:order-2" variants={itemVariants}>
              <img
                src={heroImage}
                alt="Nainocular family vision training platform tracking view"
                className="w-full h-auto object-cover select-none pointer-events-none block rounded-2xl max-w-md lg:max-w-full mx-auto shadow-md"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ==================== SECTION 2: FEATURES ==================== */}
      <section id="features" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-[32px] border border-orange-200 bg-gradient-to-br from-orange-50 via-white to-blue-50 p-5 sm:p-12 lg:p-16 shadow-lg">
            <div className="absolute -top-24 -left-24 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <motion.div
                className="text-center mb-12 sm:mb-14"
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-xs font-medium border border-orange-200 mb-4">
                  Trusted by Families
                </span>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                  The Future of Kids' Vision Care
                </h2>
                <p className="max-w-2xl mx-auto text-gray-600 text-xs sm:text-base leading-relaxed">
                  Our technology blends vision science, interactive engagement, and progress tracking to help children build stronger visual skills through fun daily activities.
                </p>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
                variants={staggerContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {[
                  { icon: <Target className="w-5 h-5 text-orange-600" />, title: "Clinically Guided", desc: "Built using evidence-based vision training principles inspired by expert recommendations." },
                  { icon: <Smartphone className="w-5 h-5 text-orange-600" />, title: "Safe Daily Sessions", desc: "Short, structured activities designed to encourage healthy visual habits." },
                  { icon: <LineChart className="w-5 h-5 text-orange-600" />, title: "Progress Tracking", desc: "Monitor visual development through simple and easy-to-understand reports." },
                  { icon: <Brain className="w-5 h-5 text-orange-600" />, title: "Designed for Kids", desc: "Adaptive challenges keep children motivated while supporting skill development." }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={staggerItemVariants}
                    className="group bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl sm:rounded-3xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-5">
                      {item.icon}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 3: VISION SKILLS CONTEXT ==================== */}
      <section id="theory" className="py-16 sm:py-24 bg-[#ffffff] border-b border-[#e5e5e5] overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <motion.div
              className="lg:col-span-6 order-2 lg:order-1 w-full"
              variants={fadeLeftVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="relative rounded-2xl sm:rounded-[32px] bg-gradient-to-br from-[#fff7ed] via-[#ffffff] to-[#ffedd5] p-2.5 sm:p-4 border border-orange-100 shadow-md">
                <div className="relative overflow-hidden rounded-xl sm:rounded-[24px] bg-white border border-[#e5e5e5] w-full aspect-video">
                  <iframe
                    src="https://player.cloudinary.com/embed/?cloud_name=dckazgxya&public_id=mp__zsh2h7&autoplay=true&muted=true&loop=true"
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                    allowFullScreen
                    frameBorder="0"
                    className="w-full h-full absolute inset-0"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-6 order-1 lg:order-2"
              variants={fadeRightVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="relative overflow-hidden rounded-2xl sm:rounded-[32px] bg-gradient-to-br from-[#fff7ed] via-[#ffffff] to-[#eef2ff] border border-[#f1f5f9] p-5 sm:p-8 lg:p-10 shadow-sm">
                <div className="relative z-10">
                  <span className="inline-flex bg-white text-[#ea580c] border border-orange-200 px-3.5 py-1 rounded-full text-xs font-semibold mb-4 shadow-sm">
                    Early Vision Development
                  </span>

                  <h2 className="text-xl sm:text-4xl font-bold tracking-tight text-[#0a0a0a] leading-tight mb-4 font-['Satoshi',sans-serif]">
                    Why Vision Skills Matter in Childhood
                  </h2>

                  <div className="space-y-4 text-[#525252] text-xs sm:text-base leading-relaxed mb-6">
                    <p>
                      Children develop important visual skills during their early years. Problems like difficulty focusing, lazy eye, and screen strain can affect learning and daily milestones.
                    </p>
                  </div>

                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    variants={staggerContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {[
                      { title: "Lazy Eye Support", desc: "Improves balance and binocular coordination safely." },
                      { title: "Myopia Awareness", desc: "Supports healthy focusing habits and relaxation." },
                      { title: "Eye Coordination", desc: "Strengthens alignment for smoother reading." },
                      { title: "Visual Tracking", desc: "Enhances object tracking and focus accuracy." },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        variants={staggerItemVariants}
                        className="bg-white/80 backdrop-blur-md border border-white rounded-xl p-3.5 hover:border-[#ea580c] transition-all duration-300 shadow-sm"
                      >
                        <h4 className="font-semibold text-xs sm:text-sm text-[#0a0a0a] mb-1 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c]" />
                          {item.title}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-[#525252] leading-relaxed">
                          {item.desc}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 4: HOW IT WORKS ==================== */}
      <section id="features-how" className="py-16 sm:py-24 bg-white border-b border-[#e5e5e5]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-[36px] bg-gradient-to-br from-[#fff7ed] via-[#ffffff] to-[#eef2ff] border border-[#f1f5f9] p-5 sm:p-12 lg:p-16 shadow-sm">
            <div className="relative z-10">
              <motion.div
                className="text-center mb-12 max-w-2xl mx-auto"
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <span className="inline-flex bg-white text-[#ea580c] border border-orange-200 px-3.5 py-1 rounded-full text-xs font-semibold mb-4 shadow-sm">
                  Simple 3-Step Process
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0a0a0a] mb-4">
                  How Nainocular Works
                </h2>
                <p className="text-[#525252] text-xs sm:text-base leading-relaxed">
                  A guided step-by-step experience designed to help children improve focus and tracking through engaging online activities.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {[
                  { step: "01", emoji: "📱", title: "Quick Vision Assessment", desc: "Understand your child's visual strengths and focus areas through simple browser activities." },
                  { step: "02", emoji: "🎯", title: "Personalized Activities", desc: "Interactive exercises carefully designed to improve tracking, focus and coordination." },
                  { step: "03", emoji: "🏆", title: "Track Progress & Rewards", desc: "Monitor improvements while children earn stars and rewards for consistency." },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={staggerItemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="group bg-white/80 backdrop-blur-md border border-white rounded-2xl p-5 sm:p-7 hover:border-[#ea580c]/30 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-lg">
                        {item.emoji}
                      </div>
                      <span className="text-[#ea580c] font-bold text-xs font-mono">
                        Step {item.step}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#0a0a0a] mb-2 group-hover:text-[#ea580c] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#525252] leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                {[
                  "Safe 15-Minute Daily Sessions",
                  "Detailed Parent Progress Dashboard",
                  "Interactive Child-Friendly Interface"
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white border border-[#e5e5e5] rounded-xl py-3 px-4 text-center text-xs sm:text-sm font-medium text-[#404040]"
                  >
                    <span className="text-[#ea580c] mr-2">✓</span>
                    {item}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 5: VISION ACTIVITIES ==================== */}
      <section id="games" className="py-16 sm:py-24 bg-white border-b border-[#e5e5e5]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-[36px] bg-gradient-to-br from-[#fff7ed] via-[#ffffff] to-[#eef2ff] border border-[#f1f5f9] p-5 sm:p-12 lg:p-16 shadow-sm">
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-10 gap-6">
                <motion.div
                  className="text-center lg:text-left max-w-xl"
                  variants={fadeUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <span className="inline-flex bg-white text-[#ea580c] border border-orange-200 px-3.5 py-1 rounded-full text-xs font-semibold shadow-sm mb-3">
                    Interactive Vision Games
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0a0a0a] mb-3">
                    Vision Training Activities
                  </h2>
                  <p className="text-[#525252] text-xs sm:text-sm leading-relaxed">
                    Scientifically guided exercises that help children improve focus, tracking, and response skills.
                  </p>
                </motion.div>

                <motion.div
                  className="flex overflow-x-auto max-w-full -mx-4 px-4 sm:mx-0 sm:px-0 gap-1.5 bg-white/90 backdrop-blur-md p-1.5 rounded-xl border border-gray-100 shadow-sm shrink-0 whitespace-nowrap self-center lg:self-end"
                  variants={fadeUpVariants}
                  initial="hidden"
                  whileInView="visible"
                >
                  {categories.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                        activeTab === tab
                          ? "bg-[#ea580c] text-white shadow-sm"
                          : "text-[#525252] hover:text-[#0a0a0a] hover:bg-gray-50"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </motion.div>
              </div>

              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredGames.map((item) => (
                    <motion.div
                      layout
                      key={item.title}
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.25 }}
                      className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row"
                    >
                      <div className="w-full sm:w-40 h-36 sm:h-full bg-gradient-to-br from-orange-50 to-indigo-50 relative shrink-0 p-4 flex items-center justify-center border-b sm:border-b-0 sm:border-r border-gray-100">
                        <div className="absolute top-2.5 left-2.5 w-8 h-8 rounded-lg bg-white flex items-center justify-center text-sm shadow-sm">
                          {item.emoji}
                        </div>
                        <div className="w-20 h-20">{item.illustration}</div>
                      </div>

                      <div className="p-5 flex flex-col justify-center text-left flex-1">
                        <span className="w-fit px-2 py-0.5 rounded-full text-[10px] font-medium bg-orange-50 text-[#ea580c] border border-orange-100 mb-2">
                          {item.category}
                        </span>
                        <h3 className="text-base font-bold text-[#0a0a0a] mb-1">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#525252] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 6: REWARDS SYSTEM ==================== */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#e5e5e5]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-[36px] bg-gradient-to-br from-[#fef3c7] via-[#ffffff] to-[#fef2f2] border border-[#fde68a] p-5 sm:p-12 lg:p-16 shadow-sm">
            <div className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <motion.div
                  className="lg:col-span-6 order-2 lg:order-1 w-full"
                  variants={scaleUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="rounded-2xl bg-white border border-yellow-100 p-2.5 shadow-sm">
                    <div className="overflow-hidden rounded-xl border border-[#e5e5e5] w-full aspect-video relative">
                      <iframe
                        src="https://player.cloudinary.com/embed/?cloud_name=dckazgxya&public_id=vision_reward_tracker_animation_demomp__ki5gvl&autoplay=true&muted=true&loop=true"
                        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                        allowFullScreen
                        frameBorder="0"
                        className="w-full h-full absolute inset-0"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="lg:col-span-6 order-1 lg:order-2 text-left"
                  variants={fadeRightVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="bg-white/90 backdrop-blur-md border border-white rounded-2xl p-5 sm:p-8 shadow-sm">
                    <span className="inline-flex bg-yellow-50 border border-yellow-200 text-amber-600 px-3.5 py-1 rounded-full text-xs font-semibold mb-4 shadow-sm">
                      🎁 Unique Motivation System
                    </span>

                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0a0a0a] leading-tight mb-4">
                      Kids Stay Motivated with Rewards
                    </h2>

                    <p className="text-[#525252] text-xs sm:text-sm leading-relaxed mb-6">
                      Complete daily vision activities, earn stars, unlock achievements, and receive exciting rewards. We make consistency fun.
                    </p>

                    <div className="space-y-3">
                      {[
                        { icon: "⭐", title: "Daily Streak Tracking", desc: "Encourage consistent daily practice through streak rewards.", bg: "bg-yellow-50/60 border-yellow-100" },
                        { icon: "🏆", title: "Achievement Milestones", desc: "Unlock special badges and star levels by completing activities.", bg: "bg-orange-50/60 border-orange-100" },
                        { icon: "🎁", title: "Exclusive Rewards", desc: "Redeem earned rewards for discounts and special clinic milestones.", bg: "bg-amber-50/60 border-amber-100" }
                      ].map((el, i) => (
                        <div key={i} className={`border rounded-xl p-3.5 ${el.bg}`}>
                          <div className="flex items-start gap-3">
                            <span className="text-lg shrink-0 mt-0.5">{el.icon}</span>
                            <div>
                              <h4 className="font-semibold text-xs sm:text-sm text-[#0a0a0a]">{el.title}</h4>
                              <p className="text-[11px] sm:text-xs text-[#525252] mt-0.5">{el.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 7: FOR PARENTS ==================== */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#e5e5e5]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-[36px] bg-gradient-to-br from-[#ecfdf5] via-[#ffffff] to-[#eff6ff] border border-[#dbeafe] p-5 sm:p-12 lg:p-16 shadow-sm">
            <div className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <motion.div
                  className="lg:col-span-6 text-left"
                  variants={fadeLeftVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="bg-white/90 backdrop-blur-md border border-white rounded-2xl p-5 sm:p-8 shadow-sm">
                    <span className="inline-flex bg-emerald-50 text-emerald-600 border border-emerald-200 px-3.5 py-1 rounded-full text-xs font-semibold mb-4 shadow-sm">
                      ❤️ Parental Peace of Mind
                    </span>

                    <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0a0a0a] leading-tight mb-4">
                      Why Parents Love Nainocular
                    </h2>

                    <p className="text-[#525252] text-xs sm:text-sm leading-relaxed mb-6">
                      Nainocular fits effortlessly into your family's daily routine. No stressful clinic travels, just clean home vision care.
                    </p>

                    <div className="space-y-3">
                      {[
                        { text: "My child now enjoys vision therapy every day without tantrums.", author: "Priya S., Delhi Parent" },
                        { text: "Much easier than clinic visits. The dashboards give clear metrics.", author: "Rajesh V., Bengaluru Parent" }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-[#fafafa] border border-[#e5e5e5] rounded-xl p-4">
                          <p className="text-xs sm:text-sm italic text-[#171717] mb-2">"{item.text}"</p>
                          <span className="text-[11px] font-semibold text-emerald-600">{item.author}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="lg:col-span-6 w-full"
                  variants={scaleUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="rounded-2xl bg-white border border-[#dbeafe] p-2.5 shadow-sm max-w-md mx-auto lg:max-w-full">
                    <div className="overflow-hidden rounded-xl">
                      <img
                        src={homeim}
                        alt="Mother and son sharing a warm moment"
                        className="w-full h-48 sm:h-72 object-cover"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-3">
                      {[
                        { val: "98%", lbl: "Approval", textCol: "text-emerald-600", bg: "bg-emerald-50" },
                        { val: "12K+", lbl: "Families", textCol: "text-sky-600", bg: "bg-blue-50" },
                        { val: "4.9★", lbl: "Rating", textCol: "text-orange-500", bg: "bg-orange-50" }
                      ].map((st, i) => (
                        <div key={i} className={`rounded-xl p-2.5 text-center ${st.bg}`}>
                          <h4 className={`text-sm sm:text-lg font-bold ${st.textCol}`}>{st.val}</h4>
                          <p className="text-[9px] sm:text-[11px] text-[#525252] mt-0.5">{st.lbl}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 8: SCIENCE & SAFETY ==================== */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#e5e5e5]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-[36px] bg-gradient-to-br from-[#eff6ff] via-[#ffffff] to-[#ecfeff] border border-blue-100 p-5 sm:p-12 lg:p-16 shadow-sm">
            <div className="relative z-10">
              <motion.div
                className="max-w-3xl mx-auto text-center mb-12"
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <span className="inline-flex bg-blue-50 text-blue-600 border border-blue-200 px-3.5 py-1 rounded-full text-xs font-semibold shadow-sm mb-3">
                  🔬 Science & Safety
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0a0a0a] mb-3 font-['Satoshi',sans-serif]">
                  Built on Vision Therapy Principles
                </h2>
                <p className="text-[#525252] text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
                  Clinical safety boundaries configured smoothly to support dynamic visual recovery tracks inside a child-friendly interface.
                </p>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                variants={staggerContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  { icon: "🛡️", title: "Safe Screen Time", desc: "Short guided sessions designed to strengthen visual skills without screen strain boundaries." },
                  { icon: "👶", title: "Child Friendly", desc: "Fun operational blocks tailored precisely around kids' normal home routines." },
                  { icon: "📋", title: "Guided Activities", desc: "Simple interface layouts that are easy for both parents and children to operate smoothly." },
                  { icon: "🔬", title: "Vision Science", desc: "Built around established clinical concepts and visual coordination treatment paths." }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={staggerItemVariants}
                    className="bg-white/80 backdrop-blur-md border border-white rounded-xl sm:rounded-2xl p-5 text-left shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-lg mb-4">
                      {item.icon}
                    </div>
                    <h4 className="text-base font-bold text-[#0a0a0a] mb-1.5 tracking-tight">{item.title}</h4>
                    <p className="text-xs text-[#525252] leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                {[
                  { val: "15 Min", lbl: "Recommended Daily Limit" },
                  { val: "100%", lbl: "Safe Content Experience" },
                  { val: "4-14", lbl: "Critical Age Range Years" }
                ].map((st, i) => (
                  <div key={i} className="bg-white rounded-xl border border-blue-100 p-4 text-center shadow-sm">
                    <h4 className="text-xl font-bold text-blue-600">{st.val}</h4>
                    <p className="text-[11px] text-[#525252] mt-0.5">{st.lbl}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 9: FAQ ==================== */}
      <section id="faq" className="py-16 sm:py-20 bg-[#ffffff] border-b border-[#e5e5e5] text-left">
        <div className="max-w-[800px] mx-auto px-4 sm:px-8">
          <motion.div
            className="text-center mb-10 space-y-2"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="inline-flex bg-[#f5f5f5] text-[#171717] border border-[#e5e5e5] px-3.5 py-1 rounded-full text-xs font-medium shadow-sm">Common Questions</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0a0a0a] font-['Satoshi',sans-serif]">Frequently Asked Questions</h2>
          </motion.div>

          <motion.div
            className="space-y-3"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <motion.div
                  key={idx}
                  variants={staggerItemVariants}
                  className="bg-[#ffffff] border border-[#e5e5e5] rounded-xl overflow-hidden transition-all duration-200"
                >
                  <button onClick={() => toggleFaq(idx)} className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-sans select-none focus:outline-none">
                    <span className="text-sm sm:text-base font-semibold text-[#0a0a0a] tracking-tight pr-4">{faq.q}</span>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-[#404040] shrink-0">
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                      >
                        <div className="px-4 sm:px-5 pb-5 pt-0 border-t border-gray-50 text-[#404040] text-xs sm:text-sm leading-relaxed bg-gray-50/40">
                          <div className="pt-3">{faq.a}</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ==================== SECTION 10: CTA SLIDER ==================== */}
      <CtaBanner handleStartPlaying={handleStartPlaying} />

      <Footer />
    </div>
  );
};

export default Home;