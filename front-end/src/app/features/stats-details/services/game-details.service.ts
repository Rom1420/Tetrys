import { Injectable } from '@angular/core';
import { GAMEDETAILS_LIST } from '../mock/game-details.mock';
import { GameDetails }from '../models/game-details.model';

@Injectable({
  providedIn: 'root'
})
export class GameDetailsService {

  private gameDetailsList: GameDetails[] = GAMEDETAILS_LIST;

  getGameDetails(idJoueur: number, idPartie: number): GameDetails | null {

    const gameDetail: GameDetails | undefined = this.gameDetailsList.find(resume => resume.idJoueur === idJoueur && resume.idPartie === idPartie);
   
    if(gameDetail) {

      return gameDetail;
    }
    else{

      return null;
    }
  }   
}