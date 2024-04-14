import { Component, Output } from '@angular/core';
import { PopupService } from './services/popup.service';
import { Difficulty } from './models/difficulty.model';

@Component({
  selector: 'app-pregame',
  templateUrl: './pregame.component.html',
  styleUrl: './pregame.component.scss',

})
export class PregameComponent {
  constructor(public popupService: PopupService){}
  public showConfig: boolean = false;
  selectedDifficulty: Difficulty | null = null;


  onDifficultyHover(difficulty: Difficulty): void {
    this.showConfig = difficulty.id == 4;
    if (this.showConfig){
      this.selectedDifficulty = null;
    }else {
      this.selectedDifficulty = difficulty;
    }

  }

  onDifficultyHoverEnd(): void {
    this.selectedDifficulty = null;
  }
}
