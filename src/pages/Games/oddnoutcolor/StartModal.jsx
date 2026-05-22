import React from 'react';
import { Play, Eye, Timer, TrendingUp, ShieldCheck } from 'lucide-react';

const StartModal = ({ onStart }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn p-4">
      {/* 💡 FLAT CLEAN MINIMAL CONTAINER: Matches the new white card layout theme exactly */}
      <div className="bg-[#f5f5f5] p-8 sm:p-10 rounded-[32px] shadow-[0_24px_60px_rgba(0,0,0,0.25)] border border-white/50 max-w-md w-full text-center">
        
        {/* Title & Brand Label */}
        <h1 className="text-4xl font-black text-neutral-900 tracking-tight mb-2">
          ODD N OUT
        </h1>
        <p className="text-red-600 text-sm font-black uppercase tracking-widest mb-8">
          Eye Perception Training Game
        </p>
        
        {/* 📋 Flat Elegant Rule Checklist */}
        <div className="space-y-4 mb-8 text-left bg-neutral-200/40 p-5 rounded-2xl border border-black/[0.02]">
          
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-neutral-900/5 border border-black/5 flex items-center justify-center shrink-0">
              <Eye className="w-4 h-4 text-neutral-700" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-neutral-800 leading-none mt-1">Spot The Difference</p>
              <p className="text-xs text-neutral-500 font-medium mt-0.5">Find the block with a slightly lighter or darker solid shade texture.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-neutral-900/5 border border-black/5 flex items-center justify-center shrink-0">
              <Timer className="w-4 h-4 text-neutral-700" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-neutral-800 leading-none mt-1">Time Recovery Loop</p>
              <p className="text-xs text-neutral-500 font-medium mt-0.5">You have 15s. Every correct click recovers time back to your clock.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-neutral-900/5 border border-black/5 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4 text-neutral-700" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-neutral-800 leading-none mt-1">Adaptive Grid Flow</p>
              <p className="text-xs text-neutral-500 font-medium mt-0.5">Grid density smoothly scales from 2x2 up to 8x8 as your score grows.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-neutral-900/5 border border-black/5 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-neutral-700" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-neutral-800 leading-none mt-1">Shield Fail-Safes</p>
              <p className="text-xs text-neutral-500 font-medium mt-0.5">3 standard life limits. Wrong selections drop your shields instantly.</p>
            </div>
          </div>

        </div>

        {/* 🚀 SOLID RED CTA LAUNCH BUTTON */}
        <button
          onClick={onStart}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 px-6 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md text-base tracking-wider uppercase flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4 fill-white stroke-[3]" /> Start Game
        </button>

      </div>
    </div>
  );
};

export default StartModal;