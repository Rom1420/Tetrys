import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { GameEngine } from '../../services/game-engine';

@Component({
  selector: 'game-board',
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss'
})

export class GameBoardComponent {
  rows: number = 20;
  cols: number = 10;
  gameState: boolean[][] = [];
  boardCells: any [] = [];

  @ViewChild('board') boardRef!: ElementRef;

  constructor(private gameEngine: GameEngine, private renderer: Renderer2){}


  ngOnInit(): void {
    this.generateBoard();
    this.gameEngine.playGame();
    this.gameEngine.placePiece({ row:0, col:4 })
    this.gameState = this.gameEngine.getGameState();  
  }

  generateBoard(): void {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.boardCells.push({ row, col });
      }
    }
  }
}
