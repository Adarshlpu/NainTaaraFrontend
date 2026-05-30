import React, { useState, useEffect, useRef, useCallback } from "react";

const PLANETS = [
  { emoji: "🌍", name: "Earth" },
  { emoji: "🪐", name: "Saturn" },
  { emoji: "🔴", name: "Mars" },
  { emoji: "🌕", name: "Moon" },
  { emoji: "🟣", name: "Neptune" },
  { emoji: "☄️", name: "Comet" },
  { emoji: "⭐", name: "Star" },
  { emoji: "🌞", name: "Sun" },
];

const COSMO_CORRECT = [
  "Woohoo! You found it! 🎉",
  "Amazing! You're a star! ⭐",
  "Brilliant! Cosmo is so proud! 🚀",
  "Spectacular! Keep going! 💫",
  "You're a galactic genius! 🧠",
];

const COSMO_WRONG = [
  "Oops! Try again, explorer! 🙈",
  "Not that one! Look carefully! 👀",
  "Close but not quite! You got this! 💪",
  "Hmm, wrong planet! Keep searching! 🔍",
];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateObjects(level, targetEmoji) {
  const count = 6 + Math.min(level, 6);
  const placed = [];
  const objects = [];

  for (let i = 0; i < count; i++) {
    let x, y, tries = 0;
    do {
      x = 10 + Math.random() * 75;
      y = 10 + Math.random() * 75;
      tries++;
    } while (
      tries < 20 &&
      placed.some((p) => Math.abs(p.x - x) < 14 && Math.abs(p.y - y) < 14)
    );
    placed.push({ x, y });

    const emoji = i === 0 ? targetEmoji : pickRandom(PLANETS).emoji;
    const planet = PLANETS.find((p) => p.emoji === emoji) || PLANETS[0];

    objects.push({
      id: `${Date.now()}-${i}-${Math.random()}`,
      emoji,
      name: planet.name,
      x,
      y,
      floatDur: rand(3, 5).toFixed(2),
      floatDelay: rand(0, 1).toFixed(2),
      disabled: false,
    });
  }
  return objects;
}

function Burst({ burst }) {
  return (
    <div
      style={{
        position: "absolute",
        left: burst.x - 30,
        top: burst.y - 20,
        color: burst.color,
        fontFamily: "'Fredoka One', cursive",
        fontSize: "1.3rem",
        fontWeight: 900,
        pointerEvents: "none",
        zIndex: 10,
        whiteSpace: "nowrap",
        animation: "burstUp 0.9s ease-out forwards",
      }}
    >
      {burst.text}
    </div>
  );
}

