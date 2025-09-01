import {Users, Bot} from 'lucide-react';
const ModeSelection = ({ onSelectMode, onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Choose Game Mode</h2>
        
        <div className="space-y-4">
          <button
            onClick={() => onSelectMode('pvp')}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-6 rounded-xl text-lg transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center gap-3"
          >
            <Users size={24} />
            Player vs Player
          </button>
          
          <button
            onClick={() => onSelectMode('pvc')}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-6 rounded-xl text-lg transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center gap-3"
          >
            <Bot size={24} />
            Player vs Computer
          </button>
        </div>

        <button
          onClick={onBack}
          className="mt-6 text-gray-500 hover:text-gray-700 underline"
        >
          ← Back to Start
        </button>
      </div>
    </div>
  );
};
export default ModeSelection;