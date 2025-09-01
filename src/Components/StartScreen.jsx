import { Play } from "lucide-react";
import { useGameStore } from '../store/gameStore.js';
const StartScreen = () => {
    
  const { setGameState } = useGameStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-6xl mb-4">🐍🪜</h1>
          <h2 className="text-3xl font-bold text-gray-800">Snakes & Ladders</h2>
        </div>
        
        <button
          onClick={() => setGameState('mode')}
          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-full text-lg transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-3 mx-auto"
        >
          <Play size={24} />
          Start Game
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
