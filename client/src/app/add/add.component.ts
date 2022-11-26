import { Component, OnInit } from '@angular/core';
import { PlanRepas } from "../../../../common/tables/Planrepas";
import { Fournisseur } from "../../../../common/tables/Fournisseur";
import { CommunicationService } from "../services/communication.service";


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public categories: PlanRepas[] = [];
  public fournisseur: Fournisseur[] = [];

  constructor(private communicationService: CommunicationService) { }

  ngOnInit(): void {
    this.getFournisseurs();
    this.getCategories();
  }

  public getFournisseurs(): void {
    this.communicationService.getFournisseurs().subscribe((fournisseur: Fournisseur[]) => {
      this.fournisseur = fournisseur;
    });
  }

  public getCategories(): void {
    this.communicationService.getCategories().subscribe((categories: PlanRepas[]) => {
      this.categories = categories;
    });
  }
}
