import React, { useState } from "react";
import Navigation from "../components/Navigation";
import axios from "axios";

const Inscription = () => {
  // Utilisation de useState pour gérer les données du formulaire
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    pseudo: "",
    personnage: "",
    area: "",
    store: "",
    password: "",
  });

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
        "http://192.168.1.16:3001/register",
        formData
      );
      if (response.status === 200) {
        // Les données ont été enregistrées avec succès
        console.log("Form submitted and data saved:", response.data);
        localStorage.setItem("usersPseudo", formData.pseudo);
      } else {
        console.error("Failed to save data");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Ce pseudo est déjà utilisé, veuillez en choisir un autre.");
    }
  };

  return (
    <div>
      <Navigation />
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit} className="Inscription">
        <input
          type="text"
          name="username"
          value={formData.username || ""}
          placeholder="Entrez votre nom"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="firstname"
          value={formData.firstname || ""}
          placeholder="Entrez votre prenom"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="pseudo"
          value={formData.pseudo || ""}
          placeholder="Entrez votre pseudo"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="personnage"
          value={formData.personnage || ""}
          placeholder="Entrez votre personnage preféré"
          onChange={handleChange}
        />
        <input
          type="text"
          name="area"
          value={formData.area || ""}
          placeholder="Entrez votre région"
          onChange={handleChange}
        />
        <input
          type="text"
          name="store"
          value={formData.store || ""}
          placeholder="Entrez votre boutique habituel"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={formData.password || ""}
          placeholder="Entrez votre mot de passe"
          onChange={handleChange}
          required
        />

        <input type="submit" value="valider" />
      </form>
    </div>
  );
};

export default Inscription;
