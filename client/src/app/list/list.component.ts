import { Component, OnInit } from '@angular/core';
import { PlanRepas } from "../../../../common/tables/Planrepas";
import { CommunicationService } from "../services/communication.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public plans: PlanRepas[] = [];

  public constructor(private communicationService: CommunicationService) {}

  public ngOnInit(): void {
    this.getPlans();
  }
  public getPlans(): void {
    this.communicationService.getPlans().subscribe((plans: PlanRepas[]) => {
      this.plans = plans;
    });
}

}
