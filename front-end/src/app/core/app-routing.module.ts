  import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from '../features/game/game.component';
import { PregameComponent } from '../features/pregame/pregame.component';
// import { Component } from './name/name.component'; to import component

const routes: Routes = [
  /**{path: 'quiz', component: QuizComponent} To create route to this component*/
  {path: 'game', component: GameComponent},
  {path: 'pre-game', component: PregameComponent},
  { path: '**', redirectTo: '/pre-game' } // Redirection pour les routes inexistantes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
