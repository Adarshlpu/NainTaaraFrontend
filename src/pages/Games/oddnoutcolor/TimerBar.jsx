import React from 'react';

const TimerBar = ({ timeLeft }) => {
  // Parsing standard percentage base scale against 15 seconds clock bounds
  const percentage = (timeLeft / 15) * 100;

  const getProgressColor = () => {
    if (percentage > 50) return "from-emerald-400 to-cyan-500";
    if (percentage > 25) return "from-amber-400 to-orange-500";
    return "from-red-500 to-rose-600";
  };

  return (
    <div className="w-full min-w-[240px] max-w-[280px] h-3.5 bg-neutral-200 rounded-full overflow-hidden p-[2px] shadow-inner border border-black/5">
      <div
        className={`h-full rounded-full bg-gradient-to-r transition-all duration-100 ease-linear ${getProgressColor()}`}
        style={{ width: `${Math.max(0, Math.min(100, percentage))}%` }}
      />
    </div>
  );
};

export default TimerBar;