import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, ArrowRight, RefreshCcw } from "lucide-react";
import plateOneImg from "../../../assets/images/image.png";
import platenine from "../../../assets/images/i9.png";
import plateten from "../../../assets/images/i10.png";
import plateeleven from "../../../assets/images/i13.png";
// Mock Data Structure: Ishihara test plates data mapping
const TEST_PLATES = [
  { id: 1, expected: "8", img: plateOneImg}, // Plate showing number 8
  { id: 2, expected: "9", img: platenine }, // Standard registration check plate
  { id: 3, expected: "10", img: plateten },
  { id: 4, expected: "13", img: plateeleven }
];

const ColorTest = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [answersLog, setAnswersLog] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleNextSubmission = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Save answer data log safely
    const currentPlate = TEST_PLATES[currentStep];
    const isCorrect = inputValue.trim().toLowerCase() === currentPlate.expected.toLowerCase();
    
    const updatedLogs = [
      ...answersLog,
      { plateId: currentPlate.id, userResponse: inputValue, status: isCorrect }
    ];
    setAnswersLog(updatedLogs);

    // Track dynamic sequence states
    if (currentStep < TEST_PLATES.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setInputValue("");
    } else {
      setIsFinished(true);
    }
  };

  const handleRestartTest = () => {
    setCurrentStep(0);
    setInputValue("");
    setAnswersLog([]);
    setIsFinished(false);
  };

  // Calculate score values dynamically
  const correctCount = answersLog.filter((ans) => ans.status).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col items-center justify-center p-4 antialiased select-none">
      
      {/* MAIN LAYOUT BOX CONTAINER */}
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-[0_24px_70px_rgba(0,0,0,0.04)] max-w-2xl w-full p-6 sm:p-10 text-center relative box-border overflow-hidden">
        
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key="active-test-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              {/* 📊 STEP TIMELINE INDICATOR (Exactly matching screenshot tracks) */}
              <div className="relative flex items-center justify-between w-full px-4 max-w-md mx-auto mb-10">
                <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[2px] bg-slate-100 z-0" />
                {TEST_PLATES.map((_, idx) => (
                  <div key={idx} className="relative z-10 flex flex-col items-center gap-1.5">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Test</span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs transition-all duration-300 ${
                        idx === currentStep
                          ? "bg-black text-white ring-4 ring-slate-100 scale-110"
                          : idx < currentStep
                          ? "bg-slate-900 text-white"
                          : "bg-white border-2 border-slate-200 text-slate-400"
                      }`}
                    >
                      {idx + 1}
                    </div>
                  </div>
                ))}
              </div>

              {/* QUEST TEXT DESCRIPTION */}
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">What number can you see?</h2>
                <p className="text-slate-400 text-xs sm:text-sm font-semibold max-w-md mx-auto leading-normal">
                  Type the <span className="text-slate-900 font-bold">number</span> you see, if you can’t see a number, just type <span className="text-slate-900 font-bold">'X'</span> and <span className="text-slate-900 font-bold">press enter</span>.
                </p>
              </div>

              {/* CORE INTERACTIVE GRID SPACE */}
              <div className="grid md:grid-cols-2 gap-8 items-center justify-center max-w-lg mx-auto pt-4">
                
                {/* Ishihara Micro Circle Matrix Plate Image */}
                <div className="w-full flex items-center justify-center bg-slate-50/50 p-4 rounded-3xl border border-slate-100/60 aspect-square">
                  <img
                    src={TEST_PLATES[currentStep].img}
                    alt={`Color test grid vision circle plate ${currentStep + 1}`}
                    className="w-full h-full max-w-[190px] sm:max-w-[210px] object-contain drop-shadow-md select-none pointer-events-none"
                  />
                </div>

                {/* Secure Form Controls */}
                <form onSubmit={handleNextSubmission} className="flex flex-col gap-4 w-full text-left">
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Your Input</label>
                    <input
                      type="text"
                      maxLength={3}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="e.g. 8 or X"
                      className="w-full border-2 border-slate-200 hover:border-slate-300 focus:border-black rounded-2xl px-5 h-14 font-bold text-lg transition-all focus:outline-none bg-slate-50/30 focus:bg-white box-border text-center md:text-left"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="w-full h-14 bg-black hover:bg-slate-900 disabled:bg-slate-100 text-white disabled:text-slate-400 font-black rounded-2xl text-xs uppercase tracking-widest transition shadow-md disabled:shadow-none flex items-center justify-center gap-1.5 mt-2"
                  >
                    Enter <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </form>
              </div>
            </motion.div>
          ) : (
            /* ==================== SCREEN 2: RESULTS SCOREBOARD REPORT ==================== */
            <motion.div
              key="finished-summary-panel"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 max-w-md mx-auto"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto text-2xl shadow-sm">
                🎨
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Assessment Complete</h2>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">Naintaara Vision Metrics Log</p>
              </div>

              {/* Score Value Chip Frame */}
              <div className="p-5 rounded-3xl border border-slate-100 bg-slate-50/50 flex items-center justify-between gap-4">
                <div className="text-left space-y-0.5">
                  <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase block">Final Result Score</span>
                  <p className="text-lg font-black text-slate-900 leading-none">
                    {correctCount === TEST_PLATES.length ? "Perfect Vision Clarity" : "Mild Discrepancy Flagged"}
                  </p>
                </div>
                <div className="text-3xl font-black text-slate-900 bg-white shadow-sm border border-slate-100/60 rounded-2xl px-4 py-2 shrink-0">
                  {correctCount}/{TEST_PLATES.length}
                </div>
              </div>

              {/* Logs Checklist Packs Breakdown */}
              <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                {answersLog.map((ans, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100 shadow-[0_1px_2px_rgba(0,0,0,0.01)] text-xs">
                    <span className="font-bold text-slate-500">Plate #{ans.plateId} Validation Check</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-black text-slate-700 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">Ans: {ans.userResponse}</span>
                      {ans.status ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions Footer Trigger */}
              <button
                onClick={handleRestartTest}
                className="w-full h-13 border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-black rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition active:scale-[0.99] bg-white"
              >
                <RefreshCcw className="w-3.5 h-3.5 stroke-[2.5]" /> Test Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default ColorTest;