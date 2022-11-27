// À DÉCOMMENTER ET À UTILISER LORSQUE VOTRE COMMUNICATION EST IMPLÉMENTÉE
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { Fournisseur } from "../../../../common/tables/Fournisseur";
import { PlanRepas } from "../../../../common/tables/Planrepas";
import { of, Observable, Subject } from "rxjs";

@Injectable()
export class CommunicationService {
  // À DÉCOMMENTER ET À UTILISER LORSQUE VOTRE COMMUNICATION EST IMPLÉMENTÉE
  private readonly BASE_URL: string = "http://localhost:3000/database";
  public constructor(private readonly http: HttpClient) {}

  private _listeners: any = new Subject<any>();

  public listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  public filter(filterBy: string): void {
    this._listeners.next(filterBy);
  }

  //      ======== LIST ========        //
  public getPlans(): Observable<PlanRepas[]> {
    return this.http
      .get<PlanRepas[]>(this.BASE_URL + "/list")
      .pipe(catchError(this.handleError<PlanRepas[]>("getPlans")));
  }

  //      ======== ADD ========        //
  public getCategories(): Observable<PlanRepas[]> {
    return this.http
      .get<PlanRepas[]>(this.BASE_URL + "/add:Categories")
      .pipe(catchError(this.handleError<PlanRepas[]>("getPlans")));
  }

  public getFournisseurs(): Observable<Fournisseur[]> {
    return this.http
      .get<Fournisseur[]>(this.BASE_URL + "/add")
      .pipe(catchError(this.handleError<Fournisseur[]>("getFournisseurs")));
  }

  public insertPlan(plan: PlanRepas): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/add", plan)
      .pipe(catchError(this.handleError<number>("insertPlan")));
  }


  // À DÉCOMMENTER ET À UTILISER LORSQUE VOTRE COMMUNICATION EST IMPLÉMENTÉE
  private handleError<T>(
    request: string,
    result?: T
    ): (error: Error) => Observable<T> {
      return (error: Error): Observable<T> => {
      return of(result as T);
     };
  }
}
