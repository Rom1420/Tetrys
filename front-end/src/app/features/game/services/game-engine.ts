import { Injectable } from '@angular/core';
import { TetrisBlockId, TetrisPieces } from '../mock/pieces.mock';
import {GameFormService} from "./game-form.service";
import {Subscription} from "rxjs";
import {GameManagerService} from "./game-manager.service";


@Injectable({
  providedIn: 'root'
})
export class GameEngine {
  gameState: (number | null)[][];
  rows: number = 20;
  cols: number = 10;
  currentPiece: { id: number, shape: boolean[][], position: { row: number, col: number } };
  resultWordGame: Subscription;

  constructor(private gameFormService: GameFormService, private gameManagerService:GameManagerService) {
      this.resultWordGame = this.gameFormService.results$.subscribe((wordResult) => {
          this.gameManagerService.captureEvents$.next(1);
          const allResults = this.gameFormService.getResults()
          if (allResults.at(allResults.length - 1).isValid === "true"){
            this.playGame();
          } else {
            this.placeRandomPieceRandomly()
          }

      })
      this.gameState = [];
      this.currentPiece = this.initializePiece(this.getRandomPieceType(), { row: 0, col: 4 });
      this.initGameState();
  }

  getGameState(): (number | null)[][] {
    return this.gameState;
  }

  initializePiece(pieceInfo: { type: keyof typeof TetrisPieces, id: number }, defaultPosition: { row: number, col: number }):
    { id: number, shape: boolean[][], position: { row: number, col: number } }  {
      const shape = TetrisPieces[pieceInfo.type] || [];
      const position = { ...defaultPosition };
      const id = pieceInfo.id;

      return { id, shape, position };
  }

  getPiece(pieceType: keyof typeof TetrisPieces): boolean[][] {
    return TetrisPieces[pieceType] || [];
  }

  isCurrentPieceHere(row: number, col: number): boolean {
    const currentPiecePosition = this.currentPiece.position;
    const pieceShape = this.currentPiece.shape;

    const relativeRow = row - currentPiecePosition.row;
    const relativeCol = col - currentPiecePosition.col;

    if (
      relativeRow >= 0 &&
      relativeRow < pieceShape.length &&
      relativeCol >= 0 &&
      relativeCol < pieceShape[0].length
    ) {
      return true;
    } else {
      return false;
    }
  }

