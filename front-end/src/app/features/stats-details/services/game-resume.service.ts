import { Injectable } from '@angular/core';
import { GAMERESUME_LIST } from '../mock/difficulty.mock';
import { GameResume }from '../models/game-resume.model';

@Injectable({
  providedIn: 'root'
})
export class GameResumeService {

  private gameResumeList: GameResume[] = GAMERESUME_LIST;

  getGameResumeList(): GameResume[] {
    return this.gameResumeList;
  }

  /**
 * Cette fonction récupère le résumé de jeu d'un joueur pour une partie spécifique
 * @param idJoueur L'identifiant du joueur
 * @param idPartie L'identifiant de la partie
 * @returns Le résumé de jeu du joueur pour la partie spécifiée ou une erreur si aucun résumé n'est trouvé
 */
  getGameResumeOfPlayer(idJoueur: number, idPartie: number): GameResume | Error{

    for(const resume of this.gameResumeList){
      if(resume.idJoueur === idJoueur && resume.idPartie === idPartie){
        return resume;    
      }
    }

    throw new Error("Le joueur n'a pas encore joué.");

  }
}
