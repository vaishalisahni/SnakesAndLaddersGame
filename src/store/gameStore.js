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
    setGameState: (state) => set({ gameState: state }),
    setGameMode: (mode) => set({ gameMode: mode }),

    startGame: () => set({
        positions: [1, 1],
        currentPlayer: 0,
        winner: null,
        gameMessage: '🎯 Game Started! Player 1\'s turn.',
        isRolling: false,
    }),

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
            let message = `🎲 ${playerName} rolled: ${dice}`;

            if (newPos > 100) {
                message += `\n${playerName} needs ${100 - pos} to win.`;
                set({
                    gameMessage: message,
                    isRolling: false
                });
                get().switchTurn();
                return;
            }

            if (ladders[newPos]) {
                newPos = ladders[newPos];
                message += `\n🎉 ${playerName} climbed a ladder to ${newPos}!`;
            }

            if (snakes[newPos]) {
                newPos = snakes[newPos];
                message += `\n🐍 ${playerName} got bitten and fell to ${newPos}!`;
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
                return;
            }

            set({
                positions: newPositions,
                gameMessage: message,
                isRolling: false
            });

            get().switchTurn();
        }, 500);
    },

    switchTurn: () => {
        const { currentPlayer, gameMode } = get();
        const nextPlayer = (currentPlayer + 1) % 2;
        set({ currentPlayer: nextPlayer });

        setTimeout(() => {
            const playerName = gameMode === 'pvc' && nextPlayer === 1 ? 'Computer' : `Player ${nextPlayer + 1}`;
            set(state => ({
                gameMessage: state.gameMessage + `\n👉 ${playerName}'s turn`
            }));
        }, 600);
    },

    resetGame: () => {
        get().startGame();
    },

    saveGame: () => {
        console.log('Game saved to localStorage');
    },

    loadGame: () => {
        console.log('Game loaded from localStorage');
    },
}));
