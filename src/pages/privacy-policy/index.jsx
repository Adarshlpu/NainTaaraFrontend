import { motion } from "framer-motion";
import { Mail, MapPin, AlertCircle } from "lucide-react";
import { useEffect } from "react";

const Privacy = () => {
  const lastUpdated = "May 2026";

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

  return (
    <div className="bg-[#ffffff] min-h-screen antialiased text-[#0a0a0a] font-sans selection:bg-[#f5f5f5]">
      
      {/* ==================== HERO HEADER ==================== */}
      <section className="pt-36 pb-16 bg-[#ffffff] border-b border-[#e5e5e5] relative overflow-hidden">
        <div className="max-w-[800px] mx-auto px-6 text-left">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            {/* Pill Tag Container */}
            <div className="inline-flex items-center bg-[#f5f5f5] text-[#171717] border border-[#e5e5e5] px-3 py-0.5 rounded-full text-xs font-medium font-mono select-none">
              LEGAL_COMPLIANCE // DPDP_ACT_2023
            </div>

            {/* Headline Scale */}
            <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#0a0a0a] font-['Satoshi',sans-serif] leading-tight">
              Privacy Policy
            </h1>
            <p className="text-sm sm:text-base text-[#404040] font-normal leading-relaxed">
              Last Updated: <span className="font-medium text-[#0a0a0a]">{lastUpdated}</span> • Technical documentation outlining the compliance frameworks surrounding pediatric records preservation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==================== POLICY CONTENT BODY ==================== */}
      <section className="py-20 bg-[#ffffff]">
        <div className="max-w-[800px] mx-auto px-6 text-left">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12 text-[#171717] text-sm sm:text-[15px] leading-relaxed font-normal"
          >
            {/* INTRO */}
            <motion.div variants={itemVariants} className="space-y-4">
              <p>
                Welcome to <strong>Nainocular</strong> (operated by Naintaara Vision Tech). We design clinical-grade home vision therapy infrastructure for pediatric development. Protecting the trust and integrity of data frameworks related to children is our foundational core objective.
              </p>
              <p>
                This document outlines our technical protocols and legal architecture regarding data collection, transmission overheads, and storage boundaries across the web app ecosystem.
              </p>
            </motion.div>

            <hr className="border-[#e5e5e5]" />

            {/* 1. CHILDREN'S DATA SECURITY */}
            <motion.div variants={itemVariants} className="space-y-4 border-l border-[#e5e5e5] pl-5 hover:border-[#3b82f6] transition-colors">
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-semibold text-[#0a0a0a] tracking-tight font-['Satoshi',sans-serif]">
                  1. Pediatric Safeguards & Parental Guardianship
                </h2>
                <p className="text-xs font-mono text-neutral-400">CORE_PROTECTION_PROTOCOL</p>
              </div>

              <p className="text-[#404040]">
                Nainocular is exclusively optimized for children aged 4 to 14 years. We execute strict gatekeeping protocols to eliminate unauthenticated data access paths:
              </p>

              <ul className="space-y-3 list-none pl-0 text-[#404040]">
                <li className="flex gap-3 items-start">
                  <span className="text-[#3b82f6] font-bold font-mono text-xs pt-0.5">→</span>
                  <div>
                    <span className="font-semibold text-[#0a0a0a]">Zero Independent Sign-ups:</span>
                    <p className="text-xs sm:text-sm mt-0.5">Children are restricted from account generation. Creation chains require an authenticated adult guardian proxy.</p>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-[#3b82f6] font-bold font-mono text-xs pt-0.5">→</span>
                  <div>
                    <span className="font-semibold text-[#0a0a0a]">Affirmative Action Consent:</span>
                    <p className="text-xs sm:text-sm mt-0.5">We do not log diagnostic evaluation states or tracking telemetry before explicit authorization triggers from parents.</p>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-[#3b82f6] font-bold font-mono text-xs pt-0.5">→</span>
                  <div>
                    <span className="font-semibold text-[#0a0a0a]">Revocation Rights:</span>
                    <p className="text-xs sm:text-sm mt-0.5">Parents maintain absolute control keys to download data outputs, update profiles, or command full database record purges.</p>
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* 2. WHAT WE COLLECT */}
            <motion.div variants={itemVariants} className="space-y-4 border-l border-[#e5e5e5] pl-5 hover:border-[#3b82f6] transition-colors">
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-semibold text-[#0a0a0a] tracking-tight font-['Satoshi',sans-serif]">
                  2. Explicit Data Boundaries
                </h2>
                <p className="text-xs font-mono text-neutral-400">COLLECTION_SCOPE_PARAMETERS</p>
              </div>

              <p className="text-[#404040]">
                We limit operational scope parameters to data segments necessary for delivering precision performance metrics:
              </p>

              <div className="space-y-3 pt-1">
                <div className="p-4 bg-[#f5f5f5] rounded-xl border border-[#e5e5e5]">
                  <h3 className="text-xs font-mono font-semibold text-[#0a0a0a] uppercase tracking-wider mb-1">
                    A. Guardian Identity Anchors
                  </h3>
                  <p className="text-xs sm:text-sm text-[#404040] leading-relaxed">
                    Legal Name, verified email coordinates, phone channels (for asynchronous WhatsApp alert integration), and physical addresses mapped for logistics fulfillment (Smart Vision Glasses distribution).
                  </p>
                </div>

                <div className="p-4 bg-[#f5f5f5] rounded-xl border border-[#e5e5e5]">
                  <h3 className="text-xs font-mono font-semibold text-[#0a0a0a] uppercase tracking-wider mb-1">
                    B. Therapy Telemetry & Device States
                  </h3>
                  <p className="text-xs sm:text-sm text-[#404040] leading-relaxed">
                    First Name identifiers, chronological age parameters (required to adjust neural difficulty curves), interaction score variables, and tracking resolution index vectors.
                  </p>
                </div>

                <div className="p-4 bg-[#ffffff] border border-[#e5e5e5] rounded-xl text-xs text-[#404040] flex gap-3 items-start">
                  <AlertCircle className="w-4 h-4 text-[#ea580c] flex-shrink-0" />
                  <div>
                    <p className="font-semibold uppercase font-mono tracking-wider text-[#ea580c] mb-0.5 text-[10px]">
                      Technical Isolation Note
                    </p>
                    <p className="leading-relaxed text-[#404040]">
                      Our eye-tracking sub-routines process camera streams entirely in temporary application memory on-device. <strong>No video streams, data frames, or biometric images are ever transmitted to servers.</strong>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 3. HOW WE USE DATA */}
            <motion.div variants={itemVariants} className="space-y-4 border-l border-[#e5e5e5] pl-5 hover:border-[#3b82f6] transition-colors">
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-semibold text-[#0a0a0a] tracking-tight font-['Satoshi',sans-serif]">
                  3. Purpose & Functional Alignment
                </h2>
                <p className="text-xs font-mono text-neutral-400">DATA_SIGNAL_MAPPING</p>
              </div>

              <p className="text-[#404040]">Data signals are mapped strictly to functional transaction endpoints:</p>

              {/* 💡 FIXED: Resolved incorrect nested tag markup syntax here */}
              <ol className="space-y-2 text-[#404040] list-none pl-0">
                <li className="flex gap-3 items-start">
                  <span className="text-xs font-mono text-neutral-400 pt-0.5">[01]</span>
                  <span>Assembling granular diagnostic tracking logs and visual acuity dashboards for parents.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-xs font-mono text-neutral-400 pt-0.5">[02]</span>
                  <span>Modulating gamified tracking velocities dynamically based on cognitive response telemetry curves.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-xs font-mono text-neutral-400 pt-0.5">[03]</span>
                  <span>Managing rewards accounting loops, milestone points balances, and hardware frame token vouchers.</span>
                </li>
              </ol>
            </motion.div>

            {/* 4. DATA PROTECTION */}
            <motion.div variants={itemVariants} className="space-y-4 border-l border-[#e5e5e5] pl-5 hover:border-[#3b82f6] transition-colors">
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-semibold text-[#0a0a0a] tracking-tight font-['Satoshi',sans-serif]">
                  4. Infrastructure Isolation & Security Architecture
                </h2>
                <p className="text-xs font-mono text-neutral-400">STORAGE_ENCRYPTION_STANDARDS</p>
              </div>

              <div className="space-y-4">
                <p className="text-[#404040]">
                  We use defense-in-depth security parameters to lock operational pipelines:
                </p>

                <div className="grid grid-cols-2 gap-4 max-w-md">
                  <div className="p-3.5 bg-[#f5f5f5] border border-[#e5e5e5] rounded-xl">
                    <p className="text-[10px] font-mono font-medium text-neutral-400 uppercase tracking-wider mb-1">At Rest</p>
                    <p className="text-xs sm:text-sm font-semibold text-[#0a0a0a]">AES-256 System Encryption</p>
                  </div>
                  <div className="p-3.5 bg-[#f5f5f5] border border-[#e5e5e5] rounded-xl">
                    <p className="text-[10px] font-mono font-medium text-neutral-400 uppercase tracking-wider mb-1">In Transport</p>
                    <p className="text-xs sm:text-sm font-semibold text-[#0a0a0a]">TLS 1.3 Encryption Payload</p>
                  </div>
                </div>

                <p className="text-[#404040]">
                  Data files are stored within secure localized cloud zones in India, perfectly meeting compliance bounds for storage isolation models.
                </p>
              </div>
            </motion.div>

            {/* 5. DATA SHARING */}
            <motion.div variants={itemVariants} className="space-y-4 border-l border-[#e5e5e5] pl-5 hover:border-[#3b82f6] transition-colors">
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-semibold text-[#0a0a0a] tracking-tight font-['Satoshi',sans-serif]">
                  5. Data Sharing Constraints
                </h2>
                <p className="text-xs font-mono text-neutral-400">SUB_PROCESSOR_DISCLOSURES</p>
              </div>

              <p className="text-[#404040]">
                We maintain an absolute restriction model: <strong>we never monetize, trade, or rent parameters to marketing networks.</strong> Data sharing is limited to operations sub-processors under NDA frameworks:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-[#e5e5e5] text-neutral-400 font-medium text-left">
                      <th className="pb-3 font-mono uppercase text-[10px]">Processor Group</th>
                      <th className="pb-3 font-mono uppercase text-[10px]">Operational Framework</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e5e5e5] text-[#171717]">
                    <tr>
                      <td className="py-3.5 font-semibold">Infrastructure Cores</td>
                      <td className="py-3.5 text-[#404040]">Securing database log structures and login authorization hashes.</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 font-semibold">API Gateways</td>
                      <td className="py-3.5 text-[#404040]">Dispatching treatment updates over automated micro messaging links.</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 font-semibold">Logistics Handlers</td>
                      <td className="py-3.5 text-[#404040]">Fulfillment delivery operations for physical Smart Vision Glasses.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* 6. YOUR RIGHTS */}
            <motion.div variants={itemVariants} className="space-y-4 border-l border-[#e5e5e5] pl-5 hover:border-[#3b82f6] transition-colors">
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-semibold text-[#0a0a0a] tracking-tight font-['Satoshi',sans-serif]">
                  6. Your Rights & Control
                </h2>
                <p className="text-xs font-mono text-neutral-400">DATA_SUBJECT_CONTROL_KEYS</p>
              </div>

              <p className="text-[#404040]">
                Guardians hold direct governance parameters over historic system metrics:
              </p>

              <ul className="space-y-2 text-[#404040] list-none pl-0">
                <li className="flex gap-4 items-start">
                  <span className="text-xs font-mono bg-[#f5f5f5] text-[#0a0a0a] border border-[#e5e5e5] px-1.5 py-0.5 rounded font-medium select-none">
                    ERASURE
                  </span>
                  <span className="text-sm pt-0.5 text-[#404040]">The right to request full database purges to destroy log paths and clinical profiles tracking points.</span>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="text-xs font-mono bg-[#f5f5f5] text-[#0a0a0a] border border-[#e5e5e5] px-1.5 py-0.5 rounded font-medium select-none">
                    RECTIFY
                  </span>
                  <span className="text-sm pt-0.5 text-[#404040]">Instant self-service dashboard modules to adjust profiles configurations, address metrics, or details instantly.</span>
                </li>
              </ul>
            </motion.div>

            <hr className="border-[#e5e5e5]" />

            {/* CONTACT UTILITY DISPLAY CARD */}
            <motion.div
              variants={itemVariants}
              className="p-6 bg-[#f5f5f5] border border-[#e5e5e5] rounded-xl space-y-4"
            >
              <div>
                <h3 className="text-xs font-mono font-semibold text-[#0a0a0a] uppercase tracking-wider mb-1">
                  Grievance Redressal Support
                </h3>
                <p className="text-xs sm:text-sm text-[#404040]">
                  For privacy configuration overrides or data removal wipe requests, connect with our security office directly:
                </p>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-[#e5e5e5] text-xs sm:text-sm text-[#0a0a0a]">
                <a href="mailto:hello@nainocular.com" className="flex items-center gap-3 w-fit group">
                  <Mail className="w-4 h-4 text-[#3b82f6] shrink-0" />
                  <div className="text-left">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 leading-none mb-0.5">Email</p>
                    <p className="font-medium group-hover:text-[#3b82f6] transition-colors">hello@nainocular.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#3b82f6] shrink-0" />
                  <div className="text-left">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 leading-none mb-0.5">Corporate HQ</p>
                    <p className="font-medium">Delhi, India</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;