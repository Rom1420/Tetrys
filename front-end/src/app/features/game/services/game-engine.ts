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
    this.currentPiece = this.initializePiece(this.getRandomPieceType(), { row: 0, col: 4 });  
    this.initGameState();
    console.log("init");
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
    this.clearCellsOccupiedByPiece();
    if(this.canMoveTo(position)) {
      const currentPieceShape: boolean[][] = this.currentPiece.shape; 

      for (let row = 0; row < currentPieceShape.length; row++) {
        for (let col = 0; col < currentPieceShape[row].length; col++) {
          if (currentPieceShape[row][col]) {
            const newGridRow = position.row + row;
            const newGridCol = position.col + col;
            this.gameState[newGridRow][newGridCol] = true; 
          }
        }
      }
      this.currentPiece.position = position;
    }
    else{
      this.placePiece(this.currentPiece.position);
    }
    
  }

  dropPiece(): void {
    // TODO : Verifier qu'on peut colisssions et tout
    const currentPiecePosition: { row: number; col: number; } = this.currentPiece.position;
    this.placePiece({row: currentPiecePosition.row + 1, col:currentPiecePosition.col});
  }
  
  movePieceRight() {
    const currentPiecePosition: { row: number; col: number; } = this.currentPiece.position;
    this.placePiece({row: currentPiecePosition.row, col:currentPiecePosition.col + 1});
  }
  movePieceLeft() {
    const currentPiecePosition: { row: number; col: number; } = this.currentPiece.position;
    this.placePiece({row: currentPiecePosition.row, col:currentPiecePosition.col - 1});
    
  }
  movePieceDown() {
    const currentPiecePosition: { row: number; col: number; } = this.currentPiece.position;
    this.placePiece({row: currentPiecePosition.row + 1, col:currentPiecePosition.col});
  }

  rotatePiece() {
      const oldPieceShape: boolean[][] = this.currentPiece.shape
      const rotatedPieceShape = [];
      const rowNumber = oldPieceShape.length;
      const colNumber = oldPieceShape[0].length;
      this.clearCellsOccupiedByPiece();

      // Parcours des colonnes de la forme actuelle de la pièce
      for (let col = colNumber - 1; col >= 0; col--) {
        const newRow: boolean[] = [];
    
        // Parcours des lignes de haut en bas
        for (let row = 0; row < rowNumber; row++) {
          newRow.push(oldPieceShape[row][col]);
        }
        rotatedPieceShape.push(newRow);
      }
      this.currentPiece.shape = rotatedPieceShape;
      if(this.canMoveTo(this.currentPiece.position)) {
          this.placePiece(this.currentPiece.position);
      }
      else{
        this.currentPiece.shape = oldPieceShape;
        this.placePiece(this.currentPiece.position); 
      } 
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

  canMoveTo(newPosition: {row: number, col: number}): boolean {
    const currentPieceShape: boolean[][] = this.currentPiece.shape;

    this.clearCurrentPieceFromGameState(); 

    if (newPosition.row <= 0 || newPosition.row + currentPieceShape.length > this.rows || newPosition.col < 0 || newPosition.col + currentPieceShape[0].length > this.cols) {
      this.placePiece(this.currentPiece.position);
      return false; 
    }
  
    for (let row = 0; row < currentPieceShape.length; row++) {
      for (let col = 0; col < currentPieceShape[row].length; col++) {
        if (currentPieceShape[row][col]) {
          const newRow: number = newPosition.row + row;
          const newCol: number = newPosition.col + col;
          if (this.gameState[newRow][newCol]) {
            this.placePiece(this.currentPiece.position);
            return false;
          }
        }
      }
    }
    return true; 
  }


  getRandomPieceType(): keyof typeof TetrisPieces{
    const pieceTypes = Object.keys(TetrisPieces);
    const randomIndex = Math.floor(Math.random() * pieceTypes.length);
    return pieceTypes[randomIndex] as keyof typeof TetrisPieces;
  } 
  
  clearCurrentPieceFromGameState(){
    const currentPieceShape = this.currentPiece.shape;
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


  playGame() {
    const dropPieceInterval = 1000; 
    const gameEngineInstance = this;
    
    function startNewGameLoop() {
      let piece = gameEngineInstance.getRandomPieceType();
      gameEngineInstance.currentPiece = gameEngineInstance.initializePiece(piece, { row: 0, col: 4 });
      function dropPieceRecursive() {
          if (!gameEngineInstance.canMoveTo({ row: gameEngineInstance.currentPiece.position.row + 1, col: gameEngineInstance.currentPiece.position.col })) {
              startNewGameLoop(); 
              return;
          }
          gameEngineInstance.dropPiece();
          setTimeout(dropPieceRecursive, dropPieceInterval); 
      }
      dropPieceRecursive();
  }
  startNewGameLoop(); 
}
}

