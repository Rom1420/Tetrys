import { Component, Input } from '@angular/core';
import { Difficulty } from '../../models/difficulty.model';

@Component({
  selector: 'difficulty-detail',
  templateUrl: './difficulty-detail.component.html',
  styleUrl: './difficulty-detail.component.scss'
})
export class DifficultyDetailComponent {
  @Input() currentDifficulty: Difficulty | null = null;
}
