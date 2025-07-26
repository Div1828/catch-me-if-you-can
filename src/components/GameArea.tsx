import React, { useState } from "react";
import ChaseButton from "./ChaseButton";
import WinScreen from "./WinScreen";
import StartScreen from "./StartScreen";
import { addTries } from "../utils/leaderboard.ts";
import clickSound from "../assets/sounds/click-sound.wav";
import winSound from "../assets/sounds/win-sound.wav";
import { roasts } from "../assets/roasts.ts";

export interface MousePosition {
  x: number;
  y: number;
}


type Difficulty = "easy" | "medium" | "hard";

const GameArea: React.FC = () => {
  const [tries, setTries] = useState<number | null>(0);
  const [mouse, setMouse] = useState<MousePosition>({ x: 0, y: 0 });
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [currentRoast, setCurrentRoast] = useState<string | null>(null);
  const [showWin, setShowWin] = useState(false);
  const [playerName, setPlayerName] = useState<string | null>(null);
  const [name, setName] = useState('');

  

  const playRoast = async (roast: { text: string; audio: string }) => {
  if (!playerName || showWin) return;

  const audio = new Audio(roast.audio);
  setCurrentRoast(roast.text);
  audio.play();
};


  const handleMouseClick = (e: React.MouseEvent<HTMLDivElement>) => {
  const target = e.target as HTMLElement;
  const blockedTags = ["SELECT", "OPTION", "BUTTON", "LABEL"];

  // 🔒 Only allow roast logic if game is active
  if (!playerName || showWin || blockedTags.includes(target.tagName)) return;

  if (tries !== null) setTries(tries + 1);

  new Audio(clickSound).play();

  const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];
  setCurrentRoast(randomRoast.text);
  playRoast(randomRoast);

  setTimeout(() => setCurrentRoast(""), 6000);
};


  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouse({ x: e.clientX, y: e.clientY });
  };

  const handleSuccess = () => {
    if (tries !== null) {
      new Audio(winSound).play();
      setShowWin(true);
      addTries(name ?? "Anonymous", tries, difficulty);
    }
  };

  const handleWinFinish = () => {
    setShowWin(false);
    setTries(0);
  };

  const handleBackToStart = () => {
    setShowWin(false);
    setTries(0);
    setPlayerName(null);
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden z-1"
      onClick={handleMouseClick}
      onMouseMove={handleMouseMove}
    >
      {!playerName && <StartScreen difficulty={difficulty} name={name} setName={setName} onStart={(name) => setPlayerName(name)} />}

      {playerName && (
        <div className="absolute top-4 left-4 z-10 font-Silkscreen text-green-300 text-sm">
          Player: {playerName}
        </div>
      )}

      {currentRoast && (
        <p className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-green-400 text-xl font-Silkscreen">
          {currentRoast}
        </p>
      )}

      <div className="absolute top-4 right-4 z-10">
        <label className="text-sm mr-2 font-Silkscreen">Difficulty:</label>
        <select
          className="bg-black font-Silkscreen text-green-400 border border-green-400 p-1 rounded"
          value={difficulty}
          onChange={(e) => {
            setDifficulty(e.target.value as Difficulty);
            setTries(0);
          }}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {tries !== null && tries >= 0 && (
        <p className="text-sm text-green-300 mt-2 absolute top-14 right-4 z-10 font-Silkscreen">
          Your tries: {tries}
        </p>
      )}

      <ChaseButton
        mouse={mouse}
        difficulty={difficulty}
        onMouseClick={handleSuccess}
      />

      {showWin && (
        <WinScreen
          tries={tries ?? 0}
          onFinish={handleWinFinish}
          onBackToStart={handleBackToStart}
        />
      )}
    </div>
  );
};

export default GameArea;
