import React, { useState } from "react";
import Navigation from "../components/Navigation";
import axios from "axios";

const AjoutCarte = () => {
  // Utilisation de useState pour gérer les données du formulaire
  const [formData, setFormData] = useState({
    nom: "",
    couleur: "",
    cout: "",
    puissance: "",
    effet: "",
    type: "",
    tag: "",
    rarete: "",
    extension: "",
    image: null, // Changer ici pour gérer le fichier image
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0], // Stocker le fichier sélectionné
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Création d'un FormData pour envoyer les données et le fichier
    const data = new FormData();
    data.append("nom", formData.nom);
    data.append("couleur", formData.couleur);
    data.append("cout", formData.cout);
    data.append("puissance", formData.puissance);
    data.append("effet", formData.effet);
    data.append("type", formData.type);
    data.append("tag", formData.tag);
    data.append("rarete", formData.rarete);
    data.append("extension", formData.extension);
    if (formData.image) {
      data.append("image", formData.image); // Ajouter le fichier image
    }

    try {
      const response = await axios.post(
        "http://192.168.1.16:3001/carte",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Spécifier le type de contenu
          },
        }
      );
      if (response.status === 200) {
        // Les données ont été enregistrées avec succès
        console.log("Form submitted and data saved:", response.data);
      } else {
        console.error("Failed to save data");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <Navigation />
      <h1>Ajout carte</h1>
      <form onSubmit={handleSubmit} className="Ajout_carte">
        <input
          type="text"
          name="nom"
          value={formData.nom || ""}
          placeholder="Entrez le nom de la carte"
          onChange={handleChange}
        />
        <input
          type="text"
          name="couleur"
          value={formData.couleur || ""}
          placeholder="Entrez la couleur"
          onChange={handleChange}
        />

        <input
          type="text"
          name="cout"
          value={formData.cout || ""}
          placeholder="Entrez le coût"
          onChange={handleChange}
        />
        <input
          type="text"
          name="puissance"
          value={formData.puissance || ""}
          placeholder="Entrez la puissance"
          onChange={handleChange}
        />
        <input
          type="text"
          name="effet"
          value={formData.effet || ""}
          placeholder="Entrez l'effet"
          onChange={handleChange}
        />
        <input
          type="text"
          name="type"
          value={formData.type || ""}
          placeholder="Entrez le type"
          onChange={handleChange}
        />

        <input
          type="text"
          name="tag"
          value={formData.tag || ""}
          placeholder="Entrez le tag"
          onChange={handleChange}
        />
        <input
          type="text"
          name="rarete"
          value={formData.rarete || ""}
          placeholder="Entrez la rareté"
          onChange={handleChange}
        />
        <input
          type="text"
          name="extension"
          value={formData.extension || ""}
          placeholder="Entrez l'extension"
          onChange={handleChange}
        />

        <input type="file" name="image" onChange={handleChange} />

        <input type="submit" value="valider" />
      </form>
    </div>
  );
};

export default AjoutCarte;
