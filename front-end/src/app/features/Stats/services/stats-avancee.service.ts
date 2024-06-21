import {Injectable} from "@angular/core";
import {StatAvancee} from "../models/stat-avancee.model";
import {BehaviorSubject, Observable, combineLatest} from "rxjs";
import { HttpClient } from '@angular/common/http';
import { StudentService } from "src/app/core/components/services/student.service";
import {backUrl} from "../../../../environnement/environnement";

@Injectable({
  providedIn: 'root'
})

export class StatsAvanceeService {

  private statsAvanceeSubject = new BehaviorSubject<StatAvancee | null>(null);
  public statsAvancee$ = this.statsAvanceeSubject.asObservable();
  private statsUrl = backUrl + '/stats';

  private selectedGameModeSubject = new BehaviorSubject<String>('general');
  selectedGameMode$ = this.selectedGameModeSubject.asObservable();

  constructor(private http: HttpClient, private studentService : StudentService) {
    combineLatest([this.studentService.selectedStudentId$, this.selectedGameMode$])
    .subscribe(([studentId, gameMode]) => {
      if(studentId && gameMode){
        this.fetchStatAvancee(studentId, gameMode);
      }
    });
  }

  fetchStatAvancee(studentId: number, gameMode: String): void {
    const requestUrl = `${this.statsUrl}/${studentId}/${gameMode}`;
    this.http.get<StatAvancee>(requestUrl).subscribe(
      statAvancee => {
        this.statsAvanceeSubject.next(statAvancee);
      },
      error => console.error("Erreur lors de la récupération des statistiques", error)
    );
  }

  setGameMode(gameMode: String): void {
    this.selectedGameModeSubject.next(gameMode);
  }
}
