import React from 'react';

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

export default Amazon;
