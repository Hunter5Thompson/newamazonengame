import React from 'react';
import GameSettings from './components/gameSetting';
import useGameLogic from './components/useGameLogic';
import Board from './components/gameBoard';
import Navbar from './components/navbar';

import './App.css';

function App() {
  const { board, initializeBoard, validMoves, highlightValidMoves, moveAmazon } = useGameLogic();
  return (
    <div id= "app">
      <Navbar />
        <div class="background"></div>
        <div class="amazonen"></div>
      <GameSettings initializeBoard={initializeBoard} />
      <Board board={board} validMoves={validMoves} highlightValidMoves={highlightValidMoves} moveAmazon={moveAmazon} />
      {/* ...andere Komponenten und Logik */}
    </div>
  );
};

export default App;
