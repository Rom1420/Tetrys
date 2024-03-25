  import { Injectable } from '@angular/core';
  import { TetrisPieces } from '../mock/pieces.mock';


  @Injectable({
    providedIn: 'root'
  })
  export class GameEngine {
    
    
    gameState: boolean[][]; 
    rows: number = 20;
    cols: number = 10;
    currentPiece: {shape: boolean[][], position: { row: number, col: number } };

    constructor() {
      this.gameState = [];  
      this.currentPiece = this.initializePiece('LPiece', { row: 0, col: 0 });  
      this.initGameState();
    }

    getGameState(): boolean[][] {
      return this.gameState;
    }

    initializePiece(pieceType: keyof typeof TetrisPieces, defaultPosition: { row: number, col: number }): 
      { shape: boolean[][], position: { row: number, col: number } }  {
        const shape = TetrisPieces[pieceType] || [];
        const position = { ...defaultPosition }; 

        return {shape, position };
    }
    
    getPiece(pieceType: keyof typeof TetrisPieces): boolean[][] {
      return TetrisPieces[pieceType] || [];
    }
  
    initGameState(): void {
      for (let row = 0; row < this.rows; row++) {
        this.gameState[row] = [];
        for (let col = 0; col < this.cols; col++) {
          this.gameState[row][col] = false;
        }
      }
    }

    placePiece(position: { row: number, col: number }): void {
      const currentPieceShape: boolean[][] = this.currentPiece.shape
      const oldPosition = this.currentPiece.position;
    
      for (let row = 0; row < currentPieceShape.length; row++) {
        for (let col = 0; col < currentPieceShape[row].length; col++) {
          if (currentPieceShape[row][col]) {
            const oldGridRow = oldPosition.row + row;
            const oldGridCol = oldPosition.col + col;
            this.gameState[oldGridRow][oldGridCol] = false;

            const newGridRow = position.row + row;
            const newGridCol = position.col + col;
            this.gameState[newGridRow][newGridCol] = true; 
          } 
        }
      }

      for (let row = 0; row < currentPieceShape.length; row++) {
        for (let col = 0; col < currentPieceShape[row].length; col++) {
          if (currentPieceShape[row][col]) {
            const gridRow = position.row + row;
            const gridCol = position.col + col;
            this.gameState[gridRow][gridCol] = true; 
          }
        }
      }
      this.currentPiece.position = position;
    }

    dropPiece(): void {
      // TODO : Verifier qu'on peut colisssions et tout
      const currentPiecePosition: { row: number; col: number; } = this.currentPiece.position;
      if (currentPiecePosition.row < 17) {

        this.placePiece({row: currentPiecePosition.row + 1, col:currentPiecePosition.col});
      }
    }
    
    movePieceRight() {
      const currentPiecePosition: { row: number; col: number; } = this.currentPiece.position;
      if (currentPiecePosition.col < 8) {

        this.placePiece({row: currentPiecePosition.row, col:currentPiecePosition.col + 1});
      }
    }
    movePieceLeft() {
      const currentPiecePosition: { row: number; col: number; } = this.currentPiece.position;
      if (currentPiecePosition.col > 0) {

        this.placePiece({row: currentPiecePosition.row, col:currentPiecePosition.col - 1});
      }
    }
    movePieceDown() {
      const currentPiecePosition: { row: number; col: number; } = this.currentPiece.position;
      if (currentPiecePosition.row < 17) {

        this.placePiece({row: currentPiecePosition.row + 1, col:currentPiecePosition.col});
      }
    }
    rotatePiece() {
      throw new Error('Method not implemented.');
    }

    playGame(): void {
      setInterval(() => {
        this.dropPiece(); 
      }, 1000); 
    }
  }
