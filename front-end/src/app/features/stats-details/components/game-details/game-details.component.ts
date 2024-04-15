import { Component, Input, SimpleChanges } from '@angular/core';
import { GameDetailsService } from '../../services/game-details.service';
import { GameDetails } from '../../models/game-details.model';

@Component({
  selector: 'game-details',
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.scss'
})
export class GameDetailsComponent {
  @Input() selectedGameId: number | null = null;
  @Input() selectedPlayerId: number | null = null;
  gameDetails: GameDetails | null = null;
  
  constructor(private gameDetailsService: GameDetailsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedPlayerId'] && changes['selectedGameId']) {
      
      const playerId = changes['selectedPlayerId'].currentValue;
      const gameId = changes['selectedGameId'].currentValue;

      if (playerId && gameId) {
        this.updateGameDetails(playerId, gameId);
      }
    }
  }

  private updateGameDetails(selectedPlayerId: number, selectedGameId: number): void {
    this.gameDetails = this.gameDetailsService.getGameDetails(selectedPlayerId, selectedGameId);
  }

  


}
