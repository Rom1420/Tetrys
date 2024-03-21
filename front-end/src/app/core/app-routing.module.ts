import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppWordGame} from "../features/game/components/word-game/app.word-game";
import { PregameComponent } from '../features/pregame/pregame.component';
// import { Component } from './name/name.component'; to import component

const routes: Routes = [
  /**{path: 'quiz', component: QuizComponent} To create route to this component*/
  {path: 'game', component: AppWordGame},
  {path: 'pre-game', component: PregameComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
