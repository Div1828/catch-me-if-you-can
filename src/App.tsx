import React from "react";
import GameArea from "./components/GameArea";
import Particles from "./components/Particles";
import "./App.css"; // Assuming you have a styles.css for global styles

const App: React.FC = () => {
  return (
    <div className="w-screen h-screen bg-black text-white overflow-hidden">
      <GameArea />
      <div className="fixed inset-0 z-[0] h-screen w-screen" >
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={800}
          particleSpread={20}
          speed={0.08}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
    </div>
  );
};

export default App;
