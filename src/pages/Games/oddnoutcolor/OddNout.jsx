import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import InteractiveBackground from './InteractiveBackground';
import ScorePanel from './ScorePanel';
import TimerBar from './TimerBar';
import OddBoard from './OddBoard';
import StartModal from './StartModal';
import GameOverModal from './GameOverModal';

const OddNOut = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [accuracy, setAccuracy] = useState(100);
  const [correctClicks, setCorrectClicks] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  
  // Pure Time Vector states setup
  const [timeLeft, setTimeLeft] = useState(15); // Standard 15 seconds ticking baseline block
  const [saving, setSaving] = useState(false);
  const [apiMessage, setApiMessage] = useState("");

  const gameDurationRef = useRef(0);
  const globalTimerRef = useRef(null);
  const countdownTimerRef = useRef(null);

  // Dynamic structural calculation grid boundaries based on ongoing score weights
  // This matches the exact responsive grid evolution of the classic reference template
  const getGridSize = () => {
    if (score < 2) return 2;   // 2x2
    if (score < 4) return 3;   // 3x3
    if (score < 8) return 4;   // 4x4
    if (score < 13) return 5;  // 5x5
    if (score < 20) return 6;  // 6x6
    if (score < 30) return 7;  // 7x7
    return 8;                  // 8x8 max adaptive layer boundary
  };

  // Dynamic Opacity/Alpha offset factor limits (Controls the exact color difference depth match)
  const getOpacityFactor = () => {
    // Score badhne ke sath odd box ki opacity normal box ke kareeb aati jayegi (Hard mode scaling)
    const baseFactor = Math.max(0.12, 0.65 - (score * 0.012));
    return Number(baseFactor.toFixed(3));
  };

  useEffect(() => {
    if (gameStarted) {
      gameDurationRef.current = 0;
      setTimeLeft(15); // Re-set baseline clock

      // Global session tracker ticker loops
      globalTimerRef.current = setInterval(() => {
        gameDurationRef.current += 1;
      }, 1000);

      // Decrementing active clock window intervals
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
    saveGameToBackend(score, getGridSize(), accuracy);
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

      const response = await axios.post(
        "http://localhost:5000/api/game/save",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setApiMessage("Session saved successfully");
      }
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
    
    // Smooth dynamic calibration mapping curves
    setAccuracy(((updatedCorrect / updatedTotal) * 100).toFixed(1));
    
    // 💡 REWARD EXTENSION: Correct clicks award +1s back to match time balance (capped at 15s)
    setTimeLeft((prev) => Math.min(15, prev + 1.2));
  };

  const handleWrong = () => {
    const updatedTotal = totalClicks + 1;
    setTotalClicks(updatedTotal);
    setLives((prev) => {
      const currentLives = prev - 1;
      if (currentLives <= 0) {
        setGameStarted(false);
        saveGameToBackend(score, getGridSize(), ((correctClicks / updatedTotal) * 100).toFixed(1));
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

  const progressPercentage = (timeLeft / 15) * 100;

  return (
    <div className="min-h-screen bg-[#113a4c] text-neutral-800 flex items-center justify-center p-4 antialiased select-none selection:bg-transparent">
      <InteractiveBackground />

      {!gameStarted && lives > 3 && <StartModal onStart={() => setGameStarted(true)} />}
      
      {/* Fallback configuration triggers auto initialize modal if fresh */}
      {!gameStarted && lives === 3 && score === 0 && (
        <StartModal onStart={() => setGameStarted(true)} />
      )}

      {gameStarted && (
        <div className="bg-[#f5f5f5] rounded-[32px] p-6 sm:p-10 max-w-lg w-full text-center shadow-[0_30px_80px_rgba(0,0,0,0.4)] border border-white/60 mx-auto">
          
          <h1 className="text-3xl font-black text-neutral-900 tracking-tight mb-2">
            Find the Different Color!
          </h1>

          {/* Manorama Standard Flat Timer Strip Elements */}
          <div className="mb-4 mt-2">
            <p className="text-[11px] font-extrabold text-neutral-400 uppercase tracking-widest mb-1">Time left</p>
            <div className="w-full max-w-[240px] mx-auto h-4 bg-neutral-300 rounded-full overflow-hidden p-[2.5px] shadow-inner">
              <div
                className="h-full rounded-full bg-red-500 transition-all duration-[90ms] linear"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Centered Large Red Counter Label */}
          <div className="mb-6">
            <h2 className="text-4xl font-black text-red-600 tracking-tight">
              Score: {score}
            </h2>
          </div>

          {/* Unified Matrix Grid Box Frame Wrapper */}
          <div className="p-2 inline-block mx-auto rounded-2xl bg-neutral-200/40 border border-black/[0.02]">
            <OddBoard
              grid={getGridSize()}
              difference={getOpacityFactor()} // 💡 Using Alpha/Opacity Factor dynamics natively
              onCorrect={handleCorrect}
              onWrong={handleWrong}
              isActive={lives > 0}
            />
          </div>

          {/* Diagnostic Subtitle Footnote Parameters */}
          <div className="mt-6 pt-4 border-t border-neutral-300/50 flex items-center justify-center gap-6 text-xs font-bold text-neutral-400 uppercase tracking-wider">
            <span>Grid: <span className="text-neutral-800 font-extrabold">{getGridSize()}x{getGridSize()}</span></span>
            <span>Shields: <span className="text-neutral-800 font-extrabold">{lives} Left</span></span>
            <span>Accuracy: <span className="text-neutral-800 font-extrabold">{accuracy}%</span></span>
          </div>

        </div>
      )}

      {lives <= 0 || (!gameStarted && totalClicks > 0) ? (
        <GameOverModal
          score={score}
          level={getGridSize()}
          accuracy={accuracy}
          onRestart={handleRestart}
        />
      ) : null}
    </div>
  );
};

export default OddNOut;