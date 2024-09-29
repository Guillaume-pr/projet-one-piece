import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import axios from "axios";

const ListeCartes = ({ AjouterCarteAuDeck }) => {
  const [carte, setCarte] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isImageEnlarged, setIsImageEnlarged] = useState(null); // Gérer la carte sélectionnée
  const [filtreNom, setFiltreNom] = useState("");
  const [filtreCout, setFiltreCout] = useState("");
  const [filtreExtension, setFiltreExtension] = useState("");
  const [filtreCouleur, setFiltreCouleur] = useState("");
  const [filtreEffet, setFiltreEffet] = useState("");
  const [filtreType, setFiltreType] = useState("");
  const [filtreCategorie, setFiltreCategorie] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://cors-everywhere.herokuapp.com/http://jsonplaceholder.typicode.com/posts"
      )
      .then((response) => {
        setCarte(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des cartes", error);
      });
  }, []);

  // Fonction pour gérer le clic sur une carte
  const handleCardClick = (id) => {
    setSelectedCard(selectedCard === id ? null : id); // Affiche/cache la carte cliquée
    setIsImageEnlarged(isImageEnlarged === id ? null : id);
  };

  const handleContextMenu = (e, carte) => {
    e.preventDefault(); // Empêche le menu contextuel par défaut
    AjouterCarteAuDeck(carte); // Ajoute la carte au deck
  };

  return (
    <div>
      <div>
        <div>
          <label>Filtrer par Nom :</label>
          <input
            type="text"
            value={filtreNom}
            onChange={(e) => setFiltreNom(e.target.value)}
          />
        </div>

        <div>
          <label>Filtrer par Coût :</label>
          <input
            type="number"
            value={filtreCout}
            onChange={(e) => setFiltreCout(e.target.value)}
          />
        </div>
        <div>
          <label>Filtrer par Extension :</label>
          <input
            type="text"
            value={filtreExtension}
            onChange={(e) => setFiltreExtension(e.target.value)}
          />
        </div>

        <div>
          <label>Filtrer par Couleur :</label>
          <input
            type="text"
            value={filtreCouleur}
            onChange={(e) => setFiltreCouleur(e.target.value)}
          />
        </div>
        <div>
          <label>Filtrer par Type :</label>
          <input
            type="text"
            value={filtreType}
            onChange={(e) => setFiltreType(e.target.value)}
          />
        </div>

        <div>
          <label>Filtrer par Effet :</label>
          <input
            type="text"
            value={filtreEffet}
            onChange={(e) => setFiltreEffet(e.target.value)}
          />
        </div>

        <div>
          <label>Filtrer par Catégorie :</label>
          <input
            type="text"
            value={filtreCategorie}
            onChange={(e) => setFiltreCategorie(e.target.value)}
          />
        </div>

        {carte.length > 0 ? (
          <ul>
            {carte
              .filter(
                (carte) =>
                  carte.nom.toLowerCase().includes(filtreNom.toLowerCase()) &&
                  (filtreCout === "" || carte.cout === parseInt(filtreCout)) &&
                  carte.extension
                    .toLowerCase()
                    .includes(filtreExtension.toLowerCase()) &&
                  carte.couleur
                    .toLowerCase()
                    .includes(filtreCouleur.toLowerCase()) &&
                  carte.tag.toLowerCase().includes(filtreType.toLowerCase()) &&
                  carte.effet
                    .toLowerCase()
                    .includes(filtreEffet.toLowerCase()) &&
                  carte.type
                    .toLowerCase()
                    .includes(filtreCategorie.toLowerCase())
              )
              .map((carte) => (
                <li key={carte.id} style={{ marginBottom: "20px" }}>
                  <h2>{carte.Nom}</h2>

                  {carte.image_url && (
                    <img
                      src={`http://192.168.1.16:3001${carte.image_url}`}
                      alt={carte.nom}
                      className={`clickable-image ${
                        isImageEnlarged === carte.id ? "enlarged" : ""
                      }`}
                      onClick={() => handleCardClick(carte.id)} // Clic pour agrandir/réduire l'image
                      onContextMenu={(e) => {
                        e.preventDefault(); // Empêche le menu contextuel par défaut
                        AjouterCarteAuDeck(carte); // Ajoute la carte au deck
                      }}
                    />
                  )}

                  {/* Affichage conditionnel du texte basé sur le clic */}
                  {selectedCard === carte.id && (
                    <div
                      className="image-text-container"
                      onClick={() => handleCardClick(carte.id)}
                    >
                      <img
                        src={`http://192.168.1.16:3001${carte.image_url}`}
                        alt={carte.nom}
                        className="enlarged-image"
                      />
                      <div className="carte-details">
                        <p className="nom"> {carte.nom} </p>
                        <p className="couleur">Couleur: {carte.couleur} </p>
                        <p className="type">Catégorie: {carte.type}</p>
                        <p className="rarete">Rareté: {carte.rarete} </p>
                        <p className="cout">Coût: {carte.cout}</p>
                        <p className="puissance">
                          Puissance: {carte.puissance}{" "}
                        </p>
                        <p className="tag">Type: {carte.tag} </p>
                        <p className="extension">
                          Extension: {carte.extension}{" "}
                        </p>
                        <p className="effet">Effet: {carte.effet} </p>
                      </div>
                    </div>
                  )}
                </li>
              ))}
          </ul>
        ) : (
          <p>Aucune carte trouvée</p>
        )}
      </div>
    </div>
  );
};

export default ListeCartes;
