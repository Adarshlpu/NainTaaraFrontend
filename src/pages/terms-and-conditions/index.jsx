import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, XCircle, Info } from "lucide-react";
import { useEffect } from "react";

const TermsAndConditions = () => {
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
            {/* Pill Tag Capsule */}
            <div className="inline-flex items-center bg-[#f5f5f5] text-[#171717] border border-[#e5e5e5] px-3 py-0.5 rounded-full text-xs font-medium font-mono select-none">
              TERMS_OF_SERVICE // BINDING_AGREEMENT
            </div>

            {/* Headline Scale */}
            <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#0a0a0a] font-['Satoshi',sans-serif] leading-tight">
              Terms & Conditions
            </h1>
            <p className="text-sm sm:text-base text-[#404040] font-normal leading-relaxed">
              Last Updated: <span className="font-medium text-[#0a0a0a]">{lastUpdated}</span> • Comprehensive framework governing operational paradigms, user account metrics, and service compliance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==================== CONTENT BODY ==================== */}
      <section className="py-20 bg-[#ffffff]">
        <div className="max-w-[800px] mx-auto px-6 text-left">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12 text-[#171717] text-sm sm:text-[15px] leading-relaxed font-normal"
          >
            {/* INTRO + ACCEPTANCE */}
            <motion.div variants={itemVariants} className="p-5 bg-[#f5f5f5] border border-[#e5e5e5] rounded-xl flex gap-3 items-start">
              <Info className="w-4 h-4 text-[#3b82f6] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-mono font-semibold text-[#0a0a0a] uppercase tracking-wider mb-1">
                  Important Acknowledgment
                </h3>
                <p className="text-xs sm:text-sm text-[#404040] leading-relaxed">
                  By accessing and employing Nainocular (operated by Naintaara Vision Tech), you state that you have fully parsed, acknowledged, and agreed to remain legally bound under these Terms. If you do not execute full alignment, you must terminate usage immediately.
                </p>
              </div>
            </motion.div>

            <hr className="border-[#e5e5e5]" />

            {/* 1. SERVICE DEFINITION */}
            <motion.div variants={itemVariants} className="space-y-4 border-l border-[#e5e5e5] pl-5 hover:border-[#3b82f6] transition-colors">
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-semibold text-[#0a0a0a] tracking-tight font-['Satoshi',sans-serif]">
                  1. Service Definition & Platform Scope
                </h2>
                <p className="text-xs font-mono text-neutral-400">FUNCTIONAL_SCOPE_LOGS</p>
              </div>

              <div className="space-y-4 text-[#404040]">
                <p>
                  <strong>Nainocular</strong> delivers web-based vision processing and eye fitness training configurations calibrated for pediatric demographics:
                </p>

                <ul className="space-y-2 list-none pl-0">
                  <li className="flex gap-3 items-start">
                    <CheckCircle2 className="w-4 h-4 text-[#16a34a] flex-shrink-0 mt-0.5" />
                    <span><strong>Interactive Ocular Workflows:</strong> Focus tracking modules, muscle alignment sets, and healthy blink awareness cycles.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle2 className="w-4 h-4 text-[#16a34a] flex-shrink-0 mt-0.5" />
                    <span><strong>Analytics Dashboards:</strong> Automated interfaces that map visual acuity trends and data sets transparently for parent review.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle2 className="w-4 h-4 text-[#16a34a] flex-shrink-0 mt-0.5" />
                    <span><strong>Consistency Incentives:</strong> Token accounting systems (coins, milestones balances) engineered to generate intrinsic user habits.</span>
                  </li>
                </ul>

                <p className="text-xs bg-[#f5f5f5] p-3.5 border border-[#e5e5e5] rounded-lg leading-relaxed">
                  <strong>Clinical Boundary Notice:</strong> Nainocular acts purely as an evaluation support and eye training fitness utility. It does not replace physical pediatric diagnostic hardware or clinical consultations with ophthalmology professionals.
                </p>
              </div>
            </motion.div>

            {/* 2. ELIGIBILITY & PARENTAL CONSENT */}
            <motion.div variants={itemVariants} className="space-y-4 border-l border-[#e5e5e5] pl-5 hover:border-[#3b82f6] transition-colors">
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-semibold text-[#0a0a0a] tracking-tight font-['Satoshi',sans-serif]">
                  2. Eligibility & Parental Consent
                </h2>
                <p className="text-xs font-mono text-neutral-400">ACCOUNT_REGISTRATION_BOUNDS</p>
              </div>

              <div className="space-y-4 text-[#404040]">
                <div className="p-4 bg-[#f5f5f5] border border-[#e5e5e5] rounded-xl space-y-2">
                  <h3 className="text-xs font-mono font-semibold text-[#0a0a0a] uppercase tracking-wider mb-1">Guardian Validation Keys</h3>
                  <p className="text-xs sm:text-sm">✓ You must hold explicit legal guardianship over the children active within the session logs.</p>
                  <p className="text-xs sm:text-sm">✓ You must be at least 18 years of age and hold verified authorization parameters to execute contract bindings.</p>
                  <p className="text-xs sm:text-sm">✓ You retain ledger accountability for all processing, profile actions, and credit configurations under the credential set.</p>
                </div>

                <p>
                  Pediatric parameters cannot initialize processing independent of parent authorization loops. All profile actions remain locked until adult proxy verification is secured.
                </p>
              </div>
            </motion.div>

            {/* 3. USER ACCOUNTS & RESPONSIBILITIES */}
            <motion.div variants={itemVariants} className="space-y-4 border-l border-[#e5e5e5] pl-5 hover:border-[#3b82f6] transition-colors">
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-semibold text-[#0a0a0a] tracking-tight font-['Satoshi',sans-serif]">
                  3. Credential Security & Account Management
                </h2>
                <p className="text-xs font-mono text-neutral-400">GUARDIAN_OBLIGATIONS</p>
              </div>

              <div className="space-y-4 text-[#404040]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 border border-[#e5e5e5] rounded-xl bg-[#ffffff]">
                    <h4 className="text-xs font-mono font-semibold text-[#0a0a0a] uppercase tracking-wider mb-1">Information Veracity</h4>
                    <p className="text-xs leading-relaxed">You agree to ensure registration inputs (including age values required for algorithmic calibrations) remain clear, precise, and current.</p>
                  </div>
                  <div className="p-4 border border-[#e5e5e5] rounded-xl bg-[#ffffff]">
                    <h4 className="text-xs font-mono font-semibold text-[#0a0a0a] uppercase tracking-wider mb-1">Access Limits</h4>
                    <p className="text-xs leading-relaxed">Your account token matrix is personal. You must not export logging coordinates or share credential vectors with third parties.</p>
                  </div>
                </div>
                <p className="text-xs text-neutral-400 font-mono">
                  Report unexpected access triggers immediately via system routes: hello@nainocular.com
                </p>
              </div>
            </motion.div>

            {/* 4. ACCEPTABLE USE POLICY */}
            <motion.div variants={itemVariants} className="space-y-4 border-l border-[#e5e5e5] pl-5 hover:border-[#3b82f6] transition-colors">
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-semibold text-[#0a0a0a] tracking-tight font-['Satoshi',sans-serif]">
                  4. Acceptable Use Architecture
                </h2>
                <p className="text-xs font-mono text-neutral-400">PROHIBITED_SYSTEM_ACTIVITIES</p>
              </div>

              <p className="text-[#404040]">
                The platform executes automated isolation procedures against any profiles violating behavioral thresholds or system bounds:
              </p>

              <div className="space-y-2">
                {[
                  { title: "System Abuse", text: "Malicious tracking injections, harassment towards system routes, or structural manipulation metrics overrides." },
                  { title: "Reverse-Engineering", text: "Decompiling core calibration sub-routines, harvesting animation arrays, or scraping database parameter tokens." },
                  { title: "Identity Fraud", text: "Falsifying pediatrics milestones indicators, structural age parameters, or masking verification hashes." },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-[#ffffff] border border-[#e5e5e5] rounded-xl flex gap-3 items-start hover:border-[#ea580c]/30">
                    <XCircle className="w-4 h-4 text-[#ea580c] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-mono font-semibold text-[#0a0a0a] uppercase tracking-wider mb-0.5">{item.title}</h4>
                      <p className="text-xs text-[#404040] leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 5. INTELLECTUAL PROPERTY */}
            <motion.div variants={itemVariants} className="space-y-4 border-l border-[#e5e5e5] pl-5 hover:border-[#3b82f6] transition-colors">
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-semibold text-[#0a0a0a] tracking-tight font-['Satoshi',sans-serif]">
                  5. Intellectual Property & Code Ownership
                </h2>
                <p className="text-xs font-mono text-neutral-400">PROPRIETARY_RIGHTS_RESERVED</p>
              </div>

              <div className="space-y-3 text-[#404040]">
                <p>
                  All software components, animation models, eye-tracking calibration scripts, image loops, and logos deployed on Nainocular remain the exclusive proprietary capital of Naintaara Vision Tech.
                </p>
                <p>
                  We extend a temporary, non-assignable, revocable license model to view platform screens for personal training metrics loops. Any reproduction, distribution, or unauthorized execution runs without verified corporate seals is strictly barred.
                </p>
              </div>
            </motion.div>

            {/* 6. WARRANTY DISCLAIMERS */}
            <motion.div variants={itemVariants} className="space-y-4 border-l border-[#e5e5e5] pl-5 hover:border-[#3b82f6] transition-colors">
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-semibold text-[#0a0a0a] tracking-tight font-['Satoshi',sans-serif]">
                  6. Disclaimers & System Availability
                </h2>
                <p className="text-xs font-mono text-neutral-400">AS_IS_PROVISION_OVERHEADS</p>
              </div>

              <div className="space-y-2">
                <div className="p-4 bg-[#f5f5f5] border border-[#e5e5e5] rounded-xl flex gap-3 items-start">
                  <AlertCircle className="w-4 h-4 text-[#ea580c] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-mono font-semibold text-[#0a0a0a] uppercase tracking-wider mb-0.5">Clinical Disclaimer</h4>
                    <p className="text-xs text-[#404040] leading-relaxed">Nainocular executes training logic runs on an "as-is" parameters basis. We issue no warranties regarding precise baseline visual correction velocities or milestone success parameters.</p>
                  </div>
                </div>

                <div className="p-4 bg-[#f5f5f5] border border-[#e5e5e5] rounded-xl flex gap-3 items-start">
                  <AlertCircle className="w-4 h-4 text-[#ea580c] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-mono font-semibold text-[#0a0a0a] uppercase tracking-wider mb-0.5">Uptime Metrics</h4>
                    <p className="text-xs text-[#404040] leading-relaxed">Network availability transitions are subject to maintenance intervals. Uptime properties are not anchored to concrete SLA guarantees.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 7. LIMITATION OF LIABILITY */}
            <motion.div variants={itemVariants} className="space-y-4 border-l border-[#e5e5e5] pl-5 hover:border-[#3b82f6] transition-colors">
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-semibold text-[#0a0a0a] tracking-tight font-['Satoshi',sans-serif]">
                  7. Limitation of Liability bounds
                </h2>
                <p className="text-xs font-mono text-neutral-400">LEGAL_CAP_PARAMETERS</p>
              </div>

              <div className="space-y-3 text-[#404040]">
                <p>
                  To the maximum boundary authorized under local laws, Naintaara Vision Tech, its server nodes, and network developers shall not match liability parameters for indirect, accidental, or data transmission losses.
                </p>
                <p className="text-xs font-medium font-mono text-[#0a0a0a] bg-[#f5f5f5] p-3 border border-[#e5e5e5] rounded-lg">
                  LIABILITY_CAP: Aggregated liability is strictly capped to the total transactional fees cleared by the user profile during the preceding 12-month interval.
                </p>
              </div>
            </motion.div>

            {/* 8. TERMINATION */}
            <motion.div variants={itemVariants} className="space-y-4 border-l border-[#e5e5e5] pl-5 hover:border-[#3b82f6] transition-colors">
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-semibold text-[#0a0a0a] tracking-tight font-['Satoshi',sans-serif]">
                  8. Suspension & Account Erasure
                </h2>
                <p className="text-xs font-mono text-neutral-400">TERMINATION_PROTOCOLS</p>
              </div>

              <div className="space-y-3 text-[#404040]">
                <p>
                  Guardians hold right keys to trigger a self-termination erase command via the User Settings dashboard to wipe tracking profiles.
                </p>
                <p>
                  We preserve the right to lock credentials states instantly if system logs indicate a breach of software bounds, malicious inputs routing, or compliance safety hazards.
                </p>
              </div>
            </motion.div>

            {/* 9. GOVERNING LAW */}
            <motion.div variants={itemVariants} className="space-y-4 border-l border-[#e5e5e5] pl-5 hover:border-[#3b82f6] transition-colors">
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-semibold text-[#0a0a0a] tracking-tight font-['Satoshi',sans-serif]">
                  9. Governing Law & Forum Boundaries
                </h2>
                <p className="text-xs font-mono text-neutral-400">JURISDICTIONAL_CHANNELS</p>
              </div>

              <p className="text-[#404040]">
                These operational rulesets are anchored strictly within the legal code of India. Any litigation pathways or conflict evaluations initialization shall remain confined exclusively within the court structures located in Delhi, India. Before filing structural actions, users agree to process negotiation checkpoints with the Grievance Office route.
              </p>
            </motion.div>

            <hr className="border-[#e5e5e5]" />

            {/* LEGAL HELPDESK CARD */}
            <motion.div
              variants={itemVariants}
              className="p-6 bg-[#f5f5f5] border border-[#e5e5e5] rounded-xl space-y-4"
            >
              <div>
                <h3 className="text-sm font-semibold text-[#0a0a0a] uppercase tracking-wide font-mono">
                  Legal Queries & Arbitrations Desk
                </h3>
                <p className="text-xs sm:text-sm text-[#404040] mt-1">
                  For contract clarification requests, structural inquiries, or policy documentation details, interface directly with our channels:
                </p>
              </div>
              <div className="text-xs sm:text-sm text-[#0a0a0a] font-normal space-y-1.5 pt-1 border-t border-[#e5e5e5]">
                <p className="flex items-center gap-2"><span className="text-neutral-400 font-mono w-20">LEGAL_EMAIL:</span> <span className="font-medium text-[#3b82f6] hover:underline cursor-pointer">legal@nainocular.com</span></p>
                <p className="flex items-center gap-2"><span className="text-neutral-400 font-mono w-20">GEN_SUPPORT:</span> <span className="font-medium text-[#3b82f6] hover:underline cursor-pointer">hello@nainocular.com</span></p>
                <p className="flex items-center gap-2"><span className="text-neutral-400 font-mono w-20">LOCATION_HQ:</span> <span className="font-medium">Delhi, India</span></p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditions;