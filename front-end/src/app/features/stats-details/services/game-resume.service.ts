import { Injectable } from '@angular/core';
import { GAMERESUME_LIST } from '../mock/game-resume.mock';
import { GameResume }from '../models/game-resume.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { serverUrl, httpOptionsBase } from '../../../../configs/server.config';

@Injectable({
  providedIn: 'root'
})
export class GameResumeService {

  private gameResumeList: GameResume[] = GAMERESUME_LIST;
  private gameResumesSubject: BehaviorSubject<GameResume[]> = new BehaviorSubject<GameResume[]>([]);
  private gameResumeUrl = serverUrl + '/gameResumes/';
  private httpOptions = httpOptionsBase;

  constructor(private http:HttpClient) {
    this.gameResumesSubject.next([]);
  }

  /**
   * Cette fonction récupère le résumé de jeu d'un joueur pour une partie spécifique
   * @param idJoueur L'identifiant du joueur
   * @param idPartie L'identifiant de la partie
   * @returns Le résumé de jeu du joueur pour la partie spécifiée ou une erreur si aucun résumé n'est trouvé
   */
  getGameResume():void{
    console.log(this.gameResumeUrl)
    this.http.get<GameResume[]>(this.gameResumeUrl).subscribe((gameResumeList) => {
      this.gameResumeList = gameResumeList;
      this.gameResumesSubject.next(this.gameResumeList);
    });
  }
  getGameResumesOfPlayer(idJoueur: number): void{
    const url = `${this.gameResumeUrl}/students/${idJoueur}/gameResumes`;
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
  }

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