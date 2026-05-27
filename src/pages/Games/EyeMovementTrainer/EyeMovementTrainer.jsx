import React, { useEffect, useState } from "react";

const commands = [
  {
    text: "LOOK LEFT ⬅️",
    x: 10,
    y: 45,
    fake: false,
  },

  {
    text: "LOOK RIGHT ➡️",
    x: 80,
    y: 45,
    fake: false,
  },

  {
    text: "LOOK UP ⬆️",
    x: 45,
    y: 10,
    fake: false,
  },

  {
    text: "LOOK DOWN ⬇️",
    x: 45,
    y: 75,
    fake: false,
  },

  {
    text: "CENTER FOCUS 🔵",
    x: 45,
    y: 45,
    fake: false,
  },

  {
    text: "BLINK FAST 👁️",
    x: 45,
    y: 45,
    fake: false,
  },

  {
    text: "DOUBLE BLINK 👀",
    x: 45,
    y: 45,
    fake: false,
  },

  // Fake Commands
  {
    text: "DON'T BLINK 🚫",
    x: 45,
    y: 45,
    fake: true,
  },

  {
    text: "FREEZE 👁️",
    x: 45,
    y: 45,
    fake: true,
  },

  {
    text: "IGNORE THE BALL ❌",
    x: 45,
    y: 45,
    fake: true,
  },

  {
    text: "LOOK AWAY 👀",
    x: 20,
    y: 20,
    fake: true,
  },
];

const EyeMovementTrainer = () => {
  const [currentCommand, setCurrentCommand] = useState({
    text: "GET READY...",
    fake: false,
  });

  const [position, setPosition] = useState({
    x: 45,
    y: 45,
  });

  const [countdown, setCountdown] = useState(3);

  const [started, setStarted] = useState(false);

  const [level, setLevel] = useState(1);

  // Level Speed
  const speedMap = {
    1: 2500,
    2: 2000,
    3: 1500,
    4: 1000,
    5: 700,
  };

  // Countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setStarted(true);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Game Logic
  useEffect(() => {
    if (!started) return;

    const gameInterval = setInterval(() => {
      const random =
        commands[Math.floor(Math.random() * commands.length)];

      setCurrentCommand(random);

      // Opposite movement for higher levels
      if (level >= 4 && Math.random() > 0.5) {
        setPosition({
          x: 100 - random.x,
          y: 100 - random.y,
        });
      } else {
        setPosition({
          x: random.x,
          y: random.y,
        });
      }
    }, speedMap[level]);

    return () => clearInterval(gameInterval);
  }, [started, level]);

  // Auto Level Increase
  useEffect(() => {
    if (!started) return;

    const levelInterval = setInterval(() => {
      setLevel((prev) => {
        if (prev < 5) {
          return prev + 1;
        }

        return prev;
      });
    }, 10000);

    return () => clearInterval(levelInterval);
  }, [started]);

  return (
    <div className="w-full h-screen overflow-hidden relative bg-gradient-to-br from-black via-slate-900 to-black flex items-center justify-center">

      {/* Countdown */}
      {!started && (
        <div className="text-center">
          <h1 className="text-white text-8xl font-bold animate-pulse">
            {countdown}
          </h1>

          <p className="text-gray-400 text-2xl mt-4">
            Get Ready...
          </p>
        </div>
      )}

      {/* Game UI */}
      {started && (
        <>
          {/* Level */}
          <div className="absolute top-6 left-6 z-50">
            <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
              <h2 className="text-white text-2xl font-bold">
                Level {level}
              </h2>
            </div>
          </div>

          {/* Title */}
          <div className="absolute top-6 right-6 z-50">
            <div className="bg-cyan-500/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-cyan-500/20">
              <h2 className="text-cyan-300 text-xl font-semibold">
                Eye Movement Trainer
              </h2>
            </div>
          </div>

          {/* Command */}
          <div className="absolute top-24 left-1/2 -translate-x-1/2 z-50">
            <div className="px-8 py-5 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/10 shadow-2xl">
              <h1
                className={`text-4xl font-bold tracking-wide animate-pulse ${
                  currentCommand.fake
                    ? "text-red-400"
                    : "text-cyan-300"
                }`}
              >
                {currentCommand.text}
              </h1>
            </div>
          </div>

          {/* Moving Ball */}
          <div
            className="absolute w-20 h-20 rounded-full bg-cyan-400"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: "translate(-50%, -50%)",
              transition: `all ${
                speedMap[level] / 1000
              }s ease-in-out`,
              boxShadow:
                "0 0 80px rgba(34,211,238,0.9), 0 0 150px rgba(34,211,238,0.6)",
            }}
          ></div>

          {/* Center Glow */}
          <div className="absolute w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl"></div>

          {/* Instructions */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
            <p className="text-gray-300 text-lg tracking-wide">
              Follow the glowing ball using your eyes only
            </p>

            <p className="text-gray-500 text-sm mt-2">
              Stay focused • Blink naturally • Relax your eyes
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default EyeMovementTrainer;