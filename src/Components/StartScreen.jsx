import { Play } from "lucide-react";
import { useGameStore } from '../store/gameStore.js';
import AppBG from '../assets/app-bg.jpg'

const StartScreen = () => {
    
  const { setGameState } = useGameStore();

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${AppBG})`
      }}
    >

      {/* Main content */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center max-w-md border-4 border-amber-600">
          <div className="mb-8">
            <h1 className="text-6xl mb-4">🐍🪜</h1>
            <h2 className="text-4xl font-bold text-amber-800 mb-2">Snakes & Ladders</h2>
            <p className="text-amber-600 font-medium">Classic Board Game</p>
          </div>
          
          <button
            onClick={() => setGameState('mode')}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-full text-lg transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-3 mx-auto"
          >
            <Play size={24} />
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;