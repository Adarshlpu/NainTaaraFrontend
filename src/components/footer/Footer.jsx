import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
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

  const socialLinks = [
    {
      icon: "f",
      label: "Facebook",
      href: "https://www.facebook.com/naintaaraopticals/",
    },

    {
      icon: "in",
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/nain-taara-opticals/",
    },
  ];

  const companyLinks = ["About", "Blog", "Contact"];
  const legalLinks = ["Privacy Policy", "Terms & Conditions", "Cookies"];

  return (
    <footer className="bg-gradient-to-b from-[#fff7f0] via-white to-orange-50 pt-24 pb-10 mt-24 relative overflow-hidden">
      
      {/* Background Blur Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-200 blur-3xl opacity-20 rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-100 blur-3xl opacity-20 rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Top Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-14 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >

          {/* Logo Section */}
          <motion.div variants={itemVariants}>
            <motion.div
              className="flex items-center gap-3 mb-6 group cursor-pointer w-fit"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff7a00] to-orange-600 flex items-center justify-center text-white text-2xl shadow-lg"
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                👁️
              </motion.div>

              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight group-hover:text-[#ff7a00] transition duration-300">
                NAINOCULAR
              </h1>
            </motion.div>

            <p className="text-gray-600 leading-relaxed text-sm sm:text-base max-w-sm mb-6">
              Helping children improve vision through fun AI-powered games,
              interactive exercises, and engaging eye fitness experiences.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white border border-orange-200 flex items-center justify-center text-[#ff7a00] hover:bg-orange-100 transition-all duration-300 text-sm font-bold"
                  title={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Product */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg sm:text-xl font-bold mb-6 text-gray-900">
              Product
            </h3>

            <ul className="space-y-3 sm:space-y-4">

              <motion.li whileHover={{ x: 8 }}>
                <a
                  href="/#features"
                  className="text-gray-600 hover:text-[#ff7a00] transition-all duration-300 text-sm sm:text-base font-medium"
                >
                  Features
                </a>
              </motion.li>

              <motion.li whileHover={{ x: 8 }}>
                <a
                  href="/games"
                  className="text-gray-600 hover:text-[#ff7a00] transition-all duration-300 text-sm sm:text-base font-medium"
                >
                  Games
                </a>
              </motion.li>

              <motion.li whileHover={{ x: 8 }}>
                <a
                  href="/rewards"
                  className="text-gray-600 hover:text-[#ff7a00] transition-all duration-300 text-sm sm:text-base font-medium"
                >
                  Rewards
                </a>
              </motion.li>

              <motion.li whileHover={{ x: 8 }}>
                <a
                  href="/#theory"
                  className="text-gray-600 hover:text-[#ff7a00] transition-all duration-300 text-sm sm:text-base font-medium"
                >
                  Eye Therapy
                </a>
              </motion.li>

            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg sm:text-xl font-bold mb-6 text-gray-900">
              Company
            </h3>

            <ul className="space-y-3 sm:space-y-4">
              {companyLinks.map((item) => {
                const routes = {
                  About: "/about",
                  Blog: "/blog",
                  Contact: "/contact",
                };

                return (
                  <motion.li
                    key={item}
                    whileHover={{ x: 8 }}
                    className="text-sm sm:text-base font-medium"
                  >
                    <Link
                      to={routes[item]}
                      className="text-gray-600 hover:text-[#ff7a00] transition-all duration-300"
                    >
                      {item}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg sm:text-xl font-bold mb-6 text-gray-900">
              Contact
            </h3>

            <ul className="space-y-3 sm:space-y-5 text-gray-600 text-sm sm:text-base mb-6">

              <motion.li
                whileHover={{ x: 8, color: "#ff7a00" }}
                className="transition-all duration-300 cursor-pointer flex items-center gap-2"
              >
                <span>✉️</span>
                <span>hello@nainocular.com</span>
              </motion.li>

              <motion.li
                whileHover={{ x: 8, color: "#ff7a00" }}
                className="transition-all duration-300 cursor-pointer flex items-center gap-2"
              >
                <span>📞</span>
                <span>+91 9205050993</span>
              </motion.li>

              <motion.li
                whileHover={{ x: 8, color: "#ff7a00" }}
                className="transition-all duration-300 cursor-pointer flex items-center gap-2"
              >
                <span>📍</span>
                <span>Delhi, India</span>
              </motion.li>

            </ul>
          </motion.div>

        </motion.div>

        {/* Divider */}
        <motion.div
          className="border-t border-orange-100 pt-8 sm:pt-10"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">

            <motion.p
              variants={itemVariants}
              className="text-gray-500 text-xs sm:text-sm text-center sm:text-left"
            >
              © 2026 Nainocular. All rights reserved.
            </motion.p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500 justify-center sm:justify-end"
            >
              {legalLinks.map((link) => {
                const routes = {
                  "Privacy Policy": "/privacy-policy",
                  "Terms & Conditions": "/terms-and-conditions",
                  "Cookies": "/cookies-policy",
                };

                return (
                  <motion.div
                    key={link}
                    variants={itemVariants}
                    whileHover={{ x: 4 }}
                  >
                    <Link
                      to={routes[link]}
                      className="cursor-pointer transition-all duration-300 font-medium hover:text-[#ff7a00]"
                    >
                      {link}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;