SET search_path = LivraisonDB;

DROP SCHEMA IF EXISTS LIVRAISONDB CASCADE;
CREATE SCHEMA LIVRAISONDB;

CREATE TABLE Client (
	numéroclient INT PRIMARY KEY,
	nomclient VARCHAR(20) NOT NULL,
	prénomclient VARCHAR(20) NOT NULL,
	adressecourrielclient VARCHAR(50),
	rueclient VARCHAR(20),
	villeclient VARCHAR(20),
	codepostalclient VARCHAR(6)
);

CREATE TABLE Téléphone (
	numérotéléphone VARCHAR(10),
	numéroclient INT,
	CONSTRAINT LF_PK PRIMARY KEY (numérotéléphone, numéroclient),
	CONSTRAINT numéroclient_FK FOREIGN KEY (numéroclient) REFERENCES Client
);

CREATE TABLE Fournisseur (
	numérofournisseur INT PRIMARY KEY,
	nomfournisseur VARCHAR(20),
	adressefournisseur VARCHAR (50)
);

CREATE TABLE Planrepas (
	numéroplan INT PRIMARY KEY,
	numérofournisseur INT,
	catégorie VARCHAR(20),
	fréquence INT,
	nbrfréquence INT,
	nbrcalorie INT,
	prix FLOAT CHECK(prix > 0),
	CONSTRAINT numérofournisseur_FK FOREIGN KEY (numérofournisseur) REFERENCES Fournisseur
);

CREATE TABLE Ingrédient (
	numéroingrédient INT PRIMARY KEY,
	nomingrédient VARCHAR(20) NOT NULL,
	paysingrédient VARCHAR(20)
);

CREATE TABLE Kitrepas (
	numérokitrepas INT PRIMARY KEY,
	numéroplan INT NOT NULL,
	description VARCHAR(100),
	CONSTRAINT numéroplan_FK FOREIGN KEY (numéroplan) REFERENCES Planrepas
);

CREATE TABLE Famille (
	numéroplan INT PRIMARY KEY,
	CONSTRAINT numéroplan_PK FOREIGN KEY (numéroplan) REFERENCES Planrepas
);

CREATE TABLE Végétarien (
	numéroplan INT PRIMARY KEY,
	typederepas VARCHAR(30),
	CONSTRAINT numéroplan_PK FOREIGN KEY (numéroplan) REFERENCES Planrepas
);

CREATE TABLE Pescétarien (
	numéroplan INT PRIMARY KEY,
	typepoisson VARCHAR(30),
	CONSTRAINT numéroplan_PK FOREIGN KEY (numéroplan) REFERENCES Planrepas
);

CREATE TABLE Rapide (
	numéroplan INT PRIMARY KEY,
	tempsdepréparation INT,
	CONSTRAINT numéroplan_PK FOREIGN KEY (numéroplan) REFERENCES Famille
);

CREATE TABLE Facile (
	numéroplan INT PRIMARY KEY,
	nbringrédients INT,
	CONSTRAINT numéroplan_PK FOREIGN KEY (numéroplan) REFERENCES Famille
);

CREATE TABLE Image (
	numéroimage INT PRIMARY KEY,
	numérokitrepas INT,
	CONSTRAINT numérokitrepas_FK FOREIGN KEY (numérokitrepas) REFERENCES Kitrepas
); 

CREATE TABLE Étape (
	numérokitrepas INT,
	descriptionétape VARCHAR(50),
	duréétape INT,
	CONSTRAINT numérokitrepas_PK FOREIGN KEY (numérokitrepas) REFERENCES Kitrepas
);

CREATE TABLE Abonner (
	numéroclient INT,
	numéroplan INT,
	durée INT NOT NULL,
	PRIMARY KEY (numéroclient, numéroplan),
	CONSTRAINT numéroclient_FK FOREIGN KEY (numéroclient) REFERENCES Client,
	CONSTRAINT numéroplan_FK FOREIGN KEY (numéroplan) REFERENCES Planrepas
);

CREATE TABLE Contenir (
	numérokitrepas INT,
	numéroingrédient INT,
	PRIMARY KEY (numérokitrepas, numéroingrédient),
	CONSTRAINT numérokitrepas_FK FOREIGN KEY (numérokitrepas) REFERENCES Kitrepas,
	CONSTRAINT numéroingrédient_FK FOREIGN KEY (numéroingrédient) REFERENCES Ingrédient
);