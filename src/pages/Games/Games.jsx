import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, Eye, Activity, Gamepad2 } from "lucide-react";
import axios from "axios";

import headerBg from "../../assets/header-bg.png";

// ─── Dub Token Based Skeleton Helper ──────────────────────────────────────────
const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-[#f5f5f5] rounded ${className}`} />
);

// ─── Full Games Page Skeleton + Dub Spinner UI ────────────────────────────────
const GamesSkeleton = () => (
  <div className="flex-1 flex flex-col justify-center items-center py-12 space-y-8 w-full">
    
    {/* Central Loading Spinner Indicator (Dub Minimal Utility Theme) */}
    <div className="flex flex-col items-center justify-center space-y-3 z-30">
      <div className="w-8 h-8 border-2 border-[#e5e5e5] border-t-[#000000] rounded-full animate-spin" />
      <p className="text-[11px] text-[#404040] font-medium tracking-tight">Syncing visual modules...</p>
    </div>

    {/* Dummy-Safe Skeleton Layout Map */}
    <div className="w-full flex flex-col gap-6 opacity-40 select-none pointer-events-none">
      
      {/* Hero Header Skeleton (Dub Outlined Card Token Layout) */}
      <div className="bg-[#ffffff] rounded-xl p-8 border border-[#e5e5e5] space-y-4">
        <Skeleton className="h-5 w-32 rounded-full" />
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-4 w-[70%]" />
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      </div>

      {/* Game Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-[#ffffff] rounded-xl border border-[#e5e5e5] overflow-hidden h-[340px] flex flex-col"
          >
            <div className="h-40 bg-[#f5f5f5] animate-pulse" />
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-[85%]" />
              </div>
              <div className="flex items-center justify-between pt-2">
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-8 w-28 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  </div>
);

// ─── Main Games Page (Dub Architecture) ───────────────────────────────────────
const Games = () => {
  const navigate = useNavigate();

  // Safely initialized to block partial layout updates or flashing old values
  const [userData, setUserData] = useState({
    coins: 0,
    gamesPlayed: 0,
    streak: 0,
    accuracy: 100,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserTelemetry = async () => {
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
            coins: dbUser.coins ?? 0,
            gamesPlayed: dbUser.gamesPlayed ?? 0,
            streak: dbUser.streak ?? 0,
            accuracy: dbUser.accuracy ?? (dbUser.gamesPlayed > 0 ? 85 : 100),
          });
        }
      } catch (err) {
        console.error("Games panel data sync error:", err);
      } finally {
        setLoading(false);
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
      headerBg: "bg-gradient-to-br from-[#f5f5f5] to-[#ffffff]",
      buttonStyle: "bg-[#000000] hover:bg-[#171717] text-[#ffffff]",
      topFloatingShapes: ["🔷", "💧"],
    },
    {
      title: "Shape Match Challenge",
      description: "Enhance your pattern recognition and eye coordination by matching shapes in this fun and fast-paced game.",
      previewIcon: "🔺",
      customIconGrid: false,
      coins: "+7 Coins",
      path: "/games/shape",
      headerBg: "bg-gradient-to-br from-[#f5f5f5] to-[#ffffff]",
      buttonStyle: "bg-[#000000] hover:bg-[#171717] text-[#ffffff]",
      topFloatingShapes: ["🟢", "🔵"],
    },
    {
      title: "Eye Movement Trainer",
      description: "Follow moving objects and react to random eye commands to improve focus, reflexes and eye coordination.",
      previewIcon: "👁️",
      customIconGrid: false,
      coins: "+10 Coins",
      path: "/games/eyemovement",
      headerBg: "bg-gradient-to-br from-[#f5f5f5] to-[#ffffff]",
      buttonStyle: "bg-[#000000] hover:bg-[#171717] text-[#ffffff]",
      topFloatingShapes: ["👁️", "🎯"],
    },
    {
      title: "Color Test Challenge",
      description: "Test your color vision and improve color differentiation skills with this engaging color test game.",
      previewIcon: "🌈",
      customIconGrid: false,
      coins: "+8 Coins",
      path: "/games/colorblindness",
      headerBg: "bg-gradient-to-br from-[#f5f5f5] to-[#ffffff]",
      buttonStyle: "bg-[#000000] hover:bg-[#171717] text-[#ffffff]",
      topFloatingShapes: ["🌟", "✨"],
    },
    {
      title: "Space Explorer Vision Quest",
      description: "Embark on a cosmic adventure to identify planets and improve your visual acuity in this fun space-themed game.",
      previewIcon: "🚀",
      customIconGrid: false,
      coins: "+12 Coins",
      path: "/games/planet",
      headerBg: "bg-[#171717]",
      buttonStyle: "bg-[#ffffff] hover:bg-[#f5f5f5] text-[#0a0a0a] border border-[#e5e5e5]",
      topFloatingShapes: ["🌍", "🪐"],
    },
  ];

  return (
    <div className="min-h-screen bg-[#ffffff] px-4 sm:px-8 py-6 flex flex-col gap-6 font-sans antialiased select-none max-w-[1200px] mx-auto w-full">

      {/* ── SKELETON WITH SPINNER while loading ── */}
      {loading ? (
        <GamesSkeleton />
      ) : (
        /* ── REAL CONTENT after fetch ── */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-6"
        >

          {/* Hero Header (Dub Outlined Card Configuration Matrix) */}
          <div
            className="bg-[#ffffff] rounded-xl p-8 border border-[#e5e5e5] relative overflow-hidden flex items-center bg-right-bottom bg-no-repeat shadow-sm shrink-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, #ffffff 50%, rgba(255,255,255,0.85) 65%, transparent 85%),
                url(${headerBg})
              `,
              backgroundSize: "cover, contain",
            }}
          >
            {/* Coins Badge - Dub Outlined Style Accent */}
            <div className="absolute top-6 right-6 z-20 bg-[#ffffff] border border-[#e5e5e5] py-1.5 px-3.5 rounded-xl flex items-center gap-2 shadow-sm">
              <span className="text-base animate-pulse">🪙</span>
              <div className="text-right">
                <p className="text-xs font-semibold text-[#0a0a0a] leading-none font-sans">
                  {(userData?.coins || 0).toLocaleString()}
                </p>
                <span className="text-[10px] text-[#404040] font-medium uppercase tracking-wider block mt-0.5">
                  My Coins
                </span>
              </div>
            </div>

            <div className="space-y-3 z-10 text-left max-w-xl">
              <div className="inline-flex items-center gap-1.5 bg-[#f5f5f5] border border-[#e5e5e5] px-3 py-1 rounded-full text-[10px] font-semibold text-[#ea580c] uppercase tracking-wider">
                <Sparkles className="w-3 h-3" /> Fun. Focus. Improve.
              </div>
              <h1 className="text-2xl sm:text-3xl font-medium text-[#0a0a0a] tracking-tight font-sans">
                Eye Fitness Games 🎮
              </h1>
              <p className="text-[#404040] text-xs sm:text-sm font-normal leading-relaxed">
                Play engaging games designed to improve your vision, enhance focus and strengthen your eye muscles.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="inline-flex items-center text-[11px] font-medium text-[#0a0a0a] bg-[#f5f5f5] border border-[#e5e5e5] px-2.5 py-1 rounded-xl">🎯 Improve Focus</span>
                <span className="inline-flex items-center text-[11px] font-medium text-[#0a0a0a] bg-[#f5f5f5] border border-[#e5e5e5] px-2.5 py-1 rounded-xl">👁️ Train Vision</span>
                <span className="inline-flex items-center text-[11px] font-medium text-[#0a0a0a] bg-[#f5f5f5] border border-[#e5e5e5] px-2.5 py-1 rounded-xl">🏆 Earn Rewards</span>
              </div>
            </div>
          </div>

          {/* Game Cards Grid (Dub Outlined Specifications) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
            {games.map((game, i) => (
              <div
                key={i}
                className="bg-[#ffffff] rounded-xl border border-[#e5e5e5] flex flex-col overflow-hidden justify-between hover:border-[#d4d4d4] transition duration-150 h-[340px] shadow-sm"
              >
                <div className={`h-40 relative w-full flex items-center justify-center overflow-hidden border-b border-[#e5e5e5] ${game.headerBg}`}>
                  <span className="absolute top-4 left-6 text-sm opacity-30 select-none">
                    {game.topFloatingShapes[0]}
                  </span>
                  <span className="absolute bottom-6 right-8 text-base opacity-20 select-none">
                    {game.topFloatingShapes[1]}
                  </span>
                  
                  <div className="w-16 h-16 rounded-xl bg-[#ffffff] shadow-sm flex items-center justify-center text-3xl relative z-10 border border-[#e5e5e5] p-3">
                    {game.customIconGrid ? (
                      <div className="grid grid-cols-2 gap-1 w-full h-full">
                        <div className="bg-[#ea580c] rounded-sm" />
                        <div className="bg-[#16a34a] rounded-sm" />
                        <div className="bg-[#3b82f6] rounded-sm" />
                        <div className="bg-[#7c3aed] rounded-sm" />
                      </div>
                    ) : (
                      <span>{game.previewIcon}</span>
                    )}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between text-left space-y-3">
                  <div className="space-y-1">
                    <h3 className="text-base font-medium text-[#0a0a0a] tracking-tight leading-snug">
                      {game.title}
                    </h3>
                    <p className="text-[#404040] text-xs font-normal leading-relaxed line-clamp-2">
                      {game.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-1">
                    {/* Pill Tag Variant Token */}
                    <div className="flex items-center gap-1.5 bg-[#dcfce7] px-2.5 py-1 rounded-full text-[11px] font-medium text-[#16a34a]">
                      <span>🪙</span> {game.coins}
                    </div>
                    {/* Primary Action Button Token */}
                    <button
                      onClick={() => navigate(game.path)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium tracking-tight transition duration-150 active:scale-[0.98] ${game.buttonStyle}`}
                    >
                      <span>Play Game</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Stats (Dub Subtle Background Container System) */}
          <footer className="bg-[#f5f5f5] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 text-left border border-[#e5e5e5]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#ffffff] border border-[#e5e5e5] flex items-center justify-center text-base shadow-sm">🏆</div>
              <div>
                <h4 className="text-xs font-medium text-[#0a0a0a] leading-none">Keep Playing, Keep Improving!</h4>
                <p className="text-[11px] text-[#404040] font-normal mt-1">
                  The more you play, the better your vision gets.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs font-normal text-[#404040]">
              <div className="flex items-center gap-2 border-r border-[#e5e5e5] pr-6">
                <Gamepad2 className="w-4 h-4 text-[#7c3aed]" />
                <div>
                  <p className="text-[#0a0a0a] font-medium leading-none">{userData?.gamesPlayed || 0}</p>
                  <span className="text-[9px] font-medium text-[#404040] block mt-1 uppercase tracking-wider">
                    Games Played
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 border-r border-[#e5e5e5] pr-6">
                <Activity className="w-4 h-4 text-[#ea580c]" />
                <div>
                  <p className="text-[#0a0a0a] font-medium leading-none">{userData?.streak || 0}</p>
                  <span className="text-[9px] font-medium text-[#404040] block mt-1 uppercase tracking-wider">
                    Day Streak
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#3b82f6]" />
                <div>
                  <p className="text-[#0a0a0a] font-medium leading-none">{userData?.accuracy || 100}%</p>
                  <span className="text-[9px] font-medium text-[#404040] block mt-1 uppercase tracking-wider">
                    Avg Accuracy
                  </span>
                </div>
              </div>
            </div>
          </footer>

        </motion.div>
      )}

    </div>
  );
};

export default Games;