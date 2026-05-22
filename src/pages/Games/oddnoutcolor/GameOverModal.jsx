import React from 'react';
import { RotateCcw, Trophy, Grid, ShieldAlert, LayoutDashboard, Gamepad2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GameOverModal = ({ score, level, accuracy, onRestart }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn p-4">
      {/* 💡 FLAT LIGHT CARD FRAME: Clean Kuku Kube / Manorama UI theme */}
      <div className="bg-[#f5f5f5] p-8 sm:p-10 rounded-[32px] shadow-[0_24px_60px_rgba(0,0,0,0.25)] border border-white/50 max-w-md w-full text-center">
        
        {/* Main Status Header */}
        <h2 className="text-4xl font-black text-red-600 tracking-tight mb-6">
          GAME OVER
        </h2>
        
        {/* 📊 Metrics Presentation Panels */}
        <div className="space-y-3 mb-6">
          
          {/* Final Score Block */}
          <div className="bg-neutral-200/50 p-4 rounded-2xl border border-black/[0.02] flex flex-col items-center justify-center">
            <span className="text-neutral-400 font-extrabold text-[11px] uppercase tracking-widest flex items-center gap-1.5 mb-1">
              <Trophy className="w-3.5 h-3.5 text-neutral-500" /> Final Score
            </span>
            <p className="text-4xl font-black text-neutral-900 tracking-tight">
              {score}
            </p>
          </div>
          
          {/* Grid Splitting Metrics Panel */}
          <div className="grid grid-cols-2 gap-3">
            
            {/* Grid Density Info */}
            <div className="bg-neutral-200/50 p-3.5 rounded-2xl border border-black/[0.02] flex flex-col items-center">
              <span className="text-neutral-400 font-extrabold text-[10px] uppercase tracking-widest flex items-center gap-1.5 mb-1">
                <Grid className="w-3 h-3 text-neutral-400" /> Max Grid
              </span>
              <p className="text-2xl font-black text-neutral-800 tracking-tight">
                {level}x{level}
              </p>
            </div>
            
            {/* Accuracy Metrics Panel */}
            <div className="bg-neutral-200/50 p-3.5 rounded-2xl border border-black/[0.02] flex flex-col items-center">
              <span className="text-neutral-400 font-extrabold text-[10px] uppercase tracking-widest flex items-center gap-1.5 mb-1">
                <ShieldAlert className="w-3 h-3 text-neutral-400" /> Accuracy
              </span>
              <p className="text-2xl font-black text-neutral-800 tracking-tight">
                {accuracy}%
              </p>
            </div>

          </div>

        </div>

        {/* 🛠️ ACTION BUTTONS CONTAINER */}
        <div className="space-y-2.5">
          {/* PRIMARY: TRY AGAIN BUTTON */}
          <button
            onClick={onRestart}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-3.5 px-6 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md text-sm tracking-wider uppercase flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4 stroke-[3]" /> Try Again
          </button>

          {/* SECONDARY SIDE-BY-SIDE NAVIGATION BUTTONS */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* DASHBOARD ROUTER BUTTON */}
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 text-xs tracking-wide uppercase flex items-center justify-center gap-1.5 shadow-sm"
            >
              <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
            </button>

            {/* GAMES SECTION ROUTER BUTTON */}
            <button
              onClick={() => navigate('/games')}
              className="w-full bg-white hover:bg-neutral-100 text-neutral-800 font-bold py-3 px-4 rounded-xl border border-neutral-300 transition-all duration-200 text-xs tracking-wide uppercase flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Gamepad2 className="w-3.5 h-3.5 text-neutral-600" /> More Games
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GameOverModal;