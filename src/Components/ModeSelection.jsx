import {Users, Bot, ArrowLeft} from 'lucide-react';
import { useGameStore } from '../store/gameStore.js';
import AppBg from '../assets/app-bg.jpg'

const ModeSelection = () => {

  const { setGameState, setGameMode, startGame } = useGameStore();

  const handleSelectMode = (mode) => {
    setGameMode(mode);
    startGame();
    setGameState('playing');
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${AppBg})`
      }}
    >

      {/* Main content */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center max-w-md border-4 border-amber-600">
          <div className="mb-8">
            <h1 className="text-5xl mb-4">🐍🪜</h1>
            <h2 className="text-3xl font-bold text-amber-800 mb-4">Snakes & Ladders</h2>
            <p className="text-lg text-amber-700 font-medium">Choose your game mode</p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => handleSelectMode('pvp')}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-6 rounded-xl text-lg transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center gap-3"
            >
              <Users size={24} />
              Player vs Player
            </button>
            
            <button
              onClick={() => handleSelectMode('pvc')}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-xl text-lg transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center gap-3"
            >
              <Bot size={24} />
              Player vs Computer
            </button>
          </div>

          <button
            onClick={() => setGameState('start')}
            className="mt-6 text-amber-600 hover:text-amber-800 underline flex items-center gap-2 mx-auto font-medium"
          >
            <ArrowLeft size={16} />
            Back to Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModeSelection;