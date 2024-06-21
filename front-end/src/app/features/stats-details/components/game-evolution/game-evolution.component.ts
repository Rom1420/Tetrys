import { Component, Input, SimpleChanges } from '@angular/core';
import { GAMEDETAILS_LIST } from '../../mock/game-details.mock';
import { GameDetailsService } from '../../services/game-details.service';
import { StudentService } from 'src/app/core/components/services/student.service';
import { GameDetails } from '../../models/game-details.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

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

  constructor(public gameDetailsService: GameDetailsService, public studentService: StudentService) {}
  
  ngOnInit(): void {
    this.gameDetailsService.getAllGameDetails()
    .subscribe({
      next: (details: GameDetails[]) => {
        this.gameDetailsList = details;
      },
      error: () => {
        console.error("Erreur lors de la récupération du détails de la partie.");
      }
    });
  }

  ngOnChanges(changes: SimpleChanges){
    this.gameDetailsService.getAllGameDetails()
    .subscribe({
      next: (details: GameDetails[]) => {
        this.gameDetailsList = details;
        if (changes['selectedPlayerId'] && changes['selectedGameId']) {
      
          const playerId = changes['selectedPlayerId'].currentValue;
          const gameId = changes['selectedGameId'].currentValue;
    
          if (playerId && gameId) {
            this.gameDetailsService.getGameDetails(playerId, gameId)
            .subscribe({
            next: (details: GameDetails) => {
              this.selectedGameDetails = details;
              this.selectedPlayerGameDetailsList = this.gameDetailsList.filter(student => student.idJoueur == playerId);
              this.updateGameEvolution();
            },
            error: () => {
              console.error("Erreur lors de la récupération du détails de la partie.");
            }
          });
          /*
            console.log('plaayerID',playerId)
            console.log('la liste de con de merde',this.gameDetailsList);
            this.selectedPlayerGameDetailsList = this.gameDetailsList.filter(student => student.idJoueur == playerId);
            console.log('carotte',this.selectedPlayerGameDetailsList);
            this.updateGameEvolution();*/
          }
        }
      },
      error: () => {
        console.error("Erreur lors de la récupération du détails de la partie.");
      }
    });
  }

  updateGameEvolution() {
    if (!this.selectedPlayerId || !this.selectedGameId || !this.selectedPlayerGameDetailsList || !this.selectedGameDetails) {
      return;
    }
    const totalGames = this.selectedPlayerGameDetailsList.length;
    console.log('TOTAAL',totalGames);
  
    const aggregateStats = this.selectedPlayerGameDetailsList.reduce((accumulator, game) => {
      if (game.idPartie !== this.selectedGameDetails?.idPartie) {
        accumulator.precisionPercentage += game.precisionPercentage;
        accumulator.wordsPerMinute += game.wordsPerMinute;
      }
      return accumulator;
    }, { precisionPercentage: 0, wordsPerMinute: 0 });
    console.log('agreagreagrreee',aggregateStats);

    const averagePrecisionPercentage = aggregateStats.precisionPercentage / totalGames;
    console.log('moyenne de la precision',averagePrecisionPercentage);
    const averageWordsPerMinute = aggregateStats.wordsPerMinute / totalGames;
    console.log('moyenne des mots par min',averageWordsPerMinute);
  
    this.precisionGlobalEvolution = Math.round(((this.selectedGameDetails.precisionPercentage - averagePrecisionPercentage) / averagePrecisionPercentage) * 100);
    this.speedGlobalEvolution = Math.round(((this.selectedGameDetails.wordsPerMinute - averageWordsPerMinute) / averageWordsPerMinute) * 100);
    
    if (totalGames > 1) {
      this.selectedPlayerGameDetailsList.reverse();
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
