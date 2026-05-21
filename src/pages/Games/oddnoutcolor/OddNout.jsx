// src/pages/Games/oddnoutcolor/oddnout.jsx

import { useEffect, useState } from "react";
import OddBoard from "./OddBoard";
import ScorePanel from "./ScorePanel";
import TimerBar from "./TimerBar";
import { levels } from "./levels";

const OddNOut = () => {
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
    setStartTime(Date.now());
  }, [level]);

  const calculateAccuracy = (correct, total) => {
    return ((correct / total) * 100).toFixed(1);
  };

  const handleCorrect = () => {
    const end = Date.now();

    const time = ((end - startTime) / 1000).toFixed(2);

    setReactionTime(time);

    let bonus = 0;

    if (time < 1) bonus = 10;
    else if (time < 2) bonus = 5;
    else if (time < 3) bonus = 2;

    setScore((prev) => prev + 10 + bonus);

    const newCorrect = correctClicks + 1;
    const newTotal = totalClicks + 1;

    setCorrectClicks(newCorrect);
    setTotalClicks(newTotal);

    setAccuracy(calculateAccuracy(newCorrect, newTotal));

    if (newCorrect % 3 === 0) {
      setLevel((prev) => Math.min(prev + 1, 25));
    }

    setStartTime(Date.now());
  };

  const handleWrong = () => {
    setScore((prev) => Math.max(prev - 5, 0));

    setLives((prev) => prev - 1);

    const newTotal = totalClicks + 1;

    setTotalClicks(newTotal);

    setAccuracy(calculateAccuracy(correctClicks, newTotal));
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-5xl font-bold mb-6 text-cyan-400">
        Odd N Out
      </h1>

      <ScorePanel
        score={score}
        lives={lives}
        accuracy={accuracy}
        level={level}
        reactionTime={reactionTime}
      />

      <TimerBar duration={currentLevel.timer} />

      <OddBoard
        grid={currentLevel.grid}
        difference={currentLevel.difference}
        onCorrect={handleCorrect}
        onWrong={handleWrong}
      />

      {lives <= 0 && (
        <div className="mt-8 text-center">
          <h2 className="text-4xl text-red-500 font-bold">
            Game Over
          </h2>

          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-cyan-500 px-6 py-3 rounded-xl"
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default OddNOut;