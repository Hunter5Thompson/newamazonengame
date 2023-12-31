import React from 'react';
import { getAllPlayers, getAllGames, deletePlayer, deleteGame } from './gameAPI'; // Pfad zu deiner API-Datei
import './navbar.css';

const Navbar = () => {

  const handleGetAllPlayers = async () => {
    const players = await getAllPlayers();
    console.log('Alle Spieler:', players);
  };

  const handleGetAllGames = async () => {
    const games = await getAllGames();
    console.log('Alle Spiele:', games);
  };

  const handleDeletePlayer = async (playerId) => {
    const success = await deletePlayer(playerId);
    console.log('Spieler gelöscht:', success);
  };

  const handleDeleteGame = async (gameId) => {
    const success = await deleteGame(gameId);
    console.log('Spiel gelöscht:', success);
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-scroll">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Amazonen</a>
        <button className="navbar-toggler" type="button" data-mdb-toggle="collapse"
          data-mdb-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
          aria-label="Toggle navigation">
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={handleGetAllPlayers}>Spieler</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={handleGetAllGames}>Spiele</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => handleDeletePlayer(1)}>Spieler Löschen</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => handleDeleteGame(1)}>Spiel Löschen</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
