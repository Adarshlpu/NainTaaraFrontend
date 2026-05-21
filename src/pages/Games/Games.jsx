import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Games = () => {
  const navigate = useNavigate();

  const games = [
    {
      title: "Shape Matching",
      description: "Improve visual focus and eye coordination through fun shape matching challenges.",
      emoji: "🧩",
      coins: "+5 Coins",
      path: "/games/shape",
      color: "from-orange-50 to-orange-100",
    },

    {
      title: "Color Square Vision Game",
      description: "Train your eyes to distinguish colors and improve visual acuity with this engaging color square game.",
      emoji: "🎨",
      coins: "+5 Coins",
      path: "/games/oddnout",
      color: "from-blue-50 to-blue-100",
    },
    {
      title: "Eye Blink Challenge",
      description: "Strengthen your eye muscles and improve blink reflexes with this fun and interactive eye blink challenge.",
      emoji: "👁️",
      coins: "+5 Coins",
      path: "/games/eyeblink",
      color: "from-green-50 to-green-100",
    },
  ];


  return (
    <div className="min-h-screen bg-[#fffaf5] p-6 sm:p-10">

      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
          Eye Fitness Games 🎮
        </h1>

        <p className="text-gray-600 text-lg">
          Play fun games designed for lazy eye training and vision improvement.
        </p>
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {games.map((game, i) => (
          <motion.div
            key={i}
            whileHover={{
              y: -10,
              scale: 1.03,
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(game.path)}
            className={`bg-gradient-to-br ${game.color} rounded-[30px] p-6 border border-orange-100 shadow-md hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden`}
          >

            {/* Glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-30 rounded-full blur-3xl"></div>

            {/* Emoji */}
            <div className="text-6xl mb-6 relative z-10">
              {game.emoji}
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 mb-3 relative z-10">
              {game.title}
            </h2>

            {/* Description */}
            <p className="text-gray-600 mb-6 leading-relaxed relative z-10">
              {game.description}
            </p>

            {/* Bottom */}
            <div className="flex items-center justify-between relative z-10">
              <span className="bg-white text-[#ff7a00] px-4 py-2 rounded-full text-sm font-bold shadow">
                {game.coins}
              </span>

              <button className="bg-gradient-to-r from-[#ff7a00] to-orange-500 text-white px-5 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all">
                Play →
              </button>
            </div>
          </motion.div>
        ))}

      </div>
    </div>
  );
};

export default Games;