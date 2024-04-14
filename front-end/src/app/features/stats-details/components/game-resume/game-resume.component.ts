import { Component, Input, SimpleChanges} from '@angular/core';
import { GameResumeService } from '../../services/game-resume.service';
import{ GameResume } from '../../models/game-resume.model';

@Component({
  selector: 'game-resume',
  templateUrl: './game-resume.component.html',
  styleUrl: './game-resume.component.scss'
})
export class GameResumeComponent {
  @Input() selectedGameId: number | null = null;
  @Input() selectedPlayerId: number | null = null;
  gameResume: GameResume | null = null;

  constructor(private gameResumeService: GameResumeService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedPlayerId'] && changes['selectedGameId']) {
      
      const playerId = changes['selectedPlayerId'].currentValue;
      const gameId = changes['selectedGameId'].currentValue;

      if (playerId && gameId) {
        this.updateGameResume(playerId, gameId);
      }
    }
  }

  private updateGameResume(selectedPlayerId: number, selectedGameId: number): void {
    this.gameResume = this.gameResumeService.getGameResume(selectedPlayerId, selectedGameId);
  }
}
