import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// 💡 FIXED: Added ChevronRight inside the lucide-react destructuring statement below
import { ArrowRight, Loader2, Gamepad2, Activity, Eye, Trophy, ChevronRight } from "lucide-react";

const Rewards = () => {
  const navigate = useNavigate();

  // BACKEND MAPPED STATES: Connected live stats updated by game session
  const [userData, setUserData] = useState({
    coins: 1250,
    totalScore: 8750,
    gamesPlayed: 24,
    streak: 7,
    accuracy: 92,
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

        const response = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data?.user) {
          const dbUser = response.data.user;
          setUserData({
            coins: dbUser.coins ?? 1250,
            totalScore: dbUser.totalScore ?? 8750,
            gamesPlayed: dbUser.gamesPlayed ?? 24,
            streak: dbUser.streak ?? 7,
            accuracy: dbUser.accuracy ?? 92
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
        "http://localhost:5000/api/game/redeem",
        { itemTitle, cost: coinCost },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setUserData((prev) => ({ ...prev, coins: prev.coins - coinCost }));
        setMessage({ text: `🎉 Successfully redeemed ${itemTitle}! Code sent.`, type: "success" });
      }
    } catch (err) {
      console.error("Redemption failure:", err);
      setMessage({ text: "Deduction handling layer error.", type: "error" });
    } finally {
      setRedeemingId(null);
    }
  };

  const tasks = [
    { title: "Daily Login Bonus", desc: "Login everyday to claim", coins: "+10 Coins", icon: "🎁", status: "Claimed", disabled: true, btnStyle: "bg-slate-100 text-slate-400 border-slate-200" },
    { title: "Play 1 Game", desc: "Complete any 1 game", coins: "+5 Coins", icon: "🎮", status: "Play Now", disabled: false, btnStyle: "bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100" },
    { title: "7 Day Streak", desc: "Maintain your streak", coins: "+20 Coins", icon: "🔥", status: "In Progress", disabled: true, btnStyle: "bg-orange-50 text-orange-600 border-orange-100" },
    { title: "Refer a Friend", desc: "Invite and get rewards", coins: "+50 Coins", icon: "👥", status: "Invite Now", disabled: false, btnStyle: "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100" },
  ];

  const redeemItems = [
    { title: "10% Spectacle Discount", desc: "Get 10% off on stylish eyewear collection", cost: 100, icon: "🕶️", btnStyle: "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white" },
    { title: "Premium Eye Game", desc: "Unlock premium levels and exclusive features", cost: 150, icon: "🎯", btnStyle: "bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white" },
    { title: "Vision Care Kit", desc: "Essential kit for better eye care and health", cost: 250, icon: "🧰", btnStyle: "bg-emerald-500 hover:bg-emerald-600 text-white" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center">
        <Loader2 className="w-5 h-5 text-orange-500 animate-spin stroke-[2.5]" />
        <p className="text-xs font-black text-slate-400 mt-2 tracking-wider">Syncing wallet parameters...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 sm:p-8 flex flex-col gap-6 font-sans antialiased overflow-x-hidden select-none">
      
      {/* ==================== 1. TOP PROFILE HERO REGION ==================== */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative w-full">
        
        <div className="text-left space-y-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            Rewards Center <span className="text-2xl">🎁</span>
          </h1>
          <p className="text-slate-400 text-xs font-bold leading-normal">
            Play games, earn coins and unlock exciting rewards.
          </p>
        </div>

        {/* Balance Card Component (Now correctly references ChevronRight) */}
        <div className="bg-white border border-slate-100 rounded-2xl p-3.5 flex items-center justify-between w-full md:w-56 shadow-sm relative group cursor-pointer hover:shadow-md transition">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-lg shadow-sm shrink-0">🪙</div>
            <div className="text-left">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Your Balance</span>
              <p className="text-xl font-black text-slate-900 tracking-tight mt-0.5">{userData.coins.toLocaleString()}</p>
              <span className="text-[9px] font-bold text-slate-400 block mt-0.5">Coins</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition shrink-0" />
        </div>
      </div>

      {/* ==================== 2. ROW PILLS METRICS BADGES ==================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {[
          { label: "Games Played", value: userData.gamesPlayed, icon: Gamepad2, style: "bg-purple-50/40 border-purple-100/60 text-purple-600" },
          { label: "Total Score", value: userData.totalScore.toLocaleString(), icon: Trophy, style: "bg-indigo-50/40 border-indigo-100/60 text-indigo-600" },
          { label: "Day Streak", value: `${userData.streak} Days`, icon: Activity, style: "bg-orange-50/40 border-orange-100/60 text-orange-600" },
          { label: "Accuracy", value: `${userData.accuracy}%`, icon: Eye, style: "bg-emerald-50/40 border-emerald-100/60 text-emerald-600" },
        ].map((pill, idx) => {
          const Icon = pill.icon;
          return (
            <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-3.5 flex items-center gap-3.5 shadow-sm text-left">
              <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${pill.style}`}>
                <Icon className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">{pill.label}</span>
                <p className="text-base font-black text-slate-900 tracking-tight mt-0.5">{pill.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {message.text && (
        <div className={`p-3.5 rounded-xl text-xs font-bold border text-left shadow-sm ${
          message.type === "success" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-red-50 text-red-600 border-red-100"
        }`}>
          {message.text}
        </div>
      )}

      {/* ==================== 3. WAYS TO EARN COINS ROW ==================== */}
      <div className="space-y-4 w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black text-slate-900 tracking-tight uppercase tracking-wider flex items-center gap-1">
            Earn Coins <span className="text-xs">⭐</span>
          </h2>
          <button onClick={() => navigate("/games")} className="text-[10px] font-black text-[#ff6b35] hover:underline">View All Tasks ›</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tasks.map((task, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-3xl p-5 flex flex-col justify-between items-center text-center shadow-sm relative group">
              <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center text-3xl shadow-inner mb-4">
                {task.icon}
              </div>
              <div className="space-y-0.5">
                <h3 className="text-xs font-black text-slate-900 leading-none">{task.title}</h3>
                <p className="text-[10px] text-slate-400 font-bold">{task.desc}</p>
                <p className="text-[#ff6b35] font-black text-[11px] pt-1">{task.coins}</p>
              </div>

              <button
                disabled={task.disabled}
                onClick={() => !task.disabled && navigate("/games")}
                className={`w-full mt-4 py-2 px-4 border rounded-xl text-[10px] font-black tracking-wide uppercase transition-all duration-150 ${task.btnStyle}`}
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
          <h2 className="text-sm font-black text-slate-900 tracking-tight uppercase tracking-wider flex items-center gap-1">
            Redeem Rewards <span className="text-xs">🛍️</span>
          </h2>
          <button className="text-[10px] font-black text-slate-400">View All Rewards ›</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {redeemItems.map((item, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-3xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition duration-150 gap-4 text-left">
              
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100/70 flex items-center justify-center text-3xl shrink-0">
                  {item.icon}
                </div>
                <div className="space-y-0.5 min-w-0">
                  <h4 className="text-xs font-black text-slate-900 leading-snug truncate">{item.title}</h4>
                  <p className="text-[10px] text-slate-400 font-bold leading-normal line-clamp-2 max-w-[180px]">{item.desc}</p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 shrink-0">
                <div className="text-right">
                  <p className="text-sm font-black text-slate-900 tracking-tight leading-none">{item.cost}</p>
                  <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest mt-0.5 block">Coins</span>
                </div>
                
                <button
                  disabled={redeemingId === item.title || userData.coins < item.cost}
                  onClick={() => handleRedeemItemTrigger(item.title, item.cost)}
                  className={`py-1.5 px-3 rounded-lg text-[9px] font-black tracking-wider uppercase shadow-sm transition-all active:scale-[0.97] flex items-center justify-center shrink-0 ${
                    userData.coins >= item.cost 
                      ? item.btnStyle 
                      : "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed shadow-none"
                  }`}
                >
                  {redeemingId === item.title ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <span>Redeem Now ›</span>
                  )}
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* ==================== 5. BOTTOM RUNTIME ACCENT LINE BELT ==================== */}
      <footer className="bg-[#fffbeb] border border-amber-100/70 rounded-2xl p-4 flex items-center justify-between shadow-sm shrink-0 text-left mt-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-lg shrink-0">🏆</div>
          <div>
            <h4 className="text-xs font-black text-slate-900 leading-none">Keep Playing, Keep Improving!</h4>
            <p className="text-[10px] text-slate-400 font-bold mt-1">The more you play, the more rewards you unlock.</p>
          </div>
        </div>

        <button 
          onClick={() => navigate("/games")}
          className="bg-white hover:bg-slate-50 text-amber-700 border border-amber-200 font-black text-[10px] py-2 px-4 rounded-xl transition duration-150 flex items-center gap-1.5 uppercase shadow-sm shrink-0"
        >
          <span>Keep Playing</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </footer>

    </div>
  );
};

export default Rewards;