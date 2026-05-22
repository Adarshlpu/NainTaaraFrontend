import React from 'react';

const ScorePanel = ({ score, lives, accuracy, level, reactionTime }) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 text-base md:text-lg bg-[#0a0f2e]/60 px-8 py-5 rounded-2xl border border-cyan-500/30 shadow-lg backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🏆</span>
        <span>Score: <span className="font-bold text-cyan-300">{score}</span></span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-2xl">❤️</span>
        <span>Lives: <span className={`font-bold ${lives > 1 ? 'text-green-300' : 'text-red-400'}`}>{lives}</span></span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-2xl">🎯</span>
        <span>Accuracy: <span className="font-bold text-blue-300">{accuracy}%</span></span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-2xl">⚡</span>
        <span className="font-bold text-yellow-300">{reactionTime}s</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-2xl">📈</span>
        <span>Level: <span className="font-bold text-purple-300">{level}</span></span>
      </div>
    </div>
  );
};

export default ScorePanel;