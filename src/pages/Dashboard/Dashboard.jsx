import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, Gamepad2, Gift, ChevronDown, Bell, Play, ArrowUpRight, ChevronRight, Eye 
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

// IMPORT PATH FOR THE ILLUSTRATION ASSET
import headerBg from "../../assets/header-bg.png"; 

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const avatarRef = useRef(null);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);

  // Backend Profile State Sync mapping
  const [userData, setUserData] = useState({
    name: "Player",
    gamesPlayed: 0,
    coins: 0,
    streak: 0,
    totalScore: 0,
    accuracy: 100, 
  });
  const [loading, setLoading] = useState(true);

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
      headers: {
         Authorization:
         `Bearer ${token}`
      },
      withCredentials: true
   }
);

        if (response.data && response.data.user) {
          const dbUser = response.data.user;
          setUserData({
            name: dbUser.name || "Player",
            gamesPlayed: dbUser.gamesPlayed ?? 0,
            coins: dbUser.coins ?? 0,
            streak: dbUser.streak ?? 0,
            totalScore: dbUser.totalScore ?? 0,
            accuracy: dbUser.accuracy ?? (dbUser.gamesPlayed > 0 ? 85 : 100),
          });
        }
      } catch (err) {
        console.error("Dashboard backend profile sync error:", err);
      } finally {
        setLoading(false);
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
    { icon: Home, label: "Dashboard", href: "/dashboard", active: true },
    { icon: Gamepad2, label: "Games", href: "/games" },
    { icon: Gift, label: "Rewards", href: "/rewards" },
  ];

  // Calculated dynamic vectors based on true database numbers
  const averageScorePerSession = userData.gamesPlayed > 0 
    ? Math.floor(userData.totalScore / userData.gamesPlayed) 
    : 0;

  const targetSessions = 3;
  const currentProgressCount = Math.min(targetSessions, userData.gamesPlayed % 4); 
  const displayGoalPercentage = (currentProgressCount / targetSessions) * 100;

  return (
    <div className="h-screen w-screen bg-[#f8fafc] text-slate-800 font-sans flex overflow-hidden antialiased select-none">
      
      {/* ==================== LEFT SIDEBAR GRID ==================== */}
      <aside className="w-56 bg-white border-r border-slate-100 flex flex-col justify-between shrink-0 h-full p-4">
        <div className="space-y-4">
          {/* Brand Panel Head */}
          <div className="px-2 py-3 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#ff6b35] flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">
              <Eye className="w-4 h-4 text-white stroke-[2.5]" />
            </div>
            <div className="text-left">
              <h1 className="text-base font-black text-slate-900 tracking-tight leading-none">Naintaara</h1>
              <span className="text-[10px] text-slate-400 font-bold mt-0.5 inline-block">Vision Module</span>
            </div>
          </div>

          {/* Navigation Links Frame */}
          <nav className="space-y-0.5">
            {navItems.map((item, i) => {
              const Icon = item.icon;
              const isActive = item.active || location.pathname === item.href;
              return (
                <button
                  key={i}
                  onClick={() => navigate(item.href)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-150 relative ${
                    isActive 
                      ? "text-[#ff6b35] bg-orange-50/50" 
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {isActive && <div className="absolute left-0 top-2 bottom-2 w-1 bg-[#ff6b35] rounded-r" />}
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#ff6b35]" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Fixed Dynamic Goal Widget Block */}
        <div className="space-y-3">
          <div className="bg-slate-50/80 rounded-2xl p-3.5 border border-slate-100 text-left">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-xs">⭐</span>
              <p className="text-[11px] font-black text-slate-900">Daily Goal</p>
            </div>
            <p className="text-[10px] text-slate-400 font-bold">Complete 3 sessions today</p>
            <div className="w-full h-1 bg-slate-200 rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-[#ff6b35] transition-all duration-500" 
                style={{ width: `${displayGoalPercentage}%` }}
              />
            </div>
            <div className="flex justify-between items-center mt-1 text-[9px] font-black text-slate-400">
              <span>Progress</span>
              <span>{currentProgressCount} / {targetSessions}</span>
            </div>
          </div>

          <button 
            onClick={() => navigate("/games")}
            className="w-full bg-[#ff6b35] hover:bg-orange-600 text-white font-black py-2.5 px-3 rounded-xl shadow-md shadow-orange-500/10 transition-all active:scale-[0.98] text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5"
          >
            <Play className="w-3 h-3 fill-white" /> Start Training
          </button>
        </div>
      </aside>

      {/* ==================== MAIN CONTENT AREA INTERFACE ==================== */}
      <div className="flex-1 h-full flex flex-col overflow-hidden">
        
        {/* Compact Top Header Controls Bar */}
        <header className="h-14 px-6 flex items-center justify-end gap-3 bg-transparent shrink-0">
          <button className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm text-slate-500 relative">
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white" />
          </button>

          {/* User Profile dropdown menu interface */}
          <div className="relative" ref={avatarRef}>
            <button 
              onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
              className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 bg-white border border-slate-100 rounded-full shadow-sm hover:bg-slate-50 transition"
            >
              <div className="w-6 h-6 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center text-[10px] font-black text-orange-600 overflow-hidden shrink-0">
                <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${userData.name}`} alt="avatar" className="w-full h-full object-cover" />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-[11px] font-black text-slate-900 leading-none">{userData.name}</p>
                <span className="text-[9px] text-slate-400 font-bold mt-0.5 inline-block">Active User</span>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            <AnimatePresence>
              {avatarMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute right-0 mt-1.5 w-44 bg-white border border-slate-100 rounded-xl shadow-xl p-0.5 overflow-hidden z-50"
                >
                  <button onClick={() => navigate("/profile")} className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-slate-600 hover:bg-slate-50">
                    Profile Settings
                  </button>
                  <button onClick={() => { localStorage.clear(); navigate("/login"); }} className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-red-600 hover:bg-red-50">
                    Logout Session
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* Core Layout Content Main Body Viewport Bounds */}
        <main className="px-6 pb-6 flex-1 flex flex-col gap-4 overflow-hidden min-h-0">
          
          {/* 🌟 1. BANNER LANDSCAPE HEADER WITH PERFECTLY PROPORTIONED BACKGROUND */}
          <div 
            className="bg-white rounded-[24px] p-6 border border-slate-100 shrink-0 relative overflow-hidden flex items-center bg-right-bottom bg-no-repeat shadow-sm"
            style={{ 
              backgroundImage: `url(${headerBg})`,
              backgroundPosition: "right center", 
              backgroundSize: "60% 100%",        
              backgroundRepeat: "no-repeat"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-0" />

            <div className="space-y-0.5 z-10 text-left relative">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1">Welcome back, 👋</span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">{userData.name}</h2>
              <p className="text-slate-400 text-[11px] font-bold">Let's continue your vision improvement journey!</p>
            </div>
          </div>

          {/* 🌟 2. METRICS SPARKLINES 4-COLUMN BENTO GRID */}
          <div className="grid grid-cols-4 gap-4 shrink-0">
            
            {/* Card 1: Total Sessions */}
            <div className="bg-white rounded-2xl p-4 border border-slate-100 flex flex-col justify-between shadow-sm text-left h-28">
              <div className="flex items-start justify-between w-full">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Total Sessions</p>
                  <p className="text-2xl font-black text-slate-900 mt-0.5">{userData.gamesPlayed}</p>
                </div>
                <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-sm">🎮</div>
              </div>
              <div className="flex items-center justify-between items-end mt-1">
                <span className="text-[9px] font-black text-emerald-500 flex items-center">Active Sync <ArrowUpRight className="w-2.5 h-2.5" /></span>
                <svg className="w-20 h-5 text-purple-400" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <path d="M0,25 Q15,10 30,20 T60,12 T90,5 T100,10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Card 2: Coins Balance */}
            <div className="bg-white rounded-2xl p-4 border border-slate-100 flex flex-col justify-between shadow-sm text-left h-28">
              <div className="flex items-start justify-between w-full">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Coins Balance</p>
                  <p className="text-2xl font-black text-slate-900 mt-0.5">{userData.coins.toLocaleString()}</p>
                </div>
                <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-sm">🪙</div>
              </div>
              <div className="flex items-center justify-between items-end mt-1">
                <span className="text-[9px] font-black text-emerald-500 flex items-center">Live Wallet <ArrowUpRight className="w-2.5 h-2.5" /></span>
                <svg className="w-20 h-5 text-amber-400" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <path d="M0,28 Q20,20 40,25 T70,10 T100,5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Card 3: Day Streak */}
            <div className="bg-white rounded-2xl p-4 border border-slate-100 flex flex-col justify-between shadow-sm text-left h-28">
              <div className="flex items-start justify-between w-full">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Day Streak</p>
                  <p className="text-2xl font-black text-slate-900 mt-0.5">{userData.streak} Days</p>
                </div>
                <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center text-sm">🔥</div>
              </div>
              <div className="flex items-center justify-between items-end mt-1">
                <span className="text-[9px] font-black text-emerald-500 flex items-center">Keep it up! <ArrowUpRight className="w-2.5 h-2.5" /></span>
                <svg className="w-20 h-5 text-orange-400" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <path d="M0,25 Q25,12 50,22 T75,8 T100,12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Card 4: High Score */}
            <div className="bg-white rounded-2xl p-4 border border-slate-100 flex flex-col justify-between shadow-sm text-left h-28">
              <div className="flex items-start justify-between w-full">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">High Score</p>
                  <p className="text-2xl font-black text-slate-900 mt-0.5">{userData.totalScore.toLocaleString()}</p>
                </div>
                <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-sm">🎯</div>
              </div>
              <div className="flex items-center justify-between items-end mt-1">
                <span className="text-[9px] font-black text-emerald-500 flex items-center">Best Score <ArrowUpRight className="w-2.5 h-2.5" /></span>
                <svg className="w-20 h-5 text-blue-400" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <path d="M0,22 Q30,25 60,10 T100,5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

          </div>

          {/* ==================== 3. SPLIT GRAPH & ACTIVITY ROW MAPS ==================== */}
          <div className="grid grid-cols-3 gap-4 flex-1 min-h-0">
            
            {/* LEFT COMPONENT: 🎯 Training Progress header label successfully corrected */}
            <div className="bg-white rounded-[24px] p-5 border border-slate-100 col-span-2 shadow-sm text-left flex flex-col justify-between min-h-0 overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-xs font-black text-slate-900 tracking-tight">Training Progress</h3>
                  <p className="text-[10px] text-slate-400 font-bold mt-0.5">Your improvement over time</p>
                </div>
                <select className="text-[10px] font-bold text-slate-500 border border-slate-200/80 bg-slate-50/50 rounded-lg px-2 py-1 focus:outline-none">
                  <option>This Week</option>
                </select>
              </div>

              {/* Vector Spline Content Layout */}
              <div className="relative flex-1 min-h-0 w-full mt-2">
                <svg className="w-full h-full" viewBox="0 0 600 120" preserveAspectRatio="none">
                  <line x1="0" y1="30" x2="600" y2="30" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3" />
                  <line x1="0" y1="60" x2="600" y2="60" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3" />
                  <line x1="0" y1="90" x2="600" y2="90" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3" />
                  
                  <path d="M0,100 Q80,60 160,80 T320,40 T480,25 T600,35 L600,120 L0,120 Z" fill="rgba(255,107,53,0.03)" />
                  <path d="M0,100 Q80,60 160,80 T320,40 T480,25 T600,35" fill="none" stroke="#ff6b35" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="160" cy="80" r="4" fill="#ff6b35" stroke="white" strokeWidth="1.5" />
                </svg>
                <div className="absolute top-[35px] left-[160px] -translate-x-1/2 bg-white border border-slate-100 shadow-sm py-1 px-2 rounded-lg text-center">
                  <p className="text-[9px] font-black text-slate-800 leading-none">{userData.accuracy}%</p>
                </div>
              </div>

              <div className="flex justify-between items-center text-[9px] font-black text-slate-400 uppercase mt-2">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>

            {/* RIGHT COMPONENT: Recent Activity Tracker */}
            <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-sm text-left flex flex-col justify-between min-h-0 overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-black text-slate-900 tracking-tight">Recent Activity</h3>
                <button onClick={() => navigate("/games")} className="text-[9px] font-black text-slate-400 border border-slate-100 px-2 py-1 rounded-lg uppercase tracking-wider">View all</button>
              </div>

              <div className="space-y-1.5 flex-1 overflow-auto flex flex-col justify-center min-h-0">
                {userData.gamesPlayed === 0 ? (
                  <div className="text-center py-4 text-[11px] font-bold text-slate-400">
                    No matching training sets parsed.
                  </div>
                ) : (
                  [
                    { title: "Color Square Vision Game", desc: "Completed live session", pts: `+${averageScorePerSession || 10} pts`, emoji: "🟩" },
                    { title: "Retinal Grid Training", desc: "Telemetry updated", pts: "+100 pts", emoji: "👁️" }
                  ].map((act, idx) => (
                    <div key={idx} className="flex items-center justify-between p-1.5 hover:bg-slate-50/50 rounded-xl transition group cursor-pointer" onClick={() => navigate("/games")}>
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-xs shrink-0">
                          {act.emoji}
                        </div>
                        <div className="truncate">
                          <h4 className="text-[11px] font-black text-slate-900 leading-none truncate">{act.title}</h4>
                          <span className="text-[9px] text-slate-400 font-bold mt-0.5 inline-block">{act.desc}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="bg-emerald-50 text-emerald-600 font-extrabold text-[9px] px-1.5 py-0.5 rounded-md">{act.pts}</span>
                        <ChevronRight className="w-3 h-3 text-slate-300" />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

          {/* ==================== 4. LOWER BOUND FOOTER GRIDS ==================== */}
          <div className="grid grid-cols-3 gap-4 shrink-0">
            
            {/* LEFT COMPONENT: Medical Milestones layout with dynamic unlocking ranges */}
            <div className="bg-white rounded-[24px] p-5 border border-slate-100 lg:col-span-2 shadow-sm text-left">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-black text-slate-900 tracking-tight">Medical Milestones</h3>
                <button className="text-[9px] font-black text-slate-400 border border-slate-100 px-2 py-1 rounded-lg uppercase tracking-wider">View all</button>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {[
                  { name: "10% Specs Off", info: "Requires 3 sessions", badge: "👓", unlocked: userData.gamesPlayed >= 3, style: "bg-orange-50/60 border-orange-100 text-orange-600" },
                  { name: "Medical Kit", info: "Requires 8 sessions", badge: "📦", unlocked: userData.gamesPlayed >= 8, style: "bg-teal-50/60 border-teal-100 text-teal-600" },
                  { name: "Lens Coating", info: "Requires 15 sessions", badge: "🛡️", unlocked: userData.gamesPlayed >= 15, style: "bg-blue-50/60 border-blue-100 text-blue-600" },
                  { name: "Doc Voucher", info: "Requires 25 sessions", badge: "🩺", unlocked: userData.gamesPlayed >= 25, style: "bg-purple-50/60 border-purple-100 text-purple-600" },
                ].map((ach, idx) => (
                  <div 
                    key={idx} 
                    className={`border rounded-xl p-2.5 flex flex-col items-center justify-center text-center transition-all ${
                      ach.unlocked ? "bg-slate-50/40 border-slate-100/70 opacity-100 shadow-sm" : "bg-slate-100/10 border-dashed border-slate-200 opacity-40 grayscale"
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center text-base shadow-sm mb-2 ${ach.style}`}>
                      {ach.badge}
                    </div>
                    <h4 className="text-[10px] font-black text-slate-900 tracking-tight leading-none truncate max-w-full">{ach.name}</h4>
                    <p className="text-[8px] text-slate-400 font-bold mt-1 leading-tight">{ach.info}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COMPONENT: Next Reward Goal Widget */}
            <div className="bg-gradient-to-br from-orange-50/20 via-white to-orange-50/10 rounded-[24px] p-5 border border-orange-100/40 shadow-sm text-left flex flex-col justify-between relative overflow-hidden h-[122px]">
              <div className="space-y-0.5">
                <h3 className="text-xs font-black text-slate-900 tracking-tight flex items-center gap-1">🎯 Next Goal</h3>
                <div className="w-full mt-2">
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden p-[1px] border border-slate-200/40">
                    <div 
                      className="h-full rounded-full bg-[#ff6b35] transition-all duration-500" 
                      style={{ width: `${displayGoalPercentage}%` }} 
                    />
                  </div>
                  <div className="flex justify-between items-center mt-1 text-[8px] font-black text-slate-400">
                    <span>Complete 3 sessions today</span>
                    <span className="text-slate-600">{currentProgressCount} / {targetSessions}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100/80 flex items-center justify-between w-full">
                <div>
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block">Reward</span>
                  <p className="text-xs font-black text-[#ff6b35] mt-0.5">150 Coins</p>
                </div>
                <div className="text-2xl">🎁</div>
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;