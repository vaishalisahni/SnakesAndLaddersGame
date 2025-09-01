import { useEffect } from "react";
import { RotateCcw, ArrowLeft, Play } from "lucide-react";
import bgimage from "../assets/bg-image.jpg";
import { useGameStore } from "../store/gameStore.js";
import AppBG from "../assets/app-bg.jpg";

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
    const playableArea = boardSize - borderSize * 2; // 600px playable area
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

  // Function to get the display text for current status
  const getGameStatusText = () => {
    if (winner !== null) {
      // When there's a winner, show winner message
      return `🏆 ${
        gameMode === "pvc" && winner === 1
          ? "Computer"
          : `Player ${winner + 1}`
      } Wins!`;
    }
    
    // When no winner, show whose turn it is
    if (gameMode === "pvc") {
      return currentPlayer === 0 ? "It's Your Turn!" : "Computer's Turn!";
    } else {
      return `Player ${currentPlayer + 1}'s Turn!`;
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${AppBG})`,
      }}
    >

      <div className="min-h-screen p-8 pt-24">
        <div className="max-w-7xl mx-auto flex gap-8 items-center justify-center">
          {/* Game Board - Left Side */}
          <div className="flex-shrink-0">
            <div
              className="relative border-4 border-amber-700 rounded-lg shadow-2xl"
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
                className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white shadow-lg absolute z-10"
                style={getPlayerStyle(0)}
                title="Player 1"
              />
              <div
                className="w-6 h-6 rounded-full bg-red-500 border-2 border-white shadow-lg absolute z-10"
                style={getPlayerStyle(1)}
                title={gameMode === "pvc" ? "Computer" : "Player 2"}
              />
            </div>
          </div>

          {/* Single Control Box - Right Side */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-gray-200 w-full max-w-md max-h-lg">
            {/* Game On Title */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-600 mb-1">
                Game On!
              </h2>
              <p className="text-xl text-yellow-500 font-bold">
                {getGameStatusText()}
              </p>
            </div>

            {/* Player Position Cards */}
            <div className="flex gap-4 mb-6">
              <div className="bg-blue-400 rounded-2xl p-4 flex-1 text-center text-white">
                <p className="font-semibold text-sm mb-1">
                  {gameMode === "pvc" ? "Your Position" : "Player 1"}
                </p>
                <p className="text-3xl font-bold">{positions[0]}</p>
              </div>
              <div className="bg-orange-400 rounded-2xl p-4 flex-1 text-center text-white">
                <p className="font-semibold text-sm mb-1">
                  {gameMode === "pvc" ? "Computer" : "Player 2"}
                </p>
                <p className="text-3xl font-bold">{positions[1]}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {!winner && (
                <button
                  onClick={rollDice}
                  disabled={
                    isRolling ||
                    (gameMode === "pvc" && currentPlayer === 1) ||
                    winner !== null
                  }
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-full text-lg flex items-center justify-center gap-2 shadow-lg"
                >
                  🎲 {isRolling ? "Rolling..." : "Roll Dice"}
                </button>
              )}

              {winner !== null && (
                <button
                  onClick={resetGame}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-6 rounded-full text-lg flex items-center justify-center gap-2 shadow-lg"
                >
                  🔄 Restart Game
                </button>
              )}
            </div>

            {/* Game Status Message */}
            <div className="mt-6 p-4 rounded-2xl bg-white/80 backdrop-blur-md shadow-inner border border-gray-200">
              <p className="text-center text-gray-800 text-base font-semibold whitespace-pre-line">
                {gameMessage}
              </p>
            </div>

            {/* Back Button */}
            <button
              onClick={() => setGameState("mode")}
              className="w-full mt-4 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 px-6 rounded-full text-sm flex items-center justify-center gap-2"
            >
              ← Back to Mode Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;