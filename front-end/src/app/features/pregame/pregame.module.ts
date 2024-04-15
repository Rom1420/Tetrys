import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DifficultyButtonComponent } from './components/difficulty-button/difficulty-button.component';
import { DifficultyListComponent } from './components/difficulty-list/difficulty-list.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentComponent } from './components/student/student.component';
import { AddProfilButtonComponent } from './components/add-profil-button/add-profil-button.component';
import { PregameComponent } from './pregame.component';
import { PopupComponent } from './components/popup-add-profil/popup-add-profil.component';
import { PopupDComponent } from './components/popup-delete-profil/popup-delete-profil.component';
import { DifficultyDetailComponent } from './components/difficulty-detail/difficulty-detail.component';
import { ConfigCreationComponent } from './components/config/config-creation.component';
import { ConfigListComponent } from './components/config-list/config-list.component';


@NgModule({
  declarations: [
    DifficultyButtonComponent,
    DifficultyListComponent,
    PregameComponent,
    StudentComponent,
    StudentListComponent,
    AddProfilButtonComponent,
    PopupComponent,
    DifficultyDetailComponent,
    PopupDComponent,
    ConfigCreationComponent,
    ConfigListComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    DifficultyListComponent,
    DifficultyButtonComponent,
    PregameComponent,
    StudentComponent,
    StudentListComponent,
    AddProfilButtonComponent,
    PopupComponent,
    PopupDComponent,
  ]
})
export class PregameModule { }
