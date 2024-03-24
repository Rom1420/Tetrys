import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { GameComponent } from './game.component';
import  { WordGameComponent } from './components/word-game/word-game.component';
import { TetrysGamingComponent } from './components/tetrys-gaming/tetrys-gaming.component';


@NgModule({
  declarations: [
    WordGameComponent,
    GameComponent,
    TetrysGamingComponent
  ],
    imports: [
        CommonModule,
        NgOptimizedImage,
    ],
  exports: [
    GameComponent,
    WordGameComponent
  ]
})
export class GameModule { }
