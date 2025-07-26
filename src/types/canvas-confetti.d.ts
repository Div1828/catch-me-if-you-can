declare module 'canvas-confetti' {
  type ConfettiOptions = {
    particleCount?: number;
    angle?: number;
    spread?: number;
    origin?: { x?: number; y?: number };
    colors?: string[];
    [key: string]: unknown;
  };

  type Confetti = (options?: ConfettiOptions) => void;

  const confetti: Confetti;
  export default confetti;
}

