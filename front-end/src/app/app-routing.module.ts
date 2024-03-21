import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppWordGame} from "./word-game/app.word-game";
import {DifficultyListComponent} from "./difficulty-list/difficulty-list.component";
// import { Component } from './name/name.component'; to import component

const routes: Routes = [
  /**{path: 'quiz', component: QuizComponent} To create route to this component*/
  {path: 'game', component: AppWordGame},
  {path: '', component: DifficultyListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
