import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from '../features/game/game.component';
import { PregameComponent } from '../features/pregame/pregame.component';
import {StatsComponent} from "../features/Stats/stats.component";
import { StatsDetailsComponent } from '../features/stats-details/stats-details.component';
// import { Component } from './name/name.component'; to import component

const routes: Routes = [
  /**{path: 'quiz', component: QuizComponent} To create route to this component*/
  {path: 'game', component: GameComponent},
  {path: 'pre-game', component: PregameComponent},
  {path: 'stats', component: StatsComponent},
  {path: 'stats-details', component: StatsDetailsComponent},
  {path: '**', redirectTo: '/pre-game' } // Redirection pour les routes inexistantes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
