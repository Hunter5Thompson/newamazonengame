import './App.css';
import GameSettings from './components/GameSettings.js';
import useGameLogic from './components/useGameLogic.js';
import Board from './components/GameBoard.js';

function App() {
  const { board, initializeBoard, validMoves, highlightValidMoves, moveAmazon } = useGameLogic();
  return (
    <div>
      <GameSettings initializeBoard={initializeBoard} />
      <Board board={board} validMoves={validMoves} highlightValidMoves={highlightValidMoves} moveAmazon={moveAmazon} />
      {/* ...andere Komponenten und Logik */}
    </div>
  );
};

export default App;
