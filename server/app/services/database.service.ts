import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";

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

    public async getAllFromTable(tableName: string): Promise<pg.QueryResult> {
        const client = await this.pool.connect();
        const res = await client.query(`SELECT * FROM LivraisonDB.${tableName};`);
        client.release();
        return res;
    }


    // Get PlanRepas. Also use to filter them.
    public async filterPlans(numPlan: number, category: string = "", price: string = ""): Promise<pg.QueryResult> {
        const client = await this.pool.connect();

        const searchTerms: string[] = [];
        if (numPlan >= 0) searchTerms.push(`numeroplan = '${numPlan}'`);
        if (category.length > 0) searchTerms.push(`categorie = '${category}'`);
        if (price.length > 0) searchTerms.push(`prix = '${price}'`);

        let queryText = "SELECT * FROM TP4_database.Planrepas";
        if (searchTerms.length > 0)
            queryText += " WHERE " + searchTerms.join(" AND ");
        queryText += ";";

        const res = await client.query(queryText);
        client.release();
        return res;
    }
}
