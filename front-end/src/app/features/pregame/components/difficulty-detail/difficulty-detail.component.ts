import { Component, Input } from '@angular/core';
import { Difficulty } from '../../models/difficulty.model';

@Component({
  selector: 'difficulty-detail',
  templateUrl: './difficulty-detail.component.html',
  styleUrl: './difficulty-detail.component.scss'
})
export class DifficultyDetailComponent {
  @Input() currentDifficulty: Difficulty | null = null;

  getDifficultyClass(): string {
    switch (this.currentDifficulty?.id) {
        case 1:
            return 'debutant';
        case 2:
            return 'intermediaire';
        case 3:
            return 'avance';
        case 4:
            return 'perso';
        default:
            return '';
    }
}
}
