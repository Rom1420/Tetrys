import { Injectable } from '@angular/core';
import { GAMERESUME_LIST } from '../mock/game-resume.mock';
import { GameResume }from '../models/game-resume.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { serverUrl, httpOptionsBase } from '../../../../configs/server.config';
import { StudentService } from 'src/app/core/components/services/student.service';
import {backUrl} from "../../../../environnement/environnement";

@Injectable({
  providedIn: 'root'
})
export class GameResumeService {
  public gameResumes$: BehaviorSubject<GameResume[]> = new BehaviorSubject<GameResume[]>([]);
  private gameResumeUrl = `${backUrl}/gameResumes`;
  private httpOptions = httpOptionsBase;
  private idJoueur: number | null = 0;

  constructor(private http: HttpClient, private studentService: StudentService) {
    this.studentService.selectedStudentId$.subscribe((value) => {
      console.log("selectedstudentid", value);
      if (value && value > 0) { // Fetch only if value is greater than 0
        this.fetchAndBroadcastGameResume(value);
      }
      this.idJoueur = value;
    });
  }

  private fetchAndBroadcastGameResume(studentId: number): void {
    if (studentId > 0) {
      const requestUrl = `${this.gameResumeUrl}/students/${studentId}`;
      console.log(`Fetching GameResumes for studentId: ${studentId} from ${requestUrl}`);
      this.http.get<GameResume[]>(requestUrl).subscribe(
        gameResumes => {
          this.gameResumes$.next(gameResumes);
        },
        error => console.error('Erreur lors de la récupération des gameResumes', error)
      );
    }
  }

  getGameResume(idJoueur: number, idPartie: number): Observable<GameResume> {
    const url = `${this.gameResumeUrl}/students/${idJoueur}/parties/${idPartie}`;
    return this.http.get<GameResume>(url, this.httpOptions);
  }

  createGameResume(gameMode: string, gameScore: number, gameStars: number, date: string): Observable<GameResume> {
    const url = `${this.gameResumeUrl}/students/${this.idJoueur}`;
    const gameResume = { gameMode, gameScore, gameStars, date };

    return this.http.post<GameResume>(url, gameResume, this.httpOptions).pipe(
      catchError(error => {
        console.error('Erreur lors de la création du gameResume', error);
        throw error;
      })
    );
  }

  getGameResumesOfPlayer(idJoueur: number): Observable<GameResume[]> {
    return this.gameResumes$.asObservable();
  }
}
