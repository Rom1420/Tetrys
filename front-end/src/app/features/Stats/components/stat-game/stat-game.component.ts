import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { GameResume } from "src/app/features/stats-details/models/game-resume.model";
import { GameResumeService } from "src/app/features/stats-details/services/game-resume.service";
import { StatsDetailsService } from "src/app/features/stats-details/services/stats-details.service";

@Component({
  selector: 'stat-game',
  templateUrl: './stat-game.component.html',
  styleUrls: ['./stat-game.component.scss']
})
export class StatGameComponent implements OnChanges {
  @Input() playerId: number = 1;
  gameResumes: GameResume[] = [];

  constructor(private gameResumeService: GameResumeService,
    private statsDetailsService: StatsDetailsService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('playerId' in changes) {
      this.loadGameResumes();
    }
  }

  loadGameResumes(): void {
    this.gameResumeService.getGameResumesOfPlayer(this.playerId)
      .subscribe({
        next: (resumes: GameResume[]) => {
          this.gameResumes = resumes; 
        },
        error: () => {
          console.log("Le joueur sélectionné n'a pas encore testé ce super jeu. Le nullos..."); 
        }
      });
  }

  selectGame(id: any) {
    this.statsDetailsService.selectedGameId(id);
  }

}
