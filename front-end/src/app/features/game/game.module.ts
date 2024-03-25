import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { GameComponent } from './game.component';
import  { WordGameComponent } from './components/word-game/word-game.component';
import { TetrysGamingComponent } from './components/tetrys-gaming/tetrys-gaming.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { GameEngine } from './services/game-engine';



@NgModule({
  declarations: [
    WordGameComponent,
    GameComponent,
    TetrysGamingComponent,
    GameBoardComponent,
  ],
    imports: [
        CommonModule,
        NgOptimizedImage,
    ],
    providers: [
      GameEngine,
    ],
  exports: [
    GameComponent,
    WordGameComponent,
    GameBoardComponent,
  ]
})

export class GameModule { }
