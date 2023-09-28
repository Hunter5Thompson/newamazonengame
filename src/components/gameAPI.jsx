import axios from 'axios';


const apiBaseURL = 'https://gruppe15.toni-barth.com/'


export const createPlayer = async (name, controllable) => {
    try {
      const response = await axios.post(`${apiBaseURL}/players/`, {
        name,
        controllable,
      });
      return response.data;
    } catch (error) {
      console.error('Fehler beim Anlegen des Spielers:', error);
      return null;
    }
  };

  export const startGame = async (maxTurnTime, players, board) => {
    try {
      const response = await axios.post(`${apiBaseURL}/games/`, {
        maxTurnTime,
        players,
        board,
      });
      return response.data;
    } catch (error) {
      console.error('Fehler beim Starten des Spiels:', error);
      return null;
    }
  };

  //Infos über alle Spieler abfragen
  export const getAllPlayers = async () => {
    try {
      const response = await axios.get(`${apiBaseURL}/players/`);
      return response.data.players;
    } catch (error) {
      console.error('Fehler beim Abrufen der Spieler:', error);
      return null;
    }
  };
  
 //Infos über alle Spiele abfragen
  export const getAllGames = async () => {
    try {
      const response = await axios.get(`${apiBaseURL}/games/`);
      return response.data.games;
    } catch (error) {
      console.error('Fehler beim Abrufen der Spiele:', error);
      return null;
    }
  };

  //Infos über ein bestimmtes Spiel abfragen
  export const getGameById = async (gameId) => {
    try {
      const response = await axios.get(`${apiBaseURL}/games/${gameId}`);
      return response.data;
    } catch (error) {
      console.error(`Fehler beim Abrufen des Spiels mit der ID ${gameId}:`, error);
      return null;
    }
  };
  
  //Spieler löschen
  export const deletePlayer = async (playerId) => {
    try {
      const response = await axios.delete(`${apiBaseURL}/players/${playerId}`);
      return response.status === 200;
    } catch (error) {
      console.error(`Fehler beim Löschen des Spielers mit der ID ${playerId}:`, error);
      return false;
    }
  };
  

  //Spiel löschen
  export const deleteGame = async (gameId) => {
    try {
      const response = await axios.delete(`${apiBaseURL}/games/${gameId}`);
      return response.status === 200;
    } catch (error) {
      console.error(`Fehler beim Löschen des Spiels mit der ID ${gameId}:`, error);
      return false;
    }
  };
  //Spielzug ausführen
  export const makeMove = async (playerId, gameId, move, shot) => {
    try {
      const payload = {
        move: {
          start: {
            row: move.startRow,
            column: move.startColumn,
          },
          end: {
            row: move.endRow,
            column: move.endColumn,
          },
        },
        shot: {
          row: shot.row,
          column: shot.column,
        },
      };
  
      const response = await axios.post(`${apiBaseURL}/move/${playerId}/${gameId}`, payload);
  
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(`Fehler beim Setzen des Zuges im Spiel ${gameId} durch Spieler ${playerId}:`, error);
      return null;
    }
  };

  //Spielzug abfragen
  export const getGameState = async (gameId) => {
    try {
      const response = await axios.get(`${apiBaseURL}/games/${gameId}`);
  
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(`Fehler beim Abrufen des Spielstands für Spiel ${gameId}:`, error);
      return null;
    }
  };
  