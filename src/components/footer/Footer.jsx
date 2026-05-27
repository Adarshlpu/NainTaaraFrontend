import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
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

  const socialLinks = [
    {
      icon: "Facebook",
      href: "https://www.facebook.com/naintaaraopticals/",
    },
    {
      icon: "LinkedIn",
      href: "https://www.linkedin.com/company/nain-taara-opticals/",
    },
  ];

  const companyLinks = ["About", "Blog", "Contact"];
  const legalLinks = ["Privacy Policy", "Terms & Conditions", "Cookies"];

  return (
    // 💡 DUB THEME: Completely flat pristine white background canvas with clear hairline gray border line dividers
    <footer className="bg-[#ffffff] pt-20 pb-10 border-t border-[#e5e5e5] font-sans text-[#0a0a0a]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 relative z-10">

        {/* Top Content Grid Array */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 text-left"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >

          {/* Core Brand Identity Column */}
          <motion.div variants={itemVariants} className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5 w-fit group select-none">
              {/* Jet Black Solid Utility Icon Block */}
              <div className="w-8 h-8 rounded-lg bg-[#000000] flex items-center justify-center">
                <Eye className="w-4 h-4 text-white stroke-[2]" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-[#0a0a0a] uppercase">
                NAINOCULAR
              </h1>
            </Link>

            <p className="text-[#171717] text-sm font-normal leading-relaxed max-w-xs">
              Helping children improve vision through fun AI-powered games, interactive exercises, and engaging eye fitness experiences.
            </p>

            {/* Social Redirection Links */}
            <div className="flex gap-4 pt-2">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-[#404040] hover:text-[#0a0a0a] hover:underline transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Product Navigation Array */}
          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-bold text-[#0a0a0a] uppercase tracking-wider mb-5">
              Product
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Features", href: "/#features" },
                { label: "Games", href: "/games" },
                { label: "Rewards", href: "/rewards" },
                { label: "Eye Therapy", href: "/#theory" }
              ].map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-sm font-normal text-[#171717] hover:text-[#0a0a0a] hover:underline transition-all"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Context Links Array */}
          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-bold text-[#0a0a0a] uppercase tracking-wider mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((item) => {
                const routes = {
                  About: "/about",
                  Blog: "/blog",
                  Contact: "/contact",
                };
                return (
                  <li key={item}>
                    <Link
                      to={routes[item]}
                      className="text-sm font-normal text-[#171717] hover:text-[#0a0a0a] hover:underline transition-all"
                    >
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Direct Support Metadata Column */}
          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-bold text-[#0a0a0a] uppercase tracking-wider mb-5">
              Contact
            </h3>
            <ul className="space-y-3 text-sm font-normal text-[#171717]">
              <li className="flex items-center gap-2">
                <span className="text-neutral-400">Email:</span>
                <span className="font-medium text-[#0a0a0a]">hello@nainocular.com</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-neutral-400">Phone:</span>
                <span className="font-medium text-[#0a0a0a]">+91 9205050993</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-neutral-400">Location:</span>
                <span className="font-medium text-[#0a0a0a]">Delhi, India</span>
              </li>
            </ul>
          </motion.div>

        </motion.div>

        {/* Bottom Bar Divider Line */}
        <div className="border-t border-[#e5e5e5] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-normal text-[#404040]">
            © 2026 Nainocular. All rights reserved.
          </p>

          {/* Legal Document Links Layout */}
          <div className="flex flex-wrap gap-6 text-xs font-normal text-[#404040]">
            {legalLinks.map((link) => {
              const routes = {
                "Privacy Policy": "/privacy-policy",
                "Terms & Conditions": "/terms-and-conditions",
                "Cookies": "/cookies-policy",
              };
              return (
                <Link
                  key={link}
                  to={routes[link]}
                  className="hover:text-[#0a0a0a] hover:underline transition-all"
                >
                  {link}
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;