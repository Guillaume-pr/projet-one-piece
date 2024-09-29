import React from "react";
import Navigation from "../components/Navigation";
import accueil from "../assets/img/accueil.png";

const Accueil = () => {
  return (
    <div>
      <Navigation />
      <h1>Accueil</h1>

      <div className="accueil-container">
        {" "}
        <h2>One pièce Card Game</h2>
        <div className="info1">
          <img src={accueil} alt="image one piece" />
          <p className="informationbase">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo
            molestias officia qui vitae asperiores ratione magni quod nobis
            fugit distinctio. Veniam blanditiis tenetur inventore ut harum.
            Magni consequuntur dolorum esse sunt aliquam in, voluptatibus
            placeat alias laudantium molestiae pariatur distinctio.
          </p>
          <p className="regle">
            <a href="https://en.onepiece-cardgame.com/rules/" target="_blank">
              {"Régle du jeu en anglais "}
            </a>
          </p>
        </div>
        <div className="info2">
          <h2>Information sur les sorties</h2>
          <p className="informationrecente">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
            ipsam amet temporibus iste facere dicta magnam porro, officia
            recusandae qui quidem dolore deserunt quae quaerat consectetur eos
            aliquam suscipit voluptas possimus vel itaque exercitationem? Fugiat
            quam ab modi quisquam voluptates.
          </p>
          <p>
            <a href=""> {"Archive"} </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Accueil;
