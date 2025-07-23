import React, { useEffect, useState } from "react";
import type { MousePosition } from "./GameArea";


interface Props {
  mouse: MousePosition;
  difficulty: "easy" | "medium" | "hard";
  onMouseClick: () => void;

}

const settings = {
  easy: { range: 150, delay: 300 },
  medium: { range: 120, delay: 150 },
  hard: { range: 100, delay: 50 },
};

const ChaseButton: React.FC<Props> = ({ mouse, difficulty , onMouseClick}) => {
 const [pos, setPos] = useState({ x: 300, y: 300 });
  const [cooldown, setCooldown] = useState(false);

  const { range, delay } = settings[difficulty];

   useEffect(() => {
    const dx = pos.x - mouse.x;
    const dy = pos.y - mouse.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < range && !cooldown) {
      setCooldown(true);
      setTimeout(() => {
        setPos({
          x: Math.random() * (window.innerWidth - 100),
          y: Math.random() * (window.innerHeight - 50),
        });
        setTimeout(() => setCooldown(false), 400); 
      }, delay);
    }

    console.log("Difficulty:", difficulty, "Range:", range, "Delay:", delay);

  }, [mouse, cooldown, delay, range, pos]);

  return (
    <button
      className="
        absolute
        w-24 h-24
        rounded-full
        bg-gradient-to-br from-green-400 via-teal-500 to-blue-600
        shadow-[0_0_30px_8px_rgba(34,197,94,0.6)]
        hover:shadow-[0_0_50px_15px_rgba(34,197,94,0.8)]
        transition-all duration-300 ease-out
      "
      style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      onClick={(e) => {
        e.stopPropagation(); 
        onMouseClick();     
      }}
    >
    </button>
  );
};

export default ChaseButton;