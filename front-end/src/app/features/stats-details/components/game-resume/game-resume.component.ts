import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges} from '@angular/core';
import { GameResumeService } from '../../services/game-resume.service';
import{ GameResume } from '../../models/game-resume.model';

@Component({
  selector: 'game-resume',
  templateUrl: './game-resume.component.html',
  styleUrl: './game-resume.component.scss'
})
export class GameResumeComponent implements OnInit{
  @Input() selectedGameId: number | null = null;
  @Input() selectedPlayerId: number | null = null;
  gameResume: GameResume | null = null;

  constructor(private gameResumeService: GameResumeService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.gameResumeService.gameResumes$.subscribe(gameResume => {
      if(Array.isArray(gameResume)){
        this.gameResume = gameResume[0];
      } else {
        this.gameResume = gameResume;
      }
    });
  }
  
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
    this.gameResumeService.getGameResume(selectedPlayerId, selectedGameId)
      .subscribe({
        next: (resume: GameResume) => {
          this.gameResume = resume;
        },
        error: () => {
          console.error("Erreur lors de la récupération du résumé de jeu.");
        }
      });
  }
}
