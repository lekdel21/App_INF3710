"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseController = void 0;
const express_1 = require("express");
const inversify_1 = require("inversify");
//import { PlanRepas } from './../../../common/tables/Planrepas';
//import { Fournisseur } from './../../../common/tables/Fournisseur';
const database_service_1 = require("../services/database.service");
const types_1 = require("../types");
let DatabaseController = class DatabaseController {
    constructor(
    // @ts-ignore -- À ENLEVER LORSQUE L'IMPLÉMENTATION EST TERMINÉE
    databaseService) {
        this.databaseService = databaseService;
    }
    get router() {
        const router = (0, express_1.Router)();
        //      ======== PLANREPAS ========        //
        router.get("/list", (req, res, _) => {
            this.databaseService
                .getAllFromTable("planrepas")
                .then((result) => {
                res.json(result.rows);
            })
                .catch((e) => {
                console.error(e.stack);
            });
        });
        router.get("/add:Categories", (req, res, _) => {
            this.databaseService
                .getCategories()
                .then((result) => {
                const categories = result.rows.map((plan) => ({
                    categorie: plan.categorie,
                }));
                res.json(categories);
            })
                .catch((e) => {
                console.error(e.stack);
            });
        });
        router.post("/add", (req, res, _) => {
            const plan = {
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
                .then((result) => {
                res.json(result.rowCount);
            })
                .catch((e) => {
                console.error(e.stack);
                res.json(-1);
            });
        });
        router.post("/delete/:planNb", (req, res, _) => {
            const planNb = req.params.numeroplan;
            this.databaseService
                .deletePlan(planNb)
                .then((result) => {
                res.json(result.rowCount);
            })
                .catch((e) => {
                console.error(e.stack);
            });
        });
        router.put("/modify", (req, res, _) => {
            const plan = {
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
                .then((result) => {
                res.json(result.rowCount);
            })
                .catch((e) => {
                console.error(e.stack);
            });
        });
        //      ======== FOURNISSEUR ========        //
        router.get("/add", (req, res, _) => {
            this.databaseService
                .getFournisseurs()
                .then((result) => {
                const fournisseurs = result.rows.map((fournisseur) => ({
                    numerofournisseur: fournisseur.numerofournisseur,
                    nomfournisseur: fournisseur.nomfournisseur,
                }));
                res.json(fournisseurs.filter(function (fournisseur) { return fournisseur.nomfournisseur != null; }));
            })
                .catch((e) => {
                console.error(e.stack);
            });
        });
        return router;
    }
};
DatabaseController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.default.DatabaseService)),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], DatabaseController);
exports.DatabaseController = DatabaseController;
//# sourceMappingURL=database.controller.js.map