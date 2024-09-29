import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Profil = () => {
  const [userData, setUserData] = useState(null);

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
        .get(`http://192.168.1.16:3001/user/${pseudo}`, {
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
  }, []); // Dépendances vides, s'exécute une seule fois au montage du composant

  // Afficher les informations de l'utilisateur
  return (
    <div>
      <Navigation />
      <h1>Profil</h1>
      {userData ? (
        <div className="profil">
          <p>Nom: {userData.username}</p>
          <p>Prénom: {userData.firstname}</p>
          <p>Pseudo: {userData.pseudo}</p>
          <p>Personnage Préféré: {userData.personnage}</p>
          <p>Région: {userData.area}</p>
          <p>Boutique: {userData.store}</p>
        </div>
      ) : (
        <p>Chargement des données...</p>
      )}
    </div>
  );
};

export default Profil;
