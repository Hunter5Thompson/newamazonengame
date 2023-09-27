// GameSettings.jsx


const GameSettings = ({ setBoardSize, setNumAmazons }) => {
  const startGame = () => {
    // Hier kommt die Logik zum Starten des Spiels
    // Zum Beispiel könntest du setBoardSize und setNumAmazons aufrufen,
    // um den Zustand in der App.js zu aktualisieren
    console.log("Spiel gestartet!");
  }
    return (
      <div>
        <label htmlFor="boardSize">Wähle die Spielfeldgröße:</label>
        <select id="boardSize" onChange={(e) => setBoardSize(e.target.value)}>
          <option value="6">6x6</option>
          <option value="8">8x8</option>
          <option value="10">10x10</option>
        </select>
  
        <label htmlFor="numAmazons">Wähle die Anzahl der Amazonen pro Spieler:</label>
        <select id="numAmazons" onChange={(e) => setNumAmazons(e.target.value)}>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
  
        <button onClick={startGame}>Spiel starten</button>
      </div>
    );
  };
  