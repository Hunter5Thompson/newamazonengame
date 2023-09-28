import React from 'react';

export class Figure {
  constructor(position, color) {
    this.position = position; // Ein Objekt mit x und y Koordinaten
    this.color = color; // 'white' oder 'black'
  }
}

const Amazon = ({ type }) => {
  let content;
  switch (type) {
    case 0:
      content = "🔵"; // Spieler 0
      break;
    case 1:
      content = "🔴"; // Spieler 1
      break;
    case -1:
      content = " "; // Leeres Feld
      break;
    case -2:
      content = "🏹"; // Giftpfeil
      break;
    default:
      content = ""; // Standardwert, falls der Typ nicht erkannt wird
      break;
  }

  return <div className="amazon-cell">{content}</div>;
};

export { Amazon };
