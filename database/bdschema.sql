SET search_path = LivraisonDB;

DROP SCHEMA IF EXISTS LIVRAISONDB CASCADE;
CREATE SCHEMA LIVRAISONDB;

CREATE TABLE Client (
	num�roclient INT PRIMARY KEY,
	nomclient VARCHAR(20) NOT NULL,
	pr�nomclient VARCHAR(20) NOT NULL,
	adressecourrielclient VARCHAR(50),
	rueclient VARCHAR(20),
	villeclient VARCHAR(20),
	codepostalclient VARCHAR(6)
);

CREATE TABLE T�l�phone (
	num�rot�l�phone VARCHAR(10),
	num�roclient INT,
	CONSTRAINT LF_PK PRIMARY KEY (num�rot�l�phone, num�roclient),
	CONSTRAINT num�roclient_FK FOREIGN KEY (num�roclient) REFERENCES Client
);

CREATE TABLE Fournisseur (
	num�rofournisseur INT PRIMARY KEY,
	nomfournisseur VARCHAR(20),
	adressefournisseur VARCHAR (50)
);

CREATE TABLE Planrepas (
	num�roplan INT PRIMARY KEY,
	num�rofournisseur INT,
	cat�gorie VARCHAR(20),
	fr�quence INT,
	nbrfr�quence INT,
	nbrcalorie INT,
	prix FLOAT CHECK(prix > 0),
	CONSTRAINT num�rofournisseur_FK FOREIGN KEY (num�rofournisseur) REFERENCES Fournisseur
);

CREATE TABLE Ingr�dient (
	num�roingr�dient INT PRIMARY KEY,
	nomingr�dient VARCHAR(20) NOT NULL,
	paysingr�dient VARCHAR(20)
);

CREATE TABLE Kitrepas (
	num�rokitrepas INT PRIMARY KEY,
	num�roplan INT NOT NULL,
	description VARCHAR(100),
	CONSTRAINT num�roplan_FK FOREIGN KEY (num�roplan) REFERENCES Planrepas
);

CREATE TABLE Famille (
	num�roplan INT PRIMARY KEY,
	CONSTRAINT num�roplan_PK FOREIGN KEY (num�roplan) REFERENCES Planrepas
);

CREATE TABLE V�g�tarien (
	num�roplan INT PRIMARY KEY,
	typederepas VARCHAR(30),
	CONSTRAINT num�roplan_PK FOREIGN KEY (num�roplan) REFERENCES Planrepas
);

CREATE TABLE Pesc�tarien (
	num�roplan INT PRIMARY KEY,
	typepoisson VARCHAR(30),
	CONSTRAINT num�roplan_PK FOREIGN KEY (num�roplan) REFERENCES Planrepas
);

CREATE TABLE Rapide (
	num�roplan INT PRIMARY KEY,
	tempsdepr�paration INT,
	CONSTRAINT num�roplan_PK FOREIGN KEY (num�roplan) REFERENCES Famille
);

CREATE TABLE Facile (
	num�roplan INT PRIMARY KEY,
	nbringr�dients INT,
	CONSTRAINT num�roplan_PK FOREIGN KEY (num�roplan) REFERENCES Famille
);

CREATE TABLE Image (
	num�roimage INT PRIMARY KEY,
	num�rokitrepas INT,
	CONSTRAINT num�rokitrepas_FK FOREIGN KEY (num�rokitrepas) REFERENCES Kitrepas
); 

CREATE TABLE �tape (
	num�rokitrepas INT,
	description�tape VARCHAR(50),
	dur��tape INT,
	CONSTRAINT num�rokitrepas_PK FOREIGN KEY (num�rokitrepas) REFERENCES Kitrepas
);

CREATE TABLE Abonner (
	num�roclient INT,
	num�roplan INT,
	dur�e INT NOT NULL,
	PRIMARY KEY (num�roclient, num�roplan),
	CONSTRAINT num�roclient_FK FOREIGN KEY (num�roclient) REFERENCES Client,
	CONSTRAINT num�roplan_FK FOREIGN KEY (num�roplan) REFERENCES Planrepas
);

CREATE TABLE Contenir (
	num�rokitrepas INT,
	num�roingr�dient INT,
	PRIMARY KEY (num�rokitrepas, num�roingr�dient),
	CONSTRAINT num�rokitrepas_FK FOREIGN KEY (num�rokitrepas) REFERENCES Kitrepas,
	CONSTRAINT num�roingr�dient_FK FOREIGN KEY (num�roingr�dient) REFERENCES Ingr�dient
);