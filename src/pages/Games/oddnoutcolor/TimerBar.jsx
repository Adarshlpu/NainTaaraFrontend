import React, { useState, useEffect } from 'react';

const TimerBar = ({ duration, isActive }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    setProgress(100);
    if (!isActive) return;

    // Fluid updates running at 60fps refresh limits (16.67ms tick loops)
    const totalDurationMs = duration * 1000;
    const tickIntervalMs = 16.67;
    const decrementPerTick = (tickIntervalMs / totalDurationMs) * 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - decrementPerTick;
      });
    }, tickIntervalMs);

    return () => clearInterval(interval);
  }, [duration, isActive]);

  // Dynamic status colors config based on time parameters left
  const getProgressColor = () => {
    if (progress > 55) return "from-emerald-400 to-cyan-500 shadow-cyan-500/10";
    if (progress > 25) return "from-amber-400 to-orange-500 shadow-orange-500/10";
    return "from-red-500 to-rose-600 shadow-rose-500/20";
  };

  return (
    <div className="w-full max-w-[460px] h-3 bg-neutral-950/60 rounded-full mt-4 overflow-hidden border border-neutral-800/80 p-[2px] shadow-inner">
      <div
        className={`h-full rounded-full transition-all duration-[16ms] linear bg-gradient-to-r shadow-md ${getProgressColor()}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default TimerBar;