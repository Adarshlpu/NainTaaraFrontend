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

  const generateOdd = () => {
    setOddIndex(Math.floor(Math.random() * total));
  };

  useEffect(() => {
    generateOdd();
  }, [grid]);

  const base = 160;

  const normalColor = `rgb(${base}, ${base}, 255)`;

  const oddColor = `rgb(${base - difference},
   ${base - difference},
   255)`;

  const handleClick = (index) => {
    if (index === oddIndex) {
      onCorrect();
      generateOdd();
    } else {
      onWrong();
    }
  };

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
          className="w-20 h-20 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor:
              index === oddIndex
                ? oddColor
                : normalColor,
          }}
        />
      ))}
    </div>
  );
};

export default OddBoard;