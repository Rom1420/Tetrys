import { Component, HostListener } from '@angular/core';
import { GameEngine } from '../../services/game-engine';
import {GameManagerService} from "../../services/game-manager.service";

@Component({
  selector: 'game-event',
  template: '',
  styles: ['']
})
export class GameEventComponent {
  captureEvents: boolean = true;

  constructor(private gameEngine: GameEngine, private gameManagerService:GameManagerService) {
    this.gameManagerService.captureEvents$.subscribe((value) => {
      this.captureEvents = !this.captureEvents;
    })
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.captureEvents){
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
        case 'ArrowUp':
          this.gameEngine.rotatePiece();
          break;
      }
    }
  }
}
