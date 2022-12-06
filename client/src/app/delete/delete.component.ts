import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../services/communication.service';
import { PlanRepas } from "../../../../common/tables/Planrepas";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

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
