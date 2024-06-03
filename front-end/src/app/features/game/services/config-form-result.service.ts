import { Injectable } from '@angular/core';
import {ConfigModel} from "../models/config.model";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ConfigFormResultService {
  public formResults = new BehaviorSubject<ConfigModel>({errorAllowed: true, length: 6, name: "débutant", time: 1.5, userId: 0});    //settings niveau moyen par défault
  public configActual$ = this.formResults.asObservable()

  constructor(private router:Router) {}

  getConfig() {
    return this.formResults.value;
  }

  setConfig(config: ConfigModel) {
    this.formResults.next(config);
  }

  startGameWithConfiguration(config:ConfigModel){
    this.router.navigate(["/game"]).catch(error => {
      console.error('Erreur de navigation :', error);});
  }
}
