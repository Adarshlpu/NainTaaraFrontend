// src/pages/Games/oddnoutcolor/OddBoard.jsx

import { useEffect, useState } from "react";

const OddBoard = ({
  grid,
  difference,
  onCorrect,
  onWrong,
}) => {
  const total = grid * grid;

  const [oddIndex, setOddIndex] = useState(0);

  const [theme, setTheme] = useState(null);

  const themes = [
    {
      normal: `rgb(40,120,255)`,
      odd: `rgb(${40 + difference},
                ${120 + difference},
                255)`,
    },

    {
      normal: `rgb(255,70,70)`,
      odd: `rgb(${255 - difference},
                ${70 - difference},
                ${70 - difference})`,
    },
  ];

  // GENERATE RANDOM ODD BOX
  const generateOdd = () => {
    setOddIndex(Math.floor(Math.random() * total));

    // RANDOM THEME
    const randomTheme =
      themes[Math.floor(Math.random() * themes.length)];

    setTheme(randomTheme);
  };

  useEffect(() => {
    generateOdd();
  }, [grid, difference]);

  // CLICK HANDLER
  const handleClick = (index) => {
    if (index === oddIndex) {
      onCorrect();

      generateOdd();
    } else {
      onWrong();
    }
  };

  // WAIT UNTIL THEME LOADS
  if (!theme) return null;

  return (
    <div
      className="grid gap-3 mt-8"
      style={{
        gridTemplateColumns: `repeat(${grid}, 80px)`,
      }}
    >
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          onClick={() => handleClick(index)}
          className="
            w-20
            h-20
            rounded-2xl
            cursor-pointer
            transition-all
            duration-300
            hover:scale-105
            shadow-lg
          "
          style={{
            backgroundColor:
              index === oddIndex
                ? theme.odd
                : theme.normal,

            boxShadow:
              index === oddIndex
                ? "0 0 20px rgba(255,255,255,0.2)"
                : "0 0 10px rgba(255,255,255,0.05)",
          }}
        />
      ))}
    </div>
  );
};

export default OddBoard;