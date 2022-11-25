import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";

//import { Plans } from "../../../common/tables/Planrepas";

interface PlanRepas {
    numeroplan: string;
    numerofournisseur: string;
    categorie: string;
    frequence: string;
    nbrfrequence: string;
    nbrcalories: string;
    prix: string;
}

@injectable()
export class DatabaseService {
    public connectionConfig: pg.ConnectionConfig = {
        user: "postgres",
        database: "postgres",
        password: "root",
        port: 5432,          // Attention ! Peut aussi être 5433 pour certains utilisateurs
        host: "localhost",
        keepAlive: true
    };

    public pool: pg.Pool = new pg.Pool(this.connectionConfig);

    // get all plans repas
    public async getAllFromTable(tableName: string): Promise<pg.QueryResult> {
        const client = await this.pool.connect();
        const res = await client.query(`SELECT * FROM LivraisonDB.${tableName};`);
        client.release();
        return res;
    }

    // Add PlanRepas
    public async createPlan(plan: PlanRepas): Promise<pg.QueryResult> {
        const client = await this.pool.connect();

        if (!plan.numeroplan || !plan.numerofournisseur || !plan.categorie || !plan.frequence ||
            !plan.nbrfrequence || !plan.nbrcalories || !plan.prix)
            throw new Error("Invalid create plan values");

        const values: string[] = [
            plan.numeroplan,
            plan.numerofournisseur,
            plan.categorie,
            plan.frequence,
            plan.nbrfrequence,
            plan.nbrcalories,
            plan.prix
        ];

        const queryText: string = `INSERT INTO LIVRAISONDB.PlanRepas VALUES($1, $2, $3, $4, $5, $6, $7);`;

        const res = await client.query(queryText, values);
        client.release();
        return res;
    }
}
