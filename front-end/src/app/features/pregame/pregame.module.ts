import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DifficultyButtonComponent } from './components/difficulty-button/difficulty-button.component';
import { DifficultyListComponent } from './components/difficulty-list/difficulty-list.component';
import { PregameComponent } from './pregame.component';


@NgModule({
  declarations: [
    DifficultyButtonComponent,
    DifficultyListComponent,
    PregameComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DifficultyListComponent,
    DifficultyButtonComponent,
    PregameComponent
  ]
})
export class PregameModule { }