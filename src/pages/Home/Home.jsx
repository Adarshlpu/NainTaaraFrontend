import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Eye, Smartphone, Brain, BarChart3, ArrowRight, MessageSquare } from "lucide-react";

// Shadcn UI Elements
import { Button } from "../../components/ui/button";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const Home = () => {
  const navigate = useNavigate();
  const words = ["Vision Therapy", "Myopia", "Lazy Eye", "Eye Fitness"];
  const [index, setIndex] = useState(0);

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

  return (
    <div className="bg-[#fafafa] overflow-hidden antialiased selection:bg-orange-100">
      <Navbar />

      {/* SECTION 1: HERO */}
      <section id="home" className="pt-32 pb-16 sm:pb-24 bg-gradient-to-br from-[#fffdfa] via-white to-orange-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* LEFT SIDE */}
            <motion.div variants={itemVariants} className="flex flex-col">
              <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-[#ff7a00] px-4 py-1.5 rounded-xl font-bold text-xs sm:text-sm mb-5 w-fit shadow-sm shadow-orange-500/5">
                ✨ Smart Eye Fitness for Kids
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-neutral-900 mb-3 leading-[1.1]">
                Fun Games That Help Kids Improve
              </h1>

              {/* Animated Word Loop */}
              <div className="h-[55px] sm:h-[70px] lg:h-[85px] overflow-hidden mb-5 relative w-full">
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={words[index]}
                    initial={{ y: "80%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-80%", opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-[#ff7a00] to-orange-500 bg-clip-text text-transparent absolute top-0 left-0 w-full tracking-tight"
                  >
                    {words[index]}
                  </motion.h2>
                </AnimatePresence>
              </div>

              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-lg mb-8 font-medium">
                Interactive mobile games and AI-powered eye exercises designed to improve focus, eye coordination, and visual development in children naturally.
              </p>

              {/* CTA BUTTONS */}
              {/* 💡 FIXED: Integrated shadcn/radix 'asChild' to properly bubble React Router click parameters */}
              <div className="flex flex-col sm:flex-row gap-3.5">
                <Button asChild className="w-full sm:w-auto h-11 px-8 bg-[#ff7a00] hover:bg-orange-600 text-white font-bold rounded-xl shadow-md shadow-orange-500/10 border-0 text-sm transition-transform active:scale-[0.98]">
                  <Link to="/login">Start Playing</Link>
                </Button>

                <Button variant="outline" className="w-full sm:w-auto h-11 px-8 border-neutral-200 bg-white text-neutral-700 font-bold rounded-xl hover:bg-neutral-50 hover:border-neutral-300 flex items-center justify-center gap-2 text-sm">
                  <MessageSquare className="w-4 h-4 text-[#ff7a00]" />
                  Chat with Us
                </Button>
              </div>
            </motion.div>

            {/* RIGHT SIDE - ILLUSTRATION */}
            <motion.div className="relative flex justify-center mt-6 lg:mt-0" variants={itemVariants}>
              <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-br from-orange-200 to-amber-100 rounded-full blur-[100px] opacity-40 pointer-events-none" />

              <img
                src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop"
                alt="Girl playing eye training game"
                className="relative z-10 rounded-[32px] shadow-2xl border-4 sm:border-8 border-white w-full max-w-sm lg:max-w-md object-cover h-[340px] sm:h-[420px]"
              />

              {/* Floating UI Elements */}
              <motion.div
                className="absolute top-8 -left-2 bg-white/90 backdrop-blur-sm border border-neutral-100 rounded-xl px-4 py-2 shadow-md text-xs sm:text-sm font-bold text-neutral-800"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                👁️ Lazy Eye Training
              </motion.div>

              <motion.div
                className="absolute bottom-16 -left-6 bg-white/90 backdrop-blur-sm border border-neutral-100 rounded-xl px-4 py-2 shadow-md text-xs sm:text-sm font-bold text-neutral-800"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              >
                🎯 Better Focus
              </motion.div>

              <motion.div
                className="absolute bottom-6 -right-2 bg-white/90 backdrop-blur-sm border border-neutral-100 rounded-xl px-4 py-2 shadow-md text-xs sm:text-sm font-bold text-neutral-800"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              >
                🪙 Earn Rewards
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: FEATURES */}
      <section id="features" className="py-16 sm:py-24 bg-white border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mb-3">
              Why Parents Love Naintaara
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base max-w-xl mx-auto font-medium">
              Interactive eye-training experiences designed intuitively for childrens' developmental safety.
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
              { icon: <Brain className="text-[#ff7a00] w-6 h-6" />, title: "AI Eye Tracking", desc: "Smart visual exercises powered by integrated webcam model configurations." },
              { icon: "🎮", title: "Interactive Games", desc: "Engaging interactive layouts built specifically for pediatric visual correction." },
              { icon: <Smartphone className="text-[#ff7a00] w-6 h-6" />, title: "Mobile Friendly", desc: "Access clean execution pipelines anywhere through standard responsive views." },
              { icon: <BarChart3 className="text-[#ff7a00] w-6 h-6" />, title: "Progress Reports", desc: "Track performance graphs and dynamic visual convergence improvements." },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="bg-white border border-neutral-200/60 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-2xl mb-5">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed font-medium">{item.desc}</p>
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
              { title: "Feather-light", subtitle: "Ultra Light Frames", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1200&auto=format&fit=crop" },
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

          {/* LARGE INTERACTIVE BANNER */}
          <motion.div whileHover={{ scale: 1.005 }} className="relative rounded-[32px] overflow-hidden shadow-xl border border-neutral-100">
            <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1400&auto=format&fit=crop" alt="banner" className="w-full h-[450px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/70 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-xl px-6 sm:px-12 flex flex-col">
                <p className="text-[#ff7a00] uppercase text-xs font-bold tracking-[4px] mb-2">Featured Collection</p>
                <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">Smart Eye Wear For Kids</h2>
                <p className="text-neutral-300 text-xs sm:text-sm mb-6 leading-relaxed font-medium">
                  Hardware-integrated components engineered explicitly for localized convergence reinforcement setups.
                </p>
                <Button className="w-fit h-10 px-6 bg-[#ff7a00] hover:bg-orange-600 text-white font-bold rounded-xl border-0 text-xs shadow-sm shadow-orange-500/10">
                  Explore Collection →
                </Button>
              </div>
            </div>
          </motion.div>
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

      {/* SECTION 7: CTA BANNER */}
      <section id="contact" className="py-16 sm:py-24 bg-gradient-to-br from-[#ff7a00] via-orange-500 to-orange-600 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            Start Your Child's Vision Journey Today
          </h2>
          <p className="text-white/90 text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed font-medium">
            Join thousands of parents who trust Naintaara for functional eye development. Engage with clean, validated screen sessions.
          </p>

          {/* 💡 FIXED: Configured button redirection nodes with dynamic radix child templates */}
          <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center">
            <Button asChild className="w-full sm:w-auto h-11 px-10 bg-white hover:bg-neutral-50 text-[#ff7a00] font-black rounded-xl border-0 shadow-md text-sm transition-transform active:scale-[0.98]">
              <Link to="/login">Get Started</Link>
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