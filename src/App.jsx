import { useState } from 'react'
import { snakes , ladders} from './constants.js';
import StartScreen from './Components/StartScreen.jsx';
import ModeSelection from './Components/ModeSelection.jsx';

function App() {
  const [gameState, setGameState] = useState("start");
  const [gameMode, setGameMode] =useState(null);
  const [pos,setPos]=useState([0,0]);
  const [currPlayer,setCurrPlayer]=useState(0);
  const [currDiceValue, setCurrDiceValue]=useState(null);
  const [winner,setWinner]=useState(null);
  const [gameMessage,setGameMessage]=useState('');
  const [isRolling, setIsRolling] =useState('false');

  return (
    <>
      {/* <StartScreen /> */}
      <ModeSelection />
    </>
  )
}

export default App
