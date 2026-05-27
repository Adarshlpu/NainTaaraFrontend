import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, Eye, Trophy, Activity, Gamepad2 } from "lucide-react";
import axios from "axios";

// SHARED LANDSCAPE ASSET PATH WITH THE DASHBOARD FILE
import headerBg from "../../assets/header-bg.png";

const Games = () => {
  const navigate = useNavigate();

  // State for tracking real-time user coins and telemetry metrics
  const [userData, setUserData] = useState({
    coins: 0,
    gamesPlayed: 0,
    streak: 0,
    accuracy: 100
  });

  useEffect(() => {
    const fetchUserTelemetry = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true
          }
        );
        if (response.data && response.data.user) {
          const dbUser = response.data.user;
          setUserData({
            coins: dbUser.coins ?? 0,
            gamesPlayed: dbUser.gamesPlayed ?? 0,
            streak: dbUser.streak ?? 0,
            accuracy: dbUser.accuracy ?? (dbUser.gamesPlayed > 0 ? 85 : 100)
          });
        }
      } catch (err) {
        console.error("Games panel data sync error:", err);
      }
    };
    fetchUserTelemetry();
  }, []);

  const games = [
    {
      title: "Color Square Vision Game",
      description: "Train your eyes to distinguish colors and improve visual acuity with this engaging color square game.",
      previewIcon: "🟩",
      customIconGrid: true,
      coins: "+5 Coins",
      path: "/games/oddnout",
      headerBg: "bg-gradient-to-br from-blue-100 via-blue-50/50 to-white",
      buttonStyle: "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/10",
      topFloatingShapes: ["🔷", "💧"],
    },
    {
      title: "Shape Match Challenge",
      description: "Enhance your pattern recognition and eye coordination by matching shapes in this fun and fast-paced game.",
      previewIcon: "🔺",
      customIconGrid: false,
      coins: "+7 Coins", // Mapped exactly to add +7 on API hits
      path: "/games/shape",
      headerBg: "bg-gradient-to-br from-green-100 via-green-50/50 to-white",
      buttonStyle: "bg-green-600 hover:bg-green-700 text-white shadow-green-500/10",
      topFloatingShapes: ["🟢", "🔵"],
    },
    
      {
  title: "Eye Movement Trainer",
  description:
    "Follow moving objects and react to random eye commands to improve focus, reflexes and eye coordination.",
  
  previewIcon: "👁️",

  customIconGrid: false,

  coins: "+10 Coins",

  path: "/games/eyemovement",

  headerBg:
    "bg-gradient-to-br from-cyan-100 via-sky-50 to-white",

  buttonStyle:
    "bg-cyan-600 hover:bg-cyan-700 text-white shadow-cyan-500/10",

  topFloatingShapes: ["👁️", "🎯"],
},

{
  title: "Color Test Challenge",
  description:
    "Test your color vision and improve color differentiation skills with this engaging color test game.",
  previewIcon: "🌈",
  customIconGrid: false,
  coins: "+8 Coins",
  path: "/games/colorblindness",
  headerBg:
    "bg-gradient-to-br from-amber-100 via-yellow-50 to-white",
  buttonStyle:
    "bg-amber-600 hover:bg-amber-700 text-white shadow-amber-500/10",
  topFloatingShapes: ["🌟", "✨"],
}
    

  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 sm:p-8 flex flex-col gap-6 font-sans antialiased select-none">
      
      {/* ==================== 1. LANDSCAPE CONTAINER HERO HEADER ==================== */}
      <div 
        className="bg-white rounded-[32px] p-8 border border-slate-100 relative overflow-hidden flex items-center bg-right-bottom bg-no-repeat shadow-sm shrink-0"
        style={{ 
          backgroundImage: `
            linear-gradient(to right, #ffffff 45%, rgba(255, 255, 255, 0.85) 60%, transparent 80%), 
            url(${headerBg})
          `,
          backgroundSize: "cover, contain"
        }}
      >
        <div className="absolute right-0 top-0 bottom-0 w-[35%] bg-gradient-to-l from-[#e6f4ed]/30 via-transparent to-transparent pointer-events-none" />

        {/* PREMIUM REAL-TIME COINS RADIAL COUNTER BADGE */}
        <div className="absolute top-6 right-6 z-20 bg-white/90 backdrop-blur-sm border border-slate-100 py-1.5 px-3.5 rounded-2xl flex items-center gap-2 shadow-sm">
          <span className="text-base animate-pulse">🪙</span>
          <div className="text-right">
            <p className="text-xs font-black text-slate-900 leading-none">{userData.coins.toLocaleString()}</p>
            <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider block mt-0.5">My Coins</span>
          </div>
        </div>

        <div className="space-y-3 z-10 text-left max-w-xl">
          <div className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-100 px-3 py-1 rounded-full text-[10px] font-extrabold text-[#ff6b35] uppercase tracking-wider">
            <Sparkles className="w-3 h-3" /> Fun. Focus. Improve.
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            Eye Fitness Games 🎮
          </h1>

          <p className="text-slate-400 text-xs sm:text-sm font-semibold leading-relaxed">
            Play engaging games designed to improve your vision, enhance focus and strengthen your eye muscles.
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            <span className="inline-flex items-center gap-1 text-[10px] font-black text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-xl">🎯 Improve Focus</span>
            <span className="inline-flex items-center gap-1 text-[10px] font-black text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-xl">👁️ Train Vision</span>
            <span className="inline-flex items-center gap-1 text-[10px] font-black text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-xl">🏆 Earn Rewards</span>
          </div>
        </div>
      </div>

      {/* ==================== 2. SELECTION CARDS GRID FRAME ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
        {games.map((game, i) => (
          <div
            key={i}
            className="bg-white rounded-[28px] border border-slate-100 shadow-sm flex flex-col overflow-hidden justify-between hover:shadow-md transition duration-200 h-[340px]"
          >
            <div className={`h-40 relative w-full flex items-center justify-center overflow-hidden ${game.headerBg}`}>
              <span className="absolute top-4 left-6 text-sm opacity-30 select-none">{game.topFloatingShapes[0]}</span>
              <span className="absolute bottom-6 right-8 text-base opacity-20 select-none">{game.topFloatingShapes[1]}</span>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/40 rounded-full blur-2xl" />

              <div className="w-20 h-20 rounded-2xl bg-white shadow-xl shadow-slate-200/50 flex items-center justify-center text-4xl relative z-10 border border-white p-3.5">
                {game.customIconGrid ? (
                  <div className="grid grid-cols-2 gap-1 w-full h-full">
                    <div className="bg-red-500 rounded-sm" /><div className="bg-emerald-500 rounded-sm" />
                    <div className="bg-blue-500 rounded-sm" /><div className="bg-amber-400 rounded-sm" />
                  </div>
                ) : (
                  <span>{game.previewIcon}</span>
                )}
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between text-left space-y-4">
              <div className="space-y-1.5">
                <h3 className="text-base font-black text-slate-900 tracking-tight leading-snug">
                  {game.title}
                </h3>
                <p className="text-slate-400 text-xs font-bold leading-relaxed line-clamp-2">
                  {game.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl text-[11px] font-black text-orange-600 shadow-sm">
                  <span>🪙</span> {game.coins}
                </div>

                <button
                  onClick={() => navigate(game.path)}
                  className={`flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-black tracking-wide shadow-md transition duration-150 transform active:scale-[0.97] uppercase ${game.buttonStyle}`}
                >
                  <span>Play Game</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ==================== 3. RUNTIME STATS METRICS BOTTOM FOOTER LINE ==================== */}
      <footer className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm shrink-0 text-left">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center text-lg">🏆</div>
          <div>
            <h4 className="text-xs font-black text-slate-900 leading-none">Keep Playing, Keep Improving!</h4>
            <p className="text-[10px] text-slate-400 font-bold mt-1">The more you play, the better your vision gets.</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-bold text-slate-400">
          <div className="flex items-center gap-2 border-r border-slate-100 pr-6">
            <Gamepad2 className="w-4 h-4 text-purple-400" />
            <div>
              <p className="text-slate-900 font-black leading-none">{userData.gamesPlayed}</p>
              <span className="text-[9px] font-bold text-slate-400 block mt-0.5 uppercase tracking-wider">Games Played</span>
            </div>
          </div>

          <div className="flex items-center gap-2 border-r border-slate-100 pr-6">
            <Activity className="w-4 h-4 text-orange-500" />
            <div>
              <p className="text-slate-900 font-black leading-none">{userData.streak}</p>
              <span className="text-[9px] font-bold text-slate-400 block mt-0.5 uppercase tracking-wider">Day Streak</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-emerald-500" />
            <div>
              <p className="text-slate-900 font-black leading-none">{userData.accuracy}%</p>
              <span className="text-[9px] font-bold text-slate-400 block mt-0.5 uppercase tracking-wider">Avg Accuracy</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Games;