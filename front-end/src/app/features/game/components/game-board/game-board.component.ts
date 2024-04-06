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
	gameState: (number | null)[][] = [];

	@ViewChild('board') boardRef!: ElementRef;

	constructor(private gameEngine: GameEngine, private renderer: Renderer2){}


	ngOnInit(): void {
	//this.gameEngine.playGame();
	this.gameState = this.gameEngine.getGameState();
	}

}
