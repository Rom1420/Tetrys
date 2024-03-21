import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameComponent } from './game.component';
import  { WordGameComponent } from './components/word-game/word-game.component';


@NgModule({
  declarations: [
    WordGameComponent,
    GameComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    GameComponent,
    WordGameComponent
  ]
})
export class GameModule { }