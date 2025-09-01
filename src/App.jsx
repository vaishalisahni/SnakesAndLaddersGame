import { useEffect } from "react";
import StartScreen from "./Components/StartScreen.jsx";
import ModeSelection from "./Components/ModeSelection.jsx";
import GameBoard from "./Components/GameBoard.jsx";
import { useGameStore } from "./store/gameStore.js";

function App() {
  const { gameState, loadGame } = useGameStore();

  useEffect(() => {
    loadGame();
  }, [loadGame]);

  return (
    <>
      <div className="absolute top-0 left-0 right-0 z-20 p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-2xl">🐍</span>
          </div>
          <h1 className="text-3xl font-bold text-white drop-shadow-lg">
            Snakes & Ladders
          </h1>
        </div>
      </div>
      {gameState === "start" && <StartScreen />}
      {gameState === "mode" && <ModeSelection />}
      {gameState === "playing" && <GameBoard />}
    </>
  );
}

export default App;
