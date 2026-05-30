import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowRight, Loader2, Gamepad2, Activity, Eye, Trophy, ChevronRight } from "lucide-react";

// ─── Dub Token Based Skeleton Helper ──────────────────────────────────────────
const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-[#f5f5f5] rounded ${className}`} />
);

// ─── Full Rewards Page Skeleton UI ────────────────────────────────────────────
const RewardsSkeleton = () => (
  <div className="flex-1 flex flex-col justify-center items-center py-12 space-y-8 w-full">
    {/* Central Loading Indicator */}
    <div className="flex flex-col items-center justify-center space-y-3 z-30">
      <div className="w-8 h-8 border-2 border-[#e5e5e5] border-t-[#000000] rounded-full animate-spin" />
      <p className="text-[11px] text-[#404040] font-medium tracking-tight">Syncing wallet parameters...</p>
    </div>

    {/* Dummy-Safe Skeleton Layout Grid */}
    <div className="w-full flex flex-col gap-6 opacity-40 select-none pointer-events-none">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="space-y-2"><Skeleton className="h-8 w-48" /><Skeleton className="h-4 w-64" /></div>
        <Skeleton className="h-14 w-56 rounded-xl" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-16 rounded-xl" />)}
      </div>
      <div className="h-48 rounded-xl bg-[#f5f5f5]" />
    </div>
  </div>
);

