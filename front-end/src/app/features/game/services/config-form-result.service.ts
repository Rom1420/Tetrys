import { Injectable } from '@angular/core';
import {ConfigModel} from "../models/config.model";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ConfigFormResultService {
  public formResults = new BehaviorSubject<ConfigModel>({errorAllowed: false, length: 0, name: "", time: 0, userId: 0});    //settings niveau moyen par défault
  public configActual$ = this.formResults.asObservable()

  constructor(private router:Router) {}

  getConfig() {
    return this.formResults.value;
  }

  startGameWithConfiguration(config:ConfigModel){
    this.formResults.next(config);
    this.router.navigate(["/game"]).catch(error => {
      console.error('Erreur de navigation :', error);});
  }
}
