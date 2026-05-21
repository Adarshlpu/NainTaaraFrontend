import React, { useState, useEffect } from 'react';
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
 
  const currentLevel = levels[level - 1];
 
  useEffect(() => {
    if (gameStarted) {
      setStartTime(Date.now());
    }
  }, [level, gameStarted]);
 
  const handleCorrect = () => {
    const end = Date.now();
    const time = ((end - startTime) / 1000).toFixed(2);
    setReactionTime(time);
 
    let bonus = 0;
    if (time < 1) bonus = 10;
    else if (time < 2) bonus = 5;
    else if (time < 3) bonus = 2;
 
    setScore((prev) => prev + 10 + bonus);
 
    const updatedCorrect = correctClicks + 1;
    const updatedTotal = totalClicks + 1;
 
    setCorrectClicks(updatedCorrect);
    setTotalClicks(updatedTotal);
    setAccuracy(((updatedCorrect / updatedTotal) * 100).toFixed(1));
 
    if (updatedCorrect % 3 === 0) {
      setLevel((prev) => (prev < 25 ? prev + 1 : prev));
    }
 
    setStartTime(Date.now());
  };
 
  const handleWrong = () => {
    setScore((prev) => Math.max(prev - 5, 0));
    const newLives = lives - 1;
    setLives(newLives);
 
    const newTotal = totalClicks + 1;
    setTotalClicks(newTotal);
    setAccuracy(((correctClicks / newTotal) * 100).toFixed(1));
 
    if (newLives <= 0) {
      setGameStarted(false);
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
    setGameStarted(true);
  };
 
  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col relative overflow-hidden">
      <InteractiveBackground />
 
      {!gameStarted && <StartModal onStart={() => setGameStarted(true)} />}
 
      {gameStarted && (
        <>
          {/* FIXED SCORE BOARD AT TOP */}
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
 
          {/* MAIN GAME CONTENT */}
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 pt-32">
            <h1 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
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
 
          {lives <= 0 && (
            <GameOverModal
              score={score}
              level={level}
              accuracy={accuracy}
              onRestart={handleRestart}
            />
          )}
        </>
      )}
    </div>
  );
};
 
export default OddNOut;