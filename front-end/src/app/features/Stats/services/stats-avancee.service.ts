import {Injectable} from "@angular/core";
import {StatAvancee} from "../models/stat-avancee.model";
import {STATS_AVANCEES_LIST} from "../mock/stats-avancee.mock";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})


export class StatsAvanceeService {
  public selectedGameModeSubject$: BehaviorSubject<String> = 
            new BehaviorSubject<String>("");
  public selectedGameMode$ = 
          this.selectedGameModeSubject$.asObservable();


  private statAvanceeList: StatAvancee[] = STATS_AVANCEES_LIST;
  private statAvanceeSubject: BehaviorSubject<StatAvancee[]> = new BehaviorSubject<StatAvancee[]>([]);

  constrcutor(){
    this.statAvanceeSubject.next([]);
  }


  onSelectGameMode(gameMode: String): void {
    this.selectedGameModeSubject$.next(gameMode);
  }

  getStatAvancee(idJoueur: number, gameMode: String): StatAvancee | null {
    const statAvancee: StatAvancee | undefined = this.statAvanceeList.find(statAvancee => statAvancee.idJoueur === idJoueur && statAvancee.mode === gameMode);
    if(statAvancee){
      return statAvancee;
    }
    else {
      return null;
    }
  }
}
