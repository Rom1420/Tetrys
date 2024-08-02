import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { BehaviorSubject, filter, switchMap } from "rxjs";
import { GameResume } from "src/app/features/stats-details/models/game-resume.model";
import { GameResumeService } from "src/app/features/stats-details/services/game-resume.service";
import { StatsDetailsService } from "src/app/features/stats-details/services/stats-details.service";

@Component({
  selector: 'stat-game',
  templateUrl: './stat-game.component.html',
  styleUrls: ['./stat-game.component.scss']
})
export class StatGameComponent implements OnChanges, OnInit {
  @Input() playerId: number = 1;
  gameResumes: GameResume[] = [];
  private playerId$ = new BehaviorSubject<number>(0);

  constructor(
    private gameResumeService: GameResumeService,
    private statsDetailsService: StatsDetailsService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('playerId' in changes && changes['playerId'].currentValue !== changes['playerId'].previousValue) {
      if (this.playerId > 0) { 
        this.playerId$.next(this.playerId);
      }
    }
  }

  ngOnInit(): void {
    this.playerId$.pipe(
      filter(id => id > 0), 
      switchMap(id => this.gameResumeService.getGameResumesOfPlayer(id))
    ).subscribe({
      next: (resumes: GameResume[]) => {
        this.gameResumes = resumes;
        this.gameResumes.reverse();
      },
      error: () => {
        console.log("Le joueur sélectionné n'a pas encore testé ce super jeu.");
      }
    });

    // Initial load
    if (this.playerId > 0) {
      this.playerId$.next(this.playerId);
    }
  }

  selectGame(id: any) {
    this.statsDetailsService.selectedGameId(id);
  }
}