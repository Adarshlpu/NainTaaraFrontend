import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import InteractiveBackground from './InteractiveBackground';
import ScorePanel from './ScorePanel';
import TimerBar from './TimerBar';
import OddBoard from './OddBoard';
import StartModal from './StartModal';
import GameOverModal from './GameOverModal';
import levels from "./levels";

const OddNOut = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [correctClicks, setCorrectClicks] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [startTime, setStartTime] = useState(Date.now());
  const [reactionTime, setReactionTime] = useState(0);
  
  // 💡 BACKEND STATE TRACKING: To sync dynamic values safely
  const [saving, setSaving] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  
  // Ref pointers to capture session time vectors
  const gameDurationRef = useRef(0);
  const timerIntervalRef = useRef(null);

  const currentLevel = levels[level - 1];

  // Tracking dynamic gameplay length in seconds
  useEffect(() => {
    if (gameStarted) {
      gameDurationRef.current = 0;
      setStartTime(Date.now());
      
      timerIntervalRef.current = setInterval(() => {
        gameDurationRef.current += 1;
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [gameStarted]);

  useEffect(() => {
    if (gameStarted) {
      setStartTime(Date.now());
    }
  }, [level, gameStarted]);

  // 🌟 BACKEND PIPELINE CALL: Invoked automatically when user drops all 3 lives
  const saveGameToBackend = async (finalScore, finalLevel, finalAccuracy) => {
    setSaving(true);
    setApiMessage("");
    try {
      const token = localStorage.getItem("token"); // Fetching credentials verified from login
      
      if (!token) {
        console.error("Authentication token not found in localStorage.");
        setApiMessage("Error: Login required to sync rewards");
        setSaving(false);
        return;
      }

      const payload = {
        gameType: "odd-one-out",
        score: Number(finalScore),
        accuracy: Number(finalAccuracy),
        level: Number(finalLevel),
        duration: gameDurationRef.current || 30 // Fallback session timing limit block
      };

      console.log("Syncing performance metrics payload:", payload);

      const response = await axios.post(
        "http://localhost:5000/api/game/save",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setApiMessage("🎉 Session saved! Coins synced.");
      }
    } catch (err) {
      console.error("Backend transmission crash logs:", err);
      setApiMessage(err.response?.data?.message || "Failed to sync visual performance matrix");
    } finally {
      setSaving(false);
    }
  };

  const handleCorrect = () => {
    const end = Date.now();
    const time = ((end - startTime) / 1000).toFixed(2);
    setReactionTime(time);

    let bonus = 0;
    if (time < 1) bonus = 10;
    else if (time < 2) bonus = 5;
    else if (time < 3) bonus = 2;

    const newScore = score + 10 + bonus;
    setScore(newScore);

    const updatedCorrect = correctClicks + 1;
    const updatedTotal = totalClicks + 1;

    setCorrectClicks(updatedCorrect);
    setTotalClicks(updatedTotal);
    
    const nextAccuracy = ((updatedCorrect / updatedTotal) * 100).toFixed(1);
    setAccuracy(nextAccuracy);

    if (updatedCorrect % 3 === 0) {
      setLevel((prev) => (prev < 25 ? prev + 1 : prev));
    }

    setStartTime(Date.now());
  };

  const handleWrong = () => {
    const newScore = Math.max(score - 5, 0);
    setScore(newScore);
    
    const newLives = lives - 1;
    setLives(newLives);

    const newTotal = totalClicks + 1;
    setTotalClicks(newTotal);
    
    const nextAccuracy = ((correctClicks / newTotal) * 100).toFixed(1);
    setAccuracy(nextAccuracy);

    if (newLives <= 0) {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      setGameStarted(false);
      // 💡 CALL BACKEND PIPELINE: Immediately pass exact current parameters
      saveGameToBackend(newScore, level, nextAccuracy);
    }
  };

  const handleRestart = () => {
    setLevel(1);
    setScore(0);
    setLives(3);
    setCorrectClicks(0);
    setTotalClicks(0);
    setAccuracy(100);
    setReactionTime(0);
    setStartTime(Date.now());
    setApiMessage("");
    setGameStarted(true);
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col relative overflow-hidden">
      <InteractiveBackground />

      {!gameStarted && lives > 0 && <StartModal onStart={() => setGameStarted(true)} />}

      {gameStarted && (
        <>
          {/* SCORE BOARD */}
          <div className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-[#050816]/95 to-transparent backdrop-blur-md pt-4 pb-6 px-4">
            <div className="flex justify-center">
              <ScorePanel
                score={score}
                lives={lives}
                accuracy={accuracy}
                level={level}
                reactionTime={reactionTime}
              />
            </div>
          </div>

          {/* MAIN GAME INTERACTIVE MATRIX */}
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 pt-32">
            <h1 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
              ODD N OUT
            </h1>

            {currentLevel && <TimerBar duration={currentLevel.timer} isActive={lives > 0} />}

            {currentLevel && (
              <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-[#1a1f3a]/40 to-[#0f1427]/40 backdrop-blur-sm border border-cyan-500/20 shadow-2xl">
                <OddBoard
                  grid={currentLevel.grid}
                  difference={currentLevel.difference}
                  onCorrect={handleCorrect}
                  onWrong={handleWrong}
                  isActive={lives > 0}
                />
              </div>
            )}
          </div>
        </>
      )}

      {/* GAME OVER LAYER INTERFACE */}
      {lives <= 0 && (
        <div className="relative z-50">
          <GameOverModal
            score={score}
            level={level}
            accuracy={accuracy}
            onRestart={handleRestart}
          />
          {/* Subtle Dynamic API Network status text badge */}
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 glass-card-dark text-xs font-semibold px-4 py-2 rounded-xl border border-cyan-500/20 text-center text-neutral-300 pointer-events-none shadow-xl z-50">
            {saving ? (
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                Syncing eye metrics database...
              </span>
            ) : (
              <span>{apiMessage || "Database synchronization complete"}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OddNOut;