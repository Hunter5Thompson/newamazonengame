import './App.css';
import GameSettings from './GameSettings';
import useGameLogic from './useGameLogic';
import Board from './GameBoard';

function App() {
  const { board, initializeBoard, validMoves, highlightValidMoves, moveAmazon } = useGameLogic();
  return (
    <div>
      <GameSettings initializeBoard={initializeBoard} />
      <Board board={board} validMoves={validMoves} />
      {/* ...andere Komponenten und Logik */}
    </div>
  );
};

export default App;
