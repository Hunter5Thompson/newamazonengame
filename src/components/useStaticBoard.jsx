import { useState } from 'react';
import { Figure, Amazon } from './figure';  // Importiere diese, falls nötig
import Position from './position';  // Importiere diese, falls nötig

const useStaticBoard = () => {
  // Zustand des Spielfelds
  const [board, setBoard] = useState(null);

  const initializeBoard = (size, amazonCount) => {
    // Initialisiere ein leeres Spielfeld mit -1 (leeres Feld)
    let newBoard = Array.from({ length: size }, () => Array.from({ length: size }, () => -1));

    // Generiere die Amazonen
    const figures = generateRandomFigures(size, amazonCount);

    // Platziere die Amazonen auf dem Spielfeld
    figures.forEach((figure) => {
      const { x, y } = figure.position;
      if (x < size && y < size) { // Überprüfe die Grenzen
        newBoard[x][y] = figure.color === 'white' ? 0 : 1; // 0 für weiß, 1 für schwarz
      }
    });

    // Setze den neuen Zustand des Spielfelds
    setBoard(newBoard);
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

  return {
    board,
    setBoard,
    initializeBoard
  };
};

export default useStaticBoard;
