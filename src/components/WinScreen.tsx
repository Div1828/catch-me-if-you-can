import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import winSound from '../assets/sounds/win-sound.wav';

interface WinScreenProps {
  onFinish: () => void;
  onBackToStart: () => void;
  tries: number;
}

const WinScreen: React.FC<WinScreenProps> = ({ onFinish, onBackToStart, tries }) => {
  useEffect(() => {
    const audio = new Audio(winSound);
    audio.play();

    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
      zIndex: 9999
    });
  }, []);

  return (
    <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-50">
      <h1 className="text-green-400 text-4xl md:text-6xl font-Silkscreen animate-pulse mb-4">
        WELL PLAYED NERD!
      </h1>
      <p className="text-sm text-green-300 font-Silkscreen mb-6">
        Tries: {tries}
      </p>
      <div className="flex gap-4">
        <button
          onClick={onFinish}
          className="px-6 py-2 bg-green-500 hover:bg-green-400 text-black font-Silkscreen rounded shadow-lg transition-all duration-200"
        >
          PLAY AGAIN
        </button>
        <button
          onClick={onBackToStart}
          className="px-6 py-2 bg-transparent border border-green-400 text-green-300 font-Silkscreen rounded shadow-inner hover:bg-green-600 hover:text-black transition-all duration-200"
        >
          BACK TO START
        </button>
      </div>
    </div>
  );
};

export default WinScreen;
