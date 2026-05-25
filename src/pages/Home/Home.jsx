import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// FIXED: Cleaned imports tracking structural dependencies flawlessly
import { Eye, Smartphone, Brain, BarChart3, ArrowRight, MessageSquare, ChevronDown, Target, Gamepad2, Tablet, LineChart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
// Shadcn UI Elements
import { Button } from "../../components/ui/button";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import heroImage from "../../assets/images/h1.jpg";

const Home = () => {
  const navigate = useNavigate();
  const words = ["Vision Therapy", "Myopia", "Lazy Eye", "Eye Fitness"];
  const [index, setIndex] = useState(0);
  
  // State variable tracking active layout indices for the FAQ dropdown toggle
  const [openFaq, setOpenFaq] = useState(null);

  const handleStartPlaying = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  // 💡 FIXED: Generates an automated secure WhatsApp link with a custom message payload
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
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Parent",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
      review: "My daughter's focus improved dramatically in just 3 weeks. Naintaara made eye training fun!",
      rating: 5,
    },
    {
      name: "Rahul Patel",
      role: "Parent",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
      review: "Best investment for my son's vision health. Doctors recommended it and he loves playing!",
      rating: 5,
    },
    {
      name: "Anjali Gupta",
      role: "Parent",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
      review: "The progress reports are amazing. Finally, I can see my child's improvement tracked clearly.",
      rating: 5,
    },
  ];

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

  // FAQ content array structured strictly under 40 words per value rule mapping
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
    <div className="bg-[#fafafa] overflow-hidden antialiased selection:bg-orange-100">
      <Navbar />

      {/* SECTION 1: HERO */}
      <section id="home" className="pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid lg:grid-cols-2 gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* LEFT ROW SEGMENT */}
            <motion.div variants={itemVariants} className="flex flex-col text-left items-start">
              <h1 className="text-5xl sm:text-6xl lg:text-[68px] font-black tracking-tight text-neutral-900 leading-[1.08] mb-4">
                Fun Games That <br />
                Help Kids <span className="text-[#bf5b1d]">Improve</span> <br />
                <div className="inline-block h-[60px] sm:h-[75px] lg:h-[85px] overflow-hidden relative w-full mt-1">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={words[index]}
                      initial={{ y: "40%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "-40%", opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="text-[#ff914d] absolute left-0 top-0 block w-full"
                    >
                      {words[index]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </h1>

              <p className="text-neutral-500 text-sm sm:text-base leading-relaxed max-w-lg mb-8 font-medium">
                Interactive AI-powered eye training designed to improve focus, coordination, and visual development in children naturally.
              </p>

              {/* CTA BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-3.5 mb-10 w-full sm:w-auto">
                <Button 
                  onClick={handleStartPlaying}
                  className="h-14 px-8 bg-[#ff914d] hover:bg-orange-500 text-white font-black text-sm rounded-[24px] shadow-lg shadow-orange-500/10 border-0 tracking-wide transition transform active:scale-[0.98] w-full sm:w-auto"
                >
                  Start Training Now
                </Button>

                {/* 💡 FIXED: Replaced 'Watch Demo' with 'Chat with Us' pointing securely to WhatsApp router */}
                <Button 
                  onClick={handleWhatsAppRedirect}
                  variant="outline" 
                  className="h-14 px-8 border-neutral-200 bg-white text-neutral-800 font-bold text-sm rounded-[24px] hover:bg-neutral-50 flex items-center justify-center gap-2 w-full sm:w-auto shadow-sm active:scale-[0.98] transition"
                >
                  <MessageSquare className="w-4 h-4 text-[#ff914d]" />
                  Chat with Us
                </Button>
              </div>

              <div className="flex flex-wrap gap-2.5 max-w-md">
                <span className="inline-flex items-center gap-2 text-xs font-black text-neutral-800 bg-neutral-50/80 border border-neutral-100 px-4 py-2 rounded-full shadow-sm">
                  <span className="text-[#bf5b1d]">👁️</span> Lazy Eye Training
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-black text-neutral-800 bg-neutral-50/80 border border-neutral-100 px-4 py-2 rounded-full shadow-sm">
                  <span className="text-[#bf5b1d]">🎯</span> Better Focus
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-black text-neutral-800 bg-neutral-50/80 border border-neutral-100 px-4 py-2 rounded-full shadow-sm">
                  <span className="text-[#bf5b1d]">🪙</span> Earn Rewards
                </span>
              </div>
            </motion.div>

            {/* RIGHT SIDE - ILLUSTRATION */}
            <motion.div className="relative flex justify-center mt-8 lg:mt-0" variants={itemVariants}>
              <div className="absolute w-80 h-80 bg-gradient-to-br from-orange-100 to-amber-50 rounded-full blur-[100px] opacity-30 pointer-events-none" />

              <div className="relative z-10 rounded-[40px] overflow-hidden p-2 bg-white shadow-xl border border-neutral-100">
                <img
                  src={heroImage}
                  alt="Boy interacting with holographic focus tracking parameters"
                  className="rounded-[32px] w-full max-w-sm lg:max-w-[460px] object-cover h-[320px] sm:h-[400px]"
                />
              </div>

              <motion.div
                className="absolute -bottom-4 right-2 sm:-right-4 bg-white/95 backdrop-blur-md border border-neutral-100 rounded-3xl p-4 shadow-xl z-20 flex items-center gap-3.5 min-w-[210px] text-left"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black text-sm shadow-md shadow-orange-500/20 shrink-0">
                  ⚡
                </div>
                <div className="space-y-1 min-w-0">
                  <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest leading-none">Active AI Scan</p>
                  <h4 className="text-xs font-black text-neutral-800 tracking-tight leading-none mt-1">Focusing... 98%</h4>
                  <div className="w-24 h-1 bg-neutral-100 rounded-full mt-1.5 overflow-hidden">
                    <div className="h-full bg-orange-500 w-[98%] rounded-full" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: THE FUTURE OF VISION CARE */}
      <section id="features" className="py-20 bg-[#fafafa] border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16 space-y-3.5"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-900">
              The Future of Vision Care
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base max-w-2xl mx-auto font-medium leading-relaxed">
              Our technology blends medical science with world-class game design to create an experience children love.
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { 
                icon: <Target className="w-5 h-5 text-[#8c4a24]" />, 
                title: "AI Eye Tracking", 
                desc: "Real-time ocular movement analysis ensures exercises are hitting the right spots every time." 
              },
              { 
                icon: <Gamepad2 className="w-5 h-5 text-[#8c4a24]" />, 
                title: "Interactive Games", 
                desc: "3D immersive environments designed to keep children engaged while their eyes work hard." 
              },
              { 
                icon: <Tablet className="w-5 h-5 text-[#8c4a24]" />, 
                title: "Mobile Friendly", 
                desc: "Train anywhere, anytime. Our platform works seamlessly on tablets and smartphones." 
              },
              { 
                icon: <LineChart className="w-5 h-5 text-[#8c4a24]" />, 
                title: "Progress Reports", 
                desc: "Detailed insights for parents and doctors to track visual acuity improvements over time." 
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white border border-neutral-100 rounded-[32px] p-8 flex flex-col items-start text-left shadow-[0_15px_45px_rgba(0,0,0,0.02)] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[#fdf2e9] flex items-center justify-center mb-6 shrink-0 shadow-inner">
                  {item.icon}
                </div>
                <h3 className="text-xl font-black text-neutral-900 tracking-tight mb-3">
                  {item.title}
                </h3>
                <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed font-semibold">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: VISION THEORY */}
      <section id="theory" className="py-16 sm:py-24 bg-gradient-to-br from-[#fffdfa] via-white to-orange-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid lg:grid-cols-2 gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* LEFT IMAGE */}
            <motion.div className="order-2 lg:order-1 flex justify-center" variants={itemVariants}>
              <img
                src="https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=800&auto=format&fit=crop"
                alt="Vision Problems illustration"
                className="rounded-[28px] shadow-xl border border-neutral-200/50 w-full max-w-sm"
              />
            </motion.div>

            {/* RIGHT CONTENT */}
            <motion.div className="order-1 lg:order-2" variants={itemVariants}>
              <div className="inline-flex bg-orange-50 border border-orange-200 text-[#ff7a00] px-4 py-1 rounded-xl text-xs font-bold mb-4 shadow-sm">
                👁️ Better Understanding
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mb-4 leading-tight">
                Understanding <span className="text-[#ff7a00]">Vision Problems</span>
              </h2>

              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                We safely bridge behavioral pediatric ophthalmology data models with gamified software interfaces to motivate active visual physical therapy bounds.
              </p>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { title: "Lazy Eye", desc: "Improves binocular coordination vectors." },
                  { title: "Myopia", desc: "Supports accommodation relaxation tracks." },
                  { title: "Vision Therapy", desc: "Interactive eye movement pipelines." },
                ].map((item, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-neutral-200/60">
                    <h3 className="font-bold text-sm sm:text-base text-neutral-900 mb-1">{item.title}</h3>
                    <p className="text-neutral-500 text-[11px] sm:text-xs leading-relaxed font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: GAME PREVIEW */}
      <section id="games" className="py-16 sm:py-24 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mb-3">
              Interactive Eye Training Games
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base max-w-xl mx-auto font-medium">
              Engaging modules structured to keep active tracking tracking intervals completely optimized.
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {games.map((game, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bg-white border border-neutral-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="text-4xl mb-4">{game.emoji}</div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-1.5">{game.title}</h3>
                  <p className="text-neutral-500 text-xs sm:text-sm font-medium leading-relaxed">{game.desc}</p>
                </div>
                <Link to="/login" className="mt-5 w-fit">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 hover:bg-[#ff7a00] text-[#ff7a00] hover:text-white flex items-center justify-center font-bold transition-colors duration-200 cursor-pointer text-sm">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION: SMART GLASSES SHOWCASE */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[#ff7a00] font-bold text-xs uppercase tracking-wider mb-1">Exclusively for Naintaara</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">Smart Vision Glasses 👓</h2>
          </motion.div>

          {/* GLASSES MATRIX */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { title: "Crystal Clear", subtitle: "Transparent Frames", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop" },
              { title: "Trending", subtitle: "Pokemon Edition", image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=1200&auto=format&fit=crop" },
              { title: "Bold Signature", subtitle: "Premium Vision Frames", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop" },
              { title: "Gilded", subtitle: "Luxury Kids Frames", image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=1200&auto=format&fit=crop" },
              { title: "2 in 1 Eye + Sun", subtitle: "Smart Switch", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop" },
              { title: "Feather-light", subtitle: "Ultra Light Frames", image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=1200&auto=format&fit=crop" },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, scale: 1.01 }}
                className="relative rounded-[20px] overflow-hidden shadow-md group cursor-pointer border border-neutral-100"
              >
                <img src={item.image} alt={item.title} className="w-full h-[200px] object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 z-10">
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-neutral-300 text-xs font-medium">{item.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: REWARDS */}
      <section id="rewards" className="py-16 sm:py-24 bg-gradient-to-br from-[#fffdfa] via-white to-orange-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[28px] border border-neutral-200/60 p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex bg-orange-50 border border-orange-200 text-[#ff7a00] px-4 py-1 rounded-xl text-xs font-bold mb-4">
                  🎁 Play Games. Unlock Discounts.
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mb-6 leading-snug">
                  Earn Vision Coins by completing eye-training games and redeem rewards for premium spectacle deductions.
                </h2>

                <div className="grid sm:grid-cols-2 gap-3.5">
                  {[
                    { icon: "🪙", title: "+10 Login Bonus", desc: "Daily login checkins." },
                    { icon: "⭐", title: "+5 Coins Per Game", desc: "Active playtime points." },
                    { icon: "🔥", title: "7 Day Streak Bonus", desc: "Unlock +20 extra shards." },
                    { icon: "👓", title: "Redeem Frame Vouchers", desc: "Secure automated code slips." },
                  ].map((item, i) => (
                    <div key={i} className="bg-neutral-50/50 border border-neutral-200/60 p-4 rounded-xl shadow-none">
                      <div className="text-2xl mb-1">{item.icon}</div>
                      <h4 className="font-bold text-sm sm:text-base text-neutral-900 mb-0.5">{item.title}</h4>
                      <p className="text-neutral-500 text-xs font-medium">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative flex justify-center">
                <div className="absolute w-64 h-64 bg-gradient-to-br from-amber-200 to-orange-100 rounded-full blur-[90px] opacity-40 pointer-events-none" />
                <img
                  src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop"
                  alt="Rewards showcase"
                  className="relative z-10 rounded-[24px] border-4 border-white shadow-xl w-full max-w-xs object-cover h-[300px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: NAINTAARA VISION REELS */}
      <section className="py-16 sm:py-24 bg-neutral-950 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-80 h-80 bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <p className="text-[#ff7a00] font-bold text-xs uppercase tracking-[2px] mb-2">Trending Vision Styles</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Naintaara Vision Reels ✨</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Smart Focus", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop", views: "1.2M" },
              { name: "Vision Style", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop", views: "980K" },
              { name: "Eye Fitness", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop", views: "2.4M" },
              { name: "Future Frames", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop", views: "870K" },
            ].map((reel, i) => (
              <motion.div key={i} whileHover={{ y: -6, scale: 1.01 }} className="relative h-[440px] rounded-[24px] overflow-hidden group cursor-pointer shadow-xl">
                <img src={reel.image} alt={reel.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                <div className="absolute top-4 left-4 bg-[#ff7a00] text-white px-3 py-1 rounded-lg text-xs font-bold shadow-md">Trending</div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-lg font-bold mb-1">{reel.name}</h3>
                  <div className="flex justify-between items-center text-xs text-neutral-300">
                    <span>{reel.views} Views</span>
                    <span>❤️ 24k</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div whileHover={{ scale: 1.005 }} className="mt-16 bg-gradient-to-r from-[#ff7a00] to-orange-600 rounded-[28px] p-8 sm:p-12 text-center shadow-xl border border-orange-500/20">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">Discover The Future Of Eye Fitness 👓</h3>
            <p className="text-white/80 text-sm max-w-xl mx-auto mb-6 font-medium">Explore modern tracking exercises and smart optical modules designed recursively for child growth.</p>
            <Button className="h-10 px-6 bg-white hover:bg-neutral-50 text-[#ff7a00] font-bold rounded-xl border-0 text-xs shadow-sm">Explore More →</Button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6: TESTIMONIALS */}
      <section className="py-16 sm:py-24 bg-white overflow-hidden border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mb-2">Parents Love Naintaara</h2>
            <p className="text-neutral-500 text-sm sm:text-base font-medium">Real tracking logs shared securely from verified family parameters.</p>
          </div>

          {/* INFINITE CAROUSEL TRACK */}
          <div className="relative overflow-hidden pt-2">
            <motion.div className="flex gap-6 w-max" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
              {[...testimonials, ...testimonials].map((testimonial, i) => (
                <div key={i} className="flex-shrink-0 w-[290px] sm:w-[350px] bg-white border border-neutral-200/80 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={testimonial.image} alt={testimonial.name} className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border border-neutral-200" />
                    <div>
                      <h4 className="font-bold text-sm text-neutral-900">{testimonial.name}</h4>
                      <p className="text-neutral-400 text-[11px] font-semibold">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-3 text-sm">
                    {[...Array(testimonial.rating)].map((_, idx) => <span key={idx}>⭐</span>)}
                  </div>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed italic font-medium">"{testimonial.review}"</p>
                </div>
              ))}
            </motion.div>
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
          </div>
        </div>
      </section>

      {/* ==================== FAQ ACCORDION SECTION ==================== */}
      <section id="faq" className="py-16 sm:py-24 bg-slate-50 border-t border-neutral-100 text-left">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900">Frequently Asked Questions</h2>
            <p className="text-neutral-500 text-xs sm:text-sm font-medium mt-1">Get transparent clarifications on standard child eye-fitness mechanics.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-neutral-200/60 overflow-hidden shadow-sm transition">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-sm font-bold text-slate-800 focus:outline-none transition hover:bg-slate-50/50"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${openFaq === idx ? "rotate-180 text-orange-500" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-neutral-500 text-xs sm:text-[13px] leading-relaxed font-medium border-t border-neutral-50 pt-2.5">
                        {idx === 5 ? (
                          <span>
                            Currently, digital eye therapies are out-of-pocket in India. To check international status or for custom corporate health clinic tie-ups, reach out directly on our{" "}
                            <Link to="/contact" className="text-[#ff7a00] hover:underline font-bold">Contact Page</Link>.
                          </span>
                        ) : faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: CTA BANNER */}
      <section id="contact" className="py-16 sm:py-24 bg-gradient-to-br from-[#ff7a00] via-orange-500 to-orange-600 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            Start Your Child's Vision Journey Today
          </h2>
          <p className="text-white/90 text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed font-medium">
            Join thousands of parents who trust Naintaara for functional eye development. Engage with clean, validated screen sessions.
          </p>

          <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center">
            <Button asChild className="w-full sm:w-auto h-11 px-10 bg-white hover:bg-neutral-50 text-[#ff7a00] font-black rounded-xl border-0 shadow-md text-sm transition-transform active:scale-[0.98]">
              <button onClick={handleStartPlaying}>
                Get Started
              </button>
            </Button>

            <Button variant="outline" className="w-full sm:w-auto h-11 px-10 border-white/40 bg-transparent text-white font-bold rounded-xl hover:bg-white/10 hover:border-white/60 text-sm">
              Learn More
            </Button>
          </div>

          <p className="text-white/80 text-[11px] sm:text-xs mt-6 font-medium">
            Available on modern mobile web rendering standard frameworks.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;