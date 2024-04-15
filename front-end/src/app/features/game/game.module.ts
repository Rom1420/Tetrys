import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { GameComponent } from './game.component';
import  { WordComponent } from './components/word/word.component';
import { TetrysGamingComponent } from './components/tetrys-gaming/tetrys-gaming.component';
import { GameBoardComponent } from './components/game-board/game-board.component';  
import { GameEventComponent } from './components/game-event/game-event.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BlockComponent } from './components/block/block.component';
import { BlockWordComponent } from './components/block-word/block-word.component';
import { StatsDetailsModule } from '../stats-details/stats-details.module';


@NgModule({
  declarations: [
    WordComponent,
    GameComponent,
    TetrysGamingComponent,
    GameBoardComponent,
    GameEventComponent,
    BlockComponent,
    BlockWordComponent,
  ],
    imports: [
        CommonModule,
        NgOptimizedImage,
        ReactiveFormsModule,
        FormsModule,
        StatsDetailsModule,
    ],
  exports: [
    GameComponent,
    WordComponent,
    GameBoardComponent,
    GameEventComponent,
  ]
})

export class GameModule { }
