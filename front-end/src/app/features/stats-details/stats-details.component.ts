import { Component } from '@angular/core';
import { StatsDetailsService } from './services/stats-details.service';

@Component({
  selector: 'stats-details',
  templateUrl: './stats-details.component.html',
  styleUrl: './stats-details.component.scss'
})
export class StatsDetailsComponent {
  selectedPlayerId: number | null = null;
  selectedGameId: number | null = null;
  selectedPlayerName: String | undefined;

  constructor(private statsDetailsService: StatsDetailsService) {}

  ngOnInit(): void {
    this.statsDetailsService.selectedGameId$.subscribe((gameId: number) => {
      this.selectedGameId = gameId;
    });
    this.selectedPlayerName = this.statsDetailsService.selectedPlayerName;
    this.selectedPlayerId = this.statsDetailsService.selectedPlayerId;
  }
}
