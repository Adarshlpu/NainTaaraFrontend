import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Home, Gamepad2, Gift, BarChart3, User, LogOut } from "lucide-react";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const navItems = [
    { icon: Home, label: "Dashboard", color: "from-blue-400 to-blue-600" },
    { icon: Gamepad2, label: "Games", color: "from-purple-400 to-purple-600" },
    { icon: Gift, label: "Rewards", color: "from-pink-400 to-pink-600" },
    { icon: BarChart3, label: "Reports", color: "from-green-400 to-green-600" },
  ];

  const stats = [
    { label: "Games Played", value: "24", emoji: "🎮", bgColor: "from-purple-50 to-purple-100" },
    { label: "Coins Earned", value: "380", emoji: "🪙", bgColor: "from-yellow-50 to-yellow-100" },
    { label: "Day Streak", value: "7", emoji: "🔥", bgColor: "from-orange-50 to-orange-100" },
    { label: "Focus Level", value: "85%", emoji: "👁️", bgColor: "from-blue-50 to-blue-100" },
  ];

  const recentGames = [
    { name: "Focus Quest", score: "850", date: "Today" },
    { name: "Color Catch", score: "720", date: "Yesterday" },
    { name: "Vision Rush", score: "950", date: "2 days ago" },
  ];

  return (
    <div className="flex h-screen bg-[#fffaf5] overflow-hidden">
      {/* SIDEBAR */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed lg:relative lg:translate-x-0 z-50 w-64 h-screen bg-gradient-to-b from-white to-orange-50 border-r border-orange-100 shadow-lg lg:shadow-none transition-transform duration-300`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-orange-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff7a00] to-orange-600 flex items-center justify-center text-white font-bold">
              👁️
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Naintaara</h1>
          </div>
          <p className="text-xs text-gray-500">Eye Fitness Journey</p>
        </div>

        {/* Navigation */}
        <nav className="p-6 space-y-3">
          {navItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={i}
                whileHover={{ x: 8 }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center gap-4 px-4 py-3 rounded-xl bg-white hover:bg-orange-100 border border-transparent hover:border-orange-200 transition-all duration-300 group"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-700">{item.label}</span>
              </motion.button>
            );
          })}
        </nav>

        {/* Bottom Buttons */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-orange-100 bg-gradient-to-t from-white to-transparent space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-orange-100 text-[#ff7a00] hover:bg-orange-200 font-semibold transition-all"
          >
            <User className="w-5 h-5" />
            <span className="text-sm">Profile</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 font-semibold transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Logout</span>
          </motion.button>
        </div>

        {/* Close Button (Mobile) */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-6 right-4 p-2 hover:bg-orange-100 rounded-lg transition"
        >
          <X className="w-6 h-6 text-gray-700" />
        </motion.button>
      </motion.div>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-orange-100 p-4 sm:p-6 flex items-center justify-between z-40">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-orange-100 rounded-lg transition"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </motion.button>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex-1 sm:flex-none">
            Dashboard
          </h2>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff7a00] to-orange-600 flex items-center justify-center text-white text-lg"
          >
            👤
          </motion.div>
        </div>

        {/* Content */}
        <motion.div
          className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Welcome Section */}
          <motion.div
            variants={itemVariants}
            className="mb-10 sm:mb-12"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Welcome Back! 👋
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl">
              Great to see you again! Continue your eye fitness journey with fun games and exciting rewards.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12"
            variants={containerVariants}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(255, 122, 0, 0.1)" }}
                className={`bg-gradient-to-br ${stat.bgColor} rounded-3xl p-6 sm:p-8 border border-orange-100 shadow-md hover:shadow-xl transition-all cursor-pointer`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-sm sm:text-base font-medium">{stat.label}</p>
                    <p className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <span className="text-3xl sm:text-4xl">{stat.emoji}</span>
                </div>
                <div className="h-1 bg-white rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.random() * 60 + 40}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="h-full bg-gradient-to-r from-orange-400 to-orange-600"
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Recent Games Section */}
          <motion.div
            variants={itemVariants}
            className="mb-10 sm:mb-12"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Recent Games</h3>

            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              variants={containerVariants}
            >
              {recentGames.map((game, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 122, 0, 0.15)" }}
                  className="bg-white border border-orange-100 rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg sm:text-xl font-bold text-gray-900">{game.name}</h4>
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div className="mb-4">
                    <p className="text-3xl sm:text-4xl font-bold text-[#ff7a00]">{game.score}</p>
                    <p className="text-gray-500 text-sm mt-1">pts</p>
                  </div>
                  <p className="text-gray-600 text-sm">{game.date}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-[#ff7a00] via-orange-500 to-orange-600 rounded-3xl p-8 sm:p-10 lg:p-12 text-white text-center"
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">Keep the Streak Going! 🔥</h3>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Play 3 more games today to complete your daily challenge and unlock bonus coins.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#ff7a00] px-8 sm:px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Play Now →
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;