import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DifficultyButtonComponent } from './components/difficulty-button/difficulty-button.component';
import { DifficultyListComponent } from './components/difficulty-list/difficulty-list.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentComponent } from './components/student/student.component';
import { AddProfilButtonComponent } from './components/add-profil-button/add-profil-button/add-profil-button.component';
import { PregameComponent } from './pregame.component';
import { PopupComponent } from './components/popup-add-profil/popup-add-profil.component';


@NgModule({
  declarations: [
    DifficultyButtonComponent,
    DifficultyListComponent,
    PregameComponent,
    StudentComponent,
    StudentListComponent,
    AddProfilButtonComponent,
    PopupComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DifficultyListComponent,
    DifficultyButtonComponent,
    PregameComponent,
    StudentComponent,
    StudentListComponent,
    AddProfilButtonComponent,
    PopupComponent
  ]
})
export class PregameModule { }