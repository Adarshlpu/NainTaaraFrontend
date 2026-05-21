import React from 'react';


const StartModal = ({ onStart }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-gradient-to-br from-[#1a1f3a] to-[#0f1427] p-12 rounded-3xl border-2 border-cyan-500/50 shadow-2xl max-w-lg w-full mx-4 animate-scaleIn text-center">
        <h1 className="text-6xl font-black mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          ODD N OUT
        </h1>
        <p className="text-cyan-300 text-lg mb-8">Find the odd one out!</p>
        
        <div className="space-y-4 mb-10 text-left">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎯</span>
            <p className="text-gray-300">Identify the color that's slightly different</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">⏱️</span>
            <p className="text-gray-300">Race against the timer</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">📈</span>
            <p className="text-gray-300">3 correct clicks = next level</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">❤️</span>
            <p className="text-gray-300">3 lives - don't miss!</p>
          </div>
        </div>
 
        <button
          onClick={onStart}
          className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl text-xl animate-pulse"
        >
          ▶️ PLAY GAME
        </button>
      </div>
    </div>
  );
};

export default StartModal;