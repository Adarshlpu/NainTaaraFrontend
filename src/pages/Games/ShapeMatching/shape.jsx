import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, Move, ArrowUp, ArrowDown, ArrowLeft as ArrowLeftIcon, ArrowRight } from "lucide-react";
import axios from "axios";
import ShapeStartModal from "./ShapeStartModal";

const Shape = () => {
  const navigate = useNavigate();

  // Dynamic Arena Boundary Setup states
  const [arenaDimensions, setArenaDimensions] = useState({ width: 650, height: 420 });
  const [isMobile, setIsMobile] = useState(false);

  // Positions & game states
  const [playerX, setPlayerX] = useState(60);
  const [playerY, setPlayerY] = useState(120);
  const [targetX, setTargetX] = useState(240);
  const [targetY, setTargetY] = useState(120);

  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showStartModal, setShowStartModal] = useState(true);
  const [matched, setMatched] = useState(false);
  const [isPlayerRed, setIsPlayerRed] = useState(true);

  // Configuration Sliders
  const [shapeSize, setShapeSize] = useState(100); 
  const [redOpacity, setRedOpacity] = useState(100);
  const [blueOpacity, setBlueOpacity] = useState(100);

  const keysPressed = useRef({});
  const requestRef = useRef(null);
  const gameDurationRef = useRef(0);
  const durationTimerRef = useRef(null);

  // RESIZE LISTENER: Automatically re-calculates boundaries for small devices
  useEffect(() => {
    const handleResizeCalculations = () => {
      const mobileCheck = window.innerWidth < 768;
      setIsMobile(mobileCheck);

      if (mobileCheck) {
        const computedWidth = window.innerWidth - 32; 
        setArenaDimensions({ width: computedWidth, height: 280 }); 
        setShapeSize(70); 
      } else {
        setArenaDimensions({ width: 650, height: 420 });
        setShapeSize(100);
      }
    };

    window.addEventListener("resize", handleResizeCalculations);
    handleResizeCalculations(); 
    return () => window.removeEventListener("resize", handleResizeCalculations);
  }, []);

  // Sync positions when modal resets or screen dimensions scale down
  useEffect(() => {
    setPlayerX(arenaDimensions.width * 0.2);
    setPlayerY(arenaDimensions.height * 0.35);
    setTargetX(arenaDimensions.width * 0.65);
    setTargetY(arenaDimensions.height * 0.35);
  }, [showStartModal, arenaDimensions]);

  // Session Duration Tracker
  useEffect(() => {
    if (!showStartModal && !matched) {
      durationTimerRef.current = setInterval(() => {
        gameDurationRef.current += 1;
      }, 1000);
    } else {
      clearInterval(durationTimerRef.current);
    }
    return () => clearInterval(durationTimerRef.current);
  }, [showStartModal, matched]);

  // High-performance smooth movement loops with Dynamic Proximity Slowdown
  useEffect(() => {
    if (showStartModal || matched) return;

    const moveLoop = () => {
      const currentDx = Math.abs(playerX - targetX);
      const currentDy = Math.abs(playerY - targetY);

      const speed = (currentDx < 25 && currentDy < 25) ? 0.3 : 1.1;

      let dx = 0;
      let dy = 0;

      if (keysPressed.current["ArrowUp"]) dy -= speed;
      if (keysPressed.current["ArrowDown"]) dy += speed;
      if (keysPressed.current["ArrowLeft"]) dx -= speed;
      if (keysPressed.current["ArrowRight"]) dx += speed;

      if (dx !== 0 || dy !== 0) {
        const maxWidth = arenaDimensions.width - shapeSize;
        const maxHeight = arenaDimensions.height - shapeSize;

        setPlayerX((prev) => Math.max(0, Math.min(maxWidth, prev + dx)));
        setPlayerY((prev) => Math.max(0, Math.min(maxHeight, prev + dy)));
      }

      requestRef.current = requestAnimationFrame(moveLoop);
    };

    requestRef.current = requestAnimationFrame(moveLoop);
    return () => cancelAnimationFrame(requestRef.current);
  }, [showStartModal, matched, shapeSize, playerX, playerY, targetX, targetY, arenaDimensions]);

  // Tracking physical keyboard push events
  useEffect(() => {
    const handleKeyDown = (e) => { keysPressed.current[e.key] = true; };
    const handleKeyUp = (e) => { keysPressed.current[e.key] = false; };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // On-Screen Touch Handlers for Virtual D-Pad buttons
  const handleVirtualTouchStart = (direction) => {
    keysPressed.current[`Arrow${direction}`] = true;
  };

  const handleVirtualTouchEnd = (direction) => {
    keysPressed.current[`Arrow${direction}`] = false;
  };

  // 🌟 BACKEND PIPELINE SYNC: Saves level context to reward dynamic coins securely
  const syncMatchToBackend = async (currentScore, currentLevel) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const payload = {
        gameType: "shape-match",
        score: Number(currentScore),
        level: Number(currentLevel),
        accuracy: 100, // Shape match depends on absolute precise overlap coordination
        duration: gameDurationRef.current || 5
      };

      await axios.post(
        `${import.meta.env.VITE_API_URL}/game/save`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        }
      );
    } catch (err) {
      console.error("Fusion database parameters save failure:", err);
    }
  };

  // Collision triggers
  useEffect(() => {
    if (showStartModal || matched) return;

    const xDistance = Math.abs(playerX - targetX);
    const yDistance = Math.abs(playerY - targetY);

    if (xDistance < 2.5 && yDistance < 2.5) {
      setMatched(true);
      const updatedScore = score + 10;
      const updatedLevel = level + 1;
      
      setScore(updatedScore);
      setLevel(updatedLevel);

      // Trigger dynamic wallet allocation tracking instantly
      syncMatchToBackend(updatedScore, updatedLevel);

      setTimeout(() => {
        const nextIsRed = Math.random() > 0.5;
        setIsPlayerRed(nextIsRed);

        const margin = isMobile ? 15 : 40;
        const newTargetX = Math.random() * (arenaDimensions.width - shapeSize - margin * 2) + margin;
        const newTargetY = Math.random() * (arenaDimensions.height - shapeSize - margin * 2) + margin;

        const newPlayerX = newTargetX > arenaDimensions.width / 2 
          ? newTargetX - (isMobile ? 70 : 120) 
          : newTargetX + (isMobile ? 70 : 120);
          
        const newPlayerY = Math.random() * (arenaDimensions.height - shapeSize - margin * 2) + margin;

        setTargetX(Math.max(margin, Math.min(arenaDimensions.width - shapeSize - margin, newTargetX)));
        setTargetY(Math.max(margin, Math.min(arenaDimensions.height - shapeSize - margin, newTargetY)));
        setPlayerX(Math.max(margin, Math.min(arenaDimensions.width - shapeSize - margin, newPlayerX)));
        setPlayerY(Math.max(margin, Math.min(arenaDimensions.height - shapeSize - margin, newPlayerY)));
        
        setMatched(false);
        gameDurationRef.current = 0; // Clear individual level clock intervals
      }, 1000);
    }
  }, [playerX, playerY, targetX, targetY, matched, showStartModal, shapeSize, arenaDimensions, isMobile]);

  return (
    <div className="min-h-screen w-screen bg-[#f8fafc] flex flex-col items-center justify-start md:justify-center p-4 overflow-y-auto overflow-x-hidden select-none font-sans antialiased pb-36 md:pb-4">
      
      {/* ==================== UPPER NAVIGATION CONTROLS ==================== */}
      <div className="w-full max-w-4xl flex items-center justify-between gap-3 mb-4 mt-2 md:mt-0">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate("/games")} 
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm text-slate-500 hover:text-slate-800 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
          </button>
          <div className="bg-white border border-slate-100 px-3 sm:px-4 h-8 sm:h-9 rounded-xl shadow-sm flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs font-black text-slate-700">
            <span>Score: <span className="text-blue-600">{score}</span></span>
            <span className="w-px h-3 bg-slate-200" />
            <span>Level: <span className="text-indigo-600">{level}</span></span>
          </div>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-extrabold bg-white border border-slate-100 px-2.5 h-8 sm:h-9 flex items-center rounded-xl shadow-sm">
          Active: {isPlayerRed ? "🔴 Red" : "🔵 Blue"}
        </span>
      </div>

      {/* ==================== SCREEN GRID CONTAINER INTERFACE ==================== */}
      <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-4 sm:gap-6 items-center justify-center z-10">
        
        {/* LEFT COMPONENT: CONTAINED GAME ARENA BOX WITH ADAPTIVE DIMENSIONS */}
        <div 
          className="bg-slate-950 rounded-[24px] sm:rounded-[28px] border-2 border-slate-900 shadow-xl relative overflow-hidden shrink-0 max-w-full"
          style={{ width: `${arenaDimensions.width}px`, height: `${arenaDimensions.height}px` }}
        >
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

          <AnimatePresence>
            {showStartModal ? (
              <ShapeStartModal onStart={() => setShowStartModal(false)} />
            ) : !matched ? (
              <>
                {/* RED HALF ARC NODE */}
                <div
                  className="absolute z-20 transition-all duration-75 ease-out"
                  style={{ 
                    left: isPlayerRed ? playerX : targetX, 
                    top: isPlayerRed ? playerY : targetY,
                    width: shapeSize,
                    height: shapeSize,
                    opacity: redOpacity / 100
                  }}
                >
                  <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_2px_8px_rgba(239,68,68,0.2)]">
                    <circle cx="60" cy="60" r="54" fill="#ef4444" clipPath="url(#gameLeftClip)" />
                    <defs>
                      <clipPath id="gameLeftClip"><rect x="0" y="0" width="60" height="120" /></clipPath>
                    </defs>
                  </svg>
                </div>

                {/* BLUE HALF ARC NODE */}
                <div
                  className="absolute z-10 transition-all duration-75 ease-out"
                  style={{ 
                    left: isPlayerRed ? targetX : playerX, 
                    top: isPlayerRed ? targetY : playerY,
                    width: shapeSize,
                    height: shapeSize,
                    opacity: blueOpacity / 100
                  }}
                >
                  <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_2px_8px_rgba(37,99,235,0.2)]">
                    <circle cx="60" cy="60" r="54" fill="#2563eb" clipPath="url(#gameRightClip)" />
                    <defs>
                      <clipPath id="gameRightClip"><rect x="60" y="0" width="60" height="120" /></clipPath>
                    </defs>
                  </svg>
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none bg-slate-950/80 backdrop-blur-sm">
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  className="flex flex-col items-center justify-center"
                >
                  <div className="rounded-full bg-white flex items-center justify-center shadow-lg text-base animate-bounce" style={{ width: "42px", height: "42px" }}>
                    🎯
                  </div>
                  <h2 className="text-[10px] font-black text-white tracking-widest mt-2 uppercase bg-white/10 px-3 py-1 rounded-lg border border-white/10">
                    Fusion Perfect!
                  </h2>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT COMPONENT: ADJUSTMENT PANEL */}
        <div className="bg-white border border-slate-100 p-4 sm:p-5 rounded-2xl shadow-sm w-full lg:w-60 flex flex-col gap-3.5 text-[11px] font-bold text-slate-500 text-left shrink-0 box-border">
          <div className="text-slate-800 font-black flex items-center gap-1.5 border-b border-slate-100 pb-2 uppercase tracking-wider text-[10px]">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" /> Therapy Adjustments
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <span>Shape Size:</span>
              <span className="text-blue-600 font-black">{shapeSize}px</span>
            </div>
            <input type="range" min="40" max="130" value={shapeSize} onChange={(e) => setShapeSize(Number(e.target.value))} className="w-full h-1 bg-slate-100 rounded-lg cursor-pointer accent-blue-600" />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <span>Red Luminous:</span>
              <span className="text-red-500 font-black">{redOpacity}%</span>
            </div>
            <input type="range" min="20" max="100" value={redOpacity} onChange={(e) => setRedOpacity(Number(e.target.value))} className="w-full h-1 bg-slate-100 rounded-lg cursor-pointer accent-red-500" />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <span>Blue Luminous:</span>
              <span className="text-blue-600 font-black">{blueOpacity}%</span>
            </div>
            <input type="range" min="20" max="100" value={blueOpacity} onChange={(e) => setBlueOpacity(Number(e.target.value))} className="w-full h-1 bg-slate-100 rounded-lg cursor-pointer accent-blue-600" />
          </div>

          <div className="pt-2 border-t border-slate-50 flex items-center gap-2 text-[10px] text-slate-400 font-medium">
            <Move className="w-3.5 h-3.5 text-slate-300 shrink-0" />
            <span>Steer smoothly using physical arrows or mobile screen pad controls.</span>
          </div>
        </div>

      </div>

      {/* ==================== 📱 VIRTUAL TOUCH D-PAD CONTROLS ==================== */}
      {!showStartModal && (
        <div className="md:hidden fixed bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center justify-between bg-white/90 backdrop-blur-md p-4 rounded-[32px] border border-slate-200/80 shadow-2xl z-50 w-48 h-44">
          
          {/* UP Button */}
          <button
            onTouchStart={() => handleVirtualTouchStart("Up")}
            onTouchEnd={() => handleVirtualTouchEnd("Up")}
            onMouseDown={() => handleVirtualTouchStart("Up")}
            onMouseUp={() => handleVirtualTouchEnd("Up")}
            className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-md text-slate-700 flex items-center justify-center active:bg-slate-100 active:scale-90 transition-all select-none touch-none"
          >
            <ArrowUp className="w-4 h-4 stroke-[3]" />
          </button>

          {/* LEFT / RIGHT Line Group */}
          <div className="flex items-center justify-between w-full px-0.5">
            <button
              onTouchStart={() => handleVirtualTouchStart("Left")}
              onTouchEnd={() => handleVirtualTouchEnd("Left")}
              onMouseDown={() => handleVirtualTouchStart("Left")}
              onMouseUp={() => handleVirtualTouchEnd("Left")}
              className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-md text-slate-700 flex items-center justify-center active:bg-slate-100 active:scale-90 transition-all select-none touch-none"
            >
              <ArrowLeftIcon className="w-4 h-4 stroke-[3]" />
            </button>

            <button
              onTouchStart={() => handleVirtualTouchStart("Right")}
              onTouchEnd={() => handleVirtualTouchEnd("Right")}
              onMouseDown={() => handleVirtualTouchStart("Right")}
              onMouseUp={() => handleVirtualTouchEnd("Right")}
              className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-md text-slate-700 flex items-center justify-center active:bg-slate-100 active:scale-90 transition-all select-none touch-none"
            >
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>

          {/* DOWN Button */}
          <button
            onTouchStart={() => handleVirtualTouchStart("Down")}
            onTouchEnd={() => handleVirtualTouchEnd("Down")}
            onMouseDown={() => handleVirtualTouchStart("Down")}
            onMouseUp={() => handleVirtualTouchEnd("Down")}
            className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-md text-slate-700 flex items-center justify-center active:bg-slate-100 active:scale-90 transition-all select-none touch-none"
          >
            <ArrowDown className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      )}

    </div>
  );
};

export default Shape;