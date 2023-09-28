import React from 'react';
import { Amazon } from './figure'; // Importiere die Amazon-Komponente

const Board = ({ board, validMoves, highlightValidMoves, moveAmazon }) => {
  // Überprüfung, ob board und validMoves null sind
  if (!board || !validMoves) {
    return <div>Loading...</div>; // oder irgendeine andere Placeholder-Komponente
  }

  const handleCellClick = (i, j, cell) => {
    if (cell === 'Amazon') {
      highlightValidMoves(i, j);
    } else if (validMoves.some(move => move[0] === i && move[1] === j)) {
      moveAmazon(i, j);
    }
  };

  return (
    <div className="board">
      {board.map((row, i) => (
        <div key={i} className="board-row">
          {row.map((cell, j) => (
            <Amazon
              key={`${i}-${j}`}
              type={cell}
              isHighlighted={validMoves.some(move => move[0] === i && move[1] === j)}
              onClick={() => handleCellClick(i, j, cell)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
