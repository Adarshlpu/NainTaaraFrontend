import React from 'react';


const ScorePanel = ({ score, lives, accuracy, level, reactionTime }) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 text-base md:text-lg bg-gradient-to-r from-[#1a1f3a] to-[#0f1427] px-8 py-5 rounded-3xl border border-cyan-500/40 shadow-2xl backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🏆</span>
        <span>Score: <span className="font-bold text-cyan-400">{score}</span></span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-2xl">❤️</span>
        <span>Lives: <span className={`font-bold ${lives > 1 ? 'text-green-400' : 'text-red-400'}`}>{lives}</span></span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-2xl">🎯</span>
        <span>Accuracy: <span className="font-bold text-blue-400">{accuracy}%</span></span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-2xl">⚡</span>
        <span className="font-bold text-yellow-400">{reactionTime}s</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-2xl">📈</span>
        <span>Level: <span className="font-bold text-purple-400">{level}</span></span>
      </div>
    </div>
  );
};


export default ScorePanel;