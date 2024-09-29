import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import ListeCartes from "../components/ListeCartes";

const Builder = () => {
  const [userData, setUserData] = useState(null);
  const [deck, setDeck] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Si aucun token, redirige vers la page de connexion ou traite l'absence de token
      console.error(
        "Aucun token trouvé, redirection vers la page de connexion"
      );
      localStorage.removeItem("token");
      window.location.href = "/connexion";
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const pseudo = decodedToken.pseudo;

      // Exemple de vérification du token
      axios
        .get(`http://jsonplaceholder.typicode.com/posts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération du profil:", error);
          localStorage.removeItem("token");
          window.location.href = "/connexion";
        });
    } catch (error) {
      console.error("Erreur lors du décodage du token:", error);
      localStorage.removeItem("token");
      window.location.href = "/connexion";
    }
  }, []);

  useEffect(() => {
    axios.get(`http://192.168.1.16:3001/deck`).then((response) => {
      setDeck(response.data);
    });
  }, []); // Dépendances vides, s'exécute une seule fois au montage du composant
  const AjouterCarteAuDeck = (carte) => {
    axios.post(`http://192.168.1.16:3001/deck`, carte).then(() => {
      setDeck((prevDeck) => [...prevDeck, carte]);
    });
  };

  const supprimerCarteDuDeck = (carteId) => {
    axios
      .delete(`http://192.168.1.16:3001/deck/${carteId}`)
      .then((response) => {
        setDeck((prevDeck) => prevDeck.filter((carte) => carte.id !== carteId)); // Mettre à jour le state
        console.log("Carte supprimée:", response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de la carte:", error);
      });
  };

  return (
    <div>
      <Navigation />
      <div>
        <h1>Builder</h1>
        <div className="cartebuilder">
          <div className="cartedanslebuilder">
            <ListeCartes AjouterCarteAuDeck={AjouterCarteAuDeck} />
          </div>
          <div className="carteajoutedeck">
            <h2>Mon deck</h2>
            {deck.length > 0 ? (
              <ul>
                {deck.map((carte, index) => (
                  <li
                    key={carte.id || index}
                    onClick={() => supprimerCarteDuDeck(carte.id)}
                  >
                    <img
                      src={`http://192.168.1.16:3001${carte.image_url}`}
                      alt={carte.nom}
                      className="cartedeck"
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucune carte dans le deck</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
