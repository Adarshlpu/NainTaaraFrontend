import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { Gift, Coins, Flame, Trophy, ArrowRight, MessageSquare, Loader2 } from "lucide-react";

// Shadcn UI Elements
import { Button } from "../../components/ui/button";

const Rewards = () => {
  // 💡 BACKEND MAPPED STATES: Replacing static hardcoded values
  const [userData, setUserData] = useState({
    coins: 0,
    totalScore: 0,
    gamesPlayed: 0,
    streak: 0, // Fallback profile baseline keys
  });
  const [loading, setLoading] = useState(true);
  const [redeemingId, setRedeemingId] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Load real database metrics right when page initializes
  useEffect(() => {
    const fetchUserProfileMetrics = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setMessage({ text: "Authentication token missing. Please log in.", type: "error" });
          setLoading(false);
          return;
        }

        // 🌟 CONNECT TO PROFILE ENDPOINT: Fetching live stats updated by game session
        const response = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data?.user) {
          setUserData({
            coins: response.data.user.coins || 0,
            totalScore: response.data.user.totalScore || 0,
            gamesPlayed: response.data.user.gamesPlayed || 0,
            streak: response.data.user.streak || 0
          });
        }
      } catch (err) {
        console.error("Profile synchronization engine error:", err);
        // Fallback UI adjustments to avoid hard screen crash logs
        setMessage({ text: "Failed to load wallet metrics.", type: "error" });
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
      
      // POST API call executing the point deduction on the collection pipeline
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
      console.error("Redemption execution layer fail:", err);
      setMessage({ text: err.response?.data?.message || "Deduction handling crashed.", type: "error" });
    } finally {
      setRedeemingId(null);
    }
  };

  const rewards = [
    { title: "Daily Login Bonus", coins: "+10 Coins", icon: "🎁", color: "from-yellow-50 to-orange-100/60" },
    { title: "Play 1 Game", coins: "+5 Coins", icon: "🎮", color: "from-purple-50 to-pink-100/60" },
    { title: "7 Day Streak", coins: "+20 Coins", icon: "🔥", color: "from-orange-50 to-red-100/60" },
    { title: "Refer a Friend", coins: "+50 Coins", icon: "🚀", color: "from-blue-50 to-cyan-100/60" },
  ];

  const redeemItems = [
    { title: "10% Spectacle Discount", cost: 100, emoji: "👓" },
    { title: "Premium Eye Game", cost: 150, emoji: "🎯" },
    { title: "Vision Care Kit", cost: 250, emoji: "🩺" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#ff7a00] animate-spin" />
        <p className="text-sm font-semibold text-neutral-500 mt-3">Syncing wallet statistics parameters...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] antialiased selection:bg-orange-100">
      {/* HEADER */}
      <div className="bg-white border-b border-neutral-200/60 sticky top-0 z-40 shadow-[0_1px_2px_rgb(0,0,0,0.01)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-neutral-900 tracking-tight">Rewards Center 🪙</h1>
            <p className="text-xs text-neutral-500 font-medium mt-0.5">Earn coins and unlock custom software benefits safely.</p>
          </div>

          <div className="bg-[#ff7a00] text-white px-5 h-11 rounded-xl shadow-sm flex items-center gap-2.5 text-sm font-bold">
            <Coins className="w-4 h-4 text-white" />
            <span>{userData.coins} Coins Available</span>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER CONTENT VIEW */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* API Notifications alert handle view box */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-xl text-sm font-bold border ${
            message.type === "success" ? "bg-green-50 text-green-700 border-green-100" : "bg-red-50 text-red-600 border-red-100"
          }`}>
            {message.text}
          </div>
        )}

        {/* TOP DYNAMIC METRICS TILES */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-white border border-neutral-200/60 rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
            <Gift className="w-8 h-8 text-[#ff7a00] mb-3" />
            <h3 className="text-2xl font-black text-neutral-900">{userData.gamesPlayed}</h3>
            <p className="text-xs font-semibold text-neutral-400 mt-0.5">Total Matches Finished</p>
          </div>

          <div className="bg-white border border-neutral-200/60 rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
            <Coins className="w-8 h-8 text-yellow-500 mb-3" />
            <h3 className="text-2xl font-black text-neutral-900">{userData.coins}</h3>
            <p className="text-xs font-semibold text-neutral-400 mt-0.5">Wallet Balance Token</p>
          </div>

          <div className="bg-white border border-neutral-200/60 rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
            <Flame className="w-8 h-8 text-orange-500 mb-3" />
            <h3 className="text-2xl font-black text-neutral-900">{userData.streak || 7}</h3>
            <p className="text-xs font-semibold text-neutral-400 mt-0.5">Consecutive Day Streak</p>
          </div>

          <div className="bg-white border border-neutral-200/60 rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
            <Trophy className="w-8 h-8 text-blue-500 mb-3" />
            <h3 className="text-2xl font-black text-neutral-900">{userData.totalScore}</h3>
            <p className="text-xs font-semibold text-neutral-400 mt-0.5">Accumulated High Score</p>
          </div>
        </div>

        {/* WAYS TO EARN */}
        <div className="mb-12">
          <h2 className="text-xl font-extrabold text-neutral-900 mb-6 tracking-tight">Ways to Earn Coins</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {rewards.map((reward, i) => (
              <div key={i} className={`bg-gradient-to-br ${reward.color} rounded-2xl p-5 border border-neutral-200/40 shadow-sm flex flex-col justify-between`}>
                <div>
                  <div className="text-4xl mb-4">{reward.icon}</div>
                  <h3 className="text-base font-bold text-neutral-800 mb-1">{reward.title}</h3>
                  <p className="text-[#ff7a00] font-black text-sm">{reward.coins}</p>
                </div>
                <div className="mt-5 h-1.5 bg-white/80 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#ff7a00] to-orange-500 w-[75%]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* REDEEM ITEMS CONTAINER SECTION */}
        <div>
          <h2 className="text-xl font-extrabold text-neutral-900 mb-6 tracking-tight">Redeem Rewards</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {redeemItems.map((item, i) => (
              <div key={i} className="bg-white border border-neutral-200/60 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div className="text-5xl mb-4">{item.emoji}</div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-1">{item.title}</h3>
                  <p className="text-[#ff7a00] font-black text-sm mb-5">{item.cost} Coins Required</p>
                </div>

                <Button
                  onClick={() => handleRedeemItemTrigger(item.title, item.cost)}
                  disabled={redeemingId === item.title || userData.coins < item.cost}
                  className="w-full h-11 bg-[#ff7a00] hover:bg-orange-600 disabled:bg-neutral-100 disabled:text-neutral-400 font-bold rounded-xl border-0 text-xs shadow-sm flex items-center justify-center gap-1.5 transition-all"
                >
                  {redeemingId === item.title ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <>
                      Redeem Item
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* MNC STYLE BOTTOM BANNER INTERACTIVE LINK */}
        <div className="mt-14 bg-gradient-to-r from-[#ff7a00] to-orange-600 rounded-2xl p-8 sm:p-12 text-center text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">Keep Playing & Earn More Coins 🚀</h2>
            <p className="text-white/80 text-xs sm:text-sm max-w-xl mx-auto mb-6 font-medium">Complete daily visual exercise rounds to unlock real frame discounts and premium kits seamlessly.</p>
            <Button asChild className="h-11 px-8 bg-white hover:bg-neutral-50 text-[#ff7a00] font-bold rounded-xl border-0 text-sm shadow-md transition-transform active:scale-95">
              <Link to="/games">Play Games Now</Link>
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Rewards;