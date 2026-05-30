import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, Gamepad2, Gift, ChevronDown, Bell, Play, Zap, CheckCircle2 
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

// ─── Skeleton Pulse Component ───────────────────────────────────────────────
const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-[#e5e5e5] rounded ${className}`} />
);

// ─── Full Dashboard Skeleton (shown while loading=true) ──────────────────────
const DashboardSkeleton = () => (
  <div className="space-y-6">

    {/* Hero Banner Skeleton */}
    <div className="bg-[#f5f5f5] rounded-xl p-6 border border-[#e5e5e5] space-y-3">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-7 w-52" />
      <Skeleton className="h-4 w-[60%]" />
    </div>

    {/* Metrics Belt Skeleton */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-[#ffffff] border border-[#e5e5e5] p-4 rounded-xl space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-6 w-16 mt-1" />
        </div>
      ))}
    </div>

    {/* Progress + Badges Skeleton */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

      {/* Progress Card Skeleton */}
      <div className="bg-[#ffffff] border border-[#e5e5e5] p-5 rounded-xl space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-3 w-52" />
        </div>
        <Skeleton className="h-2 w-full rounded-full" />
        <div className="flex justify-between">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-3 w-10" />
        </div>
        <Skeleton className="h-9 w-full rounded-lg" />
      </div>

      {/* Badges Grid Skeleton */}
      <div className="bg-[#ffffff] border border-[#e5e5e5] p-5 rounded-xl lg:col-span-2 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-56" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-3 rounded-lg border border-[#e5e5e5] flex items-center gap-3">
              <Skeleton className="w-9 h-9 rounded-lg shrink-0" />
              <div className="space-y-1.5 flex-1">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-2.5 w-32" />
              </div>
              <Skeleton className="h-5 w-16 rounded-full shrink-0" />
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
);

// ─── Main Dashboard ───────────────────────────────────────────────────────────
const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const avatarRef = useRef(null);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);

  const [userData, setUserData] = useState({
    name: "Player",
    gamesPlayed: 0,
    coins: 0,
    streak: 0,
    totalScore: 0,
  });
  const [loading, setLoading] = useState(true); // ← true by default, skeleton shows immediately

  useEffect(() => {
    const fetchDashboardMetrics = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        if (response.data?.user) {
          const dbUser = response.data.user;
          setUserData({
            name: dbUser.name || "Player",
            gamesPlayed: dbUser.gamesPlayed ?? 0,
            coins: dbUser.coins ?? 0,
            streak: dbUser.streak ?? 0,
            totalScore: dbUser.totalScore ?? 0,
          });
        }
      } catch (err) {
        console.error("Profile metrics fetch error:", err);
      } finally {
        setLoading(false); // ← skeleton hatega, real data aayega
      }
    };

    fetchDashboardMetrics();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        setAvatarMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const navItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Gamepad2, label: "Games", href: "/games" },
    { icon: Gift, label: "Rewards", href: "/rewards" },
  ];

  const targetSessions = 3;
  const currentProgressCount = Math.min(targetSessions, userData.gamesPlayed % 4);
  const displayGoalPercentage = (currentProgressCount / targetSessions) * 100;

  const milestones = [
    { name: "Vision Rookie", info: "Start 1 training", threshold: 1, badge: "👓" },
    { name: "Daily Champion", info: "Complete 3 sessions", threshold: 3, badge: "📦" },
    { name: "Eye Warrior", info: "Complete 8 sessions", threshold: 8, badge: "🛡️" },
    { name: "Super Scope", info: "Complete 15+ training", threshold: 15, badge: "🩺" },
  ];

  // ─── Header Avatar (works in both loading/loaded state) ─────────────────────
  const AvatarHeader = () => (
    <header className="flex items-center justify-between md:justify-end gap-4 pb-6 border-b border-[#e5e5e5] mb-6">
      {/* Mobile Brand */}
      <div className="flex items-center gap-2 md:hidden text-left">
        <div className="w-7 h-7 rounded-md bg-[#000000] flex items-center justify-center">
          <Zap className="w-3.5 h-3.5 text-[#ffffff]" />
        </div>
        <h1 className="text-sm font-medium text-[#0a0a0a]">Nainocular</h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="w-8 h-8 rounded-full bg-[#ffffff] border border-[#e5e5e5] flex items-center justify-center text-[#171717] hover:bg-[#f5f5f5]">
          <Bell className="w-4 h-4" />
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={avatarRef}>
          <button
            onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
            className="flex items-center gap-2 p-1 bg-[#ffffff] border border-[#e5e5e5] rounded-full hover:bg-[#f5f5f5] transition"
          >
            <div className="w-6 h-6 rounded-full bg-[#f5f5f5] flex items-center justify-center overflow-hidden">
              {loading ? (
                <div className="w-full h-full bg-[#e5e5e5] animate-pulse" />
              ) : (
                <img
                  src={`https://api.dicebear.com/7.x/bottts/svg?seed=${userData.name}`}
                  alt="avatar"
                  className="w-full h-full"
                />
              )}
            </div>

            {loading ? (
              <div className="w-14 h-3 bg-[#e5e5e5] animate-pulse rounded mx-2 hidden sm:inline-block" />
            ) : (
              <span className="text-xs font-medium text-[#0a0a0a] pr-2 hidden sm:inline">
                {userData.name}
              </span>
            )}

            <ChevronDown className="w-3 h-3 text-[#404040] pr-1" />
          </button>

          <AnimatePresence>
            {avatarMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="absolute right-0 mt-2 w-44 bg-[#ffffff] border border-[#e5e5e5] rounded-lg shadow-sm p-1 z-50 text-left"
              >
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full px-3 py-2 text-xs rounded hover:bg-[#f5f5f5] text-[#0a0a0a] block"
                >
                  Profile Settings
                </button>
                <button
                  onClick={() => { localStorage.clear(); navigate("/login"); }}
                  className="w-full px-3 py-2 text-xs rounded hover:bg-[#f5f5f5] text-red-600 block"
                >
                  Logout Session
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );

  return (
    <div className="min-h-screen w-full bg-[#ffffff] text-[#0a0a0a] font-sans flex flex-col md:flex-row antialiased select-none pb-20 md:pb-0">

      {/* ══════════════ SIDEBAR (DESKTOP) ══════════════ */}
      <aside className="w-64 bg-[#ffffff] border-r border-[#e5e5e5] hidden md:flex flex-col justify-between shrink-0 h-screen p-6">
        <div className="space-y-6">
          <div className="py-2 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#000000] flex items-center justify-center">
              <Zap className="w-4 h-4 text-[#ffffff]" />
            </div>
            <div className="text-left">
              <h1 className="text-base font-medium tracking-tight text-[#0a0a0a]">Nainocular</h1>
              <p className="text-[11px] text-[#404040]">Vision Suite</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item, i) => {
              const Icon = item.icon;
              const isActive =
                location.pathname === item.href ||
                (item.href === "/dashboard" && location.pathname === "/");
              return (
                <button
                  key={i}
                  onClick={() => navigate(item.href)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                    isActive
                      ? "bg-[#f5f5f5] text-[#0a0a0a] font-medium"
                      : "text-[#404040] hover:bg-[#f5f5f5] hover:text-[#0a0a0a]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-[#e5e5e5]">
          <button
            onClick={() => navigate("/games")}
            className="w-full bg-[#000000] hover:bg-[#171717] text-[#ffffff] text-xs font-medium py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-3.5 h-3.5 fill-current" /> Play Training
          </button>
        </div>
      </aside>

      {/* ══════════════ MAIN BODY ══════════════ */}
      <div className="flex-1 flex flex-col min-w-0 max-w-[1200px] mx-auto w-full px-4 sm:px-8 py-6">

        {/* Header always visible (avatar skeleton handled inside) */}
        <AvatarHeader />

        <main className="space-y-6">

          {/* ── SKELETON (loading=true) ── */}
          {loading && <DashboardSkeleton />}

          {/* ── REAL DATA (loading=false) ── */}
          {!loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Welcome Hero */}
              <div className="bg-[#f5f5f5] rounded-xl p-6 relative overflow-hidden text-left border border-[#e5e5e5]">
                <div className="max-w-[70%] space-y-1">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-[#404040]">Welcome back</p>
                  <h2 className="text-2xl font-medium tracking-tight text-[#0a0a0a]">{userData.name}</h2>
                  <p className="text-[#404040] text-sm">
                    Let's practice your vision training sessions today to unlock new goals.
                  </p>
                </div>
              </div>

              {/* Metrics Belt */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Sessions", value: userData.gamesPlayed },
                  { label: "Coins Balance", value: userData.coins },
                  { label: "Day Streak", value: `🔥 ${userData.streak} Days` },
                  { label: "High Score", value: `🎯 ${userData.totalScore}` },
                ].map((stat, i) => (
                  <div key={i} className="bg-[#ffffff] border border-[#e5e5e5] p-4 rounded-xl text-left">
                    <span className="text-xs text-[#404040]">{stat.label}</span>
                    <p className="text-xl font-medium text-[#0a0a0a] mt-1">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Progress + Badges */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                {/* Daily Target Progress */}
                <div className="bg-[#ffffff] border border-[#e5e5e5] p-5 rounded-xl text-left space-y-4 lg:col-span-1">
                  <div>
                    <h3 className="text-sm font-medium text-[#0a0a0a]">Daily Target Progress</h3>
                    <p className="text-xs text-[#404040] mt-0.5">
                      Finish 3 workouts to receive a surprise chest.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-2 bg-[#f5f5f5] rounded-full overflow-hidden border border-[#e5e5e5]">
                      <div
                        className="h-full bg-[#3b82f6] rounded-full transition-all duration-500"
                        style={{ width: `${displayGoalPercentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-[#404040]">
                      <span>Today's Sessions</span>
                      <span className="font-medium text-[#0a0a0a]">
                        {currentProgressCount} / {targetSessions}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("/games")}
                    className="w-full bg-[#000000] text-[#ffffff] text-xs py-2 rounded-lg font-medium hover:bg-[#171717] transition"
                  >
                    Launch Next Game
                  </button>
                </div>

                {/* Milestone Badges */}
                <div className="bg-[#ffffff] border border-[#e5e5e5] p-5 rounded-xl text-left lg:col-span-2 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-[#0a0a0a]">Your Milestone Badges</h3>
                    <p className="text-xs text-[#404040] mt-0.5">
                      Track achieved tags and future tier unlocks.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {milestones.map((milestone, idx) => {
                      const isUnlocked = userData.gamesPlayed >= milestone.threshold;
                      return (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg border flex items-center justify-between transition-all ${
                            isUnlocked
                              ? "bg-[#ffffff] border-[#e5e5e5]"
                              : "bg-[#f5f5f5]/50 border-[#e5e5e5] opacity-60"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{milestone.badge}</span>
                            <div>
                              <h4 className="text-xs font-medium text-[#0a0a0a]">{milestone.name}</h4>
                              <p className="text-[11px] text-[#404040] mt-0.5">{milestone.info}</p>
                            </div>
                          </div>
                          {isUnlocked ? (
                            <span className="text-[10px] bg-[#dcfce7] text-[#16a34a] px-2 py-0.5 rounded-full font-medium flex items-center gap-1 shrink-0">
                              <CheckCircle2 className="w-3 h-3" /> Unlocked
                            </span>
                          ) : (
                            <span className="text-[10px] bg-[#f5f5f5] text-[#404040] px-2 py-0.5 rounded-full border border-[#e5e5e5] shrink-0">
                              Locked
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

        </main>
      </div>

      {/* ══════════════ MOBILE NAV ══════════════ */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#ffffff] border-t border-[#e5e5e5] px-4 flex items-center justify-around z-50">
        {navItems.map((item, i) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.href ||
            (item.href === "/dashboard" && location.pathname === "/");
          return (
            <button
              key={i}
              onClick={() => navigate(item.href)}
              className={`flex flex-col items-center justify-center gap-1 min-w-16 h-full text-xs transition-all ${
                isActive ? "text-[#3b82f6] font-medium" : "text-[#404040]"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>

    </div>
  );
};

export default Dashboard;