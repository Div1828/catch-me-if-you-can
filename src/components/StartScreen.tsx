import React from 'react';
import Particles from './Particles'; // ⬅️ make sure this exists and is working
import Leaderboard from './Leaderboard';

interface StartScreenProps {
  onStart: (playerName: string) => void;
  name: string;
  setName: (name: string) => void;
  difficulty: string;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart, name, setName, difficulty }) => {


  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black overflow-hidden">

      <div className="absolute inset-0 z-0 opacity-100 blur-xs pointer-events-none">
        <Particles />
      </div>


      <div className='flex gap-[10vw]'>
        <div className="z-10 flex flex-col justify-center w-[40vw] items-center text-green-400 font-Silkscreen">
          <h1 className="text-4xl md:text-6xl text-center mb-8 animate-pulse text-shadow-glow">
            CATCH ME <br /> IF YOU CAN
          </h1>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4 px-4 py-2 w-64 text-center bg-black border border-green-400 text-green-300 rounded outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            disabled={name.trim() === ''}
            onClick={() => onStart(name.trim())}
            className="px-6 py-2 bg-green-500 hover:bg-green-400 text-black rounded font-bold transition-all duration-200 disabled:opacity-40"
          >
            Start Game
          </button>
        </div>
        <div>
          <Leaderboard difficulty={difficulty} />
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
