
import { useState } from 'react';
import Figure from './figure';
import Position from './position';

const useGameLogic = () => {
    
  const [selectedAmazon, setSelectedAmazon] = useState(null); // null oder [x, y]
  // Funktion, die aufgerufen wird, wenn eine Amazone ausgewählt wird
  // Zustand des Spielfelds
  const [board, setBoard] = useState(null);
  // Aktueller Spieler
  const [currentPlayer, setCurrentPlayer] = useState(0);
  
  const [validMoves, setValidMoves] = useState([]);

  const selectAmazon = (position) => {
    setSelectedAmazon(position);
  };

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
    const [x, y] = from;
    const validMoves = [];
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]];
  
    for (const [dx, dy] of directions) {
      let newX = x;
      let newY = y;
  
      while (true) {
        newX += dx;
        newY += dy;
  
        if (newX < 0 || newX >= board.length || newY < 0 || newY >= board[0].length || board[newX][newY] !== -1) {
          break;
        }
  
        validMoves.push([newX, newY]);
      }
    }
  
    return validMoves;
  };

  const highlightValidMoves = (from, board) => {
      const moves = calculateValidMoves(from, board); // Funktion, die alle gültigen Züge berechnet
      setValidMoves(moves);
    };

  const generateRandomFigures = (size, numAmazonPerPlayer) => {
      const figures = [];
      const occupiedPositions = new Set();
      const totalAmazons = numAmazonPerPlayer * 2;  // Für beide Spieler
    
      for (let i = 0; i < totalAmazons; i++) {
        let x, y, positionKey;
        do {
          x = Math.floor(Math.random() * size);
          y = Math.floor(Math.random() * size);
          positionKey = `${x},${y}`;
        } while (occupiedPositions.has(positionKey));
    
        occupiedPositions.add(positionKey);
    
        const color = i < numAmazonPerPlayer ? "white" : "black";  // Farbe basierend auf der Anzahl der Amazonen pro Spieler
        const figure = new Figure(new Position(x, y), color);
        figures.push(figure);
      }
      return figures;
    };

  const initializeBoard = (size, amazonCount) => {
      // Initialisiere ein leeres Spielfeld mit -1 (leeres Feld)
      const newBoard = Array.from({ length: size }, () => Array(size).fill(-1));
      
      // Generiere alle möglichen Positionen
      const allPositions = [];
      for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
          allPositions.push({ x, y });
        }
      }
      
      // Mische die Positionen
      const shuffledPositions = allPositions.sort(() => Math.random() - 0.5);
      
      // Wähle die ersten 'amazonCount' Positionen aus den gemischten Positionen
      const selectedPositions = shuffledPositions.slice(0, amazonCount);
      
      // Generiere die Amazonen
      const figures = generateRandomFigures(selectedPositions);
      
      // Platziere die Amazonen auf dem Spielfeld
      figures.forEach((figure) => {
        const { x, y } = figure.position;
        newBoard[x][y] = figure.color === 'white' ? 0 : 1; // 0 für Spieler 1, 1 für Spieler 2
      });
      
      // Setze den neuen Zustand des Spielfelds
      setBoard(newBoard);
    };
    
    const isValidMove = (from, to, board, currentPlayer) => {
      const [fromX, fromY] = from;
      const [toX, toY] = to;
    
      // Überprüfe, ob das Startfeld von einer Amazone des aktuellen Spielers besetzt ist
      if (board[fromX][fromY] !== currentPlayer) {
        return false;
      }
    
      // Überprüfe, ob das Zielfeld leer ist
      if (board[toX][toY] !== -1) {
        return false;
      }
    
      // Überprüfe, ob der Zug in einer geraden Linie ist
      const dx = toX - fromX;
      const dy = toY - fromY;
      if (dx !== 0 && dy !== 0 && Math.abs(dx) !== Math.abs(dy)) {
        return false;
      }
    
      // Überprüfe, ob es Hindernisse auf dem Weg gibt
      const stepX = dx === 0 ? 0 : (dx > 0 ? 1 : -1);
      const stepY = dy === 0 ? 0 : (dy > 0 ? 1 : -1);
      let x = fromX + stepX;
      let y = fromY + stepY;
    
      while (x !== toX || y !== toY) {
        if (board[x][y] !== -1) {
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
    
      const checkWinCondition = (board) => {
          let player0Blocked = true;
          let player1Blocked = true;
        
          for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
              if (board[i][j] === 0 && hasValidMoves([i, j], board)) {
                player0Blocked = false;
              }
              if (board[i][j] === 1 && hasValidMoves([i, j], board)) {
                player1Blocked = false;
              }
            }
          }
        
          if (player0Blocked) return 1; // Spieler 1 gewinnt
          if (player1Blocked) return 0; // Spieler 0 gewinnt
        
          return null; // Kein Gewinner
        };
        
    const switchPlayer = () => {
      // Wechsle den Spieler
      setCurrentPlayer(currentPlayer === 0 ? 1 : 0);
    };
    
    return {
      board,
      currentPlayer,
      initializeBoard,
      isValidMove,
      moveAmazon,
      shootArrow,
      checkWinCondition,
      switchPlayer,
      highlightValidMoves
    
  }; 
};
  
export default useGameLogic;