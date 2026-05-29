import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Managed explicit iconography paths matching Dub's system layout rulesets
import { 
  Eye, Smartphone, Brain, MessageSquare, ChevronDown, Target, LineChart, Sparkles, ShieldCheck 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Component Layout Architecture
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import heroImage from "../../assets/images/h1.png";

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

const ctaSlides = [
  {
    title: "Start Your Child's Vision Journey Today",
    desc: "Join thousands of parents who trust Naintaara for functional eye development.",
    bg: "bg-white",
  },
  {
    title: "Fun Eye Exercises That Actually Work",
    desc: "Interactive games designed to improve focus and eye coordination.",
    bg: "bg-orange-50/30",
  },
  {
    title: "Doctor Guided Vision Training",
    desc: "Safe, structured and clinically inspired visual activities.",
    bg: "bg-slate-50",
  },
];

// ==================== SUB COMPONENT: CTA SLIDER BANNER MODULE ====================
const CtaBanner = ({ handleStartPlaying }) => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [ctaSlide, setCtaSlide] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCtaSlide((prev) => (prev + 1) % ctaSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleAction = (action) => {
    if (action === "start") handleStartPlaying();
    else if (action === "games") navigate("/games");
    else if (action === "about") navigate("/about");
  };

  const slide = slides[current];

  return (
    <section id="contact" className="border-t border-[#e5e5e5] overflow-hidden bg-[#ffffff]">
      <div
        className={`relative ${slide.bg} py-20 px-6 text-center transition-colors duration-500`}
        style={{ minHeight: 380 }}
      >
        {slide.deco && (
          <>
            <div className={`absolute -top-20 -right-16 w-72 h-72 rounded-full ${slide.decoColor} opacity-[0.04] pointer-events-none`} />
            <div className={`absolute -bottom-12 -left-8 w-44 h-44 rounded-full ${slide.decoColor} opacity-[0.04] pointer-events-none`} />
          </>
        )}

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <span className={`inline-flex items-center gap-1.5 text-[10px] font-medium tracking-wider uppercase px-3.5 py-1 rounded-full mb-5 font-mono ${slide.badgeClass}`}>
            {slide.badge.icon}
            {slide.badge.text}
          </span>

          <h2 className={`font-semibold text-2xl sm:text-4xl leading-tight mb-5 tracking-tight font-['Satoshi',sans-serif] ${slide.headingClass}`}>
            {slide.heading}
          </h2>

          <div className="flex gap-8 justify-center mb-6 flex-wrap font-mono">
            {slide.stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center min-w-[70px]">
                <span className={`text-xl sm:text-2xl font-bold tracking-tight ${slide.statNumClass}`}>{s.num}</span>
                <span className={`text-[11px] font-sans font-normal mt-0.5 ${slide.statLabelClass}`}>{s.label}</span>
              </div>
            ))}
          </div>

          <p className={`text-xs sm:text-sm leading-relaxed max-w-lg mb-8 font-normal font-sans ${slide.subClass}`}>
            {slide.sub}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center w-full sm:w-auto">
            <button
              onClick={() => handleAction(slide.primaryBtn.action)}
              className={`h-10 px-6 rounded-lg text-xs sm:text-sm font-medium transition-all active:scale-[0.98] cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.05)] border-0 ${slide.primaryBtn.class}`}
            >
              {slide.primaryBtn.text}
            </button>
            <button
              onClick={() => handleAction(slide.secondaryBtn.action)}
              className={`h-10 px-6 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${slide.secondaryBtn.class}`}
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
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "bg-[#ea580c] scale-125" : "bg-[#d4d4d4]"
            }`}
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
  const words = ["Vision Therapy", "Myopia", "Lazy Eye", "Eye Fitness"];
  const [index, setIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  const games = [
    {
      title: "Focus Quest",
      emoji: "🎯",
      desc: "Track moving objects to improve eye coordination dynamically.",
    },
    {
      title: "Color Catch",
      emoji: "🌈",
      desc: "Match colors quickly for core visual agility response training.",
    },
    {
      title: "Vision Rush",
      emoji: "⚡",
      desc: "Fast-paced interactive game to enhance child reaction times.",
    },
  ];

  const handleStartPlaying = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const faqs = [
    {
      q: "Is it safe for screen time?",
      a: "Yes. Unlike passive streaming, our exercises engage eye muscles actively. Sessions are limited to 15 minutes daily to prevent strain while effectively training focus."
    },
    {
      q: "What age does it work for?",
      a: "Naintaara is optimized for kids aged 4 to 14 years during critical visual development stages. Games automatically adjust difficulty based on performance metrics."
    },
    {
      q: "Do we need a prescription?",
      a: "No prescription is required. It serves as home fitness for eyes. However, we recommend regular eye specialist checkups to track overall recovery."
    },
    {
      q: "How long till we see results?",
      a: "Most parents report noticeable improvements in children's visual tracking, depth perception, and focus accuracy within 4 to 6 weeks of daily disciplined play."
    },
    {
      q: "Will it work alongside glasses?",
      a: "Yes. Naintaara trains visual brain processing tracking paths. Children should wear their normally prescribed reading or distance glasses while playing the games."
    },
    {
      q: "Is it covered by insurance?",
      a: "Currently, digital eye tracking treatments are out-of-pocket expenses. For specific clinic documentation or help, reach out directly on our Contact Page."
    }
  ];

  return (
    <div className="w-full min-h-screen bg-white">
      <Navbar />

      {/* ==================== SECTION 1: PREMIUM HERO CONTAINER ==================== */}
      <section id="home" className="pt-28 pb-16 sm:pt-36 sm:pb-24 bg-[#ffffff] relative overflow-hidden text-[#0a0a0a] font-sans">
        
        {/* LIGHTWEIGHT UTILITY CANVAS PATTERN */}
        <div 
          className="absolute inset-0 opacity-[0.015] pointer-events-none z-0" 
          style={{
            backgroundImage: `radial-gradient(#000000 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Ambient Subtle Lighting Blurs */}
        <div className="absolute top-[20%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] bg-gradient-to-tr from-[#ea580c]/5 to-transparent rounded-full blur-[80px] sm:blur-[120px] pointer-events-none z-0" />
        <div className="absolute top-[35%] left-[55%] -translate-x-1/2 -translate-y-1/2 w-[240px] sm:w-[380px] h-[240px] sm:h-[380px] bg-gradient-to-br from-[#3b82f6]/4 to-transparent rounded-full blur-[70px] sm:blur-[100px] pointer-events-none z-0" />

        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 relative z-10">
          <motion.div
            className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
          >
            {/* LEFT SIDE: PACKED DATA BLOCK */}
            <motion.div variants={itemVariants} className="flex flex-col text-left items-start w-full lg:col-span-7">
              <div className="inline-flex items-center bg-[#f5f5f5] text-[#171717] border border-[#e5e5e5] px-3.5 py-1 rounded-full text-xs font-medium mb-6 select-none shadow-[0_1px_2px_rgba(0,0,0,0.02)] max-w-full truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] mr-2 animate-pulse shrink-0" />
                Clinically Guided Vision Therapy
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[48px] font-bold tracking-tight text-[#0a0a0a] leading-[1.15] mb-5 w-full font-['Satoshi',sans-serif]">
                Home Vision Therapy <br />
                For Growing Kids <br />
                <div className="inline-block h-[40px] sm:h-[55px] lg:h-[60px] overflow-hidden relative w-full mt-1">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={words[index]}
                      initial={{ y: "30%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "-30%", opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="text-[#ea580c] absolute left-0 top-0 block w-full font-bold"
                    >
                      {words[index]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </h1>

              <p className="text-[#404040] text-sm sm:text-base leading-relaxed max-w-md mb-8 font-normal">
                Interactive, scientifically designed exercises that strengthen focus, depth perception, and eye tracking directly from home.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-8">
                <button 
                  onClick={handleStartPlaying}
                  className="h-10 px-6 bg-[#ea580c] hover:bg-[#c2410c] text-white font-medium text-sm rounded-lg transition-all shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] active:scale-[0.98] cursor-pointer w-full sm:w-auto text-center border-0"
                >
                  Start Training Now
                </button>

                <button 
                  onClick={handleWhatsAppRedirect}
                  className="h-10 px-5 bg-white border border-[#e5e5e5] hover:bg-[#f5f5f5] text-[#0a0a0a] font-medium text-sm rounded-lg transition-all flex items-center justify-center gap-1.5 w-full sm:w-auto shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
                >
                  <MessageSquare className="w-4 h-4 text-[#404040]" />
                  Chat with Us
                </button>
              </div>

              <div className="flex flex-wrap gap-2 w-full">
                {["👁️ Amblyopia Care", "🎯 Spatial Focus", "🪙 Coin Rewards"].map((tag, i) => (
                  <span key={i} className="text-xs font-medium text-[#404040] bg-[#ffffff] border border-[#e5e5e5] px-3.5 py-1.5 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.02)]">{tag}</span>
                ))}
              </div>
            </motion.div>

            {/* RIGHT SIDE: APPLICATION CONTAINER */}
            <motion.div className="relative w-full max-w-md lg:max-w-none mx-auto mt-6 lg:mt-0 lg:col-span-5" variants={itemVariants}>
              <div className="absolute inset-0 bg-[#e6cca8]/20 rounded-2xl blur-3xl transform scale-110 pointer-events-none" />

              <div className="relative z-10 w-full bg-[#fcf9f5] border border-[#e8dfd3] rounded-2xl shadow-[0_20px_40px_rgba(168,131,85,0.06)] overflow-hidden">
                <div className="w-full h-9 bg-[#f4ece1] border-b border-[#e8dfd3] flex items-center justify-between px-4 select-none">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#e8dfd3]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#e8dfd3]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#e8dfd3]" />
                  </div>
                  <div className="bg-[#ffffff]/80 backdrop-blur-sm px-6 py-0.5 text-[10px] font-medium text-[#7a6e5d] rounded border border-[#e8dfd3] tracking-tight truncate font-sans">
                    app.nainocular.com
                  </div>
                  <div className="w-10" />
                </div>

                <div className="p-0 bg-[#ebd9c1]">
                  <img
                    src={heroImage}
                    alt="Nainocular family vision training platform tracking view"
                    className="w-full h-auto sm:max-h-[380px] object-cover select-none pointer-events-none block filter contrast-[1.01]"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ==================== SECTION 2: HIGH-TRUST VALIDATION BAR ==================== */}
      <section id="features" className="py-16 bg-[#f5f5f5] border-y border-[#e5e5e5]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            className="mb-12 space-y-2" 
            initial={{ opacity: 0, y: 15 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0a0a0a]">
              The Future of Kids' Vision Care
            </h2>
            <p className="text-[#404040] text-sm max-w-xl mx-auto font-normal">
              Our technology blends proven behavioral science with safe, interactive engagement parents trust.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" 
            variants={containerVariants} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
          >
            {[
              { icon: <Target className="w-5 h-5 text-[#ea580c]" />, title: "Clinically Guided", desc: "Developed alongside eye experts using validated data models for tracking accuracy." },
              { icon: <Smartphone className="w-5 h-5 text-[#ea580c]" />, title: "Safe Daily Sessions", desc: "Strictly limited to 15 minutes daily to completely avoid digital strain or fatigue." },
              { icon: <LineChart className="w-5 h-5 text-[#ea580c]" />, title: "Progress Tracking", desc: "Get crystal-clear medical dashboards to watch visual acuity improve week-over-week." },
              { icon: <Brain className="w-5 h-5 text-[#ea580c]" />, title: "Designed for Kids 4-14", desc: "Adaptive algorithms customize the difficulty settings dynamically as your child grows." },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants} 
                className="bg-[#ffffff] border border-[#e5e5e5] rounded-xl p-5 flex flex-col items-start text-left bg-white transition-all duration-200 cursor-default hover:border-[#d4d4d4] hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)]"
              >
                <div className="w-9 h-9 rounded-lg bg-[#f5f5f5] border border-[#e5e5e5] flex items-center justify-center mb-4 shrink-0">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-[#0a0a0a] mb-1.5 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-[#404040] text-xs sm:text-[13px] font-normal leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== SECTION 3: VISION SKILLS CONTEXT ==================== */}
      <section id="theory" className="py-20 bg-[#ffffff] border-b border-[#e5e5e5] text-left">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div 
              className="lg:col-span-5 relative flex justify-center w-full order-2 lg:order-1"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-[#ea580c]/3 rounded-2xl blur-2xl transform scale-95 pointer-events-none" />
              <div className="relative z-10 w-full max-w-sm sm:max-w-md bg-white border border-[#e5e5e5] rounded-xl p-2 shadow-[0_8px_30px_rgba(0,0,0,0.02)] overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop" 
                  alt="Child engaging in modern interactive focus coordination exercise" 
                  className="rounded-lg w-full h-[280px] sm:h-[340px] object-cover filter brightness-[0.99]" 
                />
                <motion.div 
                  initial={{ top: "0%" }}
                  animate={{ top: "100%" }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-2 right-2 h-[1px] bg-gradient-to-r from-transparent via-[#ea580c]/50 to-transparent pointer-events-none z-20"
                />
              </div>
              <div className="absolute top-6 right-0 bg-white/90 backdrop-blur-md border border-[#e5e5e5] rounded-lg px-2.5 py-1 text-[10px] font-medium text-[#404040] shadow-sm z-20 flex items-center gap-1.5 select-none">
                <div className="w-1.5 h-1.5 bg-[#ea580c] rounded-full animate-ping" />
                Real-time Focus Scan
              </div>
            </motion.div>

            <motion.div 
              className="lg:col-span-7 space-y-5 w-full order-1 lg:order-2"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
            >
              <span className="inline-flex bg-[#f5f5f5] text-[#171717] border border-[#e5e5e5] px-3.5 py-1 rounded-full text-xs font-medium select-none shadow-sm">
                Early Vision Development
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0a0a0a] leading-tight font-['Satoshi',sans-serif]">
                Why Vision Skills Matter in Childhood
              </h2>
              <div className="space-y-4 text-[#404040] text-sm sm:text-base font-normal leading-relaxed max-w-2xl">
                <p>
                  Children develop important visual skills during their early years. Problems like difficulty focusing, eye coordination issues, lazy eye, and increasing screen strain can affect learning, reading, and daily activities.
                </p>
                <p>
                  Interactive vision therapy activities help strengthen tracking, focus, and visual coordination in a fun and engaging way.
                </p>
              </div>

              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 pt-4">
                {[
                  { title: "Lazy Eye Support", desc: "Improves balance and binocular coordination links safely." },
                  { title: "Myopia Awareness", desc: "Supports natural accommodation relaxation cycles at home." },
                  { title: "Eye Coordination", desc: "Strengthens ocular muscle alignment for comfortable reading tracks." },
                  { title: "Visual Tracking", desc: "Enhances step-by-step path processing without mental fatigue loops." },
                ].map((item, i) => (
                  <div 
                    key={i} 
                    className="bg-[#f5f5f5] border border-[#e5e5e5] p-4 rounded-xl text-left transition-all duration-200 cursor-default hover:border-[#ea580c] hover:bg-white hover:shadow-[0_4px_12px_rgba(0,0,0,0.02)]"
                  >
                    <h3 className="font-bold text-sm text-[#0a0a0a] mb-1 tracking-tight flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#ea580c]" />
                      {item.title}
                    </h3>
                    <p className="text-[#404040] text-[12px] sm:text-xs leading-normal font-normal">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 4: HOW IT WORKS (TIMELINE SYSTEM) ==================== */}
      <section id="features" className="py-20 bg-[#f9fafb] border-b border-[#e5e5e5] text-left relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 relative z-10">
          <div className="text-center mb-16 max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0a0a0a] font-['Satoshi',sans-serif]">
              How Nainocular Works
            </h2>
            <p className="text-[#404040] text-sm sm:text-base font-normal leading-relaxed">
              A guided step-by-step experience designed to help children improve focus, tracking, and visual coordination through engaging activities from home.
            </p>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-10 items-start pt-4">
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#e5e5e5] -translate-y-12 hidden lg:block z-0">
              <motion.div 
                className="h-full bg-[#ea580c]/60" 
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </div>

            <motion.div 
              variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="relative z-10 bg-[#ffffff] border border-[#e5e5e5] rounded-xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all duration-200 hover:border-[#ea580c] group"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="text-xs font-bold uppercase tracking-wider text-[#ea580c] bg-[#ea580c]/5 px-2.5 py-1 rounded-md">Step 01</div>
                <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="text-2xl w-10 h-10 rounded-lg bg-[#f5f5f5] border border-[#e5e5e5] flex items-center justify-center select-none">📱</motion.div>
              </div>
              <h3 className="text-lg font-bold text-[#0a0a0a] mb-2 tracking-tight group-hover:text-[#ea580c] transition-colors">Quick Vision Assessment</h3>
              <p className="text-[#404040] text-xs sm:text-sm font-normal leading-relaxed">Understand your child’s visual strengths and focus areas through simple, intuitive browser activities.</p>
            </motion.div>

            <motion.div 
              variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="relative z-10 bg-[#ffffff] border border-[#e5e5e5] rounded-xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all duration-200 hover:border-[#ea580c] group"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="text-xs font-bold uppercase tracking-wider text-[#ea580c] bg-[#ea580c]/5 px-2.5 py-1 rounded-md">Step 02</div>
                <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="text-2xl w-10 h-10 rounded-lg bg-[#f5f5f5] border border-[#e5e5e5] flex items-center justify-center select-none">🎯</motion.div>
              </div>
              <h3 className="text-lg font-bold text-[#0a0a0a] mb-2 tracking-tight group-hover:text-[#ea580c] transition-colors">Personalized Activities</h3>
              <p className="text-[#404040] text-xs sm:text-sm font-normal leading-relaxed">Interactive screen exercises carefully calibrated to target and enhance tracking, alignment, and core eye coordination.</p>
            </motion.div>

            <motion.div 
              variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="relative z-10 bg-[#ffffff] border border-[#e5e5e5] rounded-xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all duration-200 hover:border-[#ea580c] group"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="text-xs font-bold uppercase tracking-wider text-[#ea580c] bg-[#ea580c]/5 px-2.5 py-1 rounded-md">Step 03</div>
                <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="text-2xl w-10 h-10 rounded-lg bg-[#f5f5f5] border border-[#e5e5e5] flex items-center justify-center select-none">🪙</motion.div>
              </div>
              <h3 className="text-lg font-bold text-[#0a0a0a] mb-2 tracking-tight group-hover:text-[#ea580c] transition-colors">Track Progress & Rewards</h3>
              <p className="text-[#404040] text-xs sm:text-sm font-normal leading-relaxed">Monitor performance tracking graphs while children earn stars and rewards for staying consistent.</p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.4 }}
            className="mt-16 pt-8 border-t border-[#e5e5e5] flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-12 text-[#404040] text-xs sm:text-sm font-medium"
          >
            <div className="flex items-center gap-2"><span className="text-[#ea580c] text-sm">✓</span> Safe 15-Minute Daily Sessions</div>
            <div className="flex items-center gap-2"><span className="text-[#ea580c] text-sm">✓</span> Detailed Parent Progress Dashboards</div>
            <div className="flex items-center gap-2"><span className="text-[#ea580c] text-sm">✓</span> Interactive Child-Friendly Interface</div>
          </motion.div>
        </div>
      </section>

      {/* ==================== SECTION 5: VISION ACTIVITIES ==================== */}
      <section id="games" className="py-20 bg-[#ffffff] border-b border-[#e5e5e5] text-left">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center lg:text-left mb-12 max-w-2xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0a0a0a] font-['Satoshi',sans-serif]">Interactive Vision Training Activities</h2>
            <p className="text-[#404040] text-sm sm:text-base font-normal leading-relaxed">Scientifically guided exercises that help children improve focus, tracking, eye coordination, and visual response skills.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {games.map((item, i) => (
              <motion.div
                key={i} whileHover={{ scale: 1.015, rotate: 0.5, y: -3 }} transition={{ duration: 0.25, ease: "easeOut" }}
                className="bg-[#ffffff] border border-[#e5e5e5] rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:border-[#ea580c] hover:shadow-[0_12px_30px_rgba(234,88,12,0.04)] transition-all duration-300 flex flex-col sm:flex-row h-auto sm:h-48"
              >
                <div className="w-full sm:w-44 h-40 sm:h-full bg-slate-50 relative shrink-0 overflow-hidden border-b sm:border-b-0 sm:border-r border-[#e5e5e5]">
                  <div className="absolute top-3 left-3 w-7 h-7 rounded-lg bg-white/95 backdrop-blur-md flex items-center justify-center text-sm shadow-sm border border-[#e5e5e5] select-none">{item.emoji}</div>
                  <div className="w-full h-full bg-[#f5f5f5] flex items-center justify-center text-xs text-[#737373] font-mono">GAME_ASSET_PREVIEW</div>
                </div>
                <div className="p-6 flex flex-col justify-center min-w-0">
                  <h3 className="text-lg font-bold text-[#0a0a0a] mb-1.5 tracking-tight font-['Satoshi',sans-serif]">{item.title}</h3>
                  <p className="text-[#404040] text-xs sm:text-sm font-normal leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SECTION 6: REWARDS SYSTEM ==================== */}
      <section className="py-20 bg-[#f9fafb] border-b border-[#e5e5e5] text-left overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative w-full flex items-center justify-center order-2 lg:order-1">
              <div className="absolute inset-0 bg-[#ea580c]/4 rounded-2xl blur-3xl transform scale-90 pointer-events-none" />
              <div className="relative z-10 w-full max-w-[420px] bg-white border border-[#e5e5e5] rounded-xl p-5 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)] space-y-5 select-none">
                <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-[#ea580c] rounded-full animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0a0a0a]">Aarav's Rewards Tracker</span>
                  </div>
                  <div className="bg-[#f5f5f5] border border-[#e5e5e5] px-2.5 py-0.5 rounded text-[11px] font-bold text-[#404040]">Level 4 Active</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-[#e5e5e5] rounded-lg p-3.5 bg-[#f9fafb]">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">Daily Streak</p>
                    <div className="flex items-baseline gap-1 mt-1"><span className="text-2xl font-black text-[#0a0a0a]">12</span><span className="text-xs font-medium text-[#ea580c]">Days 🔥</span></div>
                  </div>
                  <div className="border border-[#e5e5e5] rounded-lg p-3.5 bg-[#f9fafb]">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">Total Balance</p>
                    <div className="flex items-baseline gap-1 mt-1"><span className="text-2xl font-black text-[#0a0a0a]">350</span><span className="text-xs font-medium text-amber-500">Stars ⭐</span></div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-medium text-neutral-500"><span>Weekly Mission Progress</span><span className="font-bold text-[#0a0a0a]">85%</span></div>
                  <div className="w-full h-2 bg-[#f5f5f5] rounded-full overflow-hidden border border-neutral-100">
                    <motion.div className="h-full bg-gradient-to-r from-[#ea580c] to-amber-500 rounded-full" initial={{ width: "0%" }} whileInView={{ width: "85%" }} viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }} />
                  </div>
                </div>
                <div className="bg-amber-50/60 border border-amber-100 rounded-lg p-3.5 flex items-center gap-3.5"><div className="text-2xl filter drop-shadow-sm select-none">👓</div><div className="min-w-0 flex-1"><h4 className="text-xs font-bold text-amber-900 truncate">Perk Unlocked: 15% Off Smart Glasses</h4><p className="text-[10px] text-amber-800 mt-0.5 leading-normal">Redeemable directly on checkout or partner clinics.</p></div></div>
              </div>
            </div>

            <motion.div className="lg:col-span-6 space-y-5 order-1 lg:order-2 w-full" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: "easeOut" }}>
              <span className="inline-flex bg-[#ea580c]/5 border border-[#ea580c]/20 text-[#ea580c] px-3.5 py-1 rounded-full text-xs font-semibold select-none shadow-sm">Unique Motivation System</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0a0a0a] leading-tight font-['Satoshi',sans-serif]">Kids Stay Motivated with Rewards</h2>
              <p className="text-[#404040] text-sm sm:text-base font-normal leading-relaxed max-w-xl">Complete daily vision activities, earn stars, unlock unique accomplishments, and get special high-value discounts on glasses and programs. We make tracking consistency simple, fun, and highly rewarding for children.</p>
              <ul className="space-y-3 pt-2 text-[#171717] text-xs sm:text-sm font-medium">
                <li className="flex items-center gap-2"><span className="text-[#ea580c] text-sm font-bold shrink-0">✓</span> Real-time continuous daily streak tracking models</li>
                <li className="flex items-center gap-2"><span className="text-[#ea580c] text-sm font-bold shrink-0">✓</span> Milestone star tiers unlocked cleanly with play</li>
                <li className="flex items-center gap-2"><span className="text-[#ea580c] text-sm font-bold shrink-0">✓</span> Exclusive integrated rewards discounts for vision frames</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 7: FOR PARENTS ==================== */}
      <section className="py-20 bg-[#ffffff] border-b border-[#e5e5e5] text-left">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6 w-full">
              <span className="inline-flex bg-[#f5f5f5] text-[#171717] border border-[#e5e5e5] px-3.5 py-1 rounded-full text-xs font-medium select-none shadow-sm">Parental Peace of Mind</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0a0a0a] leading-tight font-['Satoshi',sans-serif]">Why Parents Love Nainocular</h2>
              <p className="text-[#404040] text-sm sm:text-base font-normal leading-relaxed max-w-xl">Nainocular fits effortlessly into your family’s busy daily schedule. No stressful clinic travel overloads—just pure, guided care designed to help your child thrive.</p>
              <div className="space-y-4 pt-2">
                {[
                  { text: "“My child now enjoys vision therapy every day without any tantrums. The rewards mechanism keeps him completely hooked.”", author: "— Priya S., Delhi Parent" },
                  { text: "“Much easier than regular physical clinic visits. The tracking dashboard gives our doctor clear progress data insights.”", author: "— Rajesh Verma, Bengaluru Parent" },
                  { text: "“We noticed an improvement within weeks in her reading coordination speed and distance focus capability.”", author: "— Meenakshi N., Mumbai Parent" }
                ].map((item, idx) => (
                  <div key={idx} className="border-l-2 border-[#ea580c] pl-4 space-y-1 bg-[#f9fafb]/80 py-2.5 pr-3 rounded-r-xl transition-all hover:bg-[#f5f5f5]">
                    <p className="text-xs sm:text-sm italic font-medium text-[#171717] leading-relaxed">{item.text}</p>
                    <h5 className="text-[10px] sm:text-[11px] font-bold text-[#6b7280] uppercase tracking-wider">{item.author}</h5>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-6 flex justify-center w-full">
              <div className="relative w-full max-w-sm sm:max-w-md bg-white border border-[#e5e5e5] rounded-xl p-2 shadow-[0_1px_3px_rgba(0,0,0,0.02)] group overflow-hidden">
                <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop" alt="Mother and son sharing a warm moment" className="rounded-lg w-full h-[280px] sm:h-[350px] object-cover filter brightness-[0.99] select-none pointer-events-none transition-transform duration-300 group-hover:scale-[1.01]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 8: SCIENCE & SAFETY ==================== */}
      <section className="py-20 bg-[#f5f5f5] border-b border-[#e5e5e5] text-center">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-14 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0a0a0a] font-['Satoshi',sans-serif]">Built on Vision Therapy Principles</h2>
            <p className="text-[#404040] text-sm sm:text-base font-normal leading-relaxed">Clinical safety principles integrated perfectly into an intuitive, child-first browser platform.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {[
              { title: "Safe Screen Time", desc: "Active ocular muscle engagement rules instead of generic, mindless video streaming scrolling habits." },
              { title: "Child-Friendly Sessions", desc: "Calm, welcoming gamified interfaces designed to eliminate any standard medical clinic fear patterns." },
              { title: "Guided Activities", desc: "Simple, automated step-by-step instructions that require absolutely zero independent handling loops." },
              { title: "Vision Science", desc: "Anchored directly to behavioral pediatric ophthalmology data metrics and visual recovery tracks." }
            ].map((item, i) => (
              <div key={i} className="bg-[#ffffff] border border-[#e5e5e5] rounded-xl p-6 text-left transition-all duration-200 hover:border-neutral-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#3b82f6] mb-4" />
                <h4 className="text-base font-bold text-[#0a0a0a] mb-2 tracking-tight font-['Satoshi',sans-serif]">{item.title}</h4>
                <p className="text-[#404040] text-xs sm:text-[13px] font-normal leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SECTION 9: INTEGRATED FAQ MATRIX ==================== */}
      <section id="faq" className="py-20 bg-[#ffffff] border-b border-[#e5e5e5] text-left">
        <div className="max-w-[800px] mx-auto px-6 sm:px-8">
          <div className="text-center mb-12 space-y-2">
            <span className="inline-flex bg-[#f5f5f5] text-[#171717] border border-[#e5e5e5] px-3.5 py-1 rounded-full text-xs font-medium select-none shadow-sm">Common Questions</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0a0a0a] font-['Satoshi',sans-serif]">Frequently Asked Questions</h2>
            <p className="text-[#404040] text-sm font-normal">Everything you need to know about Naintaara and home vision training.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-[#ffffff] border border-[#e5e5e5] rounded-xl overflow-hidden transition-colors duration-200 hover:border-[#d4d4d4]">
                  <button onClick={() => toggleFaq(idx)} className="w-full flex items-center justify-between p-5 text-left font-sans select-none focus:outline-none">
                    <span className="text-sm sm:text-base font-semibold text-[#0a0a0a] tracking-tight pr-4">{faq.q}</span>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2, ease: "easeInOut" }} className="text-[#404040] shrink-0"><ChevronDown className="w-4 h-4" /></motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
                        <div className="px-5 pb-5 pt-0 border-t border-[#f5f5f5] text-[#404040] text-xs sm:text-sm font-normal leading-relaxed">{faq.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== SECTION 10: DYNAMIC CTA SLIDER BANNER ==================== */}
      <CtaBanner handleStartPlaying={handleStartPlaying} />

      <Footer />
    </div>
  );
};

export default Home;