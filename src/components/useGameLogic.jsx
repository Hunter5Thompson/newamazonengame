import useStaticBoard from './useStaticBoard';
import useDynamicBoard from './useDynamicBoard';
import { useState } from 'react';


const useGameLogic = () => {
  // Zustand des aktuellen Spielers
  const [currentPlayer, setCurrentPlayer] = useState(0);

  // Verwende den Hook für das statische Board
  const { board, setBoard, initializeBoard } = useStaticBoard();

  // Verwende den Hook für das dynamische Board
  const { validMoves, setValidMoves, moveAmazon, shootArrow, highlightValidMoves } = useDynamicBoard(board, setBoard, currentPlayer);

  // Funktion zum Wechseln des Spielers
  const switchPlayer = () => {
    setCurrentPlayer(currentPlayer === 0 ? 1 : 0);
  };

  return {
    board,
    currentPlayer,
    validMoves,
    initializeBoard,
    moveAmazon,
    shootArrow,
    highlightValidMoves,
    switchPlayer
  };
};

export default useGameLogic;
