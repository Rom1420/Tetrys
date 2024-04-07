import { Injectable } from '@angular/core';
import {ConfigModel} from "../models/config.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConfigFormResultService {
  public formResults = new BehaviorSubject<ConfigModel[]>([{time: 0.6, length: 10, errorAllowed: false}]);    //settings niveau moyen par défault
  public configActual$ = this.formResults.asObservable()

  constructor() {}

  addResult(result: ConfigModel) {
    this.formResults.value.push(result);
  }

  getResults() {
    return this.formResults;
  }

  getLastConfig() {
    return this.formResults.value[this.formResults.value.length - 1];
  }
}
