import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";

//import { PlanRepas } from './../../../common/tables/Planrepas';
//import { Fournisseur } from './../../../common/tables/Fournisseur';

import { DatabaseService } from "../services/database.service";
import Types from "../types";

interface PlanRepas {       // Je suis obligé de le mettre directement ici, je ne suis pas capable de l'importer
    numeroplan: string;
    numerofournisseur: string;
    categorie: string;
    frequence: string;
    nbrfrequence: string;
    nbrcalories: string;
    prix: string;
}

export interface Fournisseur {
    numerofournisseur: string;
    nomfournisseur: string;
    adressefournisseur: string;
}


@injectable()
export class DatabaseController {
  public constructor(
    // @ts-ignore -- À ENLEVER LORSQUE L'IMPLÉMENTATION EST TERMINÉE
    @inject(Types.DatabaseService) private readonly databaseService: DatabaseService
  ) {}

  public get router(): Router {
    const router: Router = Router();

      //      ======== PLANREPAS ========        //
      router.get("/list", (req: Request, res: Response, _: NextFunction) => {
          this.databaseService
              .getAllFromTable("planrepas")
              .then((result: pg.QueryResult) => {
                  res.json(result.rows);
              })
              .catch((e: Error) => {
                  console.error(e.stack);
              });
          
      });

      router.get("/add:Categories",(req: Request, res: Response, _: NextFunction) => {
              this.databaseService
                  .getCategories()
                  .then((result: pg.QueryResult) => {
                      const categories = result.rows.map((plan: PlanRepas) => ({
                          categorie: plan.categorie,
                      }));
                      res.json(categories);
                  })

                  .catch((e: Error) => {
                      console.error(e.stack);
                  });
              }
      );

      router.post("/add", (req: Request, res: Response, _: NextFunction) => {
              const plan: PlanRepas = {
                  numeroplan: req.body.numeroplan,
                  numerofournisseur: req.body.numerofournisseur,
                  categorie: req.body.categorie,
                  frequence: req.body.frequence,
                  nbrfrequence: req.body.nbrfrequence,
                  nbrcalories: req.body.nbrcalories,
                  prix: req.body.prix,
              };

              this.databaseService
                  .createPlan(plan)
                  .then((result: pg.QueryResult) => {
                      res.json(result.rowCount);
                  })
                  .catch((e: Error) => {
                      console.error(e.stack);
                      res.json(-1);
                  });
          }
      );

      router.post("/delete/:planNb", (req: Request, res: Response, _: NextFunction) => {
              const planNb: string = req.params.numeroplan;
              this.databaseService
                  .deletePlan(planNb)
                  .then((result: pg.QueryResult) => {
                      res.json(result.rowCount);
                  })
                  .catch((e: Error) => {
                      console.error(e.stack);
                  });
          }
      );

      router.put("/modify", (req: Request, res: Response, _: NextFunction) => {
              const plan: PlanRepas = {
                  numeroplan: req.body.numeroplan,
                  numerofournisseur: req.body.numerofournisseur ? req.body.numerofournisseur : "",
                  categorie: req.body.categorie ? req.body.categorie : "",
                  frequence: req.body.frequence,
                  nbrfrequence: req.body.nbrfrequence ? req.body.nbrfrequence : "",
                  nbrcalories: req.body.nbrcalories ? req.body.nbrcalories : "",
                  prix: req.body.prix ? req.body.prix : "",
              };

              this.databaseService
                  .updatePlan(plan)
                  .then((result: pg.QueryResult) => {
                      res.json(result.rowCount);
                  })
                  .catch((e: Error) => {
                      console.error(e.stack);
                  });
          }
      );

      //      ======== FOURNISSEUR ========        //
      router.get("/add", (req: Request, res: Response, _: NextFunction) => {
          this.databaseService
              .getFournisseurs()
              .then((result: pg.QueryResult) => {
                  const fournisseurs = result.rows.map((fournisseur: Fournisseur) => ({
                      nomfournisseur: fournisseur.nomfournisseur,
                  }));
                  res.json(fournisseurs.filter(function (fournisseur) { return fournisseur.nomfournisseur != null; }));
              })

              .catch((e: Error) => {
                  console.error(e.stack);
              });
      }
      );

      return router;
    }
}
