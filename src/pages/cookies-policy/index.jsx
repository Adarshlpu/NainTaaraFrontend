import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cookie, Settings, Shield, Eye, BarChart3, Lock, AlertCircle } from "lucide-react";

const CookiesPolicy = () => {
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

  const cookieTypes = [
    {
      icon: Lock,
      name: "Essential Cookies",
      category: "STRICTLY_NECESSARY",
      description: "Required for platform security infrastructure, operational runtime, and user state preservation.",
      examples: [
        "Session authentication tokens",
        "CSRF protection tokens",
        "User login state identifiers",
        "Child profile association cookies",
      ],
      required: true,
      retention: "Session duration + 30 days",
    },
    {
      icon: Eye,
      name: "Performance Cookies",
      category: "PERFORMANCE",
      description: "Help us evaluate metrics indicators and trace how children interact with on-screen exercises.",
      examples: [
        "Game interaction timestamps",
        "Feature usage tracking",
        "Performance parameters (load latency, system logs)",
        "Device compatibility data",
      ],
      required: false,
      retention: "12 months",
    },
    {
      icon: BarChart3,
      name: "Analytics Cookies",
      category: "ANALYTICS",
      description: "Aggregate system data signals to enhance baseline gameplay algorithms and interface processing speed.",
      examples: [
        "Page visit frequency paths",
        "Game completion metrics",
        "Feature popularity variables",
        "User journey flow analysis",
      ],
      required: false,
      retention: "24 months",
    },
    {
      icon: Settings,
      name: "Preference Cookies",
      category: "PREFERENCES",
      description: "Preserve user configuration modifications, accessibility variables, and interface overrides.",
      examples: [
        "Game difficulty level preferences",
        "Theme selection (light/dark layout)",
        "Language parameter sets",
        "Contrast and font scale configurations",
      ],
      required: false,
      retention: "2 years",
    },
  ];

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
              COOKIES_POLICY // TRANSPARENCY_RULES
            </div>

            {/* Headline Scale */}
            <div className="flex items-center gap-3">
              <Cookie className="w-8 h-8 text-[#0a0a0a] shrink-0" />
              <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#0a0a0a] font-['Satoshi',sans-serif] leading-tight">
                Cookies Policy
              </h1>
            </div>
            <p className="text-sm sm:text-base text-[#404040] font-normal leading-relaxed">
              Last Updated: <span className="font-medium text-[#0a0a0a]">{lastUpdated}</span> • Technical disclosure detailing our operational reliance on browser data keys and local caching parameters.
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
            {/* INTRO BOX */}
            <motion.div variants={itemVariants} className="p-5 bg-[#f5f5f5] border border-[#e5e5e5] rounded-xl flex gap-3 items-start">
              <Cookie className="w-4 h-4 text-[#0a0a0a] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-mono font-semibold text-[#0a0a0a] uppercase tracking-wider mb-1">
                  What This Policy Covers
                </h3>
                <p className="text-xs sm:text-sm text-[#404040] leading-relaxed">
                  This documentation specifies what caching cookies, browser assets, and local tracking routines are active within Nainocular. All workflows operate strictly inside parameters certified under the Indian DPDP Act 2023.
                </p>
              </div>
            </motion.div>

            <hr className="border-[#e5e5e5]" />

            {/* 1. WHAT ARE COOKIES */}
            <motion.div variants={itemVariants} className="space-y-4 border-l border-[#e5e5e5] pl-5 hover:border-[#3b82f6] transition-colors">
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-semibold text-[#0a0a0a] tracking-tight font-['Satoshi',sans-serif]">
                  1. Caching Modules & Tracking Architectures
                </h2>
                <p className="text-xs font-mono text-neutral-400">TECHNICAL_DEFINITIONS</p>
              </div>

              <div className="space-y-4 text-[#404040]">
                <div>
                  <h3 className="text-sm font-semibold text-[#0a0a0a] mb-1">A. Standard HTTP Cookies</h3>
                  <p className="text-xs sm:text-sm leading-relaxed">
                    Small alphanumeric text packets placed inside your local browser paths to identify session tokens, eliminate authentication latency, and store profile states cleanly.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#0a0a0a] mb-1">B. Local Browser Storage Matrix</h3>
                  <p className="text-xs sm:text-sm leading-relaxed">
                    Persistent client-side parameters that cache training records values, selected Light/Dark modes, and screen contrast settings without requiring continuous backend synchronization overheads.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#0a0a0a] mb-1">C. Technical Origin Tracing</h3>
                  <p className="text-xs sm:text-sm leading-relaxed">
                    <strong>First-party blocks</strong> are deployed directly by app.nainocular.com core servers. <strong>Third-party hooks</strong> originate from integrated verification nodes or telemetry systems to monitor platform crashes.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 2. COOKIE TYPES & CATEGORIES */}
            <motion.div variants={itemVariants} className="space-y-4 border-l border-[#e5e5e5] pl-5 hover:border-[#3b82f6] transition-colors">
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-semibold text-[#0a0a0a] tracking-tight font-['Satoshi',sans-serif]">
                  2. Tracked Categories & Structural Lifespans
                </h2>
                <p className="text-xs font-mono text-neutral-400">STORAGE_CLASSIFICATIONS</p>
              </div>

              <p className="text-[#404040]">
                We use distinct database classifications based on operational utility loops:
              </p>

              {/* High Contrast Monochromatic Cards Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {cookieTypes.map((cookie, idx) => {
                  const Icon = cookie.icon;
                  return (
                    <div 
                      key={idx}
                      className="p-5 bg-[#ffffff] border border-[#e5e5e5] rounded-xl flex flex-col justify-between h-72 text-left shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="w-7 h-7 rounded-md bg-[#f5f5f5] border border-[#e5e5e5] flex items-center justify-center text-[#3b82f6]">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span className={`text-[9px] font-mono font-medium px-1.5 py-0.5 rounded ${
                            cookie.required ? "bg-red-50 text-red-700 border border-red-100" : "bg-neutral-50 text-neutral-600 border border-neutral-200"
                          }`}>
                            {cookie.required ? "REQUIRED" : "OPTIONAL"}
                          </span>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-semibold text-[#0a0a0a] tracking-tight leading-none mb-1">{cookie.name}</h3>
                          <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-wide leading-none">{cookie.category}</p>
                        </div>
                        
                        <p className="text-xs text-[#404040] font-normal leading-normal">{cookie.description}</p>
                        
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono text-neutral-400 uppercase block tracking-wider">Examples:</span>
                          <div className="flex flex-wrap gap-1">
                            {cookie.examples.slice(0, 2).map((ex, i) => (
                              <span key={i} className="text-[10px] bg-[#f5f5f5] px-1.5 py-0.5 rounded border border-[#e5e5e5] text-[#171717] font-medium max-w-full truncate">{ex}</span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#f5f5f5] flex justify-between items-center text-[10px] font-mono text-[#404040]">
                        <span>LIFESPAN:</span>
                        <span className="text-[#0a0a0a] font-medium">{cookie.retention}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 bg-[#ffffff] border border-[#e5e5e5] rounded-xl text-xs text-[#404040] flex gap-3 items-start">
                <AlertCircle className="w-4 h-4 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Essential cookies cannot be suppressed or disabled as they handle session integrity checks and CSRF validation filters. Optional parameters can be safely restricted without compromising core vision games execution loops.
                </p>
              </div>
            </motion.div>

            {/* 3. WHY WE USE COOKIES */}
            <motion.div variants={itemVariants} className="space-y-4 border-l border-[#e5e5e5] pl-5 hover:border-[#3b82f6] transition-colors">
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-semibold text-[#0a0a0a] tracking-tight font-['Satoshi',sans-serif]">
                  3. Strategic Functional Objectives
                </h2>
                <p className="text-xs font-mono text-neutral-400">DATA_SIGNAL_PURPOSE</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { title: "Authentication", desc: "Verifying parent logging configurations to block illegitimate access attempts to child profiles vectors." },
                  { title: "Game State Memory", desc: "Saving structural difficulty states, reward stars logs, and coin balances across sessions." },
                  { title: "Performance Diagnostics", desc: "Tracking application rendering latencies, frame crashes, and load parameters." },
                  { title: "Personalization Fills", desc: "Remembering accessibility typography targets, theme criteria, and custom panel settings." }
                ].map((obj, i) => (
                  <div key={i} className="p-4 border border-[#e5e5e5] rounded-xl text-left bg-[#ffffff]">
                    <h4 className="text-xs font-mono font-semibold text-[#0a0a0a] uppercase tracking-wider mb-1">[{i + 1}] {obj.title}</h4>
                    <p className="text-xs sm:text-sm text-[#404040] leading-relaxed">{obj.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 4. THIRD-PARTY PARTNERS */}
            <motion.div variants={itemVariants} className="space-y-4 border-l border-[#e5e5e5] pl-5 hover:border-[#3b82f6] transition-colors">
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-semibold text-[#0a0a0a] tracking-tight font-['Satoshi',sans-serif]">
                  4. Third-Party Token Allocations
                </h2>
                <p className="text-xs font-mono text-neutral-400">INTEGRATED_SUB_PROCESSORS</p>
              </div>

              <p className="text-[#404040]">
                We use secure, isolated infrastructure sub-routines from validated partners to safeguard operations parameters:
              </p>

              <div className="space-y-2">
                {[
                  { host: "Google Analytics 4", domain: "analytics.google.com", desc: "Handles traffic flow metrics and feature popularity analytics. Data is masked dynamically and completely anonymized." },
                  { host: "Cloudflare Network", domain: "cloudflare.com", desc: "Provides globally distributed CDN scaling and advanced cryptographic DDoS hazard protection rings." },
                  { host: "Stripe API Infrastructure", domain: "stripe.com", desc: "Secures transactional payment pipelines. Operates under strict encrypted PCI-DSS banking isolation standards." }
                ].map((p, i) => (
                  <div key={i} className="p-4 bg-[#f5f5f5] border border-[#e5e5e5] rounded-xl hover:bg-[#ffffff] transition-colors">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-xs font-mono font-semibold text-[#0a0a0a] uppercase tracking-wider">{p.host}</h4>
                      <span className="text-[10px] font-mono text-neutral-400 font-medium">{p.domain}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#404040] leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 5. CHILDREN'S PRIVACY PROTECTION */}
            <motion.div variants={itemVariants} className="space-y-4 border-l border-[#e5e5e5] pl-5 hover:border-[#3b82f6] transition-colors">
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-semibold text-[#0a0a0a] tracking-tight font-['Satoshi',sans-serif]">
                  5. Children's Privacy Isolation Models
                </h2>
                <p className="text-xs font-mono text-neutral-400">PEDIATRIC_SAFETY_MAPPING</p>
              </div>

              <p className="text-[#404040]">
                Because our vision trainer is built exclusively for children, our cookie architecture implements severe constraints:
              </p>

              <ul className="space-y-2 text-[#404040] list-none pl-0">
                <li className="flex gap-2.5 items-start">
                  <span className="text-xs font-mono text-[#3b82f6] pt-0.5">✓</span>
                  <span><strong>Zero Behavioral Remarketing Fills:</strong> We completely bar ad networks from placing cross-site cookie trackers. No advertising profiling is ever performed on children.</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="text-xs font-mono text-[#3b82f6] pt-0.5">✓</span>
                  <span><strong>Complete Storage Demolition:</strong> Parents hold total command keys to clear or reject tracking hashes from our analytical ledgers instantly.</span>
                </li>
              </ul>
            </motion.div>

            {/* 6. PREFERENCES PRIVACY CONTROLS */}
            <motion.div variants={itemVariants} className="space-y-4 border-l border-[#e5e5e5] pl-5 hover:border-[#3b82f6] transition-colors">
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-semibold text-[#0a0a0a] tracking-tight font-['Satoshi',sans-serif]">
                  6. Preference Control Keys
                </h2>
                <p className="text-xs font-mono text-neutral-400">COOKIE_CONFIGURATION_MANAGEMENT</p>
              </div>

              <div className="p-5 border border-[#e5e5e5] rounded-xl bg-[#ffffff]">
                <h4 className="text-xs font-mono font-semibold text-[#0a0a0a] uppercase tracking-wider mb-2">Self-Service Dashboard Override</h4>
                <p className="text-xs sm:text-sm text-[#404040] leading-relaxed mb-3">
                  Guardians can change active token configurations instantly within the user settings panel:
                </p>
                <div className="text-xs sm:text-sm space-y-1.5 font-normal text-[#171717] font-mono bg-[#f5f5f5] p-3 rounded-lg border border-[#e5e5e5]">
                  <p>1. Navigate to: Dashboard → Account Settings → Privacy & Cookies</p>
                  <p>2. Toggle analytical processing layers on/off cleanly</p>
                  <p>3. Dispatch a prompt command to purge temporary browser cache logs</p>
                </div>
              </div>
            </motion.div>

            {/* 7. RETENTION GENERAL TABLE */}
            <motion.div variants={itemVariants} className="space-y-4 border-l border-[#e5e5e5] pl-5 hover:border-[#3b82f6] transition-colors">
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-semibold text-[#0a0a0a] tracking-tight font-['Satoshi',sans-serif]">
                  7. Retention Parameters Lifecycle
                </h2>
                <p className="text-xs font-mono text-neutral-400">DATA_DELETION_TIMELINES</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-[#e5e5e5] text-neutral-400 font-medium text-left">
                      <th className="pb-3 font-mono uppercase text-[10px]">Data Group</th>
                      <th className="pb-3 font-mono uppercase text-[10px]">Retention Lifecycle</th>
                      <th className="pb-3 font-mono uppercase text-[10px]">Purge Trigger</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e5e5e5] text-[#171717]">
                    <tr>
                      <td className="py-3 font-semibold">Session Tokens</td>
                      <td className="py-3 text-[#404040]">Browser lifetime parameters</td>
                      <td className="py-3 text-[#404040] font-mono text-[11px]">AUTOMATIC_ON_LOGOUT</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold">Authorization Hashes</td>
                      <td className="py-3 text-[#404040]">30 days standard span</td>
                      <td className="py-3 text-[#404040] font-mono text-[11px]">DYNAMIC_EXPIRATION</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold">Diagnostic Analytics</td>
                      <td className="py-3 text-[#404040]">12 months maximum cache</td>
                      <td className="py-3 text-[#404040] font-mono text-[11px]">CRON_PURGE_INTERVAL</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>

            <hr className="border-[#e5e5e5]" />

            {/* PRIVACY GRIVANCE REDRESSAL CARD */}
            <motion.div variants={itemVariants} className="p-6 bg-[#f5f5f5] border border-[#e5e5e5] rounded-xl space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-[#0a0a0a] uppercase tracking-wide font-mono">
                  Privacy Operations & Security Desk
                </h3>
                <p className="text-xs sm:text-sm text-[#404040] mt-1">
                  For automated cookie log dump requests, tracking questions, or compliance arbitrations, reach our security routes directly:
                </p>
              </div>
              <div className="text-xs sm:text-sm text-[#0a0a0a] font-normal space-y-1.5 pt-1 border-t border-[#e5e5e5]">
                <p className="flex items-center gap-2"><span className="text-neutral-400 font-mono w-20">PRIVACY_EMAIL:</span> <span className="font-medium text-[#3b82f6] hover:underline cursor-pointer">privacy@nainocular.com</span></p>
                <p className="flex items-center gap-2"><span className="text-neutral-400 font-mono w-20">GENERAL_HELP:</span> <span className="font-medium text-[#3b82f6] hover:underline cursor-pointer">hello@nainocular.com</span></p>
                <p className="flex items-center gap-2"><span className="text-neutral-400 font-mono w-20">CORPORATE_HQ:</span> <span className="font-medium">Delhi, India</span></p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CookiesPolicy;