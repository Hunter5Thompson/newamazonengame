import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import './BoardStyles.css';


const GameSettings = ({ initializeBoard }) => {
  const [selectedSize, setSelectedSize] = useState(8); // Default-Wert
  const [selectedAmazonCount, setSelectedAmazonCount] = useState(4); // Default-Wert

  const startGame = () => {
    initializeBoard(selectedSize, selectedAmazonCount);
  };

  return (
    
    <Form>
      <Form.Group>
        <Form.Label htmlFor="boardSize">Wähle die Spielfeldgröße:</Form.Label>
        <select id="boardSize" onChange={(e) => setSelectedSize(e.target.value)}>
          <option value="6">6x6</option>
          <option value="8">8x8</option>
          <option value="10">10x10</option>
        </select>
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor="numAmazons">Wähle die Anzahl der Amazonen pro Spieler:</Form.Label>
        <select id="numAmazons" onChange={(e) => setSelectedAmazonCount(e.target.value)}>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </Form.Group>

      <Button onClick={startGame}>Spiel starten</Button>
    </Form>
  );
};

export default GameSettings;
