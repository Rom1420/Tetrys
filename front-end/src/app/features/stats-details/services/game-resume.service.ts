import { Injectable } from '@angular/core';
import { GAMERESUME_LIST } from '../mock/game-resume.mock';
import { GameResume }from '../models/game-resume.model';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameResumeService {

  private gameResumeList: GameResume[] = GAMERESUME_LIST;
  private gameResumesSubject: BehaviorSubject<GameResume[]> = new BehaviorSubject<GameResume[]>([]);

  constructor() {
    this.gameResumesSubject.next([]);
  }

  /**
   * Cette fonction récupère le résumé de jeu d'un joueur pour une partie spécifique
   * @param idJoueur L'identifiant du joueur
   * @param idPartie L'identifiant de la partie
   * @returns Le résumé de jeu du joueur pour la partie spécifiée ou une erreur si aucun résumé n'est trouvé
   */
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
  }
}