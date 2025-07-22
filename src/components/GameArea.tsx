import React, { useState } from "react";
import ChaseButton from "./ChaseButton";

export interface MousePosition {
  x: number;
  y: number;
}

type Difficulty = "easy" | "medium" | "hard";

const GameArea: React.FC = () => {


  const [startTime, setStartTime] = useState<number | null>(null);
  const [score, setScore] = useState<number | null>(null);

  const [mouse, setMouse] = useState<MousePosition>({ x: 0, y: 0 });
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouse({ x: e.clientX, y: e.clientY });

    if (startTime === null) {
      setStartTime(Date.now());
    }
  };

  const handleSuccess = () => {
    if (startTime) {
      const duration = (Date.now() - startTime) / 1000;
      setScore(duration);
      alert(`ACCESS GRANTED\nScore: ${duration.toFixed(2)}s`);
    }
  };


  return (
    <div
      className="relative w-full h-full overflow-hidden z-1"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute top-4 right-4 z-10">
        <label className="text-sm mr-2 font-Silkscreen">Difficulty:</label>
        <select
          className="bg-black font-Silkscreen text-green-400 border border-green-400 p-1 rounded"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as Difficulty)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      {score && (
        <p className="text-sm text-green-300 mt-2 absolute top-14 right-4 z-10 font-Silkscreen">
          Your Score: {score.toFixed(2)}s
        </p>
      )}

      <ChaseButton mouse={mouse} difficulty={difficulty} onCatch={handleSuccess} />
    </div>
  );
};

export default GameArea;
