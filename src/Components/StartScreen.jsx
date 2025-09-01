import { Play, RotateCcw } from "lucide-react";
import { useGameStore } from '../store/gameStore.js';

const StartScreen = () => {
    
  const { setGameState, clearSave } = useGameStore();

  const handleStartFresh = () => {
    clearSave();
    setGameState('mode');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-6xl mb-4">🐍🪜</h1>
          <h2 className="text-3xl font-bold text-gray-800">Snakes & Ladders</h2>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => setGameState('playing')}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-full text-lg transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-3 mx-auto"
          >
            <Play size={24} />
            Continue Game
          </button>

          <button
            onClick={handleStartFresh}
            className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-6 rounded-full text-lg transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-3 mx-auto"
          >
            <RotateCcw size={20} />
            Start Fresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;