// ─── Main Rewards Page component (Dub Architecture) ──────────────────────────
const Rewards = () => {
  const navigate = useNavigate();

  // Safely initialized state maps to prevent partial layouts or flashing
  const [userData, setUserData] = useState({
    coins: 0,
    totalScore: 0,
    gamesPlayed: 0,
    streak: 0,
    accuracy: 100,
  });
  const [loading, setLoading] = useState(true);
  const [redeemingId, setRedeemingId] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const fetchUserProfileMetrics = async () => {
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
            withCredentials: true
          }
        );

        if (response.data?.user) {
          const dbUser = response.data.user;
          setUserData({
            coins: dbUser.coins ?? 0,
            totalScore: dbUser.totalScore ?? 0,
            gamesPlayed: dbUser.gamesPlayed ?? 0,
            streak: dbUser.streak ?? 0,
            accuracy: dbUser.accuracy ?? 100
          });
        }
      } catch (err) {
        console.error("Profile synchronization engine error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfileMetrics();
  }, []);

  const handleRedeemItemTrigger = async (itemTitle, coinCost) => {
    if (userData.coins < coinCost) {
      setMessage({ text: "Insufficient Coins Balance 🪙", type: "error" });
      return;
    }

    setRedeemingId(itemTitle);
    setMessage({ text: "", type: "" });

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/game/redeem`,
        { itemTitle, cost: coinCost },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        }
      );

      if (response.data.success) {
        setUserData((prev) => ({ ...prev, coins: prev.coins - coinCost }));
        setMessage({ text: `🎉 Successfully redeemed ${itemTitle}! Check mail.`, type: "success" });
      }
    } catch (err) {
      console.error("Redemption failure:", err);
      setMessage({ text: "Deduction processing framework error.", type: "error" });
    } finally {
      setRedeemingId(null);
    }
  };

  const tasks = [
    { title: "Daily Login Bonus", desc: "Claim daily package", coins: "+10 Coins", icon: "🎁", status: "Claimed", disabled: true, btnStyle: "bg-[#f5f5f5] text-[#404040] cursor-not-allowed" },
    { title: "Play 1 Game", desc: "Complete any 1 workout", coins: "+5 Coins", icon: "🎮", status: "Play Now", disabled: false, btnStyle: "bg-[#000000] text-[#ffffff] hover:bg-[#171717]" },
    { title: "7 Day Streak", desc: "Maintain daily routine", coins: "+20 Coins", icon: "🔥", status: "In Progress", disabled: true, btnStyle: "bg-[#f5f5f5] text-[#404040] cursor-not-allowed" },
    { title: "Refer a Friend", desc: "Invite system network", coins: "+50 Coins", icon: "👥", status: "Invite Now", disabled: false, btnStyle: "bg-[#000000] text-[#ffffff] hover:bg-[#171717]" },
  ];

  const redeemItems = [
    { title: "10% Spectacle Discount", desc: "Get 10% off on stylish eyewear items", cost: 100, icon: "🕶️" },
    { title: "Premium Eye Game", desc: "Unlock exclusive target features", cost: 150, icon: "🎯" },
    { title: "Vision Care Kit", desc: "Essential framework kit for eye health", cost: 250, icon: "🧰" },
  ];

  return (
    <div className="min-h-screen bg-[#ffffff] px-4 sm:px-8 py-6 flex flex-col gap-6 font-sans antialiased max-w-[1200px] mx-auto w-full select-none">
      
      {/* ── LOADING PIPELINE CHECKER ── */}
      {loading ? (
        <RewardsSkeleton />
      ) : (
        <>
          {/* ==================== 1. TOP PROFILE HERO REGION ==================== */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#e5e5e5] pb-6">
            <div className="text-left space-y-1">
              <h1 className="text-2xl font-medium text-[#0a0a0a] tracking-tight">
                Rewards Center 🎁
              </h1>
              <p className="text-[#404040] text-xs sm:text-sm font-normal">
                Complete dynamic training profiles, earn coins and unlock custom care modules.
              </p>
            </div>

            {/* Dub Balance Block Token */}
            <div className="bg-[#ffffff] border border-[#e5e5e5] p-3 rounded-xl flex items-center justify-between w-full md:w-56 hover:border-[#d4d4d4] transition shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#f5f5f5] flex items-center justify-center text-base shrink-0">🪙</div>
                <div className="text-left">
                  <span className="text-[10px] text-[#404040] font-medium uppercase tracking-wider block">Your Balance</span>
                  <p className="text-lg font-medium text-[#0a0a0a] tracking-tight leading-none mt-1">
                    {(userData?.coins || 0).toLocaleString()}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#404040] shrink-0" />
            </div>
          </div>

          {/* ==================== 2. ROW DUB PILLS METRICS ==================== */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {[
              { label: "Games Played", value: userData.gamesPlayed, icon: Gamepad2, color: "text-[#7c3aed]" },
              { label: "Total Score", value: userData.totalScore.toLocaleString(), icon: Trophy, color: "text-[#ea580c]" },
              { label: "Day Streak", value: `${userData.streak} Days`, icon: Activity, color: "text-[#ea580c]" },
              { label: "Accuracy", value: `${userData.accuracy}%`, icon: Eye, color: "text-[#3b82f6]" },
            ].map((pill, idx) => {
              const Icon = pill.icon;
              return (
                <div key={idx} className="bg-[#ffffff] border border-[#e5e5e5] p-3.5 rounded-xl flex items-center gap-3 shadow-sm text-left">
                  <div className={`w-8 h-8 rounded-lg bg-[#f5f5f5] border border-[#e5e5e5] flex items-center justify-center shrink-0 ${pill.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#404040] font-medium uppercase tracking-wider block">{pill.label}</span>
                    <p className="text-base font-medium text-[#0a0a0a] tracking-tight mt-0.5">{pill.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* System Dynamic Banner Callouts */}
          {message.text && (
            <div className={`p-3.5 rounded-lg text-xs font-medium border text-left shadow-sm ${
              message.type === "success" ? "bg-[#dcfce7] text-[#16a34a] border-[#e5e5e5]" : "bg-[#ffffff] text-red-600 border-red-200"
            }`}>
              {message.text}
            </div>
          )}

          {/* ==================== 3. WAYS TO EARN COINS ROW ==================== */}
          <div className="space-y-4 w-full">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-medium text-[#0a0a0a] uppercase tracking-wider">
                Earn Coins ⭐
              </h2>
              <button onClick={() => navigate("/games")} className="text-[11px] font-medium text-[#3b82f6] hover:underline">View All Tasks ›</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tasks.map((task, i) => (
                <div key={i} className="bg-[#ffffff] border border-[#e5e5e5] p-5 rounded-xl flex flex-col justify-between items-center text-center shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-[#f5f5f5] flex items-center justify-center text-2xl mb-3">
                    {task.icon}
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-xs font-medium text-[#0a0a0a] leading-none">{task.title}</h3>
                    <p className="text-[11px] text-[#404040] font-normal">{task.desc}</p>
                    <p className="text-[#ea580c] font-medium text-xs pt-1">{task.coins}</p>
                  </div>

                  <button
                    disabled={task.disabled}
                    onClick={() => !task.disabled && navigate("/games")}
                    className={`w-full mt-4 py-1.5 px-3 rounded-lg text-[11px] font-medium tracking-tight transition-all ${task.btnStyle}`}
                  >
                    {task.status}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ==================== 4. REDEEM REWARDS ==================== */}
          <div className="space-y-4 w-full">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-medium text-[#0a0a0a] uppercase tracking-wider">
                Redeem Rewards 🛍️
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {redeemItems.map((item, i) => {
                const canRedeem = userData.coins >= item.cost;
                return (
                  <div key={i} className="bg-[#ffffff] border border-[#e5e5e5] p-4 rounded-xl flex items-center justify-between shadow-sm hover:border-[#d4d4d4] transition duration-150 gap-4 text-left">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5] flex items-center justify-center text-2xl shrink-0">
                        {item.icon}
                      </div>
                      <div className="space-y-0.5 min-w-0">
                        <h4 className="text-xs font-medium text-[#0a0a0a] leading-snug truncate">{item.title}</h4>
                        <p className="text-[11px] text-[#404040] font-normal leading-normal line-clamp-2 max-w-[170px]">{item.desc}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <div className="text-right">
                        <p className="text-sm font-medium text-[#0a0a0a] leading-none">{item.cost}</p>
                        <span className="text-[9px] text-[#404040] font-medium uppercase tracking-wider mt-0.5 block">Coins</span>
                      </div>
                      
                      <button
                        disabled={redeemingId === item.title || !canRedeem}
                        onClick={() => handleRedeemItemTrigger(item.title, item.cost)}
                        className={`py-1 px-2.5 rounded-md text-[11px] font-medium tracking-tight transition-all ${
                          canRedeem 
                            ? "bg-[#000000] text-[#ffffff] hover:bg-[#171717]" 
                            : "bg-[#f5f5f5] text-[#404040] border border-[#e5e5e5] cursor-not-allowed"
                        }`}
                      >
                        {redeemingId === item.title ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <span>Redeem ›</span>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ==================== 5. BOTTOM RECESSED CONTAINER BELT ==================== */}
          <footer className="bg-[#f5f5f5] border border-[#e5e5e5] rounded-xl p-4 flex items-center justify-between shadow-sm shrink-0 text-left mt-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#ffffff] border border-[#e5e5e5] flex items-center justify-center text-sm shrink-0 shadow-sm">🏆</div>
              <div>
                <h4 className="text-xs font-medium text-[#0a0a0a] leading-none">Keep Playing, Keep Improving!</h4>
                <p className="text-[11px] text-[#404040] font-normal mt-1">The more you play, the more care modules you unlock.</p>
              </div>
            </div>

            <button 
              onClick={() => navigate("/games")}
              className="bg-[#ffffff] hover:bg-[#f5f5f5] text-[#0a0a0a] border border-[#e5e5e5] font-medium text-xs py-1.5 px-3 rounded-lg transition duration-150 flex items-center gap-1.5 shadow-sm shrink-0"
            >
              <span>Keep Playing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </footer>
        </>
      )}

    </div>
  );
};

export default Rewards;