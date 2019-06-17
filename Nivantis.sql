--
-- Fichier généré par SQLiteStudio v3.2.1 sur lun. mai 6 16:28:07 2019
--
-- Encodage texte utilisé : System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table : achat
CREATE TABLE achat (id INTEGER PRIMARY KEY AUTOINCREMENT, officine BIGINT REFERENCES officine (id), produit BIGINT REFERENCES produit (id), quantite INT);

-- Table : officine
CREATE TABLE officine (id INTEGER PRIMARY KEY AUTOINCREMENT, raison_sociale VARCHAR (255), ville BIGINT REFERENCES ville (id), adresse VARCHAR (255), complement_adresse VARCHAR (255), mail VARCHAR, telephone VARCHAR (10), date_adhesion DATE, nom_gerant VARCHAR (255));

-- Table : produit
CREATE TABLE produit (id INTEGER PRIMARY KEY AUTOINCREMENT, nom VARCHAR (255), prix_achat_brut INT);

-- Table : ville
CREATE TABLE ville (id INTEGER PRIMARY KEY AUTOINCREMENT, nom VARCHAR (255), code_postal VARCHAR (5));

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
