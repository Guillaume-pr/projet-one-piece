import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    // Si non authentifié, redirige vers la page de connexion
    return <Navigate to="/connexion" state={{ from: location }} />;
  }
  // Si authentifié, affiche le contenu protégé

  return children;
};

export default ProtectedRoute;
