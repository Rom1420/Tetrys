import { Injectable } from '@angular/core';
import {ConfigModel} from "../models/config.model";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ConfigFormResultService {
  public formResults = new BehaviorSubject<ConfigModel[]>([{name: "test", time: 16, length: 10, errorAllowed: false}, {name:"test2", time:0.8, length:12, errorAllowed:true}]);    //settings niveau moyen par défault
  public configActual$ = this.formResults.asObservable()

  constructor(private router:Router) {}

  addResult(result: ConfigModel) {
    this.formResults.value.push(result)
    this.formResults.next(this.formResults.value);
  }

  getResults() {
    return this.formResults.value;
  }

  getLastConfig() {
    return this.formResults.value[this.formResults.value.length - 1];
  }

  startGameWithConfiguration(config:ConfigModel){
    this.deleteConfiguration(config);
    this.formResults.value.push(config)
    this.formResults.next(this.formResults.value);
    this.router.navigate(["/game"]).catch(error => {
      console.error('Erreur de navigation :', error);});
  }

  deleteConfiguration(config: ConfigModel){
    this.formResults.next(this.formResults.value.filter(conf => conf   !== config));
    console.log(this.formResults.value)
  }
}
