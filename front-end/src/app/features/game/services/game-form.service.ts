import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameFormService {
  formResults: any[] = [];
  public results$ = new BehaviorSubject<any[]>(this.formResults);

  constructor() {}

  addResult(result: any) {
    this.formResults.push(result);
    this.results$.next([...this.formResults]);
  }

  getResults() {
    return this.formResults;
  }
}
