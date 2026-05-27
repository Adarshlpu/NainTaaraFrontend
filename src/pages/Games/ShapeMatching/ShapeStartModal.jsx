import React from 'react';
import { Play, Clock, Eye, Sliders } from 'lucide-react';

// Relative path configured correctly according to your workspace images folder
import glassesPic from "../../../assets/glasses_anaglyph.png";

const ShapeStartModal = ({ onStart }) => {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-3 sm:p-4 select-none">
      
      {/* ==================== MAIN RESPONSIVE MODAL CONTAINER ==================== */}
      <div className="bg-white rounded-[28px] md:rounded-[32px] shadow-[0_32px_80px_rgba(15,23,42,0.18)] border border-slate-100 max-w-3xl w-full flex flex-col md:flex-row overflow-hidden relative max-h-[95vh] md:max-h-none overflow-y-auto md:overflow-visible">
        
        {/* Decorative background soft glow spots */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-red-100/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-100/20 rounded-full blur-2xl pointer-events-none" />

        {/* ==================== LEFT PANEL: IMAGE + MOBILE PLAY BUTTON ==================== */}
        <div className="w-full md:w-[45%] bg-slate-50 border-b md:border-b-0 md:border-r border-slate-100 p-4 sm:p-5 flex flex-col items-center justify-center relative shrink-0 gap-3">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]" />
          
          {/* Glasses Image Block */}
          <div className="w-full flex items-center justify-center relative z-10 p-1">
            <img 
              src={glassesPic} 
              alt="Therapy anaglyph spectacles" 
              className="w-full h-auto max-w-[140px] sm:max-w-[170px] md:max-w-[220px] object-contain drop-shadow-[0_8px_20px_rgba(15,23,42,0.1)] transition-transform duration-300 hover:scale-[1.02]" 
            />
          </div>

          {/* 📱 MOBILE EXCLUSIVE PLAY BUTTON (Right below image) */}
          <div className="relative w-full px-1 block md:hidden z-20 mt-1">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur-sm opacity-30" />
            <button
              onClick={onStart}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black py-3 px-4 rounded-xl transition-all shadow-md text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 relative h-11"
            >
              Let's Play ›
            </button>
          </div>

          {/* Bottom Reminder Text */}
          <div className="text-center space-y-0.5 relative z-10 mt-1">
            <span className="text-[9px] font-black text-slate-400 tracking-widest uppercase block">Therapy Glasses</span>
            <p className="text-[10px] text-slate-500 font-bold leading-normal max-w-[180px] sm:max-w-none">
              Please put on your therapy glasses before you start the game.
            </p>
          </div>
        </div>

        {/* ==================== RIGHT PANEL: DETAILED INSTRUCTIONS (SCALES ON MOBILE) ==================== */}
        {/* 💡 UPDATED: Now visible on both mobile and desktop with clean, compact spacing parameters */}
        <div className="flex-1 p-4 sm:p-6 md:p-7 flex flex-col justify-between text-left relative box-border gap-4">
          
          {/* Header Segment */}
          <div className="space-y-0.5">
            <div className="inline-flex items-center gap-1 bg-red-50 border border-red-100/60 px-2 py-0.5 rounded-full text-[8px] font-black text-red-500 uppercase tracking-wider">
              <Eye className="w-2.5 h-2.5" /> Naintaara Vision
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
              Shape Fusion Game
            </h1>
          </div>

          {/* Instruction Deck Matrix */}
          <div className="space-y-2.5 my-1">
            
            {/* Rule 1: Glasses Required */}
            <div className="flex items-center gap-3 p-2.5 bg-red-50/40 rounded-xl border border-red-100/40">
              <div className="w-7 h-7 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-red-500 shrink-0 text-sm">
                👓
              </div>
              <div className="space-y-px">
                <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-wide leading-none">Glasses Required</h3>
                <p className="text-[10px] sm:text-[11px] text-slate-500 font-bold leading-tight">
                  Wear <span className="text-red-500 font-black">Red/Blue glasses</span> to coordinate both fields properly.
                </p>
              </div>
            </div>

            {/* Rule 2: Daily Session Timer */}
            <div className="flex items-center gap-3 p-2.5 bg-amber-50/50 rounded-xl border border-amber-100/60">
              <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <div className="space-y-px">
                <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-wide leading-none">Daily Training Limit</h3>
                <p className="text-[10px] sm:text-[11px] text-slate-500 font-bold leading-tight">
                  Play for <span className="text-amber-700 font-black">10-15 minutes</span> to ensure effective brain adaptation.
                </p>
              </div>
            </div>

            {/* Rule 3: Target Overlapping */}
            <div className="flex items-center gap-3 p-2.5 bg-white rounded-xl border border-slate-100 shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
              <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 text-sm">
                🎯
              </div>
              <div className="space-y-px">
                <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-wide leading-none">Precision Overlay</h3>
                <p className="text-[10px] sm:text-[11px] text-slate-400 font-bold leading-tight">
                  Steer and overlap both half-arcs until they merge into a solid circle.
                </p>
              </div>
            </div>

          </div>

          {/* 🖥️ DESKTOP ONLY BOTTOM PLAY BUTTON (Hidden on Mobile view to avoid duplicates) */}
          <div className="relative px-0.5 w-full mt-1 shrink-0 hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur-sm opacity-30" />
            <button
              onClick={onStart}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black py-3 px-4 rounded-xl transition-all shadow-md text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 relative z-10 h-11"
            >
              Let's Play ›
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ShapeStartModal;