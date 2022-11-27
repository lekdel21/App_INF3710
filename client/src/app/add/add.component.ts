import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { PlanRepas } from "../../../../common/tables/Planrepas";
import { Fournisseur } from "../../../../common/tables/Fournisseur";
import { CommunicationService } from "../services/communication.service";


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  @ViewChild("numerofournisseur") numerofournisseur: ElementRef;
  @ViewChild("categorie") categorie: ElementRef;
  @ViewChild("frequence") frequence: ElementRef;
  @ViewChild("nbrfrequence") nbrfrequence: ElementRef;
  @ViewChild("nbrcalories") nbrcalories: ElementRef;
  @ViewChild("prix") prix: ElementRef;

  supplier = '2';
  category = "vegetarien";

  public plans: PlanRepas[] = [];
  public fournisseur: Fournisseur[] = [];

  public duplicateError: boolean = false;

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
      this.plans = categories;
    });
  }

  private refresh() {
    this.getFournisseurs();
    this.getCategories();
    this.numerofournisseur.nativeElement.value = this.supplier;
    this.categorie.nativeElement.value = this.category;
    this.nbrfrequence.nativeElement.value = "10";
    this.frequence.nativeElement.value = "2";
    this.nbrcalories.nativeElement.value = "500";
    this.prix.nativeElement.value = "100.00";
  }

  public insertPlan(): void {
    const plan: PlanRepas = {
      numeroplan: "",
      numerofournisseur: this.supplier,
      categorie: this.category,
      frequence: this.frequence.nativeElement.value,
      nbrfrequence: this.nbrfrequence.nativeElement.value,
      nbrcalories: this.nbrcalories.nativeElement.value,
      prix: this.prix.nativeElement.value,
    };

    this.communicationService.insertPlan(plan).subscribe((res: number) => {
      if (res > 0) {
        this.communicationService.filter("update");
      }
      this.refresh();
      this.duplicateError = res === -1;
    });
  }

}
