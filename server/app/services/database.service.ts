import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";

//import { PlanRepas } from "../../../common/tables/Planrepas";
//import { Fournisseur } from "../../../common/tables/Fournisseur";

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
        port: 5433,          // Attention ! Peut aussi être 5433 pour certains utilisateurs
        host: "localhost",
        keepAlive: true
    };
    
    public pool: pg.Pool = new pg.Pool(this.connectionConfig);
    
    //      ======== GET TABLE ========        //
    public async getAllFromTable(tableName: string): Promise<pg.QueryResult> {
        const client = await this.pool.connect();
        const res = await client.query(`SELECT * FROM LivraisonDB.${tableName};`);
        client.release();
        return res;
    }

    //      ======== ADD ========        //
    public async createPlan(plan: PlanRepas): Promise<pg.QueryResult> {
        const client = await this.pool.connect();

        if (!plan.numerofournisseur || !plan.categorie || !plan.frequence ||
            !plan.nbrfrequence || !plan.nbrcalories || !plan.prix)
            throw new Error("Invalid create plan values");

        const numeroplan = await this.getNextPlanId();
        const numerofournisseur = parseInt(plan.numerofournisseur);
        const categorie = "'" + plan.categorie + "'";
        const frequence = parseInt(plan.frequence);
        const nbrfrequence = parseInt(plan.nbrfrequence);
        const nbrcalories = parseInt(plan.nbrcalories);
        const prix = parseFloat(plan.prix).toFixed(2);

        const queryText: string = `INSERT INTO LIVRAISONDB.Planrepas VALUES(${numeroplan.rows[0].max + 1}, ${numerofournisseur}, ${categorie},
        ${frequence}, ${nbrfrequence}, ${nbrcalories}, ${prix});`;

        const res = await client.query(queryText);
        
        client.release();
        return res;
    }

    //      ======== DELETE ========        //
    public async deletePlan(planNb: string): Promise<pg.QueryResult> {
        if (planNb.length === 0) throw new Error("Invalid delete query");

        const client = await this.pool.connect();
        const query = `DELETE FROM LIVRAISONDB.planrepas WHERE numeroplan = '${planNb}';`;

        const res = await client.query(query);
        client.release();
        return res;
    }

    //      ======== UPDATE ========        //
    public async updatePlan(plan: PlanRepas): Promise<pg.QueryResult> {
        const client = await this.pool.connect();

        let toUpdateValues = [];

        if (plan.numerofournisseur.length > 0) toUpdateValues.push(`numerofournisseur = '${plan.numerofournisseur}'`);
        if (plan.categorie.length > 0) toUpdateValues.push(`categorie = '${plan.categorie}'`);
        if (plan.frequence.length > 0) toUpdateValues.push(`frequence = '${plan.frequence}'`);
        if (plan.nbrfrequence.length > 0) toUpdateValues.push(`nbrfrequence = '${plan.nbrfrequence}'`);
        if (plan.nbrcalories.length > 0) toUpdateValues.push(`nbrcalories = '${plan.nbrcalories}'`);
        if (plan.prix.length > 0) toUpdateValues.push(`prix = '${plan.prix}'`);

        if (!plan.numeroplan || plan.numeroplan.length === 0 || toUpdateValues.length === 0)
            throw new Error("Invalid plan update query");

        const query = `UPDATE LivraisonDB.planrepas SET ${toUpdateValues.join(", ")} WHERE numeroplan = '${plan.numeroplan}';`;
        const res = await client.query(query);
        client.release();
        return res;
    }

    //      ======== GET CATEGORIES ========        //
    public async getCategories(): Promise<pg.QueryResult> {
        const client = await this.pool.connect();
        const res = await client.query("SELECT DISTINCT categorie FROM LIVRAISONDB.planrepas;");
        client.release();
        return res;
    }

    //      ======== GET FOURNISSEURS ========        //
    public async getFournisseurs(): Promise<pg.QueryResult> {
        const client = await this.pool.connect();
        const res = await client.query("SELECT DISTINCT numerofournisseur, nomfournisseur FROM LIVRAISONDB.fournisseur;");
        client.release();
        return res;
    }

    public async getNextPlanId(): Promise<pg.QueryResult>{
        const client = await this.pool.connect();
        const res = await client.query("SELECT MAX(numeroplan) FROM LIVRAISONDB.planrepas;");
        client.release();
        return res;
    }

}
