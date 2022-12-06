SET search_path = LivraisonDB;

INSERT INTO Client VALUES (00, 'Khachan', 'Hamza', 'khachan.hamza@polymtl.ca', 'Sainte-Catherine', 'Montreal', 'H2L2G4');
INSERT INTO Client VALUES (01, 'Delisle', 'Alek', 'alek.delisle@polymtl.ca', 'Acadie', 'Montreal', 'H3N2V5');
INSERT INTO Client VALUES (02, 'Desjardins', 'Richard', 'richDesj@hotmail.com', 'Schulz', 'St-jerome', 'J7Y4W2');
INSERT INTO Client VALUES (03, 'Doe', 'Jonh', 'johndoe@yahoo.com', 'Des Iris', 'Blainville', 'J7C2K4');

INSERT INTO Fournisseur VALUES (00, 'AB Transport', 'Montreal');
INSERT INTO Fournisseur VALUES (01, 'QC Transport', 'Quebec');
INSERT INTO Fournisseur VALUES (02, 'ON Transport', 'Ottawa');
INSERT INTO Fournisseur VALUES (03, NULL, 'Blainvile');

INSERT INTO Ingredient VALUES (00, 'ail', 'USA');
INSERT INTO Ingredient VALUES (01, 'oinion', 'Vietnam');
INSERT INTO Ingredient VALUES (02, 'salade', 'Canada');

INSERT INTO Telephone VALUES ('4501112222', 00);
INSERT INTO Telephone VALUES ('4503334444', 01);
INSERT INTO Telephone VALUES ('4505556666', 02);
INSERT INTO Telephone VALUES ('4507778888', 03);


INSERT INTO Planrepas VALUES (00, 01, 'cetogene', 1, 1, 350, 20.99);
INSERT INTO Planrepas VALUES (01, 03, 'vegetarien', 1, 1, 300, 42.99);
INSERT INTO Planrepas VALUES (02, 00, 'asiatique', 1, 1, 450, 29.99);
INSERT INTO Planrepas VALUES (03, 02, 'italien', 1, 1, 650, 15.99);

INSERT INTO Kitrepas VALUES (00, 00, 'contient tres peu de glucide');
INSERT INTO Kitrepas VALUES (01, 01, 'salade vege');
INSERT INTO Kitrepas VALUES (02, 02, 'ramens');
INSERT INTO Kitrepas VALUES (03, 03, 'spaghetti');

INSERT INTO Famille VALUES (03);
INSERT INTO Famille VALUES (02);

INSERT INTO Facile VALUES (03, 5);

INSERT INTO Rapide VALUES (02, 20);

INSERT INTO Vegetarien VALUES (01, 'salade');

INSERT INTO Pescetarien VALUES (00, 'truite doree');


INSERT INTO Image VALUES (00, 00); 
INSERT INTO Image VALUES (01, 01); 
INSERT INTO Image VALUES (02, 02); 
INSERT INTO Image VALUES (03, 03);

INSERT INTO Etape VALUES (00, 'etape 1', 10);
INSERT INTO Etape VALUES (00, 'etape 2', 15);
INSERT INTO Etape VALUES (01, 'etape 1', 5);
INSERT INTO Etape VALUES (01, 'etape 2', 10);
INSERT INTO Etape VALUES (01, 'etape 3', 5);
INSERT INTO Etape VALUES (01, 'etape 4', 20);
INSERT INTO Etape VALUES (02, 'etape 1', 5);
INSERT INTO Etape VALUES (02, 'etape 2', 15);
INSERT INTO Etape VALUES (03, 'etape 1', 10);
INSERT INTO Etape VALUES (03, 'etape 2', 20);

INSERT INTO Abonner VALUES (00, 01, 3);
INSERT INTO Abonner VALUES (01, 03, 1);
INSERT INTO Abonner VALUES (02, 00, 4);
INSERT INTO Abonner VALUES (03, 02, 6);

INSERT INTO Contenir VALUES (00, 02);
INSERT INTO Contenir VALUES (00, 01);
INSERT INTO Contenir VALUES (00, 00);
INSERT INTO Contenir VALUES (01, 00);
INSERT INTO Contenir VALUES (01, 01);
INSERT INTO Contenir VALUES (02, 01);
INSERT INTO Contenir VALUES (02, 02);
INSERT INTO Contenir VALUES (03, 00);








