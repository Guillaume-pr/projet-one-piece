import ListeCartes from "../components/ListeCartes";

import React from "react";
import Navigation from "../components/Navigation";

const Cartes = () => {
  return (
    <div>
      <Navigation />
      <div className="cartes">
        <h1>Liste des cartes</h1>
        <ListeCartes />
      </div>
    </div>
  );
};

export default Cartes;
