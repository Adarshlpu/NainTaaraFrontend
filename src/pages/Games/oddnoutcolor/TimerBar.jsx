// src/pages/Games/oddnoutcolor/TimerBar.jsx

import { useEffect, useState } from "react";

const TimerBar = ({ duration }) => {
  const [time, setTime] = useState(100);

  useEffect(() => {
    setTime(100);

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 0) {
          return 100;
        }

        return prev - 100 / (duration * 10);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <div className="w-[420px] h-5 bg-gray-800 rounded-full mt-6 overflow-hidden">
      <div
        className={`h-full transition-all duration-100 ${
          time > 50
            ? "bg-green-500"
            : time > 20
            ? "bg-yellow-500"
            : "bg-red-500"
        }`}
        style={{ width: `${time}%` }}
      />
    </div>
  );
};

export default TimerBar;