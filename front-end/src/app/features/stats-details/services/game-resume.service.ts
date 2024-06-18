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

  private gameResumeList: GameResume[] = GAMERESUME_LIST;
  private gameResumesSubject: BehaviorSubject<GameResume[]> = new BehaviorSubject<GameResume[]>([]);
  private gameResumeUrl = serverUrl + '/gameResumes';
  private httpOptions = httpOptionsBase;
  private idJoueur: number | null = 0;

  constructor(private http:HttpClient, private studentService:StudentService) {
    studentService.selectedStudentId$.subscribe((value) => {
      this.idJoueur = value;
    })
    this.retrieveGameResumes();
  }

  
  retrieveGameResumes():void{
    this.http.get<GameResume[]>(this.gameResumeUrl).subscribe((list) => {
      this.gameResumeList = (list.filter((gameResume)=> gameResume.idJoueur == this.idJoueur));
    });
  }

  getGameResume(idJoueur: number, idPartie: number): Observable<GameResume> {
    const url = `${this.gameResumeUrl}/students/${idJoueur}/parties/${idPartie}`;
    return this.http.get<GameResume>(url, this.httpOptions);
  }

  getGameResumesOfPlayer(idJoueur: number): Observable<GameResume[]> {
    const url = `${this.gameResumeUrl}/students/${idJoueur}/parties`;
    return this.http.get<GameResume[]>(url, this.httpOptions).pipe(
      tap((gameResumeList) => {
        this.gameResumeList = gameResumeList;
        this.gameResumesSubject.next(this.gameResumeList);
      }),
    );
  }
  addGameResumeForPlayer(idJoueur: number, gameResume: GameResume): void {
    const url = `${this.gameResumeUrl}/students/${idJoueur}/parties`;
    this.http.post<GameResume>(url, gameResume, this.httpOptions).subscribe({
      next: (newGameResume) => {
        this.gameResumeList.push(newGameResume);
        this.gameResumesSubject.next(this.gameResumeList);
        console.log('GameResume added', newGameResume);
      },
      error: (err) => {
        console.error('Error adding GameResume', err);
      }
    });
  }


  /*
  getGameResume(idJoueur: number, idPartie: number):void{
    const url = `${this.gameResumeUrl}/students/${idJoueur}/parties/${idPartie}`;
      this.http.get<GameResume[]>(url).subscribe((list) =>{
      this.gameResumeList = list;
      this.gameResumesSubject.next(this.gameResumeList);
    });
  }
  getGameResumesOfPlayer(idJoueur: number): void {
    const url = `${this.gameResumeUrl}/students/${idJoueur}/parties`;
      this.http.get<GameResume[]>(url).subscribe((gameResumeList) =>{
      this.gameResumeList = gameResumeList;
      this.gameResumesSubject.next(this.gameResumeList);
    });
  }
  addGameResumeForPlayer(idJoueur: number, gameResume: GameResume):void{
    const url = `${this.gameResumeUrl}/students/${idJoueur}/gameResumes`;
    this.http.post<GameResume>(url, gameResume).subscribe({
      next: (gameResume) => {
        console.log('gameResume added', gameResume);
      },
      error: (err) => {
        console.error('Error adding gameResume', err);
      }
    });
  }*/

  /*
  getGameResume(idJoueur: number, idPartie: number): GameResume | null {
    const gameResume: GameResume | undefined = this.gameResumeList.find(resume => resume.idJoueur === idJoueur && resume.idPartie === idPartie);
    if(gameResume) {
      return gameResume;
    }
    else{
      return null;
    }
  }   

  getGameResumesOfPlayer(idJoueur: number): Observable<GameResume[]> {
    const gameResumes: GameResume[] = this.gameResumeList.filter(resume => resume.idJoueur === idJoueur);
    if (gameResumes.length > 0) {
      this.gameResumesSubject.next(gameResumes);
    } else {
      this.gameResumesSubject.next([]);
    }
    return this.gameResumesSubject.asObservable();
  }*/
}