const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
const saltRounds = 10;

// Middleware pour parser le JSON
app.use(express.json());

// Route de test pour vérifier le mot de passe
app.get("/test-password", async (req, res) => {
  try {
    const testPassword = "test123";
    const hashedPassword = await bcrypt.hash(testPassword, saltRounds);
    const isMatch = await bcrypt.compare(testPassword, hashedPassword);

    res.send(`Mot de passe correspond-il : ${isMatch}`); // Devrait afficher `true`
  } catch (error) {
    res.status(500).send("Erreur lors du test du mot de passe");
  }
});

// Démarrage du serveur
const port = 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
