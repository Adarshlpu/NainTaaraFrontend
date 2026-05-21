// src/pages/Games/oddnoutcolor/ScorePanel.jsx

const ScorePanel = ({
  score,
  lives,
  accuracy,
  level,
  reactionTime,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-5 text-lg bg-[#111827] px-6 py-4 rounded-2xl border border-cyan-500">
      <div>🏆 Score: {score}</div>

      <div>❤️ Lives: {lives}</div>

      <div>🎯 Accuracy: {accuracy}%</div>

      <div>⚡ {reactionTime}s</div>

      <div>📈 Level: {level}</div>
    </div>
  );
};

export default ScorePanel;