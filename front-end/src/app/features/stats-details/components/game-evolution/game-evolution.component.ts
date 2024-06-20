import { Component, Input, SimpleChanges } from '@angular/core';
import { GAMEDETAILS_LIST } from '../../mock/game-details.mock';
import { GameDetailsService } from '../../services/game-details.service';
import { GameDetails } from '../../models/game-details.model';

@Component({
  selector: 'game-evolution',
  templateUrl: './game-evolution.component.html',
  styleUrl: './game-evolution.component.scss'
})
export class GameEvolutionComponent {
  @Input() selectedGameId: number | null = null;
  @Input() selectedPlayerId: number | null = null;
  
  gameDetailsList: GameDetails[] = GAMEDETAILS_LIST;
  selectedGameDetails: GameDetails | null =null;
  selectedPlayerGameDetailsList: GameDetails[] | null = null;

  precisionGlobalEvolution: number | null = null;
  speedGlobalEvolution: number | null = null;
  precisionLastGameEvolution: number | null = null;
  speedLastGameEvolution: number | null = null;

  constructor(public gameDetailsService: GameDetailsService) {}
  
  ngOnChanges(changes: SimpleChanges){
    if (changes['selectedPlayerId'] && changes['selectedGameId']) {
      
      const playerId = changes['selectedPlayerId'].currentValue;
      const gameId = changes['selectedGameId'].currentValue;

      if (playerId && gameId) {
        this.gameDetailsService.getGameDetails(playerId, gameId)
        .subscribe({
        next: (details: GameDetails) => {
          this.selectedGameDetails = details;
        },
        error: () => {
          console.error("Erreur lors de la récupération du détails de la partie.");
        }
      });
        this.selectedPlayerGameDetailsList = this.gameDetailsList.filter(student => student.idJoueur == playerId);
        this.updateGameEvolution();
      }
    }
  }

  updateGameEvolution() {
    if (!this.selectedPlayerId || !this.selectedGameId || !this.selectedPlayerGameDetailsList || !this.selectedGameDetails) {
      return;
    }

    const totalGames = this.selectedPlayerGameDetailsList.length;
  
    const aggregateStats = this.selectedPlayerGameDetailsList.reduce((accumulator, game) => {
      if (game.idPartie !== this.selectedGameDetails?.idPartie) {
        accumulator.precisionPercentage += game.precisionPercentage;
        accumulator.wordsPerMinute += game.wordsPerMinute;
      }
      return accumulator;
    }, { precisionPercentage: 0, wordsPerMinute: 0 });

    const averagePrecisionPercentage = aggregateStats.precisionPercentage / totalGames;
    const averageWordsPerMinute = aggregateStats.wordsPerMinute / totalGames;
  
    this.precisionGlobalEvolution = Math.round(((this.selectedGameDetails.precisionPercentage - averagePrecisionPercentage) / averagePrecisionPercentage) * 100);
    this.speedGlobalEvolution = Math.round(((this.selectedGameDetails.wordsPerMinute - averageWordsPerMinute) / averageWordsPerMinute) * 100);
    
    if (totalGames > 1) {
      const lastGame = this.selectedPlayerGameDetailsList[totalGames - 1];
      this.precisionLastGameEvolution = Math.round(((this.selectedGameDetails.precisionPercentage - lastGame.precisionPercentage) / lastGame.precisionPercentage) * 100);
      this.speedLastGameEvolution = Math.round(((this.selectedGameDetails.wordsPerMinute - lastGame.wordsPerMinute) / lastGame.wordsPerMinute) * 100);
    }
    else{
      this.precisionLastGameEvolution = 0;
      this.speedLastGameEvolution = 0;
    }
  }
}
