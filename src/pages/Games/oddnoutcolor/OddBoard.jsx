import React, { useState, useEffect } from "react";

const OddBoard = ({ grid, difference, onCorrect, onWrong, isActive }) => {
  const total = grid * grid;
  const [oddIndex, setOddIndex] = useState(0);
  const [colorSetup, setColorSetup] = useState(null);

  const generateTrueSolidSpectrum = () => {
    const randomIndex = Math.floor(Math.random() * total);
    setOddIndex(randomIndex);

    // 1. Base RGB parameters create kiye (Extremes ko block kiya taaki color screen par fatte na)
    const r = Math.floor(Math.random() * 140) + 50; 
    const g = Math.floor(Math.random() * 140) + 50;
    const b = Math.floor(Math.random() * 140) + 50;

    const normalColor = `rgb(${r}, ${g}, ${b})`;

    // 🌟 THE TRUE KUKU-KUBE FORMULA: Linear RGB Color Offset Delta
    // Difference value frontend (`OddNOut.jsx`) se aa rahi hai. 
    // Manorama Online ke standards ke mutabik hum base color constants mein micro adjustments plus karenge.
    // Isse odd box bilkul solid dikhega, koi transparency ya white feekapan nahi aayega!
    
    // Score ke hisab se scaling shift controls
    // Level 1-5 par factor bada hoga taaki dabba thoda dikhe, higher scores par ekdum tight ho jayega
    const rgbOffset = Math.max(4, Math.floor(difference * 45)); 

    const isBrighter = (r + g + b) / 3 < 128;
    const offsetDirection = isBrighter ? rgbOffset : -rgbOffset;

    // Direct solid numbers offset mapping without alpha breaking
    const oddR = Math.min(255, Math.max(0, r + offsetDirection));
    const oddG = Math.min(255, Math.max(0, g + offsetDirection));
    const oddB = Math.min(255, Math.max(0, b + offsetDirection));

    const oddColor = `rgb(${oddR}, ${oddG}, ${oddB})`;

    setColorSetup({
      normal: normalColor,
      odd: oddColor
    });
  };

  useEffect(() => {
    generateTrueSolidSpectrum();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid, difference]);

  const handleTileSelection = (index) => {
    if (!isActive) return;

    if (index === oddIndex) {
      onCorrect();
      generateTrueSolidSpectrum();
    } else {
      onWrong();
    }
  };

  if (!colorSetup) return null;

  return (
    <div
      className="grid gap-1.5 sm:gap-2 justify-center items-center mx-auto"
      style={{
        gridTemplateColumns: `repeat(${grid}, minmax(0, 1fr))`,
        width: grid <= 3 ? "260px" : grid <= 5 ? "350px" : "410px",
        maxWidth: "100%",
      }}
    >
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          onClick={() => handleTileSelection(index)}
          className="aspect-square w-full rounded-lg sm:rounded-xl cursor-pointer transition-transform duration-75 active:scale-95 border border-black/[0.04]"
          style={{
            backgroundColor: index === oddIndex ? colorSetup.odd : colorSetup.normal,
            boxShadow: "0 1.5px 3px rgba(0,0,0,0.06)",
          }}
        />
      ))}
    </div>
  );
};

export default OddBoard;