import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DifficultyButtonComponent } from './components/difficulty-button/difficulty-button.component';
import { DifficultyListComponent } from './components/difficulty-list/difficulty-list.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentComponent } from './components/student/student.component';

import { PregameComponent } from './pregame.component';


@NgModule({
  declarations: [
    DifficultyButtonComponent,
    DifficultyListComponent,
    PregameComponent,
    StudentComponent,
    StudentListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DifficultyListComponent,
    DifficultyButtonComponent,
    PregameComponent,
    StudentComponent,
    StudentListComponent
  ]
})
export class PregameModule { }