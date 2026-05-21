import React, { useState, useEffect } from "react";

const InteractiveBackground = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
 
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
 
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
 
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-[#050816] via-[#0a0f2e] to-[#050816]">
      {/* Animated gradient orbs - CYAN/BLUE */}
      <div
        className="absolute w-96 h-96 bg-gradient-to-r from-cyan-500/30 to-blue-500/20 rounded-full blur-3xl"
        style={{
          left: "10%",
          top: "20%",
          animation: "float 8s ease-in-out infinite",
        }}
      />
      {/* Animated gradient orbs - PURPLE/PINK */}
      <div
        className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/25 to-pink-500/15 rounded-full blur-3xl"
        style={{
          right: "10%",
          bottom: "20%",
          animation: "float 10s ease-in-out infinite 2s",
        }}
      />
      {/* Mouse tracking orb */}
      <div
        className="absolute w-72 h-72 bg-gradient-to-r from-blue-500/20 to-cyan-500/10 rounded-full blur-3xl"
        style={{
          left: `${mousePos.x * 0.1}px`,
          top: `${mousePos.y * 0.1}px`,
          transition: "all 0.3s ease-out",
        }}
      />
 
      {/* Animated grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="url(#gridGradient)" strokeWidth="1" />
          </pattern>
          <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
 
      {/* Radial light effect */}
      <div
        className="absolute w-96 h-96 bg-radial-gradient opacity-20"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
 
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(40px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default InteractiveBackground;