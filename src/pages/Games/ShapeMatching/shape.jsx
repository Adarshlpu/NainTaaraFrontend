import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Shape = () => {
  const [playerX, setPlayerX] = useState(100);
  const [playerY, setPlayerY] = useState(200);

  const [targetX, setTargetX] = useState(400);
  const [targetY, setTargetY] = useState(200);

  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [matched, setMatched] = useState(false);
  const [level, setLevel] = useState(1);

  const [isPlayerRed, setIsPlayerRed] = useState(true);

  // --- VISION THERAPY CONTROLS STATES ---
  const [shapeSize, setShapeSize] = useState(128); // Default size w-32 (128px)
  const [redOpacity, setRedOpacity] = useState(100); // Red color strength (0-100)
  const [blueOpacity, setBlueOpacity] = useState(100); // Blue color strength (0-100)

  // TIMER
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // INITIAL WINDOW POSITIONING
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPlayerX(window.innerWidth * 0.25);
      setPlayerY(window.innerHeight * 0.4);
      setTargetX(window.innerWidth * 0.6);
      setTargetY(window.innerHeight * 0.4);
    }
  }, []);

  // KEYBOARD MOVEMENT
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (matched) return;

      const speed = 3; 
      const maxWidth = window.innerWidth - shapeSize;
      const maxHeight = window.innerHeight - shapeSize;

      if (e.key === "ArrowUp") {
        setPlayerY((prev) => Math.max(0, prev - speed));
      }
      if (e.key === "ArrowDown") {
        setPlayerY((prev) => Math.min(maxHeight, prev + speed));
      }
      if (e.key === "ArrowLeft") {
        setPlayerX((prev) => Math.max(0, prev - speed));
      }
      if (e.key === "ArrowRight") {
        setPlayerX((prev) => Math.min(maxWidth, prev + speed));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [matched, shapeSize]);

  // PIXEL-PERFECT COLLISION DETECTION
  useEffect(() => {
    if (matched) return;

    const halfSize = shapeSize / 2;

    const leftShapeCenter = isPlayerRed ? (playerX + halfSize) : (targetX + halfSize);
    const rightShapeCenter = isPlayerRed ? (targetX + halfSize) : (playerX + halfSize);

    const leftShapeY = isPlayerRed ? playerY : targetY;
    const rightShapeY = isPlayerRed ? targetY : playerY;

    const xDistance = Math.abs(leftShapeCenter - rightShapeCenter); 
    const yDistance = Math.abs(leftShapeY - rightShapeY);

    if (xDistance < 5 && yDistance < 5) {
      setMatched(true);
      setScore((prev) => prev + 10);
      setLevel((prev) => prev + 1);

      setTimeout(() => {
        const padding = 150;
        
        const nextIsRed = Math.random() > 0.5;
        setIsPlayerRed(nextIsRed);

        const newTargetX = Math.random() * (window.innerWidth - padding * 2) + padding;
        const newTargetY = Math.random() * (window.innerHeight - padding * 2) + padding;

        const newPlayerX = newTargetX > window.innerWidth / 2 
          ? newTargetX - 250 - Math.random() * 80 
          : newTargetX + 250 + Math.random() * 80;
          
        const newPlayerY = Math.random() * (window.innerHeight - padding * 2) + padding;

        setTargetX(Math.max(100, Math.min(window.innerWidth - 200, newTargetX)));
        setTargetY(Math.max(100, Math.min(window.innerHeight - 200, newTargetY)));
        setPlayerX(Math.max(50, Math.min(window.innerWidth - 200, newPlayerX)));
        setPlayerY(Math.max(100, Math.min(window.innerHeight - 200, newPlayerY)));
        
        setMatched(false);
      }, 1500);
    }
  }, [playerX, playerY, targetX, targetY, matched, isPlayerRed, shapeSize]);

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative select-none">
      
      {/* TOP LEFT UI: GAME STATUS */}
      <div className="absolute top-6 left-6 z-50 flex gap-4 flex-wrap opacity-60 hover:opacity-100 transition-opacity">
        <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-white shadow-lg text-xs font-mono">
          Score: {score}
        </div>
        <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-white shadow-lg text-xs font-mono">
          Level: {level}
        </div>
        <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-white shadow-lg text-xs font-mono">
          Moving: {isPlayerRed ? "RED" : "BLUE"}
        </div>
      </div>

      {/* TOP RIGHT UI: THERAPY CONFIGURATION CONTROLS */}
      <div className="absolute top-6 right-6 z-50 bg-neutral-900/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl text-white shadow-2xl w-64 flex flex-col gap-3 font-mono text-xs">
        <div className="text-gray-400 font-bold border-b border-white/10 pb-1 text-center">
          THERAPY CONTROLS
        </div>

        {/* SHAPE SIZE SLIDER */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <span>Shape Size:</span>
            <span className="text-cyan-400">{shapeSize}px</span>
          </div>
          <input 
            type="range" 
            min="64" 
            max="200" 
            value={shapeSize} 
            onChange={(e) => setShapeSize(Number(e.target.value))}
            className="w-full accent-cyan-500 bg-neutral-800 h-1 rounded-lg cursor-pointer"
          />
        </div>

        {/* RED INTENSITY SLIDER */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <span>Red Intensity:</span>
            <span className="text-red-400">{redOpacity}%</span>
          </div>
          <input 
            type="range" 
            min="10" 
            max="100" 
            value={redOpacity} 
            onChange={(e) => setRedOpacity(Number(e.target.value))}
            className="w-full accent-red-600 bg-neutral-800 h-1 rounded-lg cursor-pointer"
          />
        </div>

        {/* BLUE INTENSITY SLIDER */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <span>Blue Intensity:</span>
            <span className="text-blue-400">{blueOpacity}%</span>
          </div>
          <input 
            type="range" 
            min="10" 
            max="100" 
            value={blueOpacity} 
            onChange={(e) => setBlueOpacity(Number(e.target.value))}
            className="w-full accent-blue-600 bg-neutral-800 h-1 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* GAME ARENA */}
      {!matched && (
        <>
          {/* LEFT HALF CIRCLE (PURE RED WITH OPACITY CONTROLS) */}
          <motion.div
            className="absolute z-20"
            style={{ 
              x: isPlayerRed ? playerX : targetX, 
              y: isPlayerRed ? playerY : targetY,
              width: shapeSize,
              height: shapeSize
            }}
            transition={{ type: "just" }}
          >
            <div className="w-full h-full relative" style={{ opacity: redOpacity / 100 }}>
              <svg viewBox="0 0 120 120" className="w-full h-full">
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="#FF0000" 
                  clipPath="url(#gameLeftClip)"
                />
                <defs>
                  <clipPath id="gameLeftClip">
                    <rect x="0" y="0" width="60" height="120" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </motion.div>

          {/* RIGHT HALF CIRCLE (PURE BLUE WITH OPACITY CONTROLS) */}
          <motion.div
            className="absolute z-10"
            style={{ 
              x: isPlayerRed ? targetX : playerX, 
              y: isPlayerRed ? targetY : playerY,
              width: shapeSize,
              height: shapeSize
            }}
            transition={{ type: "just" }}
          >
            <div className="w-full h-full relative" style={{ opacity: blueOpacity / 100 }}>
              <svg viewBox="0 0 120 120" className="w-full h-full">
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="#0000FF" 
                  clipPath="url(#gameRightClip)"
                />
                <defs>
                  <clipPath id="gameRightClip">
                    <rect x="60" y="0" width="60" height="120" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </motion.div>
        </>
      )}

      {/* PERFECT MATCH EFFECT - CELEBRATION */}
      {matched && (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-50 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ width: shapeSize + 40, height: shapeSize + 40 }}
          >
            <svg viewBox="0 0 120 120" className="w-full h-full">
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="#FFFFFF"
              />
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-6"
          >
            <div className="text-xl font-mono text-white tracking-widest">
              FUSION PERFECT! 🎯
            </div>
          </motion.div>
        </div>
      )}

      {/* INSTRUCTIONS */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white/30 px-4 pointer-events-none font-mono text-xs">
        <p>Binocular Coordination Therapy • Use Arrow Keys</p>
      </div>

    </div>
  );
};

export default Shape;