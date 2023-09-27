import Amazon from "./Figure";




const Board = ({ board, validMoves, highlightValidMoves, moveAmazon }) => {
    const handleCellClick = (i, j, cell) => {
      if (cell === 'Amazon') {
        highlightValidMoves(i, j);
      } else if (validMoves.includes([i, j])) {
        moveAmazon(i, j);
      }
    };
  
    return (
      <div className="board">
        {board.map((row, i) => (
          <div key={i} className="board-row">
            {row.map((cell, j) => (
              <Amazon
                key={j}
                type={cell}
                isHighlighted={validMoves.includes([i, j])}
                onClick={() => handleCellClick(i, j, cell)}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

  export default Board;