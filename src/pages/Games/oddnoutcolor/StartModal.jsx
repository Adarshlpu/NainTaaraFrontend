import React from 'react';
import { Play } from 'lucide-react';

const StartModal = ({ onStart }) => {
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn p-4 select-none">
      
      {/* 🌟 MAIN MODAL CONTAINER WITH CORNER ACCENTS AND GRADIENTS */}
      <div className="bg-white rounded-[32px] p-8 sm:p-10 shadow-[0_32px_80px_rgba(15,23,42,0.15)] border border-slate-100 max-w-xl w-full text-center relative overflow-hidden">
        
        {/* Soft Decorative Fluid Background Orbs (Top Right and Bottom Left) */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-100/40 rounded-full blur-3xl pointer-events-none" />
        
        {/* Decorative Grid Accent Dots on left/right boundaries */}
        <div className="absolute left-4 top-12 opacity-20 text-[10px] tracking-widest text-slate-400 font-mono hidden sm:block">•••••<br/>•••••<br/>•••••</div>
        <div className="absolute right-4 bottom-20 opacity-20 text-[10px] tracking-widest text-slate-400 font-mono hidden sm:block">•••••<br/>•••••<br/>•••••</div>

        {/* ==================== HEADER SEGMENT ==================== */}
        <div className="relative mb-8">
          <h1 className="text-5xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
            ODD <span className="text-[#ff6b35] font-black">N</span> OUT
          </h1>
          
          {/* Subtitle Telemetry Frame Decoration */}
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="w-6 h-[1.5px] bg-gradient-to-r from-transparent to-[#ff6b35]" />
            <p className="text-[#ff6b35] text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5">
              <span>👁️</span> Eye Perception Training Game <span>👁️</span>
            </p>
            <div className="w-6 h-[1.5px] bg-gradient-to-l from-transparent to-[#ff6b35]" />
          </div>
        </div>

        {/* ==================== 📋 RULE DETAILS CHECKLIST PACKS ==================== */}
        <div className="space-y-3.5 mb-8 relative">
          
          {/* Row 1: Spot The Difference (Orange Highlight Accent) */}
          <div className="flex items-center justify-between gap-4 p-4 bg-white rounded-2xl border-l-[3px] border-l-[#ff6b35] border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.01)] text-left">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                <span className="text-xl">👁️</span>
              </div>
              <div className="space-y-0.5">
                <h3 className="text-sm font-black text-slate-900">Spot The Difference</h3>
                <p className="text-xs text-slate-400 font-bold leading-normal">Find the block with a slightly lighter or darker solid shade texture.</p>
              </div>
            </div>
            {/* Visual Vector Blocks Clue */}
            <div className="hidden sm:flex items-center gap-1 shrink-0 bg-slate-50 p-2 rounded-xl border border-slate-100">
              <div className="w-4 h-4 bg-slate-300 rounded" />
              <div className="w-4 h-4 bg-slate-300 rounded" />
              <div className="w-4 h-4 bg-[#ff6b35] rounded shadow-sm shadow-orange-500/20" />
            </div>
          </div>

          {/* Row 2: Time Recovery Loop (Blue Highlight Accent) */}
          <div className="flex items-center justify-between gap-4 p-4 bg-white rounded-2xl border-l-[3px] border-l-blue-500 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.01)] text-left">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <span className="text-xl">⏱️</span>
              </div>
              <div className="space-y-0.5">
                <h3 className="text-sm font-black text-slate-900">Time Recovery Loop</h3>
                <p className="text-xs text-slate-400 font-bold leading-normal">You have 15s. Every correct click recovers time back to your clock.</p>
              </div>
            </div>
            {/* Speed Indicator Clock Vector Lines */}
            <div className="hidden sm:flex items-center justify-center w-12 h-10 shrink-0 opacity-80">
              <div className="w-6 h-6 rounded-full border-2 border-blue-400 border-t-transparent animate-spin duration-1000 relative flex items-center justify-center">
                <div className="w-1.5 h-[1.5px] bg-blue-500 absolute top-2 left-2 origin-left rotate-45" />
              </div>
            </div>
          </div>

          {/* Row 3: Adaptive Grid Flow (Green Highlight Accent) */}
          <div className="flex items-center justify-between gap-4 p-4 bg-white rounded-2xl border-l-[3px] border-l-emerald-500 border border-slate-100 shadow-[0_2px_8_rgba(0,0,0,0.01)] text-left">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                <span className="text-xl">📈</span>
              </div>
              <div className="space-y-0.5">
                <h3 className="text-sm font-black text-slate-900">Adaptive Grid Flow</h3>
                <p className="text-xs text-slate-400 font-bold leading-normal">Grid density smoothly scales from 2x2 up to 8x8 as your score grows.</p>
              </div>
            </div>
            {/* Micro Dot Matrix Grid Render */}
            <div className="hidden sm:grid grid-cols-4 gap-0.5 shrink-0 bg-emerald-50/60 p-1.5 rounded-lg">
              <div className="w-1.5 h-1.5 bg-emerald-300 rounded-sm" /><div className="w-1.5 h-1.5 bg-emerald-300 rounded-sm" /><div className="w-1.5 h-1.5 bg-emerald-300 rounded-sm" /><div className="w-1.5 h-1.5 bg-emerald-400 rounded-sm" />
              <div className="w-1.5 h-1.5 bg-emerald-300 rounded-sm" /><div className="w-1.5 h-1.5 bg-emerald-400 rounded-sm" /><div className="w-1.5 h-1.5 bg-emerald-400 rounded-sm" /><div className="w-1.5 h-1.5 bg-emerald-500 rounded-sm" />
            </div>
          </div>

          {/* Row 4: Shield Fail-Safes (Purple Highlight Accent) */}
          <div className="flex items-center justify-between gap-4 p-4 bg-white rounded-2xl border-l-[3px] border-l-purple-500 border border-slate-100 shadow-[0_2px_8_rgba(0,0,0,0.01)] text-left">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                <span className="text-xl">🛡️</span>
              </div>
              <div className="space-y-0.5">
                <h3 className="text-sm font-black text-slate-900">Shield Fail-Safes</h3>
                <p className="text-xs text-slate-400 font-bold leading-normal">3 standard life limits. Wrong selections drop your shields instantly.</p>
              </div>
            </div>
            {/* Soft Shield Emulation */}
            <div className="hidden sm:flex items-center justify-center text-xl shrink-0 bg-purple-50 w-8 h-8 rounded-full border border-purple-100">
              🔮
            </div>
          </div>

        </div>

        {/* ==================== 🚀 METALLIC RED-ORANGE LAUNCH CTA ACTION BUTTON ==================== */}
        <div className="relative group px-1">
          {/* Orange Backside Ray Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl blur-md opacity-40 group-hover:opacity-60 transition duration-300" />
          
          <button
            onClick={onStart}
            className="w-full bg-gradient-to-r from-[#ff6b35] to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-black py-4 px-6 rounded-2xl transition-all duration-200 transform active:scale-[0.98] shadow-md shadow-orange-500/10 text-base tracking-wider uppercase flex items-center justify-center gap-2 relative z-10"
          >
            <Play className="w-4 h-4 fill-white stroke-[3]" /> Start Game
          </button>
        </div>

      </div>
    </div>
  );
};

export default StartModal;