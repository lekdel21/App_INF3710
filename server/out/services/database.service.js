"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const inversify_1 = require("inversify");
const pg = require("pg");
require("reflect-metadata");
let DatabaseService = class DatabaseService {
    constructor() {
        this.connectionConfig = {
            user: "postgres",
            database: "postgres",
            password: "root",
            port: 5432,
            host: "localhost",
            keepAlive: true
        };
        this.pool = new pg.Pool(this.connectionConfig);
    }
    //      ======== GET TABLE ========        //
    getAllFromTable(tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            const res = yield client.query(`SELECT * FROM LivraisonDB.${tableName};`);
            client.release();
            return res;
        });
    }
    //      ======== ADD ========        //
    createPlan(plan) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            if (!plan.numeroplan || !plan.numerofournisseur || !plan.categorie || !plan.frequence ||
                !plan.nbrfrequence || !plan.nbrcalories || !plan.prix)
                throw new Error("Invalid create plan values");
            const values = [
                plan.numeroplan,
                plan.numerofournisseur,
                plan.categorie,
                plan.frequence,
                plan.nbrfrequence,
                plan.nbrcalories,
                plan.prix
            ];
            const queryText = `INSERT INTO LIVRAISONDB.PlanRepas VALUES($1, $2, $3, $4, $5, $6, $7);`;
            const res = yield client.query(queryText, values);
            client.release();
            return res;
        });
    }
    //      ======== DELETE ========        //
    deletePlan(planNb) {
        return __awaiter(this, void 0, void 0, function* () {
            if (planNb.length === 0)
                throw new Error("Invalid delete query");
            const client = yield this.pool.connect();
            const query = `DELETE FROM LIVRAISONDB.planrepas WHERE numeroplan = '${planNb}';`;
            const res = yield client.query(query);
            client.release();
            return res;
        });
    }
    //      ======== UPDATE ========        //
    updatePlan(plan) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            let toUpdateValues = [];
            if (plan.numerofournisseur.length > 0)
                toUpdateValues.push(`name = '${plan.numerofournisseur}'`);
            if (plan.categorie.length > 0)
                toUpdateValues.push(`city = '${plan.categorie}'`);
            if (plan.frequence.length > 0)
                toUpdateValues.push(`name = '${plan.frequence}'`);
            if (plan.nbrfrequence.length > 0)
                toUpdateValues.push(`city = '${plan.nbrfrequence}'`);
            if (plan.nbrcalories.length > 0)
                toUpdateValues.push(`name = '${plan.nbrcalories}'`);
            if (plan.prix.length > 0)
                toUpdateValues.push(`city = '${plan.prix}'`);
            if (!plan.numeroplan || plan.numeroplan.length === 0 || toUpdateValues.length === 0)
                throw new Error("Invalid plan update query");
            const query = `UPDATE LivraisonDB.planrepas SET ${toUpdateValues.join(", ")} WHERE numeroplan = '${plan.numeroplan}';`;
            const res = yield client.query(query);
            client.release();
            return res;
        });
    }
    //      ======== GET CATEGORIES ========        //
    getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            const res = yield client.query("SELECT DISTINCT categorie FROM LIVRAISONDB.planrepas;");
            client.release();
            return res;
        });
    }
    //      ======== GET CATEGORIES ========        //
    getFournisseurs() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            const res = yield client.query("SELECT DISTINCT nomfournisseur FROM LIVRAISONDB.fournisseur;");
            client.release();
            return res;
        });
    }
};
DatabaseService = __decorate([
    (0, inversify_1.injectable)()
], DatabaseService);
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=database.service.js.map