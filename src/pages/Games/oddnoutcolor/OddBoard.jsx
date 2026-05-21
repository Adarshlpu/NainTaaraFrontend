import React, { useState, useEffect } from "react";

const OddBoard = ({ grid, difference, onCorrect, onWrong, isActive }) => {
  const total = grid * grid;
  const [oddIndex, setOddIndex] = useState(0);
  const [theme, setTheme] = useState(null);
 
  const themes = [
    {
      normal: `rgb(40,120,255)`,
      odd: `rgb(${Math.min(40 + difference, 255)},${Math.min(120 + difference, 255)},255)`,
    },
    {
      normal: `rgb(255,70,70)`,
      odd: `rgb(${Math.max(255 - difference, 0)},${Math.max(70 - difference, 0)},${Math.max(70 - difference, 0)})`,
    },
  ];
 
  const generateOdd = () => {
    setOddIndex(Math.floor(Math.random() * total));
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    setTheme(randomTheme);
  };
 
  useEffect(() => {
    generateOdd();
  }, [grid, difference]);
 
  const handleClick = (index) => {
    if (!isActive) return;
 
    if (index === oddIndex) {
      onCorrect();
      generateOdd();
    } else {
      onWrong();
    }
  };
 
  if (!theme) return null;
 
  return (
    <div
      className="grid gap-3 mt-10"
      style={{
        gridTemplateColumns: `repeat(${grid}, 80px)`,
      }}
    >
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          onClick={() => handleClick(index)}
          className="w-20 h-20 rounded-2xl cursor-pointer transition-all duration-200 hover:scale-110 shadow-xl hover:shadow-2xl active:scale-95"
          style={{
            backgroundColor:
              index === oddIndex ? theme.odd : theme.normal,
            boxShadow:
              index === oddIndex
                ? "0 0 30px rgba(255,255,255,0.3), 0 0 60px rgba(255,255,255,0.1)"
                : "0 0 10px rgba(255,255,255,0.05)",
            transform: index === oddIndex ? "scale(1.05)" : "scale(1)",
          }}
        />
      ))}
    </div>
  );
};

export default OddBoard;