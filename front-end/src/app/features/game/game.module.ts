import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { GameComponent } from './game.component';
import  { WordGameComponent } from './components/word-game/word-game.component';
import { TetrysGamingComponent } from './components/tetrys-gaming/tetrys-gaming.component';
import { BoardComponent } from './components/board/board.component';
import { PieceComponent } from './components/piece/piece.component';
import { GameEngineComponent } from './components/game-engine/game-engine.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    WordGameComponent,
    GameComponent,
    TetrysGamingComponent,
    BoardComponent,
    PieceComponent,
    GameEngineComponent
  ],
    imports: [
        CommonModule,
        NgOptimizedImage,
        ReactiveFormsModule,
        FormsModule,
    ],
  exports: [
    GameComponent,
    WordGameComponent,
    BoardComponent
  ]
})
export class GameModule { }
