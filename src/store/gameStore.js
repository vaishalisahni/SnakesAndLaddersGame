import { create } from 'zustand';
import { snakes, ladders } from '../utils/constants';


export const useGameStore = create((set, get) => ({
    // States
    gameState: 'start',
    gameMode: null,
    positions: [1, 1],
    currentPlayer: 0,
    winner: null,
    gameMessage: '',
    isRolling: false,

    // Actions
    setGameState: (state) => {
        set({ gameState: state });
        setTimeout(() => get().saveGame(), 100);
    },

    setGameMode: (mode) => {
        set({ gameMode: mode });
        setTimeout(() => get().saveGame(), 100);
    },

    startGame: () => {
        set({
            positions: [1, 1],
            currentPlayer: 0,
            winner: null,
            gameMessage: '',
            isRolling: false,
        });
        setTimeout(() => get().saveGame(), 100);
    },

    rollDice: () => {
        const { positions, currentPlayer, gameMode, winner, isRolling } = get();

        if (winner || isRolling) return;

        set({ isRolling: true });

        const dice = Math.floor(Math.random() * 6) + 1;
        const playerName = gameMode === 'pvc' && currentPlayer === 1 ? 'Computer' : `Player ${currentPlayer + 1}`;

        set({ gameMessage: `🎲 ${playerName} rolled: ${dice}` });

        setTimeout(() => {
            const pos = positions[currentPlayer];
            let newPos = pos + dice;
            let message = `🎲 ${playerName} rolled: ${dice}!`;

            if (newPos > 100) {
                message += `${playerName} needs ${100 - pos} to win.`;
                set({
                    gameMessage: message,
                    isRolling: false
                });
                get().switchTurn();
                return;
            }

            if (ladders[newPos]) {
                newPos = ladders[newPos];
                message += ` 🎉 ${playerName} climbed a ladder to ${newPos}!`;
            }

            if (snakes[newPos]) {
                newPos = snakes[newPos];
                message += ` 🐍 ${playerName} got bitten and fell to ${newPos}!`;
            }

            // Update positions
            const newPositions = [...positions];
            newPositions[currentPlayer] = newPos;

            // Check for win
            if (newPos === 100) {
                message += `\n🏆 ${playerName} Wins!`;
                set({
                    positions: newPositions,
                    winner: currentPlayer,
                    gameMessage: message,
                    isRolling: false
                });
                // Auto-save after win
                setTimeout(() => get().saveGame(), 100);
                return;
            }

            set({
                positions: newPositions,
                gameMessage: message,
                isRolling: false
            });

            setTimeout(() => get().saveGame(), 100);
            if(winner === null) {
                get().switchTurn();
            }
        }, 500);
    },

    switchTurn: () => {
        const { currentPlayer, gameMode } = get();
        const nextPlayer = (currentPlayer + 1) % 2;
        set({ currentPlayer: nextPlayer });

        setTimeout(() => {
            const playerName = gameMode === 'pvc' && nextPlayer === 1 ? 'Computer' : `Player ${nextPlayer + 1}`;
            
            setTimeout(() => get().saveGame(), 100);
        }, 600);
    },

    resetGame: () => {
        get().startGame();
        localStorage.removeItem("Game");
    },

    saveGame: () => {
        const state = get();
        
        if (state.gameState !== 'start') {
            const saveData = {
                gameState: state.gameState,
                gameMode: state.gameMode,
                positions: state.positions,
                currentPlayer: state.currentPlayer,
                winner: state.winner,
                gameMessage: state.gameMessage,
                isRolling: false, 
            };
            localStorage.setItem("Game", JSON.stringify(saveData));
        }
    },

    loadGame: () => {
        const saved = localStorage.getItem("Game");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);

                if (parsed.gameState && parsed.gameState !== 'start') {
                    set({
                        ...parsed,
                        isRolling: false 
                    });
                    return true; 
                }
            } catch (error) {
                console.error("Error loading game:", error);
                localStorage.removeItem("Game"); 
            }
        }
        return false; 
    },

    clearSave: () => {
        localStorage.removeItem("Game");
        set({
            gameState: 'start',
            gameMode: null,
            positions: [1, 1],
            currentPlayer: 0,
            winner: null,
            gameMessage: '',
            isRolling: false,
        });
    },
}));
