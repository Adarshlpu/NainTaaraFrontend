import React from 'react';
import { Play, Clock, Eye, Sliders } from 'lucide-react';

// Relative path configured correctly according to your workspace images folder
import glassesPic from "../../../assets/glasses_anaglyph.png";

const ShapeStartModal = ({ onStart }) => {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4 select-none">
      
      {/* ==================== MAIN RESPONSIVE MODAL CONTAINER ==================== */}
      <div className="bg-white rounded-[32px] shadow-[0_32px_80px_rgba(15,23,42,0.18)] border border-slate-100 max-w-3xl w-full flex flex-col md:flex-row overflow-hidden relative min-h-[460px]">
        
        {/* Decorative background soft glow spots */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-red-100/30 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-100/30 rounded-full blur-2xl pointer-events-none" />

        {/* ==================== LEFT PANEL: GLASSES IMAGE DISPLAY ==================== */}
        <div className="w-full md:w-[48%] bg-slate-50 border-b md:border-b-0 md:border-r border-slate-100 p-6 flex flex-col items-center justify-center relative min-h-[240px] md:min-h-0">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]" />
          
          {/* BIGGER IMAGE LOOK */}
          <div className="w-full flex items-center justify-center relative z-10 p-2 sm:p-4">
            <img 
              src={glassesPic} 
              alt="Therapy anaglyph spectacles" 
              className="w-full h-auto max-w-[260px] sm:max-w-[280px] object-contain drop-shadow-[0_10px_25px_rgba(15,23,42,0.12)] transition-transform duration-300 hover:scale-[1.03]" 
            />
          </div>

          <div className="text-center mt-4 space-y-1 max-w-[220px] relative z-10">
            <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase block">Therapy Glasses</span>
            <p className="text-[11px] text-slate-500 font-bold leading-relaxed">
              Please put on your therapy glasses before you start the game.
            </p>
          </div>
        </div>

        {/* ==================== RIGHT PANEL: SIMPLE ENGLISH INSTRUCTIONS ==================== */}
        <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between text-left relative box-border">
          
          {/* Header Segment */}
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-red-50 border border-red-100/60 px-2.5 py-0.5 rounded-full text-[9px] font-black text-red-500 uppercase tracking-wider">
              <Eye className="w-3 h-3" /> Naintaara Eye Exercise
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Shape Fusion Game
            </h1>
            <p className="text-slate-400 text-xs font-semibold">
              Exercises designed to train and improve your eye coordination.
            </p>
          </div>

          {/* Simple Instruction Deck */}
          <div className="space-y-3.5 my-5">
            
            {/* Rule 1: Wear Glasses Mandatory Notice */}
            <div className="flex items-start gap-3.5 p-3.5 bg-red-50/40 rounded-2xl border border-red-100/40 shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
              <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500 shrink-0 text-base">
                👓
              </div>
              <div className="space-y-0.5">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wide">Wearing Glasses is Required</h3>
                <p className="text-[11px] text-slate-500 font-bold leading-normal">
                  You must wear your <span className="text-red-500 font-black">Red / Blue therapy glasses</span> before playing, otherwise the training will not work.
                </p>
              </div>
            </div>

            {/* Rule 2: Game Duration Limit */}
            <div className="flex items-start gap-3.5 p-3.5 bg-amber-50/50 rounded-2xl border border-amber-100/60 shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                <Clock className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wide">How long should you play?</h3>
                <p className="text-[11px] text-slate-500 font-bold leading-normal">
                  Play this game for only <span className="text-amber-700 font-black">10 to 15 minutes daily</span>. Playing for too long can cause mild temporary eye fatigue.
                </p>
              </div>
            </div>

            {/* Rule 3: How to play */}
            <div className="flex items-start gap-3.5 p-3.5 bg-white rounded-2xl border border-slate-100 shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
              <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 text-base">
                🎯
              </div>
              <div className="space-y-0.5">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wide">How to play?</h3>
                <p className="text-[11px] text-slate-400 font-bold leading-normal">
                  Use the arrow keys to move the colored shape. Align it perfectly right over the static shape to fuse them together.
                </p>
              </div>
            </div>

          </div>

          {/* Action Trigger Play Button */}
          <div className="relative px-0.5 mt-1">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur-sm opacity-30" />
            <button
              onClick={onStart}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black py-3.5 px-6 rounded-xl transition-all shadow-md text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 relative z-10"
            >
              Glasses are on, let's play ›
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ShapeStartModal;