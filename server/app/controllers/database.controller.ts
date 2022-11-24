import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";

//import { PlanRepas } from "../../../common/tables/PlanRepas";

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


      return router;
    }
}
