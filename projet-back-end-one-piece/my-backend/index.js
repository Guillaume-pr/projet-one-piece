require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const app = express();
const port = 3001;

// Configurer la connexion MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, // Assure-toi que cette ligne spécifie la base de données
});

// Connecter à la base de données MySQL
db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données:", err);
    return;
  }
  console.log("Connecté à la base de données MySQL");
});

// Configurer CORS
// app.use(cors());
app.use(cors({ origin: "*" }));

// Middleware pour parser les données JSON
app.use(express.json());

// Route pour enregistrer les données du formulaire
app.post("/register", async (req, res) => {
  const { username, firstname, pseudo, personnage, area, store, password } =
    req.body;

  try {
    // Vérifier si le pseudo est déjà utilisé
    const checkQuery = "SELECT pseudo FROM user WHERE pseudo = ?";
    db.query(checkQuery, [pseudo], async (checkErr, checkResults) => {
      if (checkErr) {
        console.error("Erreur lors de la vérification du pseudo:", checkErr);
        return res.status(500).send("Erreur lors de la vérification du pseudo");
      }

      if (checkResults.length > 0) {
        return res.status(409).send("Ce pseudo est déjà utilisé");
      }
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const query =
        "INSERT INTO user (username, firstname, pseudo, personnage, area, store, password) VALUES (?, ?, ?, ?, ?, ?, ?)";
      db.query(
        query,
        [username, firstname, pseudo, personnage, area, store, hashedPassword],
        (err, result) => {
          if (err) {
            console.error("Erreur lors de l'insertion des données:", err);
            return res
              .status(500)
              .send("Erreur lors de l'enregistrement des données");
          }
          res.status(200).send("Utilisateur enregistré avec succès");
        }
      );
    });
  } catch (err) {
    console.error("erreur lors du hachage du mot de passe", err);
    res.status(500).send("Erreur interne du serveur");
  }
});

// Route de connexion
app.post("/login", async (req, res) => {
  const { pseudo, password } = req.body;

  const query = "SELECT * FROM user WHERE pseudo = ?";
  db.query(query, [pseudo], async (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération de l'utilisateur:", err);
      return res.status(500).send("Erreur interne du serveur");
    }

    if (results.length > 0) {
      const user = results[0];
      const validPassword = await bcrypt.compare(password, user.password);

      if (validPassword) {
        console.log("Mot de passe correct");
        // Si le mot de passe est correct, créer un token JWT ou une session
        const token = jwt.sign(
          { id: user.id, pseudo: user.pseudo },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h", // Le token expire dans 1 heure
          }
        );
        return res.status(200).json({ message: "Connexion réussie", token });
      } else {
        console.log("Mot de passe incorrect");
        return res.status(401).json({ error: "Mot de passe incorrect" });
      }
    } else {
      console.log("Utilisateur non trouvé");
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
  });
});

// Route pour récupérer les informations d'un utilisateur par son pseudo
app.get("/user/:pseudo", (req, res) => {
  const { pseudo } = req.params;

  const query = "SELECT * FROM user WHERE pseudo = ?";
  db.query(query, [pseudo], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des données:", err);
      res.status(500).send("Erreur lors de la récupération des données");
    } else {
      if (results.length > 0) {
        res.status(200).json(results[0]); // Renvoie les informations de l'utilisateur
      } else {
        res.status(404).send("Utilisateur non trouvé");
      }
    }
  });
});

// Configure multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public", "uploads")); // Répertoire où les images seront stockées
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nom du fichier unique
  },
});

const upload = multer({ storage: storage });

// Route pour ajouter une carte avec une image
app.post("/carte", upload.single("image"), (req, res) => {
  const { nom, couleur, cout, puissance, effet, type, tag, rarete, extension } =
    req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // URL de l'image

  const query =
    "INSERT INTO carte (nom, couleur, cout, puissance, effet, type, tag, rarete, extension, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [
      nom,
      couleur,
      cout,
      puissance,
      effet,
      type,
      tag,
      rarete,
      extension,
      imageUrl,
    ],
    (err, result) => {
      if (err) {
        console.error("Erreur lors de l'ajout de la carte:", err);
        res.status(500).send("Erreur lors de l'ajout de la carte");
      } else {
        res.status(200).send("Carte ajoutée avec succès");
      }
    }
  );
});

// Serve les fichiers statiques depuis le répertoire public
app.use("/uploads", express.static("public/uploads"));

// Route pour récupérer toutes les cartes
app.get("/carte", (req, res) => {
  const query = "SELECT * FROM carte";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des données:", err);
      res.status(500).send("Erreur lors de la récupération des données");
    } else {
      res.status(200).json(results); // Renvoie toutes les cartes
    }
  });
});

// **********************************************************
let deck = [];
// Ajouter une carte au deck
app.post("/deck", (req, res) => {
  const carte = req.body;
  deck.push(carte);
  res.status(201).send(carte);
});

// Récupérer les cartes du deck
app.get("/deck", (req, res) => {
  res.send(deck);
});

// Supprimer une carte du deck
app.delete("/deck/:id", (req, res) => {
  const { id } = req.params;
  const index = deck.findIndex((carte) => carte.id === parseInt(id));

  if (index !== -1) {
    const deletedCarte = deck.splice(index, 1); // Supprimer la carte du tableau deck
    res.status(200).send(deletedCarte[0]); // Envoyer la carte supprimée en réponse
  } else {
    res.status(404).send({ message: "Carte non trouvée" });
  }
});

// ********************************************************

app.listen(port, () => {
  console.log(`Serveur API en cours d'exécution sur http://localhost:${port}`);
});
