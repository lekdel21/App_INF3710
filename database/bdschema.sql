SET search_path = LivraisonDB;

DROP SCHEMA IF EXISTS LIVRAISONDB CASCADE;
CREATE SCHEMA LIVRAISONDB;

CREATE TABLE Client (
	numeroclient INT PRIMARY KEY,
	nomclient VARCHAR(20) NOT NULL,
	prenomclient VARCHAR(20) NOT NULL,
	adressecourrielclient VARCHAR(50),
	rueclient VARCHAR(20),
	villeclient VARCHAR(20),
	codepostalclient VARCHAR(6)
);

CREATE TABLE Telephone (
	numerotelephone VARCHAR(10),
	numeroclient INT,
	CONSTRAINT LF_PK PRIMARY KEY (numerotelephone, numeroclient),
	CONSTRAINT numeroclient_FK FOREIGN KEY (numeroclient) REFERENCES Client
);

CREATE TABLE Fournisseur (
	numerofournisseur INT PRIMARY KEY,
	nomfournisseur VARCHAR(20),
	adressefournisseur VARCHAR (50)
);

CREATE TABLE Planrepas (
	numeroplan INT PRIMARY KEY,
	numerofournisseur INT,
	categorie VARCHAR(20),
	frequence INT,
	nbrfrequence INT,
	nbrcalories INT,
	prix FLOAT CHECK(prix > 0),
	CONSTRAINT numerofournisseur_FK FOREIGN KEY (numerofournisseur) REFERENCES Fournisseur
);

CREATE TABLE Ingredient (
	numeroingredient INT PRIMARY KEY,
	nomingredient VARCHAR(20) NOT NULL,
	paysingredient VARCHAR(20)
);

CREATE TABLE Kitrepas (
	numerokitrepas INT PRIMARY KEY,
	numeroplan INT NOT NULL,
	description VARCHAR(100),
	CONSTRAINT numeroplan_FK FOREIGN KEY (numeroplan) REFERENCES Planrepas
);

CREATE TABLE Famille (
	numeroplan INT PRIMARY KEY,
	CONSTRAINT numeroplan_PK FOREIGN KEY (numeroplan) REFERENCES Planrepas
);

CREATE TABLE Vegetarien (
	numeroplan INT PRIMARY KEY,
	typederepas VARCHAR(30),
	CONSTRAINT numeroplan_PK FOREIGN KEY (numeroplan) REFERENCES Planrepas
);

CREATE TABLE Pescetarien (
	numeroplan INT PRIMARY KEY,
	typepoisson VARCHAR(30),
	CONSTRAINT numeroplan_PK FOREIGN KEY (numeroplan) REFERENCES Planrepas
);

CREATE TABLE Rapide (
	numeroplan INT PRIMARY KEY,
	tempsdepreparation INT,
	CONSTRAINT numeroplan_PK FOREIGN KEY (numeroplan) REFERENCES Famille
);

CREATE TABLE Facile (
	numeroplan INT PRIMARY KEY,
	nbringredients INT,
	CONSTRAINT numeroplan_PK FOREIGN KEY (numeroplan) REFERENCES Famille
);

CREATE TABLE Image (
	numeroimage INT PRIMARY KEY,
	numerokitrepas INT,
	CONSTRAINT numerokitrepas_FK FOREIGN KEY (numerokitrepas) REFERENCES Kitrepas
); 

CREATE TABLE Etape (
	numerokitrepas INT,
	descriptionetape VARCHAR(50),
	dureetape INT,
	CONSTRAINT numerokitrepas_PK FOREIGN KEY (numerokitrepas) REFERENCES Kitrepas
);

CREATE TABLE Abonner (
	numeroclient INT,
	numeroplan INT,
	duree INT NOT NULL,
	PRIMARY KEY (numeroclient, numeroplan),
	CONSTRAINT numeroclient_FK FOREIGN KEY (numeroclient) REFERENCES Client,
	CONSTRAINT numeroplan_FK FOREIGN KEY (numeroplan) REFERENCES Planrepas
);

CREATE TABLE Contenir (
	numerokitrepas INT,
	numeroingredient INT,
	PRIMARY KEY (numerokitrepas, numeroingredient),
	CONSTRAINT numerokitrepas_FK FOREIGN KEY (numerokitrepas) REFERENCES Kitrepas,
	CONSTRAINT numeroingredient_FK FOREIGN KEY (numeroingredient) REFERENCES Ingredient
);