import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";

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
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  // Testimonials Data
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

  // Games Data
  const games = [
    {
      title: "Focus Quest",
      emoji: "🎯",
      desc: "Track moving objects to improve eye coordination",
    },
    {
      title: "Color Catch",
      emoji: "🌈",
      desc: "Match colors quickly for visual agility training",
    },
    {
      title: "Vision Rush",
      emoji: "⚡",
      desc: "Fast-paced game to enhance reaction time",
    },
  ];

  return (
    <div className="bg-white overflow-hidden">
      <Navbar />

      {/* SECTION 1: HERO */}
      <section id="home" className="pt-36 pb-20 sm:pb-24 bg-gradient-to-br from-[#fffaf5] via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* LEFT SIDE */}
            <motion.div variants={itemVariants}>
              <motion.div
                className="inline-flex items-center gap-2 bg-orange-100 text-[#ff7a00] px-5 py-2 rounded-full font-semibold text-sm mb-6"
                whileHover={{ scale: 1.05 }}
              >
                ✨ Smart Eye Fitness for Kids
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-4">
                Fun Games That Help Kids Improve
              </h1>

              {/* Animated Word Loop */}

<div className="h-[72px] sm:h-[88px] lg:h-[108px] overflow-hidden mb-6 relative w-full">
  <AnimatePresence mode="wait">
    <motion.h2
      key={words[index]}
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: "0%", opacity: 1 }}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeInOut",
      }}
      
    
      className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-none bg-gradient-to-r from-[#ff7a00] to-orange-500 bg-clip-text text-transparent absolute top-0 left-0 w-full pt-2 lg:pt-3 pb-2"
    >
      {words[index]}
    </motion.h2>
  </AnimatePresence>
</div>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl mb-8">
                Interactive mobile games and AI-powered eye exercises designed to improve focus, eye coordination, and visual development in children.
              </p>

              {/* CTA BUTTONS */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                variants={containerVariants}
              >
                <motion.button
                 onClick={() => navigate("/login")}
                 variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#ff7a00] hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg transition-all duration-300 w-full sm:w-auto text-center"
                >
                  Start Playing
                </motion.button>

                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-[#ff7a00] text-[#ff7a00] hover:bg-orange-50 px-8 py-4 rounded-full font-semibold transition-all duration-300 w-full sm:w-auto text-center"
                >
                  Chat with Us
                </motion.button>
              </motion.div>
            </motion.div>

            {/* RIGHT SIDE - ILLUSTRATION */}
            <motion.div
              className="relative flex justify-center mt-8 lg:mt-0"
              variants={itemVariants}
            >
              {/* Orange Gradient Glow */}
              <div className="absolute w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-br from-orange-300 to-orange-100 rounded-full blur-3xl opacity-40"></div>

              {/* Child Image */}
              <img
                src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop"
                alt="Girl playing eye training game"
                className="relative z-10 rounded-3xl sm:rounded-[40px] shadow-2xl border-4 sm:border-8 border-white w-full max-w-sm lg:max-w-md object-cover"
              />

              {/* Floating UI Cards */}
              <motion.div
                className="absolute top-8 sm:top-10 -left-4 sm:-left-6 bg-white rounded-2xl px-4 py-2 sm:px-5 sm:py-3 shadow-lg text-sm sm:text-base whitespace-nowrap font-medium"
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                👁️ Lazy Eye Training
              </motion.div>

              <motion.div
                className="absolute bottom-20 sm:bottom-24 -left-8 sm:-left-10 bg-white rounded-2xl px-4 py-2 sm:px-5 sm:py-3 shadow-lg text-sm sm:text-base whitespace-nowrap font-medium"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
              >
                🎯 Better Focus
              </motion.div>

              <motion.div
                className="absolute bottom-8 sm:bottom-12 -right-4 sm:-right-6 bg-white rounded-2xl px-4 py-2 sm:px-5 sm:py-3 shadow-lg text-sm sm:text-base whitespace-nowrap font-medium"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, delay: 1 }}
              >
                🪙 Earn Rewards
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: FEATURES */}
      <section id="features" className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Parents Love Naintaara
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Interactive eye-training experiences designed for children.
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: "👁️", title: "AI Eye Tracking", desc: "Smart visual exercises powered by AI technology." },
              { icon: "🎮", title: "Interactive Games", desc: "Engaging games designed for kids vision training." },
              { icon: "📱", title: "Mobile Friendly", desc: "Play anywhere with smooth mobile experiences." },
              { icon: "📊", title: "Progress Reports", desc: "Track improvement and daily performance easily." },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -12, boxShadow: "0 20px 40px rgba(255, 122, 0, 0.15)" }}
                className="bg-white border border-orange-100 rounded-3xl p-6 sm:p-8 shadow-md transition-all duration-300 cursor-pointer"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-3xl sm:text-4xl mb-4 sm:mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: VISION THEORY */}
      <section id="theory" className="py-20 sm:py-24 bg-gradient-to-br from-[#fffaf5] via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* LEFT - IMAGE */}
            <motion.div
              className="order-2 lg:order-1 flex justify-center"
              variants={itemVariants}
            >
              <img
                src="https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=800&auto=format&fit=crop"
                alt="Vision Problems illustration"
                className="rounded-3xl sm:rounded-[40px] shadow-2xl w-full max-w-xs sm:max-w-md"
              />
            </motion.div>

            {/* RIGHT - CONTENT */}
            <motion.div className="order-1 lg:order-2" variants={itemVariants}>
              <motion.div
                className="inline-flex bg-orange-100 text-[#ff7a00] px-5 py-2 rounded-full text-sm font-semibold mb-6"
                whileHover={{ scale: 1.05 }}
              >
                👁️ Better Understanding
              </motion.div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 mb-6">
                Understanding
                <span className="block text-[#ff7a00]">Vision Problems</span>
              </h2>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
                We combine science, technology, and fun to help children overcome visual challenges and improve focus.
              </p>

              <motion.div
                className="grid sm:grid-cols-3 gap-4 sm:gap-5"
                variants={containerVariants}
              >
                {[
                  { title: "Lazy Eye", desc: "Improves coordination and visual focus." },
                  { title: "Myopia", desc: "Supports healthy vision development." },
                  { title: "Vision Therapy", desc: "Interactive eye movement exercises." },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white p-5 sm:p-6 rounded-3xl shadow-md hover:shadow-lg transition-all border border-orange-100"
                  >
                    <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: GAME PREVIEW */}
      <section id="games" className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Interactive Eye Training Games
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Engaging games designed to make vision training fun and effective for kids.
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {games.map((game, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-orange-50 to-white border border-orange-200 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-5xl mb-4">{game.emoji}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{game.title}</h3>
                <p className="text-gray-600 text-base">{game.desc}</p>
                <motion.div
                  className="mt-6 w-12 h-12 rounded-full bg-[#ff7a00] flex items-center justify-center text-white font-bold"
                  whileHover={{ rotate: 90 }}
                >
                  →
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

{/* SECTION: SMART GLASSES SHOWCASE */}
<section className="py-20 sm:py-24 bg-white">

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Heading */}
    <motion.div
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <p className="text-[#ff7a00] font-semibold mb-3">
        Exclusively for Naintaara
      </p>

      <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
        Smart Vision Glasses 👓
      </h2>
    </motion.div>

    {/* TOP CARDS */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

      {[
        {
          title: "Crystal Clear",
          subtitle: "Transparent Frames",
          image:
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop",
        },

        {
          title: "Trending",
          subtitle: "Pokemon Edition",
          image:
            "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=1200&auto=format&fit=crop",
        },

        {
          title: "Bold Signature",
          subtitle: "Premium Vision Frames",
          image:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop",
        },

        {
          title: "Gilded",
          subtitle: "Luxury Kids Frames",
          image:
            "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=1200&auto=format&fit=crop",
        },

        {
          title: "2 in 1 Eye + Sun",
          subtitle: "Smart Switch",
          image:
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop",
        },

        {
          title: "Feather-light",
          subtitle: "Ultra Light Frames",
          image:
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1200&auto=format&fit=crop",
        },
      ].map((item, i) => (

        <motion.div
          key={i}
          whileHover={{
            y: -8,
            scale: 1.02,
          }}
          className="relative rounded-[28px] overflow-hidden shadow-xl group cursor-pointer"
        >

          {/* IMAGE */}
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-[220px] object-cover group-hover:scale-110 transition duration-500"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          {/* TEXT */}
          <div className="absolute bottom-5 left-5 z-10">
            <h3 className="text-2xl font-bold text-white">
              {item.title}
            </h3>

            <p className="text-white/70 text-sm">
              {item.subtitle}
            </p>
          </div>

        </motion.div>
      ))}

    </div>

    {/* BIG BANNER */}
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="relative rounded-[40px] overflow-hidden shadow-2xl"
    >

      <img
        src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1400&auto=format&fit=crop"
        alt="banner"
        className="w-full h-[500px] object-cover"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

      {/* CONTENT */}
      <div className="absolute inset-0 flex items-center">

        <div className="max-w-xl px-8 sm:px-16">

          <p className="text-white/70 uppercase tracking-[6px] mb-4">
            Featured
          </p>

          <h2 className="text-5xl sm:text-6xl font-extrabold text-[#ff7a00] mb-4">
            Naintaara
          </h2>

          <h3 className="text-3xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            Smart Eye Wear For Kids
          </h3>

          <p className="text-white/80 text-lg mb-8 leading-relaxed">
            AI-powered vision glasses specially designed for eye fitness,
            lazy eye recovery, and focus improvement.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#ff7a00] hover:bg-orange-600 text-white px-10 py-5 rounded-full font-bold shadow-2xl"
          >
            Explore Collection →
          </motion.button>

        </div>
      </div>
    </motion.div>

  </div>
</section>




      {/* SECTION 5: REWARDS */}
      <section id="rewards" className="py-20 sm:py-24 bg-gradient-to-br from-[#fffaf5] via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-gradient-to-r from-[#fff5ec] to-white rounded-3xl sm:rounded-[40px] p-6 sm:p-10 lg:p-16 overflow-hidden border border-orange-100 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
              {/* LEFT */}
              <motion.div variants={itemVariants}>
                <motion.div
                  className="inline-flex bg-orange-100 text-[#ff7a00] px-5 py-2 rounded-full text-sm font-semibold mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  🎁 Play Games. Unlock Discounts.
                </motion.div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 mb-4">
                  Earn Vision Coins by completing eye-training games and redeem rewards for discounts on spectacles.
                </h2>

                <motion.div
                  className="grid sm:grid-cols-2 gap-4 sm:gap-5 mt-8"
                  variants={containerVariants}
                >
                  {[
                    { icon: "🪙", title: "+10 Login Bonus", desc: "Daily login rewards for kids." },
                    { icon: "⭐", title: "+5 Coins Per Game", desc: "Earn coins while playing games." },
                    { icon: "🔥", title: "7 Day Streak Bonus", desc: "Unlock +20 extra bonus coins." },
                    { icon: "👓", title: "Redeem Spectacle Discounts", desc: "Get discounts on spectacles." },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white p-5 sm:p-6 rounded-3xl shadow-md hover:shadow-lg transition-all border border-orange-100"
                    >
                      <div className="text-3xl mb-2">{item.icon}</div>
                      <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm">{item.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* RIGHT */}
              <motion.div
                className="relative flex justify-center"
                variants={itemVariants}
              >
                <div className="absolute w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-br from-yellow-300 to-orange-200 rounded-full blur-3xl opacity-40"></div>
                <img
                  src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop"
                  alt="Rewards showcase"
                  className="relative z-10 rounded-3xl sm:rounded-[40px] shadow-2xl border-4 sm:border-8 border-white w-full max-w-xs sm:max-w-md"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* SECTION: NAINTAARA VISION REELS */}
<section className="py-24 bg-black overflow-hidden relative">

  {/* Glow Effects */}
  <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/20 blur-[140px] rounded-full"></div>
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/20 blur-[140px] rounded-full"></div>

  <div className="max-w-7xl mx-auto px-6 relative z-10">

    {/* Heading */}
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <p className="text-[#ff7a00] font-semibold mb-4 tracking-[3px] uppercase">
        Trending Vision Styles
      </p>

      <h2 className="text-5xl sm:text-6xl font-extrabold text-white mb-6">
        Naintaara Vision Reels ✨
      </h2>

      <p className="text-white/70 text-lg max-w-2xl mx-auto">
        Stylish smart glasses loved by kids and designed for modern eye fitness.
      </p>
    </motion.div>

    {/* Reels */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

      {[
        {
          name: "Smart Focus",
          image:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop",
          views: "1.2M",
        },

        {
          name: "Vision Style",
          image:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop",
          views: "980K",
        },

        {
          name: "Eye Fitness",
          image:
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
          views: "2.4M",
        },

        {
          name: "Future Frames",
          image:
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
          views: "870K",
        },
      ].map((reel, i) => (

        <motion.div
          key={i}
          whileHover={{
            y: -10,
            scale: 1.03,
          }}
          className="relative h-[520px] rounded-[35px] overflow-hidden group cursor-pointer shadow-2xl"
        >

          {/* IMAGE */}
          <img
            src={reel.image}
            alt={reel.name}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

          {/* PLAY BUTTON */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl border border-white/20 flex items-center justify-center">

              <div className="ml-1 w-0 h-0 border-t-[14px] border-t-transparent border-l-[22px] border-l-white border-b-[14px] border-b-transparent"></div>

            </div>
          </motion.div>

          {/* TOP BADGE */}
          <div className="absolute top-5 left-5 bg-[#ff7a00] text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl">
            Trending
          </div>

          {/* BOTTOM INFO */}
          <div className="absolute bottom-6 left-6 right-6">

            <h3 className="text-2xl font-bold text-white mb-2">
              {reel.name}
            </h3>

            <div className="flex items-center justify-between">

              <p className="text-white/70">
                {reel.views} Views
              </p>

              <div className="flex items-center gap-2 text-white">

                <span>❤️</span>
                <span>24k</span>

              </div>
            </div>
          </div>

        </motion.div>
      ))}

    </div>

    {/* Bottom CTA */}
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="mt-20 bg-gradient-to-r from-[#ff7a00] to-orange-600 rounded-[40px] p-10 text-center shadow-2xl"
    >

      <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5">
        Discover The Future Of Eye Fitness 👓
      </h2>

      <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
        Explore smart vision styles, interactive games, and premium eye-training experiences with Naintaara.
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white text-[#ff7a00] px-10 py-5 rounded-full font-bold shadow-2xl"
      >
        Explore More →
      </motion.button>

    </motion.div>

  </div>
</section>


      {/* SECTION 6: TESTIMONIALS */}
      <section className="py-20 sm:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <motion.div
            className="text-center mb-16 sm:mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Parents Love Naintaara
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Real stories from families who've seen amazing improvements.
            </p>
          </motion.div>

          {/* Infinite Carousel */}
          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-6 sm:gap-8"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...testimonials, ...testimonials].map((testimonial, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -8 }}
                  className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-gradient-to-br from-orange-50 to-white border border-orange-100 rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300"
                >
                  {/* User Info */}
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-orange-200"
                    />
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-gray-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm">{testimonial.role}</p>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-lg sm:text-xl">⭐</span>
                    ))}
                  </div>

                  {/* Review */}
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed italic">
                    "{testimonial.review}"
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Gradient Fade Effect */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
          </div>
        </div>
      </section>

      {/* SECTION 7: CTA BANNER */}
      <section id="contact" className="py-20 sm:py-24 bg-gradient-to-r from-[#ff7a00] via-orange-500 to-orange-600">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6">
              Start Your Child's Vision Journey Today
            </h2>

            <p className="text-white text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed opacity-95">
              Join thousands of parents who trust Naintaara for eye health. Start with interactive games today and see the difference in just weeks.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={containerVariants}
            >
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white hover:bg-orange-50 text-[#ff7a00] px-8 sm:px-12 py-4 rounded-full font-bold shadow-xl transition-all duration-300 w-full sm:w-auto text-center"
              >
                Get Started
              </motion.button>

              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white hover:bg-white hover:text-[#ff7a00] px-8 sm:px-12 py-4 rounded-full font-bold transition-all duration-300 w-full sm:w-auto text-center"
              >
                Learn More
              </motion.button>
            </motion.div>

            <p className="text-white text-xs sm:text-sm mt-8 opacity-85">
              No credit card required. Available on iOS and Android.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;