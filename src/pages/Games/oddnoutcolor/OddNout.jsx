import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import InteractiveBackground from './InteractiveBackground';
import TimerBar from './TimerBar';
import OddBoard from './OddBoard';
import StartModal from './StartModal';
import GameOverModal from './GameOverModal';
import levels from './levels';

const OddNOut = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [accuracy, setAccuracy] = useState(100);
  const [correctClicks, setCorrectClicks] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  
  const [timeLeft, setTimeLeft] = useState(15);
  const [saving, setSaving] = useState(false);

  const gameDurationRef = useRef(0);
  const globalTimerRef = useRef(null);
  const countdownTimerRef = useRef(null);

  // Safely reading configurations directly from your levels.js file loop mapping
  const getCurrentLevelConfig = () => {
    const levelIndex = Math.min(score, levels.length - 1);
    return levels[levelIndex];
  };

  const currentGrid = getCurrentLevelConfig().grid;
  const currentDifference = getCurrentLevelConfig().maxDifference;

  useEffect(() => {
    if (gameStarted) {
      gameDurationRef.current = 0;
      setTimeLeft(15);

      globalTimerRef.current = setInterval(() => {
        gameDurationRef.current += 1;
      }, 1000);

      countdownTimerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0.1) {
            clearInterval(countdownTimerRef.current);
            handleTimeoutClosure();
            return 0;
          }
          return Number((prev - 0.1).toFixed(1));
        });
      }, 100);
    } else {
      clearInterval(globalTimerRef.current);
      clearInterval(countdownTimerRef.current);
    }

    return () => {
      clearInterval(globalTimerRef.current);
      clearInterval(countdownTimerRef.current);
    };
  }, [gameStarted]);

  const handleTimeoutClosure = () => {
    setGameStarted(false);
    saveGameToBackend(score, currentGrid, accuracy);
  };

  const saveGameToBackend = async (finalScore, finalLevel, finalAccuracy) => {
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const payload = {
        gameType: "odd-one-out",
        score: Number(finalScore),
        accuracy: Number(finalAccuracy),
        level: Number(finalLevel),
        duration: gameDurationRef.current || 15
      };

      await axios.post(
   `${import.meta.env.VITE_API_URL}/game/save`,
   payload,
   {
      headers: {
         Authorization:
         `Bearer ${token}`
      },
      withCredentials: true
   }
);
    } catch (err) {
      console.error("Telemetry sync failure:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleCorrect = () => {
    const updatedCorrect = correctClicks + 1;
    const updatedTotal = totalClicks + 1;
    
    setCorrectClicks(updatedCorrect);
    setTotalClicks(updatedTotal);
    setScore((prev) => prev + 1);
    setAccuracy(((updatedCorrect / updatedTotal) * 100).toFixed(1));
    setTimeLeft((prev) => Math.min(15, prev + 1.5)); // Rewarding precise visual match hits
  };

  const handleWrong = () => {
    const updatedTotal = totalClicks + 1;
    setTotalClicks(updatedTotal);
    setLives((prev) => {
      const currentLives = prev - 1;
      if (currentLives <= 0) {
        setGameStarted(false);
        saveGameToBackend(score, currentGrid, ((correctClicks / updatedTotal) * 100).toFixed(1));
      }
      return currentLives;
    });
    setAccuracy(((correctClicks / updatedTotal) * 100).toFixed(1));
  };

  const handleRestart = () => {
    setScore(0);
    setLives(3);
    setCorrectClicks(0);
    setTotalClicks(0);
    setAccuracy(100);
    setTimeLeft(15);
    setGameStarted(true);
  };

  return (
    <div className="min-h-screen bg-[#113a4c] text-neutral-800 flex items-center justify-center p-4 antialiased select-none">
      <InteractiveBackground />

      {!gameStarted && score === 0 && <StartModal onStart={() => setGameStarted(true)} />}

      {gameStarted && (
        <div className="bg-[#f5f5f5] rounded-[32px] p-6 sm:p-10 max-w-lg w-full text-center shadow-[0_30px_80px_rgba(0,0,0,0.4)] border border-white/60 mx-auto">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
            Find the Different Color!
          </h1>

          {/* 💡 FIXED: Render real dynamic timer tracks matching exact sync states */}
          <div className="mb-4 mt-2 flex flex-col items-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Time Vector Clock</span>
            <TimerBar timeLeft={timeLeft} />
          </div>

          <div className="mb-6">
            <h2 className="text-3xl font-black text-red-600 tracking-tight">
              Score: {score}
            </h2>
          </div>

          <div className="p-2 inline-block mx-auto rounded-2xl bg-neutral-200/40 border border-black/[0.02]">
            <OddBoard
              grid={currentGrid}
              difference={currentDifference} 
              onCorrect={handleCorrect}
              onWrong={handleWrong}
              isActive={lives > 0}
            />
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-300/50 flex items-center justify-center gap-6 text-xs font-bold text-neutral-400 uppercase tracking-wider">
            <span>Grid: <span className="text-neutral-800 font-extrabold">{currentGrid}x{currentGrid}</span></span>
            <span>Shields: <span className="text-neutral-800 font-extrabold">{lives} Left</span></span>
            <span>Accuracy: <span className="text-neutral-800 font-extrabold">{accuracy}%</span></span>
          </div>
        </div>
      )}

      {(lives <= 0 || (!gameStarted && totalClicks > 0)) && (
        <GameOverModal
          score={score}
          level={currentGrid}
          accuracy={accuracy}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default OddNOut;