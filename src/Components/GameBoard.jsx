import { useEffect } from "react";
import { RotateCcw, ArrowLeft, Play } from "lucide-react";
import bgimage from "../assets/bg-image.jpg";
import { useGameStore } from "../store/gameStore.js";

const GameBoard = () => {
  const {
    gameMode,
    positions,
    currentPlayer,
    gameMessage,
    winner,
    isRolling,
    rollDice,
    resetGame,
    setGameState,
  } = useGameStore();

  // Computer AI logic
  useEffect(() => {
    if (gameMode === "pvc" && currentPlayer === 1 && !winner && !isRolling) {
      const timer = setTimeout(() => {
        rollDice();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameMode, winner, isRolling, rollDice]);

  const getCoordinates = (position) => {
    const boardSize = 650; // Total board size
    const borderSize = 25; // Border size from your image
    const playableArea = boardSize - (borderSize * 2); // 600px playable area
    const cellSize = playableArea / 10; // 60px per cell

    const row = Math.floor((position - 1) / 10);
    const col = (position - 1) % 10;

    let x;
    if (row % 2 === 0) {
      // left to right 
      x = col * cellSize + borderSize;
    } else {
      // right to left 
      x = (9 - col) * cellSize + borderSize;
    }
    
    //calculating y from top
    const y = (9 - row) * cellSize + borderSize;
    
    return { x, y };
  };

  const getCellCenter = (playerIndex) => {
    const cellSize = (650 - 50) / 10; // 60px per cell
    const playerSize = 24;

    if (positions[0] === positions[1]) {
      // Both players on same cell
      return (cellSize - playerSize) / 2 + (playerIndex === 0 ? -8 : 8);
    }
    return (cellSize - playerSize) / 2;
  };

  const getPlayerStyle = (playerIndex) => {
    const coords = getCoordinates(positions[playerIndex]);
    const centerOffset = getCellCenter(playerIndex);

    return {
      left: `${coords.x + centerOffset}px`,
      top: `${coords.y + centerOffset}px`,
      transition: "all 0.4s ease",
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white mb-4">
            🐍🪜 Snakes & Ladders
          </h1>
          <p className="text-xl text-white">
            {gameMode === "pvc" ? "Player vs Computer" : "Player vs Player"}
          </p>
        </div>

        {/* Game Controls */}
        <div className="text-center mb-6">
          {!winner && (
            <button
              onClick={rollDice}
              disabled={
                isRolling || (gameMode === "pvc" && currentPlayer === 1)
              }
              className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-full text-lg transform hover:scale-105 transition-all duration-200 shadow-lg mr-4"
            >
              🎲 {isRolling ? "Rolling..." : "Roll Dice"}
            </button>
          )}

          {winner !== null && (
            <button
              onClick={resetGame}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full text-lg transform hover:scale-105 transition-all duration-200 shadow-lg mr-4"
            >
              <RotateCcw size={20} className="inline mr-2" />
              Play Again
            </button>
          )}

          <button
            onClick={() => setGameState("mode")}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full text-lg transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            <ArrowLeft size={20} className="inline mr-2" />
            Back
          </button>
        </div>

        {/* Game Status */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-lg max-w-2xl mx-auto">
          <pre className="text-center text-gray-800 font-semibold whitespace-pre-line">
            {gameMessage}
          </pre>
        </div>

        {/* Game Board */}
        <div className="flex justify-center">
          <div
            className="relative border-4 border-gray-800 rounded-lg shadow-2xl"
            style={{
              width: "650px", 
              height: "650px", 
              backgroundImage: `url(${bgimage})`,
              backgroundSize: "cover", 
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Players */}
            <div
              className="w-6 h-6 rounded-full bg-red-500 border-2 border-white shadow-lg absolute z-10"
              style={getPlayerStyle(0)}
              title="Player 1"
            />
            <div
              className="w-6 h-6 rounded-full bg-yellow-400 border-2 border-white shadow-lg absolute z-10"
              style={getPlayerStyle(1)}
              title={gameMode === "pvc" ? "Computer" : "Player 2"}
            />
          </div>
        </div>

        {/* Player Info */}
        <div className="mt-6 flex justify-center gap-8">
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span className="font-bold">Player 1</span>
            </div>
            <p className="text-gray-600">Position: {positions[0]}</p>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
              <span className="font-bold">
                {gameMode === "pvc" ? "Computer" : "Player 2"}
              </span>
            </div>
            <p className="text-gray-600">Position: {positions[1]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;