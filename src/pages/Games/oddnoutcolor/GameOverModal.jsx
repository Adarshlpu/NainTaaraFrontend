import React from 'react';   
const GameOverModal = ({ score, level, accuracy, onRestart }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-gradient-to-br from-[#1a1f3a] to-[#0f1427] p-10 rounded-3xl border-2 border-red-500/50 shadow-2xl max-w-md w-full mx-4 animate-scaleIn">
        <div className="text-center">
          <h2 className="text-5xl font-black mb-4 text-red-500">GAME OVER!</h2>
          <div className="space-y-4 text-lg mb-8">
            <div className="bg-black/40 p-4 rounded-xl">
              <p className="text-gray-400">Final Score</p>
              <p className="text-4xl font-bold text-cyan-400">{score}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/40 p-3 rounded-xl">
                <p className="text-gray-400 text-sm">Level Reached</p>
                <p className="text-3xl font-bold text-purple-400">{level}</p>
              </div>
              <div className="bg-black/40 p-3 rounded-xl">
                <p className="text-gray-400 text-sm">Accuracy</p>
                <p className="text-3xl font-bold text-blue-400">{accuracy}%</p>
              </div>
            </div>
          </div>
          <button
            onClick={onRestart}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl text-lg"
          >
            🔄 Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;