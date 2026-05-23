const isMobile = window.innerWidth < 640;

const levels = [
  { level: 1, grid: 2, maxDifference: 15.0, minDifference: 10.0, timer: 12 },
  { level: 2, grid: 2, maxDifference: 14.0, minDifference: 9.5, timer: 11 },

  { level: 3, grid: 3, maxDifference: 13.0, minDifference: 9.0, timer: 10 },
  { level: 4, grid: 3, maxDifference: 12.2, minDifference: 8.5, timer: 10 },
  { level: 5, grid: 3, maxDifference: 11.5, minDifference: 8.0, timer: 9 },

  { level: 6, grid: 4, maxDifference: 10.8, minDifference: 7.6, timer: 9 },
  { level: 7, grid: 4, maxDifference: 10.2, minDifference: 7.2, timer: 9 },
  { level: 8, grid: 4, maxDifference: 9.6, minDifference: 6.8, timer: 8 },

  { level: 9, grid: 5, maxDifference: 9.0, minDifference: 6.5, timer: 8 },
  { level: 10, grid: 5, maxDifference: 8.5, minDifference: 6.2, timer: 8 },

  // 📱 Mobile users ke liye max 6x6
  { level: 11, grid: 6, maxDifference: 8.2, minDifference: 6.0, timer: 7 },
  { level: 12, grid: 6, maxDifference: 7.9, minDifference: 5.8, timer: 7 },
  { level: 13, grid: 6, maxDifference: 7.6, minDifference: 5.6, timer: 7 },
  { level: 14, grid: 6, maxDifference: 7.3, minDifference: 5.4, timer: 6 },
  { level: 15, grid: 6, maxDifference: 7.0, minDifference: 5.2, timer: 6 },
];

export default isMobile
  ? levels
  : [
      ...levels,

      // 💻 Desktop extra hard levels
      { level: 16, grid: 7, maxDifference: 6.8, minDifference: 5.0, timer: 6 },
      { level: 17, grid: 7, maxDifference: 6.6, minDifference: 4.8, timer: 5 },

      { level: 18, grid: 8, maxDifference: 6.4, minDifference: 4.6, timer: 5 },
      { level: 19, grid: 8, maxDifference: 6.2, minDifference: 4.4, timer: 4 },
    ];