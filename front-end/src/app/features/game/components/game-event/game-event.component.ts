import { Component, HostListener } from '@angular/core';
import { GameEngine } from '../../services/game-engine';

@Component({
  selector: 'game-event',
  template: '',
  styles: ['']
})
export class GameEventComponent {

  constructor(private gameEngine: GameEngine) { }

  @HostListener('document:keydown', ['$event']) 
  handleKeyboardEvent(event: KeyboardEvent) {
    switch(event.key) {
      case 'ArrowLeft':
        // surement appel a is moovable to direction 
        this.gameEngine.movePieceLeft();
        break;
      case 'ArrowRight':
        // surement appel a is moovable to direction
        this.gameEngine.movePieceRight();
        break;
        case 'ArrowDown':
          // surement appel a is moovable to direction
      this.gameEngine.movePieceDown();
      break;
    }
  }
}