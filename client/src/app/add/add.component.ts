import { Component, OnInit } from '@angular/core';
import { PlanRepas } from "../../../../common/tables/Planrepas";
import { CommunicationService } from "../services/communication.service";


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public plans: PlanRepas[] = [];

  constructor(private communicationService: CommunicationService) { }

  ngOnInit(): void {
    this.getPlans();
  }
  public getPlans(): void {
    this.communicationService.getPlans().subscribe((plans: PlanRepas[]) => {
      this.plans = plans;
    });
  }
}