  initGameState(): void {
    for (let row = 0; row < this.rows; row++) {
      this.gameState[row] = [];
      for (let col = 0; col < this.cols; col++) {
        this.gameState[row][col] = null;
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
            this.gameState[newGridRow][newGridCol] = this.currentPiece.id;
          }
        }
      }
      this.currentPiece.position = position;
    }
    else{
      //this.placePiece(this.currentPiece.position);
    }
  }

  dropPiece(): void {
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
    if(this.canRotateTo(this.currentPiece.position, rotatedPieceShape)) {
      this.currentPiece.shape = rotatedPieceShape;
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
          this.gameState[gridRow][gridCol] = null;
        }
      }
    }
  }

  canMoveTo(newPosition: {row: number, col: number}): boolean {
    var i:number = 0;
    try {
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
            if (this.gameState[newRow][newCol] !== null) {
              this.placePiece(this.currentPiece.position);
              return false;
            }
          }
        }
      }
      return true;
    } catch (e){
      console.log('fin de partie');
      this.gameManagerService.endGame$.next(true);
      return false;
    }
  }

  canRotateTo(newPosition: {row: number, col: number}, newShape: boolean[][]): boolean {

    this.clearCurrentPieceFromGameState();

    if (newPosition.row <= 0 || newPosition.row + newShape.length > this.rows || newPosition.col < 0 || newPosition.col + newShape[0].length > this.cols) {
      this.placePiece(this.currentPiece.position);
      return false;
    }

    for (let row = 0; row < newShape.length; row++) {
      for (let col = 0; col < newShape[row].length; col++) {
        if (newShape[row][col]) {
          const newRow: number = newPosition.row + row;
          const newCol: number = newPosition.col + col;
          if (this.gameState[newRow][newCol] !== null) {
            this.placePiece(this.currentPiece.position);
            return false;
          }
        }
      }
    }
    return true;
  }

  getRandomPieceType(): { type: keyof typeof TetrisPieces, id: number } {
    const pieceTypes = Object.keys(TetrisPieces);
    const randomIndex = Math.floor(Math.random() * pieceTypes.length);
    const type = pieceTypes[randomIndex] as keyof typeof TetrisPieces;
    const id = TetrisBlockId[type];
    return { type, id };
  }

  clearCurrentPieceFromGameState(){
    const currentPieceShape = this.currentPiece.shape;
    const currentPosition = this.currentPiece.position;

    for (let row = 0; row < currentPieceShape.length; row++) {
        for (let col = 0; col < currentPieceShape[row].length; col++) {
            if (currentPieceShape[row][col]) {
                const gridRow = currentPosition.row + row;
                const gridCol = currentPosition.col + col;
                this.gameState[gridRow][gridCol] = null;
            }
        }
    }
  }

  placeRandomPieceRandomly(){
      const dropPieceInterval = 100;
      const gameEngineInstance = this;
      const reset = this.gameManagerService;

      function startNewGameLoop() {
        gameEngineInstance.checkAndClearCompletedRows();
        let pieceInfo = gameEngineInstance.getRandomPieceType();
        const randomCol = Math.max(0, Math.floor(Math.random() * (gameEngineInstance.cols - 2 )));
        gameEngineInstance.currentPiece = gameEngineInstance.initializePiece(pieceInfo, { row: 0, col: randomCol });
        function dropPieceRecursive() {
          if (!gameEngineInstance.canMoveTo({ row: gameEngineInstance.currentPiece.position.row + 1, col: gameEngineInstance.currentPiece.position.col })) {
            //startNewGameLoop(); //pour empecher le respawn de pièces
            gameEngineInstance.checkAndClearCompletedRows();
            reset.captureEvents$.next(0);
            reset.resetWords();
            return;
          }
          gameEngineInstance.dropPiece();
          setTimeout(dropPieceRecursive, dropPieceInterval);
        }
        dropPieceRecursive();
      }
      startNewGameLoop();
    }

    /*const gameEngineInstance = this;
    const reset = this.gameManagerService;
    console.log('gameRandom')
    let pieceInfo = this.getRandomPieceType();
    const randomCol = Math.max(0, Math.floor(Math.random() * (this.cols - 2 )));

    this.currentPiece = this.initializePiece(pieceInfo, {row:0, col: randomCol});

    while(this.canMoveTo({row:this.currentPiece.position.row + 1, col:this.currentPiece.position.col})){
      this.dropPiece();
    }
    function resetAll(){
      gameEngineInstance.checkAndClearCompletedRows();
      reset.captureEvents$.next(0);
      reset.resetWords();*/



  playGame() {
    const dropPieceInterval = 1000;
    const gameEngineInstance = this;
    const reset = this.gameManagerService;

    function startNewGameLoop() {
      gameEngineInstance.checkAndClearCompletedRows();
      let pieceInfo = gameEngineInstance.getRandomPieceType();
      gameEngineInstance.currentPiece = gameEngineInstance.initializePiece(pieceInfo, { row: 0, col: 4 });
      function dropPieceRecursive() {
          if (!gameEngineInstance.canMoveTo({ row: gameEngineInstance.currentPiece.position.row + 1, col: gameEngineInstance.currentPiece.position.col })) {
              //startNewGameLoop(); //pour empecher le respawn de pièces
              gameEngineInstance.checkAndClearCompletedRows();
              reset.captureEvents$.next(0);
              reset.resetWords();
              return;
          }
          gameEngineInstance.dropPiece();
          setTimeout(dropPieceRecursive, dropPieceInterval);
      }
      dropPieceRecursive();
    }
  startNewGameLoop();
  }

  checkAndClearCompletedRows(): void {
      for(let row = 0; row < this.rows; row++){
        if(this.isRowComplete(row)){
          this.clearRow(row);
          setTimeout(() => {
            this.moveRowsDown(row);
          }, 500);
        }
      }
  }


  isRowComplete(row: number) {
    for (let col = 0; col < this.cols; col++){
      if(this.gameState[row][col] === null){
        return false;
      }
    }
    return true;
  }

  clearRow(row: number) {
      for(let col = 0; col < this.cols; col ++){
        this.gameState[row][col] = null;
      }
  }

  moveRowsDown(completedRow: number) {
    for (let row = completedRow - 1; row >= 0; row--) {
      for (let col = 0; col < this.cols; col++) {
        //if (!this.isCurrentPieceHere(row, col)) { Utile que dans la version du jue de base
          this.gameState[row + 1][col] = this.gameState[row][col];
        //}
      }
    }
  }


}
