import React, { useState, useEffect } from "react";

const OddBoard = ({
  grid,
  difference,
  onCorrect,
  onWrong,
  isActive,
}) => {
  const total = grid * grid;

  const [oddIndex, setOddIndex] = useState(0);
  const [colorSetup, setColorSetup] = useState(null);

  const generateTrueSolidSpectrum = () => {
    const randomIndex = Math.floor(Math.random() * total);
    setOddIndex(randomIndex);

    // 🎨 Base random color
    const r = Math.floor(Math.random() * 140) + 50;
    const g = Math.floor(Math.random() * 140) + 50;
    const b = Math.floor(Math.random() * 140) + 50;

    const normalColor = `rgb(${r}, ${g}, ${b})`;

    // 🎯 Difference calibration
    const rgbOffset = Math.max(
      3,
      Math.floor(difference * 3.5)
    );

    const isBrighter = (r + g + b) / 3 < 128;

    const offsetDirection = isBrighter
      ? rgbOffset
      : -rgbOffset;

    const oddR = Math.min(
      255,
      Math.max(0, r + offsetDirection)
    );

    const oddG = Math.min(
      255,
      Math.max(0, g + offsetDirection)
    );

    const oddB = Math.min(
      255,
      Math.max(0, b + offsetDirection)
    );

    const oddColor = `rgb(${oddR}, ${oddG}, ${oddB})`;

    setColorSetup({
      normal: normalColor,
      odd: oddColor,
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
    className="grid gap-1.5 mx-auto"
    style={{
      gridTemplateColumns: `repeat(${grid}, 1fr)`,

      width:
        grid === 2
          ? "220px"
          : grid === 3
          ? "250px"
          : grid === 4
          ? "290px"
          : grid === 5
          ? "320px"
          : "340px",
    }}
  >
    {Array.from({ length: total }).map((_, index) => (
      <div
        key={index}
        onClick={() => handleTileSelection(index)}
        className="
          aspect-square
          rounded-lg
          cursor-pointer
          transition-transform
          duration-75
          active:scale-95
        "
        style={{
          backgroundColor:
            index === oddIndex
              ? colorSetup.odd
              : colorSetup.normal,
        }}
      />
    ))}
  </div>
);};


export default OddBoard;