import React, { useState } from "react";
import Navigation from "../components/Navigation";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Connexion = () => {
  const [formData, setFormData] = useState({
    pseudo: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://192.168.1.16:3001/login",
        formData
      );
      if (response.status === 200) {
        // Enregistrer le token JWT ou gérer la session ici
        console.log("Connexion réussie:", response.data);
        // Par exemple, enregistrer le token dans le localStorage :
        localStorage.setItem("token", response.data.token);
        // Redirige vers l'URL d'origine ou la page profil par défaut
        navigate("/profil");
      } else {
        console.error("Erreur lors de la connexion");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire:", error);
    }
  };

  return (
    <div>
      <Navigation />
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit} className="Connexion">
        <input
          type="text"
          name="pseudo"
          value={formData.pseudo}
          placeholder="Entrez votre pseudo"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Entrez votre mot de passe"
          onChange={handleChange}
        />
        <input type="submit" value="Se connecter" />
      </form>
    </div>
  );
};

export default Connexion;
