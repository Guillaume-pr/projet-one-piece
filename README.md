One Piece Deck Builder
Description
"One Piece Deck Builder" est une application web permettant aux utilisateurs de créer, gérer et partager leurs decks de cartes basés sur l'univers de One Piece. Les utilisateurs peuvent s'inscrire, se connecter, ajouter et supprimer des cartes de leur deck, et participer à des tournois en ligne.

Fonctionnalités
Inscription et Connexion : Utilisation de JWT pour authentifier les utilisateurs.
Gestion des Cartes : Ajout, modification et suppression de cartes dans le deck.
Affichage des Cartes : Liste de cartes disponibles, avec possibilité de filtrer et rechercher des cartes.
Création et gestion de deck : Outil interactif pour ajouter des cartes au deck.
Profil utilisateur : Affichage des informations personnelles et préférences du joueur.
Tournois : Gestion des tournois de cartes.
Installation
Prérequis
Node.js
MySQL
XAMPP pour la gestion locale de la base de données
Capacitor pour la compatibilité mobile
Étapes d'installation
Clonez le dépôt GitHub :
bash
Copier le code
git clone https://github.com/Guillaume-pr/projet-one-piece.git
Accédez au répertoire du projet :
bash
Copier le code
cd projet-complet-one-piece
Installez les dépendances côté frontend et backend :
bash
Copier le code
# Pour le backend
cd projet-back-end-one-piece
npm install

# Pour le frontend
cd projet-front-end-one-piece
npm install
Configurez la base de données MySQL avec XAMPP et importez le fichier SQL :
Créez une base de données dans MySQL.
Importez le fichier SQL qui se trouve dans le projet via phpMyAdmin ou en ligne de commande.
bash
Copier le code
mysql -u [root] -p one_piece < chemin/vers/votre/fichier.sql
Lancez le serveur backend :
bash
Copier le code
cd projet-back-end-one-piece
npm start
Lancez le serveur frontend :
bash
Copier le code
cd projet-front-end-one-piece
npm start
Technologies utilisées
Frontend : React
Backend : Node.js avec Express.js
Base de données : MySQL (gérée localement via XAMPP)
Authentification : JWT
Mobile : Capacitor
Déploiement
L'application a été déployée en utilisant GitHub pour le contrôle de version et la gestion du code. Vous pouvez cloner le dépôt et suivre les instructions ci-dessus pour l'installer localement.
