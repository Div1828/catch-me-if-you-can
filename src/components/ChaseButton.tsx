import React, { useEffect, useState } from "react";
import type { MousePosition } from "./GameArea";



interface Props {
  mouse: MousePosition;
  difficulty: "easy" | "medium" | "hard";
  onCatch: () => void;
}

const settings = {
  easy: { range: 150, delay: 300 },
  medium: { range: 120, delay: 150 },
  hard: { range: 100, delay: 50 },
};

const ChaseButton: React.FC<Props> = ({ mouse, difficulty , onCatch}) => {
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
        setTimeout(() => setCooldown(false), 400); // time before next move allowed
      }, delay);
    }

    console.log("Difficulty:", difficulty, "Range:", range, "Delay:", delay);

  }, [mouse, cooldown, delay, range, pos]);

  return (
    <button
      className="absolute rounded-full bg-green-500 w-[60px] h-[60px] text-black font-bold font-Silkscreen shadow transition-all duration-150"
      style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      onClick={onCatch}
    >
      
    </button>
  );
};

export default ChaseButton;
