import Amazon from "./Figure";
import useGameLogic from "./useGameLogic";  



const Board = ({ board }) => {
    const { validMoves } = useGameLogic(); // Hier wird validMoves extrahiert

    return (
      <div className="board">
        {board.map((row, i) => (
          <div key={i} className="board-row">
            {row.map((cell, j) => (
              <Amazon key={j} type={cell} isHighlighted={validMoves.includes([i, j])} />
            ))}
          </div>
        ))}
      </div>
    );
  };