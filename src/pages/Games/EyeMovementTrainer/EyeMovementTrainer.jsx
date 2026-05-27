import React, { useEffect, useState } from "react";

const commands = [
<<<<<<< HEAD
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
=======
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
>>>>>>> ff5090eb0a658c56351c9f3df09f733668481cce
];

const EyeMovementTrainer = () => {
  const [currentCommand, setCurrentCommand] = useState({
    text: "GET READY...",
    fake: false,
  });
<<<<<<< HEAD

  const [position, setPosition] = useState({
    x: 45,
    y: 45,
  });

  const [countdown, setCountdown] = useState(3);

  const [started, setStarted] = useState(false);

  const [level, setLevel] = useState(1);

  // Level Speed
=======
  const [position, setPosition] = useState({ x: 50, y: 45 });
  const [countdown, setCountdown] = useState(3);
  const [started, setStarted] = useState(false);
  const [level, setLevel] = useState(1);

>>>>>>> ff5090eb0a658c56351c9f3df09f733668481cce
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
<<<<<<< HEAD

        return prev - 1;
      });
    }, 1000);

=======
        return prev - 1;
      });
    }, 1000);
>>>>>>> ff5090eb0a658c56351c9f3df09f733668481cce
    return () => clearInterval(timer);
  }, []);

  // Game Logic
  useEffect(() => {
    if (!started) return;

    const gameInterval = setInterval(() => {
<<<<<<< HEAD
      const random =
        commands[Math.floor(Math.random() * commands.length)];

      setCurrentCommand(random);

      // Opposite movement for higher levels
=======
      const random = commands[Math.floor(Math.random() * commands.length)];
      setCurrentCommand(random);

>>>>>>> ff5090eb0a658c56351c9f3df09f733668481cce
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
<<<<<<< HEAD
=======

//use for eye movement speed adjustment based on every level increase for the game 
//speed


>>>>>>> ff5090eb0a658c56351c9f3df09f733668481cce
    }, speedMap[level]);

    return () => clearInterval(gameInterval);
  }, [started, level]);

  // Auto Level Increase
  useEffect(() => {
    if (!started) return;

    const levelInterval = setInterval(() => {
<<<<<<< HEAD
      setLevel((prev) => {
        if (prev < 5) {
          return prev + 1;
        }

        return prev;
      });
=======
      setLevel((prev) => (prev < 5 ? prev + 1 : prev));
>>>>>>> ff5090eb0a658c56351c9f3df09f733668481cce
    }, 10000);

    return () => clearInterval(levelInterval);
  }, [started]);

  return (
<<<<<<< HEAD
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
=======
    <div className="w-full h-screen overflow-hidden relative bg-gradient-to-br from-black via-slate-900 to-black flex items-center justify-center p-4">
      
      {/* Countdown */}
      {!started && (
        <div className="text-center">
          <h1 className="text-white text-6xl md:text-8xl font-bold animate-pulse">
            {countdown}
          </h1>
          <p className="text-gray-400 text-xl md:text-2xl mt-4">Get Ready...</p>
>>>>>>> ff5090eb0a658c56351c9f3df09f733668481cce
        </div>
      )}

      {/* Game UI */}
      {started && (
        <>
<<<<<<< HEAD
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
=======
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
>>>>>>> ff5090eb0a658c56351c9f3df09f733668481cce
              </h2>
            </div>
          </div>

<<<<<<< HEAD
          {/* Command */}
          <div className="absolute top-24 left-1/2 -translate-x-1/2 z-50">
            <div className="px-8 py-5 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/10 shadow-2xl">
              <h1
                className={`text-4xl font-bold tracking-wide animate-pulse ${
                  currentCommand.fake
                    ? "text-red-400"
                    : "text-cyan-300"
=======
          {/* Command - Centered and scaled down on mobile */}
          <div className="absolute top-20 md:top-24 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md text-center">
            <div className="px-4 py-3 md:px-8 md:py-5 rounded-2xl md:rounded-3xl bg-white/10 backdrop-blur-lg border border-white/10 shadow-2xl">
              <h1
                className={`text-xl md:text-4xl font-bold tracking-wide animate-pulse ${
                  currentCommand.fake ? "text-red-400" : "text-cyan-300"
>>>>>>> ff5090eb0a658c56351c9f3df09f733668481cce
                }`}
              >
                {currentCommand.text}
              </h1>
            </div>
          </div>

<<<<<<< HEAD
          {/* Moving Ball */}
          <div
            className="absolute w-20 h-20 rounded-full bg-cyan-400"
=======
          {/* Moving Ball - Responsive size */}
          <div
            className="absolute w-12 h-12 md:w-20 md:h-20 rounded-full bg-cyan-400"
>>>>>>> ff5090eb0a658c56351c9f3df09f733668481cce
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: "translate(-50%, -50%)",
<<<<<<< HEAD
              transition: `all ${
                speedMap[level] / 1000
              }s ease-in-out`,
              boxShadow:
                "0 0 80px rgba(34,211,238,0.9), 0 0 150px rgba(34,211,238,0.6)",
=======
              transition: `all ${speedMap[level] / 1000}s ease-in-out`,
              boxShadow:
                "0 0 40px rgba(34,211,238,0.9), 0 0 80px rgba(34,211,238,0.6)",
>>>>>>> ff5090eb0a658c56351c9f3df09f733668481cce
            }}
          ></div>

          {/* Center Glow */}
<<<<<<< HEAD
          <div className="absolute w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl"></div>

          {/* Instructions */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
            <p className="text-gray-300 text-lg tracking-wide">
              Follow the glowing ball using your eyes only
            </p>

            <p className="text-gray-500 text-sm mt-2">
=======
          <div className="absolute w-48 h-48 md:w-96 md:h-96 rounded-full bg-cyan-500/5 blur-3xl"></div>

          {/* Instructions - Fixed spacing at the bottom */}
          <div className="absolute bottom-6 left-4 right-4 text-center px-2">
            <p className="text-gray-300 text-sm md:text-lg tracking-wide hidden sm:block">
              Follow the glowing ball using your eyes only
            </p>
            <p className="text-gray-500 text-xs md:text-sm mt-1">
>>>>>>> ff5090eb0a658c56351c9f3df09f733668481cce
              Stay focused • Blink naturally • Relax your eyes
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default EyeMovementTrainer;