export default function PlanetGame() {
  // Global States
  const [currentMission, setCurrentMission] = useState(1); 
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [levelScore, setLevelScore] = useState(0);
  const [target, setTarget] = useState(PLANETS[0]);
  const [cosmoMsg, setCosmoMsg] = useState("");
  const [bursts, setBursts] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [pendingLevel, setPendingLevel] = useState(null);

  // Engaging In-Game Flow States
  const [streak, setStreak] = useState(0);
  const [activeEvent, setActiveEvent] = useState(null); // 'wormhole', 'distraction', null
  const [distractors, setDistractors] = useState([]);

  // Mission 1: Space Rocket Tracking States
  const [trackingActive, setTrackingActive] = useState(false);
  const [rocketPos, setRocketPos] = useState({ x: 50, y: 50 });
  const [rocketAngle, setRocketAngle] = useState(0);
  const [objects, setObjects] = useState([]);

  // Mission 2: Saccadic Star Jumps States
  const [saccadeTarget, setSaccadeTarget] = useState({ x: 20, y: 50 });

  const arenaRef = useRef(null);
  const burstIdRef = useRef(0);
  const sparkleIdRef = useRef(0);

  const [stars] = useState(() =>
    Array.from({ length: 90 }, (_, i) => ({
      id: i,
      size: rand(0.5, 2.5),
      x: Math.random() * 100,
      y: Math.random() * 100,
      dur: rand(1.5, 4).toFixed(2),
      delay: rand(0, 2).toFixed(2),
    }))
  );

  const getNewTarget = useCallback((currentEmoji) => {
    const candidates = PLANETS.filter((p) => p.emoji !== currentEmoji);
    return pickRandom(candidates);
  }, []);

  // Initialize Missions Setup
  useEffect(() => {
    if (currentMission === 1) {
      const initialTarget = PLANETS[0];
      setTarget(initialTarget);
      setCosmoMsg("<b>Mission 1: Space Rocket Tracking</b><br/>Follow the moving Rocket smoothly with your eyes!");
      startRocketTracking(initialTarget.emoji, false);
    } else if (currentMission === 2) {
      setCosmoMsg("<b>Mission 2: Saccadic Star Jumps</b><br/>Shift your focus rapidly without moving your head!");
      generateSaccadePosition(true);
    }
    setActiveEvent(null);
    setDistractors([]);
  }, [currentMission]);

  // Dynamic Event Trigger Logic (Triggers random events mid-game based on score flow)
  const triggerMidGameEvent = (currentEventLevel) => {
    const roll = Math.random();
    if (roll < 0.4) {
      // 1. Space Wormhole Speed Booster Event
      setActiveEvent("wormhole");
      setCosmoMsg("<b style='color: #a855f7;'>⚠️ SPACE WORMHOLE DETECTED!</b><br/>Hyper-drive active! Tracking speeds increased!");
      setTimeout(() => {
        setActiveEvent(null);
        setCosmoMsg("Wormhole cleared. Speeds stabilized.");
      }, 3000);
    } else if (roll < 0.8) {
      // 2. Visual Distractor Rain Event (Practices Selective Attention)
      setActiveEvent("distraction");
      setCosmoMsg("<b style='color: #ef4444;'>☄️ ASTEROID INTERFERENCE!</b><br/>Ignore floating debris! Focus only on the target!");
      
      const debris = Array.from({ length: 4 }, (_, i) => ({
        id: `debris-${i}`,
        emoji: pickRandom(["🪨", "☄️"]),
        x: rand(10, 90),
        y: rand(10, 80),
        floatDur: rand(2, 3).toFixed(2)
      }));
      setDistractors(debris);

      setTimeout(() => {
        setDistractors([]);
        setActiveEvent(null);
      }, 4000);
    }
  };

  // Mission 1: Rocket Flight Simulation Engine
  const startRocketTracking = (targetEmoji, isWormholeActive) => {
    setTrackingActive(true);
    setObjects([]);
    let startTime = Date.now();
    // Wormhole makes flight significantly faster
    const speedMultiplier = isWormholeActive ? 4.5 : 2.5; 

    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      if (elapsed > 4.5) {
        clearInterval(interval);
        setTrackingActive(false);
        setObjects(generateObjects(level, targetEmoji));
        if (!isWormholeActive) {
          setCosmoMsg("The Rocket safely docked! Select the correct planet where it landed!");
        }
      } else {
        const x = 50 + Math.sin(elapsed * (speedMultiplier + 0.3)) * 38;
        const y = 50 + Math.cos(elapsed * speedMultiplier) * 32;
        
        const nextX = 50 + Math.sin((elapsed + 0.05) * (speedMultiplier + 0.3)) * 38;
        const nextY = 50 + Math.cos((elapsed + 0.05) * speedMultiplier) * 32;
        const angle = Math.atan2(nextY - y, nextX - x) * (180 / Math.PI) + 90;

        setRocketPos({ x, y });
        setRocketAngle(angle);
      }
    }, 16);
  };

  const generateSaccadePosition = (isLeft) => {
    setSaccadeTarget({
      x: isLeft ? rand(10, 25) : rand(75, 90),
      y: rand(15, 80),
      isLeft: isLeft
    });
  };

  const spawnBurst = (x, y, text, color) => {
    const id = burstIdRef.current++;
    setBursts((prev) => [...prev, { id, x, y, text, color }]);
    setTimeout(() => setBursts((prev) => prev.filter((b) => b.id !== id)), 950);
  };

  const spawnSparkles = (x, y) => {
    const emojis = ["✨", "⚡", "⭐", "🌟"];
    const newSp = Array.from({ length: 6 }, (_, i) => {
      const angle = (i / 6) * Math.PI * 2;
      const dist = rand(45, 85);
      const id = sparkleIdRef.current++;
      return {
        id, x, y,
        emoji: pickRandom(emojis),
        sx: Math.cos(angle) * dist + "px",
        sy: Math.sin(angle) * dist + "px",
        dur: rand(0.4, 0.8).toFixed(2),
        delay: "0",
      };
    });
    setSparkles((prev) => [...prev, ...newSp]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => !newSp.find((n) => n.id === s.id)));
    }, 1000);
  };

  const handleScoreMilestone = (addedScore, cx, cy) => {
    const currentStreak = streak + 1;
    setStreak(currentStreak);

    // Apply streak multiplier logic flow
    let finalScoreAddition = addedScore;
    if (currentStreak >= 3) {
      finalScoreAddition += 5;
      spawnBurst(cx, cy - 25, "COMBO 🔥", "#ff7a00");
    }

    const newScore = score + finalScoreAddition;
    const newLevelScore = levelScore + finalScoreAddition;
    const needed = level * 40;

    setScore(newScore);
    setLevelScore(newLevelScore);
    spawnBurst(cx, cy, `+${finalScoreAddition} ⭐`, "#00ffb3");
    spawnSparkles(cx, cy);

    // Mid-game event engine checker
    if (newLevelScore < needed && Math.random() < 0.5 && !activeEvent) {
      triggerMidGameEvent();
    }

    if (newLevelScore >= needed) {
      setPendingLevel(level + 1);
      setTimeout(() => setShowLevelUp(true), 300);
    } else {
      if (currentMission === 1) {
        const nextTarget = getNewTarget(target.emoji);
        setTarget(nextTarget);
        startRocketTracking(nextTarget.emoji, activeEvent === 'wormhole');
      }
    }
  };

  const handlePlanetClick = (obj) => {
    if (obj.disabled || trackingActive) return;
    const arenaRect = arenaRef.current?.getBoundingClientRect();
    if (!arenaRect) return;

    const cx = (obj.x / 100) * arenaRect.width;
    const cy = (obj.y / 100) * arenaRect.height;

    if (obj.emoji === target.emoji) {
      setCosmoMsg(pickRandom(COSMO_CORRECT));
      handleScoreMilestone(10, cx, cy);
    } else {
      setStreak(0); // Reset streak combo flow
      setScore((prev) => Math.max(0, prev - 5));
      spawnBurst(cx, cy, "-5 💔", "#ff4d6d");
      setCosmoMsg(pickRandom(COSMO_WRONG));
      setObjects((prev) =>
        prev.map((o) => (o.id === obj.id ? { ...o, disabled: true } : o))
      );
    }
  };

  const handleSaccadeClick = () => {
    const arenaRect = arenaRef.current?.getBoundingClientRect();
    if (!arenaRect) return;

    const cx = (saccadeTarget.x / 100) * arenaRect.width;
    const cy = (saccadeTarget.y / 100) * arenaRect.height;

    setCosmoMsg("Excellent shifting speed! Target hit!");
    handleScoreMilestone(10, cx, cy);
    generateSaccadePosition(!saccadeTarget.isLeft);
  };

  const handleDebrisClick = (e, d) => {
    e.stopPropagation();
    const arenaRect = arenaRef.current?.getBoundingClientRect();
    if (!arenaRect) return;

    const cx = (d.x / 100) * arenaRect.width;
    const cy = (d.y / 100) * arenaRect.height;

    setStreak(0);
    setScore((prev) => Math.max(0, prev - 5));
    spawnBurst(cx, cy, "-5 Debris 💥", "#ef4444");
    setDistractors(prev => prev.filter(item => item.id !== d.id));
  };

  const dismissLevelUp = () => {
    const nextLevel = pendingLevel;
    setLevel(nextLevel);
    setLevelScore(0);
    setStreak(0);
    setShowLevelUp(false);
    setActiveEvent(null);
    setDistractors([]);

    if (nextLevel === 2 && currentMission === 1) {
      setCurrentMission(2);
    } else {
      if (currentMission === 1) {
        const nextTarget = getNewTarget(target.emoji);
        setTarget(nextTarget);
        startRocketTracking(nextTarget.emoji, false);
      } else {
        generateSaccadePosition(true);
      }
      setCosmoMsg(`Level ${nextLevel}! Processing analytics.`);
    }
  };

  const needed = level * 40;
  const progress = Math.min(100, (levelScore / needed) * 100);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@600;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          background: #030108; font-family: 'Nunito', sans-serif; color: white; min-height: 100vh; overflow: hidden;
        }
        @keyframes twinkle { from { opacity: 0.1; transform: scale(0.8); } to { opacity: 1; transform: scale(1.2); } }
        @keyframes cosmo-bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes pulse-target { from { transform: scale(1); filter: drop-shadow(0 0 6px rgba(255,122,0,0.4)); } to { transform: scale(1.15); filter: drop-shadow(0 0 16px rgba(249,115,22,0.7)); } }
        @keyframes float { from { transform: translateY(0px) rotate(0deg); } to { transform: translateY(-8px) rotate(4deg); } }
        @keyframes burstUp { 0% { opacity: 1; transform: translateY(0) scale(1); } 100% { opacity: 0; transform: translateY(-70px) scale(1.5); } }
        @keyframes sparkleFly { 0% { opacity: 1; transform: translate(0,0) scale(1); } 100% { opacity: 0; transform: translate(var(--sx),var(--sy)) scale(0.3); } }
        @keyframes pop-in { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes engine-glow { 0%, 100% { opacity: 0.6; transform: translate(-50%, 20px) scaleY(1); } 50% { opacity: 1; transform: translate(-50%, 24px) scaleY(1.4); } }
        @keyframes portal-pulse { 0% { box-shadow: inset 0 0 20px #a855f7, 0 0 10px #a855f7; } 50% { box-shadow: inset 0 0 40px #a855f7, 0 0 30px #a855f7; } 100% { box-shadow: inset 0 0 20px #a855f7, 0 0 10px #a855f7; } }

        .planet-btn {
          position: absolute; background: none; border: none; cursor: pointer; font-size: 2.5rem; line-height: 1;
          animation: float var(--float-d) ease-in-out infinite alternate;
          filter: drop-shadow(0 0 4px rgba(255,255,255,0.15)); transition: transform 0.15s; z-index: 2; padding: 0;
        }
        .planet-btn:hover:not(:disabled) { transform: scale(1.3) rotate(8deg) !important; filter: drop-shadow(0 0 15px #ff7a00); }
        .planet-btn:disabled { filter: grayscale(1) opacity(0.18); cursor: default; }

        .saccade-star {
          position: absolute; background: none; border: none; cursor: pointer; font-size: 3rem; line-height: 1;
          z-index: 5; transition: transform 0.1s; animation: pulse-target 0.5s ease-in-out infinite alternate;
        }
        .saccade-star:active { transform: scale(0.7); }
        
        .mission-tab {
          padding: 5px 14px; font-size: 0.75rem; font-weight: 800; font-mono; border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04); border-radius: 20px; color: #a3a3a3; transition: all 0.3s; cursor: pointer;
        }
        .mission-tab.active { background: rgba(234,88,12,0.15); border-color: rgba(234,88,12,0.4); color: #ff7a00; }

        .rocket-engine-fire {
          position: absolute; left: 50%; bottom: 0; width: 12px; height: 18px;
          background: linear-gradient(to bottom, #ff7a00, #ff0055, transparent);
          border-bottom-left-radius: 50%; border-bottom-right-radius: 50%;
          animation: engine-glow 0.15s infinite; z-index: -1;
        }

        .wormhole-effect {
          position: absolute; inset: 0; border: 4px solid #a855f7; border-radius: 16px;
          pointer-events: none; z-index: 20; animation: portal-pulse 1.5s infinite; opacity: 0.7;
        }
      `}</style>

      {/* Background Starfields */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        {stars.map((s) => (
          <div key={s.id} style={{
            position: "absolute", width: s.size, height: s.size, borderRadius: "50%", background: "white", left: `${s.x}%`, top: `${s.y}%`,
            animation: `twinkle ${s.dur}s ease-in-out infinite alternate`, animationDelay: `${s.delay}s`,
          }} />
        ))}
        <div style={{ position: "fixed", width: 500, height: 500, background: activeEvent === 'wormhole' ? "rgba(168,85,247,0.08)" : "rgba(234,88,12,0.05)", borderRadius: "50%", filter: "blur(120px)", top: "25%", left: "35%", transition: "all 0.5s" }} />
      </div>

      {/* UI Root Layout Component */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100vh", padding: "16px", gap: "12px" }}>
        
        {/* Navigation Core Panel */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: "1.4rem", color: "white", letterSpacing: "-0.02em" }}>
            NAINOCULAR // <span style={{ color: "#ff7a00" }}>ACADEMY</span>
          </div>
          
          <div style={{ display: "flex", gap: "6px" }}>
            <button onClick={() => setCurrentMission(1)} className={`mission-tab ${currentMission === 1 ? 'active' : ''}`}>M1: Rocket Track</button>
            <button onClick={() => setCurrentMission(2)} className={`mission-tab ${currentMission === 2 ? 'active' : ''}`}>M2: Saccade Jumps</button>
          </div>

          <div style={{ display: "flex", gap: "6px", fontFamily: "monospace", fontSize: "0.85rem", fontWeight: "bold" }}>
            {streak >= 3 && <div style={{ background: "rgba(234,88,12,0.2)", border: "1px solid #ff7a00", color: "#ff7a00", borderRadius: "8px", padding: "4px 10px", animation: "pop-in 0.3s ease" }}>🔥 Combo x{streak}</div>}
            <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "4px 12px" }}>⭐ {score}</div>
            <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "4px 12px", color: "#ff7a00" }}>LVL {level}</div>
          </div>
        </div>

        {/* Cosmo Interactive Guidance Array */}
        <div style={{
          display: "flex", alignItems: "center", gap: "12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "12px", padding: "10px 14px", animation: "cosmo-bounce 3s ease-in-out infinite",
        }}>
          <div style={{ fontSize: "2rem" }}>👨‍🚀</div>
          <div style={{ fontSize: "0.88rem", color: "#e3e3e3", lineHeight: "1.4" }} dangerouslySetInnerHTML={{ __html: cosmoMsg }} />
        </div>

        {/* Target Indicator Information Row */}
        {currentMission === 1 ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(234,88,12,0.04)", border: "1px dashed rgba(234,88,12,0.25)", borderRadius: "12px", padding: "8px 14px" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: "bold", color: "#a3a3a3", fontFamily: "monospace" }}>TARGET VECTOR:</span>
            <span style={{ fontSize: "2.2rem", animation: "pulse-target 1s infinite alternate" }}>{target.emoji}</span>
            <span style={{ fontSize: "0.95rem", fontWeight: "bold", color: "white" }}>{target.name}</span>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(6,182,212,0.04)", border: "1px dashed rgba(6,182,212,0.25)", borderRadius: "12px", padding: "12px 14px" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: "bold", color: "#a3a3a3", fontFamily: "monospace" }}>EXERCISE PARAMS:</span>
            <span style={{ fontSize: "0.85rem", fontWeight: "bold", color: "#06b6d4" }}>Track shifting nodes with spatial eye movements rapidly!</span>
          </div>
        )}

        {/* Progression Progress Indicator Grid */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ fontSize: "0.75rem", color: "#737373", fontWeight: "bold", fontFamily: "monospace" }}>CALIBRATION PROGRESS</div>
          <div style={{ flex: 1, height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "20px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #ff7a00, #ffb800)", transition: "width 0.3s ease" }} />
          </div>
          <div style={{ fontSize: "0.8rem", color: "#ff7a00", fontWeight: "bold", fontFamily: "monospace" }}>{levelScore}/{needed}</div>
        </div>

        {/* Field Screen Canvas Frame */}
        <div
          ref={arenaRef}
          style={{
            flex: 1, position: "relative", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px",
            background: "radial-gradient(circle at 50% 50%, #080412 0%, #020106 100%)", overflow: "hidden",
          }}
        >
          {/* Wormhole visual overlay trigger */}
          {activeEvent === 'wormhole' && <div className="wormhole-effect" />}

          {/* Mission 1 Render Pipelines */}
          {currentMission === 1 && (
            <>
              {trackingActive && (
                <div
                  style={{
                    position: "absolute", left: `${rocketPos.x}%`, top: `${rocketPos.y}%`,
                    fontSize: "3.5rem", transform: `translate(-50%, -50%) rotate(${rocketAngle}deg)`, 
                    transition: "none", zIndex: 10, display: "inline-block"
                  }}
                >
                  🚀
                  <div className="rocket-engine-fire" />
                </div>
              )}

              {!trackingActive && objects.map((obj) => (
                <button
                  key={obj.id}
                  className="planet-btn"
                  disabled={obj.disabled}
                  onClick={() => handlePlanetClick(obj)}
                  style={{
                    left: `${obj.x}%`, top: `${obj.y}%`,
                    "--float-d": `${obj.floatDur}s`, animationDelay: `${obj.floatDelay}s`,
                  }}
                >
                  {obj.emoji}
                </button>
              ))}
            </>
          )}

          {/* Mission 2 Saccadic Rendering Framework */}
          {currentMission === 2 && (
            <button
              className="saccade-star"
              onClick={handleSaccadeClick}
              style={{ left: `${saccadeTarget.x}%`, top: `${saccadeTarget.y}%`, transform: "translate(-50%, -50%)" }}
            >
              🚀⭐
            </button>
          )}

          {/* Floating Obstacles/Distractors Event System */}
          {distractors.map((d) => (
            <button
              key={d.id}
              onClick={(e) => handleDebrisClick(e, d)}
              className="planet-btn"
              style={{
                left: `${d.x}%`, top: `${d.y}%`, fontSize: "2rem", zIndex: 15,
                "--float-d": `${d.floatDur}s`, animationDelay: "0s"
              }}
            >
              {d.emoji}
            </button>
          ))}

          {/* Floating Scores Feedback Texts */}
          {bursts.map((b) => <Burst key={b.id} burst={b} />)}

          {/* Sparkles Particle Renderings */}
          {sparkles.map((s) => (
            <div
              key={s.id}
              style={{
                position: "absolute", left: s.x, top: s.y, fontSize: "1.1rem", pointerEvents: "none", zIndex: 9,
                animation: `sparkleFly ${s.dur}s ease-out forwards`, "--sx": s.sx, "--sy": s.sy,
              }}
            >
              {s.emoji}
            </div>
          ))}
        </div>
      </div>

      {/* Global Level Up Overlay Modal */}
      {showLevelUp && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(5px)", display: "flex", alignItems: "center", justifyCenter: "center", justifyContent: "center"
        }}>
          <div style={{
            background: "#0a0518", border: "2px solid #ff7a00", borderRadius: "20px",
            padding: "32px 40px", textAlign: "center", animation: "pop-in 0.4s ease-out forwards",
            boxShadow: "0 0 40px rgba(234,88,12,0.25)", maxWidth: "340px", width: "100%",
          }}>
            <div style={{ fontSize: "3rem" }}>⚡🎉🛸</div>
            <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: "2.1rem", color: "#ff7a00", margin: "10px 0" }}>
              LEVEL UP!
            </div>
            <div style={{ fontSize: "0.95rem", color: "#cccccc", lineHeight: "1.5", marginBottom: "20px" }}>
              {pendingLevel === 2 && currentMission === 1
                ? "Smooth rocket trajectory pursuit verified! Activating Sector 2 parameters for Mission 2: Saccadic Shifting Jumps."
                : "Sensor focus limits established successfully. Calibrating advanced mapping quadrants."}
            </div>
            <button
              onClick={dismissLevelUp}
              style={{
                fontFamily: "'Fredoka One', cursive", fontSize: "1.1rem",
                background: "linear-gradient(90deg, #ff7a00, #ffb800)", color: "#0a0518",
                border: "none", borderRadius: "30px", padding: "10px 28px", cursor: "pointer", transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.06)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              Advance System Matrix! 🚀
            </button>
          </div>
        </div>
      )}
    </>
  );
}