import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Supprimer le token du localStorage
    localStorage.removeItem("token");

    // Rediriger l'utilisateur vers la page de connexion
    navigate("/connexion");
  };

  return <button onClick={handleLogout}>Déconnexion</button>;
};

export default LogoutButton;
