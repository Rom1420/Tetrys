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

  public studentId: number = 0;
  
  public selectedGameModeSubject$: BehaviorSubject<String> = 
            new BehaviorSubject<String>("");
  public selectedGameMode$ = 
          this.selectedGameModeSubject$.asObservable();

  private statByStudentIdAndGameMode: StatAvancee;
  public statByStudentIdAndGameMode$: BehaviorSubject<StatAvancee> = new BehaviorSubject<StatAvancee>(STATS_AVANCEES_LIST[0]);

  private statAvanceeSubject: BehaviorSubject<StatAvancee[]> = new BehaviorSubject<StatAvancee[]>([]);

  private statsUrl = serverUrl + '/stats';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient){
    this.statByStudentIdAndGameMode = { idJoueur: 0,
                                        mode: 'general',
                                        wpm: 0,
                                        scoreMoyen: 0,
                                        pourcentageErreur: 0};
    this.statAvanceeSubject.next([]);
  }

  onSelectGameMode(gameMode: String): void {
    this.selectedGameModeSubject$.next(gameMode);
  }

  setStatAvancee( gameMode: String) {
    const requestUrl = this.statsUrl + '/' + this.studentId + '/' + gameMode;
    console.log("route :" + requestUrl);
    this.http.get<StatAvancee>(requestUrl).subscribe((statAvancee) => {
      this.statByStudentIdAndGameMode = statAvancee;
      this.statByStudentIdAndGameMode$.next(this.statByStudentIdAndGameMode);
  });
  console.log(gameMode);
    /*this.http.get<StatAvancee>(requestUrl).subscribe((stat) => {
      callback(stat
    });*/
  }

  updateStatsForStudent(studentId: number, gameMode: String) {
    this.studentId = studentId;
    this.setStatAvancee(gameMode);
  }

}
