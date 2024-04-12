import { Injectable } from '@angular/core';
import { GAMERESUME_LIST } from '../mock/difficulty.mock';
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

  getGameResumeList(): GameResume[] {
    return this.gameResumeList;
  }

  /**
   * Cette fonction récupère tous les résumés de partie d'un joueur
   * @param idJoueur L'identifiant du joueur
   * @returns Les résumés de partie du joueur  ou une erreur si aucun résumé n'est trouvé
   */
  getGameResumesOfPlayer(idJoueur: number): Observable<GameResume[]> {
    const gameResumes: GameResume[] = this.gameResumeList.filter(resume => resume.idJoueur === idJoueur);
    if (gameResumes.length > 0) {
      this.gameResumesSubject.next(gameResumes);
    } else {
      this.gameResumesSubject.next([]);
    }
    return this.gameResumesSubject.asObservable();
  }

  /**
   * Cette fonction récupère le résumé de jeu d'un joueur pour une partie spécifique
   * @param idJoueur L'identifiant du joueur
   * @param idPartie L'identifiant de la partie
   * @returns Le résumé de jeu du joueur pour la partie spécifiée ou une erreur si aucun résumé n'est trouvé
   */
  getGameResumeOfPlayer(idJoueur: number, idPartie: number): Observable<GameResume> {
    const gameResume: GameResume | undefined = this.gameResumeList.find(resume => resume.idJoueur === idJoueur && resume.idPartie === idPartie);
    if (gameResume) {
      return of(gameResume);
    } else {
      return throwError("Le joueur n'a pas encore joué cette partie.");
    }
  }
}