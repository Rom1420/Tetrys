import {Injectable} from "@angular/core";
import {StatAvancee} from "../models/stat-avancee.model";
import {STATS_AVANCEES_LIST} from "../mock/stats-avancee.mock";
import {BehaviorSubject} from "rxjs";
import { serverUrl, httpOptionsBase } from 'configs/server.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class StatsAvanceeService {
  public selectedGameModeSubject$: BehaviorSubject<String> = 
            new BehaviorSubject<String>("");
  public selectedGameMode$ = 
          this.selectedGameModeSubject$.asObservable();

  private statByStudentIdAndGameMode: StatAvancee | undefined;
  private statByStudentIdAndGameMode$: BehaviorSubject<StatAvancee> = new BehaviorSubject<StatAvancee>(STATS_AVANCEES_LIST[0]);

  private statAvanceeSubject: BehaviorSubject<StatAvancee[]> = new BehaviorSubject<StatAvancee[]>([]);

  private statsUrl = serverUrl + '/stats';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient){
    this.statAvanceeSubject.next([]);
  }

  onSelectGameMode(gameMode: String): void {
    this.selectedGameModeSubject$.next(gameMode);
  }

  getStatAvancee(idJoueur: number, gameMode: String, callback: (stat: StatAvancee) => void): void {
    const requestUrl = this.statsUrl + '/' + idJoueur + '/' + gameMode;
    
    this.http.get<StatAvancee>(requestUrl).subscribe((stat) => {
      callback(stat);
    });
  }
}
