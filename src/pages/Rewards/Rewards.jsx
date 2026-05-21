import { motion } from "framer-motion";
import { Gift, Coins, Flame, Trophy, ArrowRight } from "lucide-react";

const Rewards = () => {
  const rewards = [
    {
      title: "Daily Login Bonus",
      coins: "+10 Coins",
      icon: "🎁",
      color: "from-yellow-50 to-orange-100",
    },
    {
      title: "Play 1 Game",
      coins: "+5 Coins",
      icon: "🎮",
      color: "from-purple-50 to-pink-100",
    },
    {
      title: "7 Day Streak",
      coins: "+20 Coins",
      icon: "🔥",
      color: "from-orange-50 to-red-100",
    },
    {
      title: "Refer a Friend",
      coins: "+50 Coins",
      icon: "🚀",
      color: "from-blue-50 to-cyan-100",
    },
  ];

  const redeemItems = [
    {
      title: "10% Spectacle Discount",
      cost: "100 Coins",
      emoji: "👓",
    },
    {
      title: "Premium Eye Game",
      cost: "150 Coins",
      emoji: "🎯",
    },
    {
      title: "Vision Care Kit",
      cost: "250 Coins",
      emoji: "🩺",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fffaf5]">

      {/* HEADER */}
      <div className="bg-white border-b border-orange-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Rewards Center 🪙
            </h1>

            <p className="text-gray-600 mt-1">
              Earn coins and unlock exciting rewards.
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-[#ff7a00] to-orange-500 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-3"
          >
            <Coins className="w-5 h-5" />
            <span className="font-bold">380 Coins</span>
          </motion.div>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* TOP STATS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

          <motion.div
            whileHover={{ y: -8 }}
            className="bg-gradient-to-br from-orange-50 to-white border border-orange-100 rounded-3xl p-6 shadow-md"
          >
            <Gift className="w-10 h-10 text-[#ff7a00] mb-4" />
            <h3 className="text-3xl font-bold text-gray-900">24</h3>
            <p className="text-gray-600 mt-1">Rewards Earned</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="bg-gradient-to-br from-yellow-50 to-white border border-orange-100 rounded-3xl p-6 shadow-md"
          >
            <Coins className="w-10 h-10 text-yellow-500 mb-4" />
            <h3 className="text-3xl font-bold text-gray-900">380</h3>
            <p className="text-gray-600 mt-1">Total Coins</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="bg-gradient-to-br from-red-50 to-white border border-orange-100 rounded-3xl p-6 shadow-md"
          >
            <Flame className="w-10 h-10 text-orange-500 mb-4" />
            <h3 className="text-3xl font-bold text-gray-900">7</h3>
            <p className="text-gray-600 mt-1">Day Streak</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="bg-gradient-to-br from-blue-50 to-white border border-orange-100 rounded-3xl p-6 shadow-md"
          >
            <Trophy className="w-10 h-10 text-blue-500 mb-4" />
            <h3 className="text-3xl font-bold text-gray-900">3</h3>
            <p className="text-gray-600 mt-1">Unlocked Rewards</p>
          </motion.div>
        </div>

        {/* EARN REWARDS */}
        <div className="mb-14">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Ways to Earn Coins
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewards.map((reward, i) => (
              <motion.div
                key={i}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                className={`bg-gradient-to-br ${reward.color} rounded-3xl p-6 border border-orange-100 shadow-md hover:shadow-xl transition-all`}
              >
                <div className="text-5xl mb-5">
                  {reward.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {reward.title}
                </h3>

                <p className="text-[#ff7a00] font-bold text-lg">
                  {reward.coins}
                </p>

                <div className="mt-6 h-2 bg-white rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "80%" }}
                    transition={{ duration: 1 }}
                    className="h-full bg-gradient-to-r from-[#ff7a00] to-orange-500"
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* REDEEM SECTION */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Redeem Rewards
          </h2>

          <div className="grid lg:grid-cols-3 gap-6">
            {redeemItems.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                className="bg-white border border-orange-100 rounded-3xl p-8 shadow-md hover:shadow-xl transition-all"
              >
                <div className="text-6xl mb-6">
                  {item.emoji}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>

                <p className="text-[#ff7a00] font-bold text-lg mb-6">
                  {item.cost}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-[#ff7a00] to-orange-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg"
                >
                  Redeem
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="mt-16 bg-gradient-to-r from-[#ff7a00] via-orange-500 to-orange-600 rounded-[40px] p-10 text-center text-white shadow-2xl"
        >
          <h2 className="text-4xl font-bold mb-4">
            Keep Playing & Earn More Coins 🚀
          </h2>

          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
            Complete eye-training games daily to unlock premium rewards and exclusive discounts.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-[#ff7a00] px-10 py-4 rounded-full font-bold shadow-lg"
          >
            Play Games Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Rewards;