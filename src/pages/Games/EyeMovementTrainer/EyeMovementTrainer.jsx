import React, { useEffect, useState } from "react";

const commands = [
  { text: "LOOK LEFT ⬅️", x: 15, y: 45, fake: false },
  { text: "LOOK RIGHT ➡️", x: 85, y: 45, fake: false },
  { text: "LOOK UP ⬆️", x: 50, y: 20, fake: false },
  { text: "LOOK DOWN ⬇️", x: 50, y: 75, fake: false },
  { text: "CENTER FOCUS 🔵", x: 50, y: 45, fake: false },
  { text: "BLINK FAST 👁️", x: 50, y: 45, fake: false },
  { text: "DOUBLE BLINK 👀", x: 50, y: 45, fake: false },
  // Fake Commands
  { text: "DON'T BLINK 🚫", x: 50, y: 45, fake: true },
  { text: "FREEZE 👁️", x: 50, y: 45, fake: true },
  { text: "IGNORE THE BALL ❌", x: 50, y: 45, fake: true },
  { text: "LOOK AWAY 👀", x: 25, y: 25, fake: true },
];

const EyeMovementTrainer = () => {
  const [currentCommand, setCurrentCommand] = useState({
    text: "GET READY...",
    fake: false,
  });
  const [position, setPosition] = useState({ x: 50, y: 45 });
  const [countdown, setCountdown] = useState(3);
  const [started, setStarted] = useState(false);
  const [level, setLevel] = useState(1);

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
      const random = commands[Math.floor(Math.random() * commands.length)];
      setCurrentCommand(random);

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
      setLevel((prev) => (prev < 5 ? prev + 1 : prev));
    }, 10000);

    return () => clearInterval(levelInterval);
  }, [started]);

  return (
    <div className="w-full h-screen overflow-hidden relative bg-gradient-to-br from-black via-slate-900 to-black flex items-center justify-center p-4">
      
      {/* Countdown */}
      {!started && (
        <div className="text-center">
          <h1 className="text-white text-6xl md:text-8xl font-bold animate-pulse">
            {countdown}
          </h1>
          <p className="text-gray-400 text-xl md:text-2xl mt-4">Get Ready...</p>
        </div>
      )}

      {/* Game UI */}
      {started && (
        <>
          {/* Top Header - Responsive layout for Level and Title */}
          <div className="absolute top-4 left-0 right-0 px-4 flex flex-row justify-between items-center z-50 gap-2">
            <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 md:px-6 md:py-3 rounded-xl md:rounded-2xl border border-white/10">
              <h2 className="text-white text-sm md:text-2xl font-bold">
                Level {level}
              </h2>
            </div>

            <div className="bg-cyan-500/10 backdrop-blur-md px-3 py-1.5 md:px-6 md:py-3 rounded-xl md:rounded-2xl border border-cyan-500/20">
              <h2 className="text-cyan-300 text-xs md:text-xl font-semibold whitespace-nowrap">
                Eye Trainer
              </h2>
            </div>
          </div>

          {/* Command - Centered and scaled down on mobile */}
          <div className="absolute top-20 md:top-24 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md text-center">
            <div className="px-4 py-3 md:px-8 md:py-5 rounded-2xl md:rounded-3xl bg-white/10 backdrop-blur-lg border border-white/10 shadow-2xl">
              <h1
                className={`text-xl md:text-4xl font-bold tracking-wide animate-pulse ${
                  currentCommand.fake ? "text-red-400" : "text-cyan-300"
                }`}
              >
                {currentCommand.text}
              </h1>
            </div>
          </div>

          {/* Moving Ball - Responsive size */}
          <div
            className="absolute w-12 h-12 md:w-20 md:h-20 rounded-full bg-cyan-400"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: "translate(-50%, -50%)",
              transition: `all ${speedMap[level] / 1000}s ease-in-out`,
              boxShadow:
                "0 0 40px rgba(34,211,238,0.9), 0 0 80px rgba(34,211,238,0.6)",
            }}
          ></div>

          {/* Center Glow */}
          <div className="absolute w-48 h-48 md:w-96 md:h-96 rounded-full bg-cyan-500/5 blur-3xl"></div>

          {/* Instructions - Fixed spacing at the bottom */}
          <div className="absolute bottom-6 left-4 right-4 text-center px-2">
            <p className="text-gray-300 text-sm md:text-lg tracking-wide hidden sm:block">
              Follow the glowing ball using your eyes only
            </p>
            <p className="text-gray-500 text-xs md:text-sm mt-1">
              Stay focused • Blink naturally • Relax your eyes
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default EyeMovementTrainer;