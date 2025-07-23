import React, { useState } from "react";
import ChaseButton from "./ChaseButton";

import clickSound from '../assets/sounds/click-sound.wav';
import winSound from '../assets/sounds/win-sound.wav';

import { roasts } from '../assets/roasts.ts';

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
  const [speaking, setSpeaking] = useState(false);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1;
    utterance.rate = 1;

    setSpeaking(true);

    utterance.onend = () => {
      setSpeaking(false);
    };

    const setVoiceAndSpeak = () => {
      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.name.includes("David"));
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      speechSynthesis.speak(utterance);
    };

    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.addEventListener("voiceschanged", () => {
        setVoiceAndSpeak();
      });
    } else {
      setVoiceAndSpeak();
    }
  };





  const handleMouseClick = () => {
  if (speaking) return; // don’t allow clicking while speaking

  if (tries !== null) {
    setTries(tries + 1);
  }

  const audio = new Audio(clickSound);
  audio.play();

  const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];
  setCurrentRoast(randomRoast);
  speak(randomRoast);
};


  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouse({ x: e.clientX, y: e.clientY });

  };

  const handleSuccess = () => {
    if (tries) {
      alert(`ACCESS GRANTED\nTries: ${tries}`);
    }
    setTries(0);
    const audio = new Audio(winSound);
    audio.play();
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden z-1"
      onClick={handleMouseClick}
      onMouseMove={handleMouseMove}
    >
      <div className="bottom-5">
        {currentRoast && (
          <p className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-green-400 text-xl font-Silkscreen">
            {currentRoast}
          </p>
        )}
      </div>
      <div className="absolute top-4 right-4 z-10">
        <label className="text-sm mr-2 font-Silkscreen">Difficulty:</label>
        <select
          className="bg-black font-Silkscreen text-green-400 border border-green-400 p-1 rounded"
          value={difficulty}
          onChange={(e) => {setDifficulty(e.target.value as Difficulty)
            setTries(-1)
            }
          }
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      {(tries!>=0 ) && (
        <p className="text-sm text-green-300 mt-2 absolute top-14 right-4 z-10 font-Silkscreen">
          Your tries: {tries}
        </p>
      )}

      <ChaseButton mouse={mouse} difficulty={difficulty} onMouseClick={handleSuccess} />
    </div>
  );
};

export default GameArea;
