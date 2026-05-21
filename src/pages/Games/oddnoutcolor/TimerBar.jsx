import React, { useState, useEffect } from 'react';

const TimerBar = ({ duration, isActive }) => {
  const [time, setTime] = useState(100);
 
  useEffect(() => {
    setTime(100);
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 0) return 0;
        return prev - 100 / (duration * 10);
      });
    }, 100);
 
    return () => clearInterval(interval);
  }, [duration]);
 
  return (
    <div className="w-[420px] h-6 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full mt-8 overflow-hidden border border-gray-600 shadow-lg">
      <div
        className={`h-full transition-all duration-100 ${
          time > 50 ? "bg-gradient-to-r from-green-500 to-emerald-400" : time > 20 ? "bg-gradient-to-r from-yellow-500 to-orange-400" : "bg-gradient-to-r from-red-500 to-pink-500"
        }`}
        style={{ width: `${time}%` }}
      />
    </div>
  );
};


export default TimerBar;