import { useEffect } from "react";
import StartScreen from "./Components/StartScreen.jsx";
import ModeSelection from "./Components/ModeSelection.jsx";
import GameBoard from "./Components/GameBoard.jsx";
import { useGameStore } from "./store/gameStore.js";

function App() {
  const { gameState } = useGameStore();

  const { loadGame } = useGameStore();

  useEffect(() => {
    loadGame();
  }, [loadGame]);

  return (
    <>
      {gameState === "start" && <StartScreen />}
      {gameState === "mode" && <ModeSelection />}
      {gameState === "playing" && <GameBoard />}
    </>
  );
}

export default App;
