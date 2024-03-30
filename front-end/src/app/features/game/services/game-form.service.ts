import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameFormService {
  formResults: any[] = [];
  public results$ = new BehaviorSubject(this.formResults);

  constructor() {}

  addResult(result: any) {
    this.formResults.push(result);
    this.results$.next(result)
  }

  getResults() {
    return this.formResults;
  }
}
