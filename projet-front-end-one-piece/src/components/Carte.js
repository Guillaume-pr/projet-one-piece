import React from "react";

const Carte = ({ carte, onContextMenu }) => {
  // Vérifiez d'abord que l'objet `carte` existe et que `image_url` est défini
  if (!carte) {
    return <p>Aucune carte sélectionnée</p>;
  }

  return (
    <div className="carte" onContextMenu={onContextMenu}>
      {carte.image_url ? (
        <img src={carte.image_url} alt={carte.nom} />
      ) : (
        <p>Image non disponible</p> // Message alternatif si l'image n'est pas définie
      )}
      <p>{carte.nom}</p>
    </div>
  );
};

export default Carte;
