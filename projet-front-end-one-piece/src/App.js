import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Builder from "./pages/Builder";
import Cartes from "./pages/Cartes";
import Deck from "./pages/Deck";
import Profil from "./pages/Profil";
import Tournois from "./pages/Tournois";
import Inscription from "./pages/Inscription";
import AjoutCarte from "./pages/AjoutCarte";
import Connexion from "./pages/Connexion";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route
          path="/builder"
          element={
            <ProtectedRoute>
              <Builder />
            </ProtectedRoute>
          }
        />
        <Route path="/cartes" element={<Cartes />} />

        <Route
          path="/deck"
          element={
            <ProtectedRoute>
              <Deck />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profil"
          element={
            <ProtectedRoute>
              <Profil />
            </ProtectedRoute>
          }
        />
        <Route path="/tournois" element={<Tournois />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/ajout" element={<AjoutCarte />} />
        <Route path="*" element={<Accueil />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
