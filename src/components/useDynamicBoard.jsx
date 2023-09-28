import { useState } from 'react';

const useDynamicBoard = (board, setBoard, currentPlayer,selectedAmazon) => {
  // Zustand der gültigen Züge
  const [validMoves, setValidMoves] = useState([]);

  const hasValidMoves = (position, board) => {
    const [x, y] = position;
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]];
  
    for (const [dx, dy] of directions) {
      let newX = x + dx;
      let newY = y + dy;
  
      if (newX >= 0 && newX < board.length && newY >= 0 && newY < board[0].length && board[newX][newY] === -1) {
        return true;
      }
    }
  
    return false;
  };

  const calculateValidMoves = (from, board) => {
    console.log("calculateValidMoves called")
    const [x, y] = from;
    const validMoves = [];
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]];
  
    for (const [dx, dy] of directions) {
      console.log(`Current direction: dx=${dx}, dy=${dy}`);
      let newX = x;
      let newY = y;
  
      while (true) {
        newX += dx;
        newY += dy;
        console.log(`Checking position: newX=${newX}, newY=${newY}`);
      
        if (newX < 0 || newX >= board.length || newY < 0 || newY >= board[0].length) {
          break;
        }
        console.log(`Current board state:`, board);
        console.log(`Current player: ${currentPlayer}`);
        if (isValidMove(from, [newX, newY], board, currentPlayer)) {
          console.log(`Valid move found: [${newX}, ${newY}]`);
          validMoves.push([newX, newY]);
        } else {
          console.log(`Invalid move: [${newX}, ${newY}]`);
          break;
        }
      }

    }
    console.log("Final valid moves:", validMoves);
    return validMoves;
  };
  const highlightValidMoves = (from, board) => {
    const moves = calculateValidMoves(from, board);
    setValidMoves(moves);
  };

  const isValidMove = (from, to, board, currentPlayer) => {
    const [fromX, fromY] = from;
    const [toX, toY] = to;
    console.log("isValidMove called")
  
    // Überprüfe, ob das Startfeld von einer Amazone des aktuellen Spielers besetzt ist
    if (board[fromX][fromY] !== currentPlayer) {
      console.log("Check if square is occupied")
      return false;
    }
  
    // Überprüfe, ob das Zielfeld leer ist
    if (board[toX][toY] !== -1) {
      console.log("Check if square is empty")
      return false;
    }
  
    // Überprüfe, ob der Zug in einer geraden Linie ist
    const dx = toX - fromX;
    const dy = toY - fromY;
    if (dx !== 0 && dy !== 0 && Math.abs(dx) !== Math.abs(dy)) {
      console.log("Check if move is straight")
      return false;
    }

    // Überprüfe, ob es Hindernisse auf dem Weg gibt
    const stepX = dx === 0 ? 0 : (dx > 0 ? 1 : -1);
    const stepY = dy === 0 ? 0 : (dy > 0 ? 1 : -1);
    let x = fromX + stepX;
    let y = fromY + stepY;
  
    while (x !== toX || y !== toY) {
      if (board[x][y] !== -1) {
        console.log("Check if there a obstacles")
        return false;
      }
      x += stepX;
      y += stepY;
    }
  
    return true;
  };

  const moveAmazon = (from, to, board, setBoard) => {
    const [fromX, fromY] = from;
    const [toX, toY] = to;
    const currentPlayer = board[fromX][fromY];
  
    // Erstelle eine Kopie des aktuellen Spielfelds
    const newBoard = JSON.parse(JSON.stringify(board));
  
    // Bewege die Amazone
    newBoard[toX][toY] = currentPlayer;
    newBoard[fromX][fromY] = -1;
  
    // Aktualisiere den Zustand des Spielfelds
    setBoard(newBoard);
  };
  

  const shootArrow = (position, board, setBoard) => {
    if (isValidMove(selectedAmazon, position, board)) {
        const [x, y] = position;
  
        // Erstelle eine Kopie des aktuellen Spielfelds
        const newBoard = JSON.parse(JSON.stringify(board));
    
        // Setze den Pfeil
        newBoard[x][y] = -2; // -2 repräsentiert einen Giftpfeil
    
        // Aktualisiere den Zustand des Spielfelds
        setBoard(newBoard);
      } else {
        console.log("Ungültiger Pfeilschuss");
      }
    };

  return {
    validMoves,
    setValidMoves,
    moveAmazon,
    shootArrow,
    highlightValidMoves
  };
};

export default useDynamicBoard;
