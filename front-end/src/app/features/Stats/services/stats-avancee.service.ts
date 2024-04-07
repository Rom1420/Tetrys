import {Injectable} from "@angular/core";
import {StatAvancee} from "../models/stat-avancee.model";
import {STATS_AVANCEES_LIST} from "../mock/stats-avancee.mock";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})


export class StatsAvanceeService {
  public statsAvanceeList$: BehaviorSubject<StatAvancee[]> = new BehaviorSubject(STATS_AVANCEES_LIST);

}
