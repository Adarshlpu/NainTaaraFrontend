import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
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

  const contactDetails = [
    {
      icon: Mail,
      title: "Email",
      value: "hello@nainocular.com",
      label: "SUPPORT_CHANNEL"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 9205050993",
      label: "COORDINATION_LINE"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Delhi, India",
      label: "CORPORATE_HQ"
    }
  ];

  return (
    <div className="bg-[#ffffff] min-h-screen antialiased text-[#0a0a0a] font-sans selection:bg-[#f5f5f5]">
      
      {/* ==================== HERO HEADER ==================== */}
      <section className="pt-36 pb-16 bg-[#ffffff] border-b border-[#e5e5e5] relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 text-left">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 max-w-2xl"
          >
            <div className="inline-flex items-center bg-[#f5f5f5] text-[#171717] border border-[#e5e5e5] px-3 py-0.5 rounded-full text-xs font-medium font-mono select-none">
              CONNECT // PIPELINE_SUPPORT
            </div>
            <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#0a0a0a] font-['Satoshi',sans-serif] leading-tight">
              Contact Us
            </h1>
            <p className="text-sm sm:text-base text-[#404040] font-normal leading-relaxed">
              We'd love to hear from you. Reach out to our technical team for platform support, partnership inquiries, or any questions regarding the Nainocular ecosystem.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==================== HUB CHANNELS SYSTEM ==================== */}
      <section className="py-20 bg-[#ffffff]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          
          <motion.div 
            className="grid md:grid-cols-12 gap-8 items-start"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            
            {/* LEFT COLUMN: CRISP UTILITY DETAILS FRAME */}
            <div className="md:col-span-5 space-y-4">
              {contactDetails.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div 
                    key={idx}
                    variants={itemVariants}
                    className="border border-[#e5e5e5] rounded-xl p-5 bg-[#ffffff] text-left shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-start gap-4 hover:border-[#d4d4d4] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#f5f5f5] border border-[#e5e5e5] flex items-center justify-center text-[#3b82f6] shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold text-[#0a0a0a] uppercase tracking-wider font-mono">
                          {item.title}
                        </h3>
                        <span className="text-[9px] font-mono text-neutral-400 font-medium">
                          {item.label}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base font-medium text-[#404040] truncate">
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* RIGHT COLUMN: HIGH-CONTRAST WEB INPUT PANEL */}
            <motion.div 
              variants={itemVariants}
              className="md:col-span-7 bg-[#ffffff] border border-[#e5e5e5] rounded-xl p-6 sm:p-8 text-left shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
            >
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Name Input Field */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider font-mono text-[#0a0a0a]">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full bg-[#ffffff] text-sm text-[#111827] border border-[#d4d4d4] rounded-lg px-3.5 py-2.5 outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all"
                    />
                  </div>

                  {/* Email Input Field */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider font-mono text-[#0a0a0a]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@company.com"
                      className="w-full bg-[#ffffff] text-sm text-[#111827] border border-[#d4d4d4] rounded-lg px-3.5 py-2.5 outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all"
                    />
                  </div>
                </div>

                {/* Message Textarea Area */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider font-mono text-[#0a0a0a]">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Write your message endpoints here..."
                    className="w-full bg-[#ffffff] text-sm text-[#111827] border border-[#d4d4d4] rounded-lg px-3.5 py-2.5 outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit Action Button Block */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="h-10 px-5 bg-[#000000] hover:bg-[#171717] text-[#ffffff] font-medium text-sm rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-all active:scale-[0.98] cursor-pointer"
                  >
                    Send Message
                  </button>
                </div>

              </form>
            </motion.div>

          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;