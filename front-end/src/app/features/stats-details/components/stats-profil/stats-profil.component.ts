import { Component, Input } from '@angular/core';

@Component({
  selector: 'stats-profil',
  templateUrl: './stats-profil.component.html',
  styleUrl: './stats-profil.component.scss'
})
export class StatsProfilComponent {
  @Input() selectedPlayerName: String | undefined;

}
