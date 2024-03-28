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
  
    this.clearCellsOccupiedByPiece();

    for (let row = 0; row < currentPieceShape.length; row++) {
      for (let col = 0; col < currentPieceShape[row].length; col++) {
        if (currentPieceShape[row][col]) {
          const newGridRow = position.row + row;
          const newGridCol = position.col + col;
          this.gameState[newGridRow][newGridCol] = true; 
        }
      }
    }
    console.log("après rotation",position);
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
    const currentPieceShape: boolean[][] = this.currentPiece.shape
    const rotatedPieceShape = [];
    const rowNumber = currentPieceShape.length;
    const colNumber = currentPieceShape[0].length;
    this.clearCellsOccupiedByPiece();

    // Parcours des colonnes de la forme actuelle de la pièce
    for (let col = colNumber - 1; col >= 0; col--) {
      const newRow: boolean[] = [];
  
      // Parcours des lignes de haut en bas
      for (let row = 0; row < rowNumber; row++) {
        newRow.push(currentPieceShape[row][col]);
      }
      rotatedPieceShape.push(newRow);
    }
    this.currentPiece.shape = rotatedPieceShape;
    console.log(this.currentPiece.position.row, this.currentPiece.position.col);
    this.placePiece(this.currentPiece.position);
  }

  clearCellsOccupiedByPiece() {
    const currentPieceShape: boolean[][] = this.currentPiece.shape;
    const currentPosition = this.currentPiece.position;
  
    for (let row = 0; row < currentPieceShape.length; row++) {
      for (let col = 0; col < currentPieceShape[row].length; col++) {
        if (currentPieceShape[row][col]) {
          const gridRow = currentPosition.row + row;
          const gridCol = currentPosition.col + col;
          this.gameState[gridRow][gridCol] = false; 
        }
      }
    }
  }

  playGame(): void {
    /** setInterval(() => {
      this.dropPiece(); 
    }, 1000);*/ 
  }
}
