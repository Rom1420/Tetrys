import { Injectable } from '@angular/core';
import {ConfigModel} from "../models/config.model";

@Injectable({
  providedIn: 'root'
})
export class ConfigFormResultService {
  formResults: ConfigModel[] = [];

  constructor() {}

  addResult(result: ConfigModel) {
    this.formResults.push(result);
    console.log(this.formResults);
  }

  getResults() {
    return this.formResults;
  }
}
