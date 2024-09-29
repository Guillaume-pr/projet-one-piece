import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./Deconnexion";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);

      const fetchUserData = async () => {
        try {
          const decodedToken = jwtDecode(token);
          const pseudo = decodedToken.pseudo;

          const response = await axios.get(
            `http://http://192.168.1.16:3001/user/${pseudo}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const { admin } = response.data;
          if (admin) {
            setIsAdmin(true);
          }
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des données utilisateur:",
            error
          );
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        }
      };
      fetchUserData();
    }
  }, []);

  return (
    <div className="navigation">
      <ul>
        {isLoggedIn && (
          <>
            <NavLink
              to="/profil"
              className={(nav) => (nav.isActive ? "nav-active" : "")}
            >
              <li className="Profil ">Profil</li>
            </NavLink>
          </>
        )}
        <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
          <li>Accueil</li>
        </NavLink>

        <NavLink
          to="/builder"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li>Builder</li>
        </NavLink>
        <NavLink
          to="/cartes"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li>Cartes</li>
        </NavLink>
        <NavLink
          to="/deck"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li>Deck</li>
        </NavLink>

        <NavLink
          to="/tournois"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li>Tournois</li>
        </NavLink>

        {isAdmin && (
          <>
            <NavLink
              to="/ajout"
              className={(nav) => (nav.isActive ? "nav-active" : "")}
            >
              <li>Ajout carte</li>
            </NavLink>
          </>
        )}

        {!isLoggedIn && (
          <>
            <NavLink
              to="/connexion"
              className={(nav) => (nav.isActive ? "nav-active" : "")}
            >
              <li>Connexion</li>
            </NavLink>
          </>
        )}

        {!isLoggedIn && (
          <>
            <NavLink
              to="/inscription"
              className={(nav) => (nav.isActive ? "nav-active" : "")}
            >
              <li>Inscription</li>
            </NavLink>
          </>
        )}

        {isLoggedIn && (
          <>
            <li>
              <LogoutButton />
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navigation;
