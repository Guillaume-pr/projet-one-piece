CREATE TABLE decks_carte (
    id INT PRIMARY KEY AUTO_INCREMENT,
    deck_id INT,
    carte_id INT,
    FOREIGN KEY (deck_id) REFERENCES decks(id),
    FOREIGN KEY (carte_id) REFERENCES carte(id)
);