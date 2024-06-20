import { Injectable } from '@angular/core';
import { GAMERESUME_LIST } from '../mock/game-resume.mock';
import { GameResume }from '../models/game-resume.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { serverUrl, httpOptionsBase } from '../../../../configs/server.config';
import { StudentService } from 'src/app/core/components/services/student.service';

@Injectable({
  providedIn: 'root'
})
export class GameResumeService {

  public gameResumes: GameResume[] = GAMERESUME_LIST;
  public gameResumes$: BehaviorSubject<GameResume[]> = new BehaviorSubject(this.gameResumes);
  private gameResumeUrl = serverUrl + '/gameResumes';
  private httpOptions = httpOptionsBase;
  private idJoueur: number | null = 0;

  constructor(private http:HttpClient, private studentService:StudentService) {
    this.studentService.selectedStudentId$.subscribe((value) => {
      if(value){
        this.fetchGameResume(value);
      }
    });
  }
  fetchGameResume(studentId: number):void {
    const requestUrl =`${this.gameResumeUrl}/students/${studentId}`;
    console.log("Requête vers : ", requestUrl);
    console.log("param pour le fetch : ", studentId);
    this.http.get<GameResume[]>(requestUrl).subscribe(
      gameResume => {
        console.log("Données récupérées:", gameResume);
        this.gameResumes=gameResume;
        this.gameResumes$.next(this.gameResumes)
      },
      error => console.error("Erreur lors de la récupération des gameResumes", error)
    );
  }
  getGameResume(idJoueur: number, idPartie: number): Observable<GameResume> {
    const url = `${this.gameResumeUrl}/students/${idJoueur}/parties/${idPartie}`;
    const gameResume = this.http.get<GameResume>(url, this.httpOptions);
    return gameResume;
  }   

  getGameResumesOfPlayer(idJoueur: number): Observable<GameResume[]> {
    const gameResumes: GameResume[] = this.gameResumes.filter(resume => resume.idJoueur === idJoueur);
    console.log('dqdkdsdksdk',gameResumes);
    if (gameResumes.length > 0) {
      this.gameResumes$.next(gameResumes);
    } else {
      this.gameResumes$.next([]);
    }
    return this.gameResumes$.asObservable();
  }
}