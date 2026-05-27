import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// FIXED: Managed explicit lightweight iconography paths matching Dub's system layout rulesets
import { 
  Eye, Smartphone, Brain, BarChart3, ArrowRight, MessageSquare, 
  ChevronDown, Target, Gamepad2, Tablet, LineChart 
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
// Shadcn UI Elements
import { Button } from "../../components/ui/button";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import heroImage from "../../assets/images/h1.png";

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
    <div className="bg-[#ffffff] overflow-hidden antialiased text-[#0a0a0a] font-sans selection:bg-slate-100">
      <Navbar />

      {/* ==================== SECTION 1: PREMIUM MED-TECH HERO CONTAINER ==================== */}
      <section id="home" className="pt-28 pb-16 sm:pt-36 sm:pb-24 bg-[#ffffff] relative overflow-hidden text-[#0a0a0a] font-sans">
        
        {/* PREMIUM TECH BACKGROUND ARCHITECTURE */}
        <div 
          className="absolute inset-0 opacity-[0.015] pointer-events-none z-0" 
          style={{
            backgroundImage: `radial-gradient(#000000 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Soft Ambient Lighting Blurs */}
        <div className="absolute top-[20%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] bg-gradient-to-tr from-[#ea580c]/8 to-transparent rounded-full blur-[80px] sm:blur-[120px] pointer-events-none z-0" />
        
        <div className="absolute top-[35%] left-[55%] -translate-x-1/2 -translate-y-1/2 w-[240px] sm:w-[380px] h-[240px] sm:h-[380px] bg-gradient-to-br from-[#3b82f6]/6 to-transparent rounded-full blur-[70px] sm:blur-[100px] pointer-events-none z-0" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 px-8 relative z-10">
          <motion.div
            className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* LEFT SIDE: PACKED DATA BLOCK */}
            <motion.div variants={itemVariants} className="flex flex-col text-left items-start w-full">
              <div className="inline-flex items-center bg-[#f5f5f5] text-[#171717] border border-[#e5e5e5] px-3.5 py-1 rounded-full text-xs font-medium mb-6 select-none shadow-[0_1px_2px_rgba(0,0,0,0.02)] max-w-full truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] mr-2 animate-pulse shrink-0" />
                Clinically Guided Vision Therapy
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-tight text-[#0a0a0a] leading-[1.14] mb-5 w-full">
                Home Vision Therapy <br />
                For Growing Kids <br />
                <div className="inline-block h-[40px] sm:h-[55px] lg:h-[65px] overflow-hidden relative w-full mt-1">
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

              <p className="text-[#404040] text-sm sm:text-base leading-relaxed max-w-md mb-6 sm:mb-8 font-normal">
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

            {/* 🔥 RIGHT SIDE REDESIGNED: PREMIUM BROWSER APP WINDOW CONTAINER */}
            <motion.div className="relative w-full max-w-md lg:max-w-[480px] mx-auto mt-6 lg:mt-0" variants={itemVariants}>
              
              {/* Subtle back ambient orange drop glow matching your startup vibe */}
              <div className="absolute inset-0 bg-[#ea580c]/5 rounded-2xl blur-3xl transform scale-95 pointer-events-none" />

              {/* Minimal Web Application Shell Panel Structure */}
              <div className="relative z-10 w-full bg-white border border-[#e5e5e5] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden">
                
                {/* 💻 Browser Window Custom Top Bar Header */}
                <div className="w-full h-8 sm:h-9 bg-[#f5f5f5] border-b border-[#e5e5e5] flex items-center justify-between px-3 sm:px-4 select-none">
                  {/* Three Color Window Dots */}
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#e5e5e5] border border-neutral-300/40" />
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#e5e5e5] border border-neutral-300/40" />
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#e5e5e5] border border-neutral-300/40" />
                  </div>
                  {/* Simulated App Safe URL field */}
                  <div className="bg-white px-4 sm:px-8 py-0.5 text-[9px] sm:text-[10px] font-medium text-[#6b7280] rounded border border-[#e5e5e5] tracking-tight truncate max-w-[150px] sm:max-w-none">
                    app.nainocular.com
                  </div>
                  <div className="w-8 sm:w-10" /> {/* Symmetry spacer */}
                </div>

                {/* Main Product Screenshot Window Space */}
                <div className="p-1 bg-[#ffffff]">
                  <img
                    src={heroImage}
                    alt="Nainocular live dynamic app platform view"
                    className="w-full h-[220px] sm:h-[340px] rounded-lg object-cover select-none pointer-events-none"
                  />
                </div>
              </div>

              {/* 📊 FLOATING PERFORMANCE DIAGNOSTICS CHIP */}
              <motion.div 
                className="absolute -bottom-4 -right-1 sm:-bottom-5 sm:-right-2 bg-white border border-[#e5e5e5] rounded-lg p-2.5 sm:p-3 flex items-center gap-2.5 sm:gap-3 text-left shadow-[0_8px_20px_rgba(0,0,0,0.04)] z-20 max-w-[90%] sm:max-w-none"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-2 h-2 rounded-full bg-[#3b82f6] relative flex items-center justify-center shrink-0">
                  <span className="absolute w-full h-full rounded-full bg-[#3b82f6]/40 animate-ping" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <p className="text-[9px] font-medium text-[#6b7280] uppercase tracking-wider leading-none">Active AI Diagnostics</p>
                  <h4 className="text-xs font-bold text-[#0a0a0a] truncate">Ocular Feedback: 98%</h4>
                </div>
              </motion.div>

            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: THE FUTURE OF VISION CARE */}
      <section id="features" className="py-20 bg-[#f5f5f5] border-y border-[#e5e5e5]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div className="mb-14 space-y-2" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0a0a0a]">The Future of Vision Care</h2>
            <p className="text-[#404040] text-sm sm:text-base max-w-xl mx-auto font-normal">Our technology blends medical science with world-class game design to create an experience children love.</p>
          </motion.div>

          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {[
              { icon: <Target className="w-5 h-5 text-[#3b82f6]" />, title: "AI Eye Tracking", desc: "Real-time ocular movement analysis ensures exercises are hitting the right spots every time." },
              { icon: <Gamepad2 className="w-5 h-5 text-[#7c3aed]" />, title: "Interactive Games", desc: "3D immersive environments designed to keep children engaged while their eyes work hard." },
              { icon: <Tablet className="w-5 h-5 text-[#16a34a]" />, title: "Mobile Friendly", desc: "Train anywhere, anytime. Our platform works seamlessly on tablets and smartphones." },
              { icon: <LineChart className="w-5 h-5 text-[#ea580c]" />, title: "Progress Reports", desc: "Detailed insights for parents and doctors to track visual acuity improvements over time." },
            ].map((item, i) => (
              <motion.div key={i} variants={itemVariants} className="bg-white border border-[#e5e5e5] rounded-xl p-6 flex flex-col items-start text-left shadow-none hover:border-[#d4d4d4] transition duration-200">
                <div className="w-10 h-10 rounded-lg bg-[#f5f5f5] border border-[#e5e5e5] flex items-center justify-center mb-5 shrink-0">{item.icon}</div>
                <h3 className="text-lg font-bold text-[#0a0a0a] mb-2">{item.title}</h3>
                <p className="text-[#404040] text-xs sm:text-sm font-normal leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: VISION THEORY */}
      <section id="theory" className="py-20 bg-white border-b border-[#e5e5e5]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center w-full">
              <img src="https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=800&auto=format&fit=crop" alt="Vision Analytics diagram" className="rounded-xl border border-[#e5e5e5] w-full max-w-sm" />
            </div>
            <div className="text-left space-y-4 w-full">
              <span className="text-[#3b82f6] text-xs font-bold uppercase tracking-wider block">Clinical Foundation</span>
              <h2 className="text-3xl font-bold text-[#0a0a0a]">Understanding Vision Problems</h2>
              <p className="text-[#171717] text-sm leading-relaxed font-normal">We safely bridge behavioral pediatric ophthalmology data models with gamified software interfaces to motivate active visual physical therapy bounds.</p>
              <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
                {[
                  { title: "Lazy Eye", desc: "Improves binocular coordination links." },
                  { title: "Myopia", desc: "Supports accommodation muscle tracking." },
                  { title: "Eye Fitness", desc: "Interactive physical training metrics." },
                ].map((item, i) => (
                  <div key={i} className="bg-[#f5f5f5] p-4 rounded-xl border border-[#e5e5e5] text-left">
                    <h3 className="font-bold text-xs sm:text-sm text-[#0a0a0a] mb-1">{item.title}</h3>
                    <p className="text-[#404040] text-[11px] sm:text-xs leading-normal font-normal">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: GAME PREVIEW */}
      <section id="games" className="py-20 bg-white border-b border-[#e5e5e5]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
            <div className="text-left">
              <h2 className="text-3xl font-bold text-[#0a0a0a]">Interactive Eye Training Games</h2>
              <p className="text-[#404040] text-xs sm:text-sm font-normal">Engaging modules structured to keep active tracking tracking intervals completely optimized.</p>
            </div>
            <button onClick={() => navigate("/games")} className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0a0a0a] hover:opacity-80 transition duration-150 shrink-0">
              View All Games <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game, i) => (
              <div key={i} className="bg-white border border-[#e5e5e5] rounded-xl p-6 flex flex-col justify-between items-start text-left hover:border-[#d4d4d4] transition duration-200">
                <div className="w-full">
                  <div className="text-3xl mb-4 bg-[#f5f5f5] w-12 h-12 rounded-lg flex items-center justify-center border border-[#e5e5e5]">{game.emoji}</div>
                  <h3 className="text-base font-bold text-[#0a0a0a] mb-1.5">{game.title}</h3>
                  <p className="text-[#404040] text-xs sm:text-sm font-medium leading-relaxed">{game.desc}</p>
                </div>
                <Link to="/login" className="mt-5 w-fit">
                  <div className="w-8 h-8 rounded-full border border-[#e5e5e5] hover:border-black text-black flex items-center justify-center transition-all bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: GLASSES SHOWCASE */}
      <section className="py-20 bg-white border-b border-[#e5e5e5]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="mb-10">
            <span className="text-[#3b82f6] font-bold text-xs uppercase tracking-wider block mb-1">Exclusively for Naintaara</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0a0a0a]">Smart Vision Glasses 👓</h2>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Crystal Clear", subtitle: "Transparent Frames", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop" },
              { title: "Trending", subtitle: "Pokemon Edition", image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=1200&auto=format&fit=crop" },
              { title: "Bold Signature", subtitle: "Premium Vision Frames", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop" },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-[#e5e5e5] overflow-hidden bg-white shadow-none w-full">
                <img src={item.image} alt={item.title} className="w-full h-[180px] object-cover" />
                <div className="p-4 border-t border-[#e5e5e5] bg-white">
                  <h3 className="text-sm font-bold text-[#0a0a0a]">{item.title}</h3>
                  <p className="text-[#404040] text-xs font-normal mt-0.5">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: FAQ ACCORDION */}
      <section id="faq" className="py-20 bg-[#f5f5f5] text-left">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#0a0a0a] mb-10">Frequently Asked Questions</h2>
          <div className="space-y-2.5">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-lg border border-[#e5e5e5] overflow-hidden shadow-none w-full">
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full flex items-center justify-between p-4 text-left text-sm font-bold text-[#0a0a0a] bg-white hover:bg-[#f5f5f5]/50 transition focus:outline-none">
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#262626] transition-transform shrink-0 ${openFaq === idx ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-4 pb-4 text-[#171717] text-sm leading-relaxed border-t border-[#e5e5e5] pt-3.5 bg-white text-left w-full">
                      {idx === 5 ? (
                        <span>Currently, digital eye therapies are out-of-pocket in India. To check status, reach out directly on our <Link to="/contact" className="text-[#3b82f6] hover:underline font-bold">Contact Page</Link>.</span>
                      ) : faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: BOTTOM CTA BANNER */}
      <section id="contact" className="py-20 bg-white border-t border-[#e5e5e5] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0a0a0a] tracking-tight mb-4">Start Your Child's Vision Journey Today</h2>
          <p className="text-[#171717] text-sm sm:text-base mb-8 max-w-xl mx-auto font-normal">Join thousands of parents who trust Naintaara for functional eye development. Engage with clean, validated screen sessions.</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full sm:w-auto">
            <button onClick={handleStartPlaying} className="h-11 px-8 bg-[#000000] hover:bg-[#171717] text-white font-medium text-sm rounded-lg shadow-sm transition transform active:scale-[0.98] w-full sm:w-auto border-0 cursor-pointer">Get Started</button>
            <button onClick={() => navigate("/games")} className="h-11 px-8 bg-white border border-[#e5e5e5] hover:bg-[#f5f5f5] text-[#0a0a0a] font-medium text-sm rounded-lg shadow-sm transition w-full sm:w-auto cursor-pointer">Learn More</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;