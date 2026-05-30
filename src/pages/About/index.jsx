import { useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, Zap, Users, Target, Award, TrendingUp, Heart, Brain, Sparkles } from "lucide-react";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const features = [
    {
      icon: Brain,
      title: "Focus Improvement",
      description: "Train sustained attention and concentration through progressive eye-tracking games.",
    },
    {
      icon: Eye,
      title: "Eye Coordination",
      description: "Strengthen binocular vision and hand-eye synchronization with interactive exercises.",
    },
    {
      icon: Sparkles,
      title: "Blinking Awareness",
      description: "Develop healthy blinking patterns and reduce digital eye strain.",
    },
    {
      icon: Zap,
      title: "Visual Attention",
      description: "Expand peripheral vision and improve visual processing speed.",
    },
  ];

  const gamificationFeatures = [
    {
      icon: Target,
      title: "Daily Missions",
      description: "Complete vision-training challenges tailored to skill level and progress profiles.",
      stat: "Earn 100+ coins per session",
    },
    {
      icon: Award,
      title: "Achievement Badges",
      description: "Unlock 50+ badges for milestones, streaks, and structural skill mastery.",
      stat: "Trophy collection system",
    },
    {
      icon: TrendingUp,
      title: "Practice Streaks",
      description: "Build consistency with daily streak tracking frameworks and bonus rewards.",
      stat: "3x multiplier for 7+ day streaks",
    },
    {
      icon: Users,
      title: "Reward Store",
      description: "Redeem coins for digital gifts, merchandise bundles, and exclusive experiences.",
      stat: "500+ unlockable rewards",
    },
  ];

  const stats = [
    { number: "4-14", label: "Target Age Group" },
    { number: "8+", label: "Vision Training Games" },
    { number: "50+", label: "Achievement Badges" },
    { number: "100K+", label: "Active Children" },
  ];

  return (
    <div className="bg-[#ffffff] min-h-screen antialiased text-[#0a0a0a] font-sans selection:bg-[#f5f5f5]">
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative overflow-hidden pt-36 pb-20 border-b border-[#e5e5e5]">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center bg-[#f5f5f5] text-[#171717] border border-[#e5e5e5] px-3 py-0.5 rounded-full text-xs font-medium font-mono select-none">
              COMPANY // VISION_TRAINING_SYSTEM
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[48px] font-medium tracking-tight text-[#0a0a0a] font-['Satoshi',sans-serif] leading-tight">
              Vision Training Reimagined
            </h1>
            
            <p className="text-sm sm:text-base text-[#404040] font-normal leading-relaxed max-w-2xl mx-auto">
              Nainocular transforms eye wellness into an engaging adventure for children, blending clinical-grade vision training data metrics with intuitive browser game mechanics.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==================== MISSION & VISION ==================== */}
      <section className="py-20 border-b border-[#e5e5e5] bg-[#ffffff]">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 lg:gap-16"
          >
            {/* Mission */}
            <motion.div variants={itemVariants} className="space-y-4 text-left border-l border-[#e5e5e5] pl-6 hover:border-[#ea580c] transition-colors">
              <span className="text-[11px] font-mono font-medium text-[#404040] uppercase tracking-wider block">[MISSION]</span>
              <h2 className="text-xl sm:text-2xl font-medium text-[#0a0a0a] font-['Satoshi',sans-serif] tracking-tight">
                Why We Built Nainocular
              </h2>
              <p className="text-[#404040] text-sm sm:text-[15px] leading-relaxed font-normal">
                Traditional vision therapy can feel like a chore for children. Our mission is to revolutionize pediatric eye care by making it <strong>fun, engaging, and sustainable</strong>—transforming daily eye exercises into workflows children actually want to complete.
              </p>
              <p className="text-[#404040] text-sm sm:text-[15px] leading-relaxed font-normal">
                By combining clinical-grade vision science paths with gamification psychology hooks, we empower kids to develop healthier visual tracking milestones.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div variants={itemVariants} className="space-y-4 text-left border-l border-[#e5e5e5] pl-6 hover:border-[#3b82f6] transition-colors">
              <span className="text-[11px] font-mono font-medium text-[#404040] uppercase tracking-wider block">[VISION]</span>
              <h2 className="text-xl sm:text-2xl font-medium text-[#0a0a0a] font-['Satoshi',sans-serif] tracking-tight">
                Our Long-Term Goal
              </h2>
              <p className="text-[#404040] text-sm sm:text-[15px] leading-relaxed font-normal">
                We envision a world where every child has access to personalized, science-backed vision training dashboards—regardless of geography or socioeconomic factors. Balanced vision fitness should be universally accessible.
              </p>
              <p className="text-[#404040] text-sm sm:text-[15px] leading-relaxed font-normal">
                Our objective is to serve as the baseline standard for pediatric vision wellness apps, limiting digital eye fatigue logs across growing users globally.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section className="py-20 border-b border-[#e5e5e5] bg-[#ffffff]">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0a0a0a] font-['Satoshi',sans-serif]">
              How Nainocular Works
            </h2>
            <p className="text-sm sm:text-base text-[#404040] font-normal">
              A precise structured framework for vision training, wrapped in an agile utility software layer.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {[
              { step: "01", title: "Assessment", desc: "We evaluate your child's baseline focus metrics, coordination vectors, and blink states via initial diagnostics modules." },
              { step: "02", title: "Personalization", desc: "AI optimization profiles generate custom automated training paths matching age bounds and visual requirements." },
              { step: "03", title: "Daily Training", desc: "Your child completes 10-15 minute interactive tracking loops that adjust operational parameters dynamically." },
              { step: "04", title: "Progress Tracking", desc: "Parents access clean data dashboards mapping focus accuracy thresholds and visual alignment indices smoothly." },
              { step: "05", title: "Habit Formation", desc: "Gamification layers like coins, badges, and streaks build intrinsic consistency loops without user overhead." },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 bg-[#ffffff] border border-[#e5e5e5] rounded-xl text-left hover:border-[#3b82f6] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-semibold text-[#3b82f6] bg-[#3b82f6]/5 px-2 py-0.5 rounded border border-[#3b82f6]/10">
                    PHASE {item.step}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-[#0a0a0a] mb-1.5 tracking-tight">{item.title}</h3>
                <p className="text-[#404040] text-xs sm:text-sm font-normal leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== CORE CAPABILITIES ==================== */}
      <section className="py-20 border-b border-[#e5e5e5] bg-[#f5f5f5]/30">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0a0a0a] font-['Satoshi',sans-serif]">
              Vision Training Capabilities
            </h2>
            <p className="text-sm sm:text-base text-[#404040] font-normal">
              Comprehensive visual coordination development engineered safely inside an interactive browser environment.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="p-5 bg-[#ffffff] border border-[#e5e5e5] rounded-xl hover:border-[#d4d4d4] transition-colors text-left flex items-start gap-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#f5f5f5] border border-[#e5e5e5] flex items-center justify-center text-[#3b82f6] shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#0a0a0a] mb-1 tracking-tight">{feature.title}</h3>
                    <p className="text-[#404040] text-xs sm:text-sm font-normal leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ==================== GAMIFICATION SYSTEM ==================== */}
      <section className="py-20 border-b border-[#e5e5e5] bg-[#ffffff]">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0a0a0a] font-['Satoshi',sans-serif]">
              Gamification & Rewards Systems
            </h2>
            <p className="text-sm sm:text-base text-[#404040] font-normal">
              Earn coin markers, master milestones, and create intrinsic habits cleanly with active practice profiles.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {gamificationFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="p-5 bg-[#ffffff] border border-[#e5e5e5] rounded-xl hover:border-[#d4d4d4] text-left transition-colors flex flex-col justify-between h-40 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-[#f5f5f5] border border-[#e5e5e5] flex items-center justify-center text-[#3b82f6] shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-[#0a0a0a] tracking-tight leading-none">{feature.title}</h3>
                      <p className="text-[#404040] text-xs sm:text-sm font-normal leading-relaxed mt-2">{feature.description}</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-[#f5f5f5] flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#16a34a] bg-[#dcfce7] px-1.5 py-0.5 rounded-full font-medium border border-[#e5e5e5]">
                      {feature.stat}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Technical Progression Cards */}
          <motion.div
            variants={itemVariants}
            className="mt-6 p-6 bg-[#f5f5f5] border border-[#e5e5e5] rounded-xl text-left"
          >
            <h3 className="text-xs font-mono font-semibold text-[#0a0a0a] uppercase tracking-wider mb-4">The Reward Engine Architecture</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-xs sm:text-sm text-[#404040]">
              <p><strong className="text-[#0a0a0a]">Missions:</strong> Complete training modules daily to secure token blocks (100-500 coins base multiplier parameters).</p>
              <p><strong className="text-[#0a0a0a]">Multipliers:</strong> Preserve daily practice states to unlock constant 2x, 3x, or 5x streak balances.</p>
              <p><strong className="text-[#0a0a0a]">Milestones:</strong> Unlock 50+ localized badges mapping progress vectors (perfect loops, boss challenges cleared).</p>
              <p><strong className="text-[#0a0a0a]">Redemption:</strong> Trade user balance blocks for physical Smart Vision Glasses checkout credits or vision frame bundles.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== IMPACT NUMBERS ==================== */}
      <section className="py-20 bg-[#0a0a0a] text-[#ffffff] border-b border-[#000000]">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#ffffff] font-['Satoshi',sans-serif]">
              Nainocular by the Numbers
            </h2>
            <p className="text-sm font-mono text-neutral-400">
              AGGREGATED_IMPACT_METRICS_DATA
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center p-6 bg-[#171717] border border-[#262626] rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
              >
                <div className="text-2xl sm:text-4xl font-semibold text-[#ffffff] font-mono tracking-tight">{stat.number}</div>
                <div className="text-xs text-neutral-400 mt-1 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== CORE VALUES ==================== */}
      <section className="py-20 bg-[#ffffff] border-b border-[#e5e5e5]">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0a0a0a] font-['Satoshi',sans-serif]">
              Our Core Values
            </h2>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {[
              { icon: Heart, title: "Child-First Design", desc: "Every telemetry routine is engineered with pediatric data separation parameters, safety controls, and joy as standard properties." },
              { icon: Brain, title: "Science-Backed", desc: "All focus execution runs are anchored directly to peer-reviewed pediatric behavioral optometry data models." },
              { icon: Users, title: "Parental Transparency", desc: "Legal guardians retain full verification keys, ledger parameters, and data wipe rights over historical metrics variables." },
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="p-6 bg-[#ffffff] border border-[#e5e5e5] rounded-xl text-center flex flex-col items-center shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#f5f5f5] border border-[#e5e5e5] flex items-center justify-center text-[#3b82f6] mb-4 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-[#0a0a0a] mb-1.5 tracking-tight">{value.title}</h3>
                  <p className="text-[#404040] text-xs sm:text-sm font-normal leading-relaxed">{value.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ==================== CTA ACTION ZONE ==================== */}
      <section className="py-20 bg-[#ffffff] text-center">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-2xl sm:text-4xl font-medium text-[#0a0a0a] tracking-tight mb-4 font-['Satoshi',sans-serif]">
            Ready to Transform Your Child's Vision?
          </h2>
          <p className="text-[#404040] text-sm sm:text-base mb-8 max-w-xl mx-auto font-normal">
            Join thousands of families already using Nainocular to make vision training fun, engaging, and systematically metrics-driven.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full sm:w-auto">
            <button className="h-10 px-6 bg-[#000000] hover:bg-[#171717] text-white font-medium text-sm rounded-lg transition-all active:scale-[0.98] w-full sm:w-auto border-0 cursor-pointer">
              Start Free Trial
            </button>
            <button className="h-10 px-6 bg-[#ffffff] border border-[#e5e5e5] hover:bg-[#f5f5f5] text-[#0a0a0a] font-medium text-sm rounded-lg transition-all w-full sm:w-auto cursor-pointer">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;