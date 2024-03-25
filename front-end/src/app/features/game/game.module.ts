import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { GameComponent } from './game.component';
import  { WordGameComponent } from './components/word-game/word-game.component';
import { TetrysGamingComponent } from './components/tetrys-gaming/tetrys-gaming.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    WordGameComponent,
    GameComponent,
    TetrysGamingComponent
  ],
    imports: [
        CommonModule,
        NgOptimizedImage,
        ReactiveFormsModule,
        FormsModule,
    ],
  exports: [
    GameComponent,
    WordGameComponent
  ]
})
export class GameModule { }
