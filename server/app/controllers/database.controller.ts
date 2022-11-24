import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";

import { PlanRepas } from "../../../common/tables/PlanRepas";

import { DatabaseService } from "../services/database.service";
import Types from "../types";

@injectable()
export class DatabaseController {
  public constructor(
    // @ts-ignore -- À ENLEVER LORSQUE L'IMPLÉMENTATION EST TERMINÉE
    @inject(Types.DatabaseService) private readonly databaseService: DatabaseService
  ) {}

  public get router(): Router {
    const router: Router = Router();

      router.get("/List", (req: Request, res: Response, _: NextFunction) => {
          var numPlan = req.params.numeroplan ? req.params.numeroplan : -1;
          var category = req.params.categorie ? req.params.categorie : "";
          var price = req.params.prix ? req.params.prix : "";

          this.databaseService
              .filterPlans(numPlan as number, category, price)
              .then((result: pg.QueryResult) => {
                  const plans: PlanRepas[] = result.rows.map((planrepas: PlanRepas) => ({
                      numeroplan: planrepas.numeroplan,
                      numerofournisseur: planrepas.numerofournisseur,
                      categorie: planrepas.categorie,
                      frequence: planrepas.frequence,
                      nbrfrequence: planrepas.nbrfrequence,
                      nbrcalories: planrepas.nbrcalories,
                      prix: planrepas.prix
                  }));
                  res.json(plans);
              })
              .catch((e: Error) => {
                  console.error(e.stack);
              });
      });


      return router;
    }
}
