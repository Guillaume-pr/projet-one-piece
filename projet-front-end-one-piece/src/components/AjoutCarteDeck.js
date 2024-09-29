import React from "react";

const AjoutCarteDeck = ({ deck }) => (
  <div className="deck">
    {deck.map((carte) => (
      <div key={carte.id} className="carte-deck">
        <img src={carte.image} alt={carte.nom} />
        <p>{carte.nom}</p>
      </div>
    ))}
  </div>
);

export default AjoutCarteDeck;
