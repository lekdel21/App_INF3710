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

  public plan: PlanRepas[] = [];
  public fournisseur: Fournisseur[] = [];

  constructor(private communicationService: CommunicationService) { }

  ngOnInit(): void {
    this.getFournisseurs();
    this.getPlans();
  }

  public getFournisseurs(): void {
    this.communicationService.getFournisseurs().subscribe((fournisseur: Fournisseur[]) => {
      this.fournisseur = fournisseur;
    });
  }

  public getPlans(): void {
    this.communicationService.getPlans().subscribe((plan: PlanRepas[]) => {
      this.plan = plan;
    });
  }
}
