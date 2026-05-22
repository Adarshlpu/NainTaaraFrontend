import { useState, useEffect } from "react";
import { motion } from "framer-motion";
// 💡 FIXED: Added 'Eye' inside the lucide-react destructured import statement below
import { Menu, X, Home, Gamepad2, Gift, BarChart3, User, LogOut, Loader2, Eye } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

// Shadcn UI Elements
import { Button } from "../../components/ui/button";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // BACKEND STATE TRACKING: Syncing real user collection parameters
  const [userData, setUserData] = useState({
    name: "Player",
    gamesPlayed: 0,
    coins: 0,
    streak: 1,
    totalScore: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardMetrics = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication required. Please log in.");
          setLoading(false);
          return;
        }

        // FETCH REAL-TIME PROFILE METRICS
        const response = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && response.data.user) {
          const dbUser = response.data.user;
          setUserData({
            name: dbUser.name || "Player",
            gamesPlayed: dbUser.gamesPlayed !== undefined ? dbUser.gamesPlayed : 0,
            coins: dbUser.coins !== undefined ? dbUser.coins : 0,
            streak: dbUser.streak !== undefined ? dbUser.streak : 1,
            totalScore: dbUser.totalScore !== undefined ? dbUser.totalScore : 0,
          });
        }
      } catch (err) {
        console.error("Dashboard profile sync error:", err);
        setError("Failed to synchronize dashboard telemetry.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardMetrics();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const navItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard", color: "from-blue-400 to-blue-600" },
    { icon: Gamepad2, label: "Games", href: "/games", color: "from-purple-400 to-purple-600" },
    { icon: Gift, label: "Rewards", href: "/rewards", color: "from-pink-400 to-pink-600" },
  ];

  // Dynamic Metrics Mapping from live states
  const stats = [
    { label: "Games Played", value: userData.gamesPlayed, emoji: "🎮", bgColor: "from-purple-50 to-purple-100/60" },
    { label: "Coins Earned", value: userData.coins, emoji: "🪙", bgColor: "from-yellow-50 to-yellow-100/60" },
    { label: "Day Streak", value: userData.streak, emoji: "🔥", bgColor: "from-orange-50 to-orange-100/60" },
    { label: "Total Score", value: userData.totalScore, emoji: "👁️", bgColor: "from-blue-50 to-blue-100/60" },
  ];

  // Clean data representation fallback tracking loops
  const recentGames = [
    { name: "Odd N Out", score: userData.totalScore > 0 ? Math.floor(userData.totalScore / (userData.gamesPlayed || 1)) : 0, date: "Recent Match" },
  ];

  const handleLogoutTrigger = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#ff7a00] animate-spin" />
        <p className="text-sm font-semibold text-neutral-500 mt-3">Loading dashboard telemetry...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#fafafa] overflow-hidden antialiased selection:bg-orange-100">
      
      {/* ==================== SIDEBAR LAYOUT ==================== */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed lg:relative lg:translate-x-0 z-50 w-64 h-screen bg-white border-r border-neutral-200/60 shadow-lg lg:shadow-none transition-transform duration-300 flex flex-col justify-between`}
      >
        <div>
          {/* Logo Section */}
          <div className="p-6 border-b border-neutral-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff7a00] to-orange-600 flex items-center justify-center text-white shadow-sm">
              <Eye className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-neutral-900 tracking-tight leading-none">Naintaara</h1>
              <span className="text-[10px] text-neutral-400 font-semibold mt-1 inline-block">Eye Fitness Engine</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <button
                  key={i}
                  onClick={() => navigate(item.href)}
                  className="w-full flex items-center gap-4 px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-50 border border-transparent text-neutral-600 hover:text-[#ff7a00] font-semibold text-sm transition-all duration-150"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Action Sidebar Footer */}
        <div className="p-4 border-t border-neutral-100 bg-white space-y-2">
          <Button onClick={() => navigate("/profile")} variant="outline" className="w-full h-10 border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 font-bold rounded-xl flex items-center justify-center gap-2 text-xs">
            <User className="w-4 h-4 text-neutral-500" />
            Profile Configuration
          </Button>

          <Button onClick={handleLogoutTrigger} className="w-full h-10 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl border-0 text-xs shadow-none flex items-center justify-center gap-2">
            <LogOut className="w-4 h-4" />
            Secure Logout
          </Button>
        </div>

        {/* Mobile Close Button */}
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden absolute top-5 right-4 p-2 text-neutral-500 hover:bg-neutral-50 rounded-xl transition">
          <X className="w-5 h-5" />
        </button>
      </motion.div>

      {/* ==================== MAIN PANEL FRAME ==================== */}
      <div className="flex-1 overflow-auto relative">
        
        {/* Sticky Action Header */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-neutral-200/50 p-4 sm:px-8 flex items-center justify-between z-40 shadow-[0_1px_2px_rgb(0,0,0,0.01)]">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 text-neutral-600 hover:bg-neutral-50 rounded-xl transition mr-2">
            <Menu className="w-5 h-5" />
          </button>

          <h2 className="text-lg font-extrabold text-neutral-900 tracking-tight flex-1">Dashboard Overview</h2>

          <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-sm font-bold text-[#ff7a00]">
            {userData.name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Main Content Area */}
        <motion.div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100">
              {error}
            </div>
          )}

          {/* Welcome Text Block */}
          <motion.div variants={itemVariants} className="mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight">
              Welcome Back, <span className="text-[#ff7a00]">{userData.name}! 👋</span>
            </h1>
            <p className="text-neutral-500 text-sm sm:text-base font-medium mt-1 max-w-2xl">
              Great to see your alignment loops active! Continue your eye fitness daily tasks to maximize validation scores.
            </p>
          </motion.div>

          {/* Real Metrics Grid Layout */}
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10" variants={containerVariants}>
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className={`bg-gradient-to-br ${stat.bgColor} rounded-2xl p-6 border border-neutral-200/40 shadow-sm flex flex-col justify-between cursor-default`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-neutral-500 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
                    <p className="text-2xl sm:text-3xl font-black text-neutral-900 mt-1">{stat.value}</p>
                  </div>
                  <span className="text-3xl">{stat.emoji}</span>
                </div>
                <div className="h-1.5 bg-white/80 rounded-full overflow-hidden">
                  <div className="h-full bg-[#ff7a00] w-[65%]" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Recent Performance Analytics Card */}
          <motion.div variants={itemVariants} className="mb-10">
            <h3 className="text-xl font-extrabold text-neutral-900 mb-5 tracking-tight">Recent Match Performance</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {userData.gamesPlayed === 0 ? (
                <div className="col-span-full bg-white border border-neutral-200/60 rounded-2xl p-8 text-center text-sm font-semibold text-neutral-400">
                  No match sessions tracked in database yet. Play a game to record metrics!
                </div>
              ) : (
                recentGames.map((game, i) => (
                  <div key={i} className="bg-white border border-neutral-200/60 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-base font-bold text-neutral-900">{game.name}</h4>
                      <span className="text-xl">🎯</span>
                    </div>
                    <div className="mb-3">
                      <p className="text-3xl font-black text-[#ff7a00]">{game.score}</p>
                      <p className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider mt-0.5">Average Pts Session</p>
                    </div>
                    <p className="text-neutral-400 text-xs font-semibold">{game.date}</p>
                  </div>
                ))
              )}
            </div>
          </motion.div>

          {/* Dynamic Progress CTA Strip Banner */}
          <motion.div variants={itemVariants} className="bg-gradient-to-r from-[#ff7a00] via-orange-500 to-orange-600 rounded-2xl p-8 sm:p-10 text-white text-center shadow-md relative overflow-hidden">
            <h3 className="text-2xl font-black tracking-tight mb-2">Keep the Streak Active! 🔥</h3>
            <p className="text-white/80 text-xs sm:text-sm max-w-xl mx-auto mb-6 font-medium">
              Your ongoing consecutive tracking is at Day {userData.streak}. Finish a quick Odd N Out challenge round to claim today&apos;s coin vouchers!
            </p>
            <Button asChild className="h-11 px-8 bg-white hover:bg-neutral-50 text-[#ff7a00] font-bold rounded-xl border-0 text-sm shadow-md transition-transform active:scale-95">
              <Link to="/games">Play Now →</Link>
            </Button>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;